import time
from typing import List
from pinecone import Pinecone
import httpx
from backend import config

class PineconeEmbeddings:
    """
    Pinecone Inference Embeddings client using llama-text-embed-v2 (1024 dimensions).
    Supports passage embedding for indexing and query embedding for search.
    """
    def __init__(self, api_key: str = None, model: str = None):
        self.api_key = api_key or config.PINECONE_API_KEY
        self.model = model or config.EMBEDDING_MODEL
        self.pc = Pinecone(api_key=self.api_key)

    def embed_documents(self, texts: List[str], batch_size: int = 32) -> List[List[float]]:
        """Embed a list of document passages."""
        embeddings: List[List[float]] = []
        if not texts:
            return embeddings

        for i in range(0, len(texts), batch_size):
            batch = texts[i : i + batch_size]
            # Clean empty or whitespace strings
            batch = [t if t.strip() else " " for t in batch]
            
            success = False
            for attempt in range(3):
                try:
                    res = self.pc.inference.embed(
                        model=self.model,
                        inputs=batch,
                        parameters={"input_type": "passage", "truncate": "END"}
                    )
                    batch_embeds = [item["values"] for item in res]
                    embeddings.extend(batch_embeds)
                    success = True
                    break
                except Exception as e:
                    if attempt == 2:
                        raise e
                    time.sleep(1 + attempt)
            
            if not success:
                raise RuntimeError(f"Failed to embed batch starting at index {i}")

        return embeddings

    def embed_query(self, text: str) -> List[float]:
        """Embed a single query string."""
        text = text.strip() if text.strip() else "general query"
        for attempt in range(3):
            try:
                res = self.pc.inference.embed(
                    model=self.model,
                    inputs=[text],
                    parameters={"input_type": "query", "truncate": "END"}
                )
                return res[0]["values"]
            except Exception as e:
                if attempt == 2:
                    raise e
                time.sleep(1 + attempt)
        raise RuntimeError("Failed to embed query after retries.")
