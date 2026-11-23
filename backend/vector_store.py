"""MongoDB Atlas Vector Search over the knowledge chunks."""

import time
from typing import Any, Dict, List, Optional

from pymongo import MongoClient, ReplaceOne
from pymongo.operations import SearchIndexModel

import config

INDEX_TIMEOUT_SECONDS = 180


class AtlasVectorStore:
    def __init__(self, collection: Any = None):
        if collection is None:
            # Small pool and short timeouts: this runs in serverless functions,
            # and lexical search covers an outage.
            client = MongoClient(
                config.MONGODB_URI,
                maxPoolSize=5,
                serverSelectionTimeoutMS=3000,
                connectTimeoutMS=3000,
                socketTimeoutMS=15000,
            )
            collection = client[config.MONGODB_DB][config.MONGODB_COLLECTION]
        self.collection = collection

    def search(self, vector: List[float], top_k: int, entity_id: Optional[str] = None) -> List[Dict[str, Any]]:
        # Vectors from different models are not comparable.
        match: Dict[str, Any] = {"embedding_model": config.EMBEDDING_MODEL}
        if entity_id:
            match["entity_id"] = entity_id
        rows = self.collection.aggregate([
            {
                "$vectorSearch": {
                    "index": config.MONGODB_VECTOR_INDEX,
                    "path": "embedding",
                    "queryVector": vector,
                    "numCandidates": max(100, top_k * 20),
                    "limit": top_k,
                    "filter": match,
                }
            },
            {"$project": {"_id": 0, "text": 1, "metadata": 1, "score": {"$meta": "vectorSearchScore"}}},
        ])
        # Atlas reports (1 + cosine) / 2. Undo it, or unrelated text scores
        # about 0.5 and clears MIN_DENSE_SCORE instead of being refused.
        return [{**row, "score": 2 * float(row["score"]) - 1} for row in rows]

    def replace_all(self, docs: List[Dict[str, Any]], embeddings: List[List[float]]) -> int:
        """Upsert every chunk, then drop the ones no longer in the knowledge base."""
        if not docs or len(docs) != len(embeddings):
            raise ValueError("Every chunk needs an embedding, and there must be at least one")
        rows = {
            doc["id"]: {
                "_id": doc["id"],
                "text": doc["text"],
                "metadata": doc["metadata"],
                "entity_id": doc["metadata"].get("entity_id"),
                "embedding_model": config.EMBEDDING_MODEL,
                "embedding": embedding,
            }
            for doc, embedding in zip(docs, embeddings)
        }
        if len(rows) != len(docs):
            raise ValueError("Duplicate chunk ids would overwrite each other")
        self.collection.bulk_write([ReplaceOne({"_id": key}, row, upsert=True) for key, row in rows.items()])
        self.collection.delete_many({"_id": {"$nin": list(rows)}})
        return len(rows)

    def ensure_index(self) -> None:
        name = config.MONGODB_VECTOR_INDEX
        definition = {
            "fields": [
                {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": config.EMBEDDING_DIMENSIONS,
                    "similarity": "cosine",
                },
                {"type": "filter", "path": "entity_id"},
                {"type": "filter", "path": "embedding_model"},
            ]
        }
        if list(self.collection.list_search_indexes(name)):
            self.collection.update_search_index(name, definition)
        else:
            self.collection.create_search_index(
                SearchIndexModel(definition=definition, name=name, type="vectorSearch")
            )
        deadline = time.monotonic() + INDEX_TIMEOUT_SECONDS
        while time.monotonic() < deadline:
            found = list(self.collection.list_search_indexes(name))
            if found and found[0].get("status") == "FAILED":
                raise RuntimeError(f"Vector index build failed: {found[0].get('message')}")
            if found and found[0].get("queryable") and found[0].get("status") == "READY":
                return
            time.sleep(3)
        raise TimeoutError("The vector index is still building. Check it in the Atlas UI.")
