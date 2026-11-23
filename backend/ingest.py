import sys
from pathlib import Path
from typing import List, Dict, Any

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

sys.path.insert(0, str(Path(__file__).resolve().parent))

from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader

import config
from embeddings import HuggingFaceEmbeddings
from knowledge_store import KnowledgeStore
from vector_store import AtlasVectorStore


def load_canonical_documents() -> List[Dict[str, Any]]:
    store = KnowledgeStore()
    docs = []
    for doc in store.documents:
        meta = dict(doc["metadata"])
        docs.append({
            "id": doc["id"].replace(" ", "_")[:80],
            "text": doc["text"],
            "metadata": meta,
        })
    print(f"[OK] Canonical knowledge chunks: {len(docs)}")
    return docs


def load_markdown_documents(file_path: Path) -> List[Dict[str, Any]]:
    if not file_path.exists():
        print(f"[WARN] Markdown file not found at {file_path}")
        return []

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=900,
        chunk_overlap=120,
        separators=["\n## ", "\n### ", "\n\n", "\n", ". ", " "],
    )
    chunks = splitter.split_text(content)
    documents = []
    for i, chunk in enumerate(chunks):
        cleaned_chunk = chunk.strip()
        if len(cleaned_chunk) < 40:
            continue
        first_line = cleaned_chunk.split("\n")[0].replace("#", "").strip()
        documents.append({
            "id": f"notes_md_{i}",
            "text": cleaned_chunk,
            "metadata": {
                "source": "source-notes.md",
                "source_type": "personal_statement",
                "section": first_line[:60] or "source-notes",
                "entity_id": "source-notes",
                "entity_type": "notes",
                "claim_status": "UNVERIFIED",
                "confidence": "low",
                "text": cleaned_chunk,
            },
        })
    print(f"[OK] Parsed {len(documents)} supplementary note chunks from {file_path.name}")
    return documents


def load_pdf_documents(file_path: Path) -> List[Dict[str, Any]]:
    if not file_path.exists():
        print(f"[WARN] Resume PDF not found at {file_path}")
        return []
    try:
        reader = PdfReader(str(file_path))
        full_text = ""
        for i, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            full_text += f"\n--- Page {i+1} ---\n" + page_text

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=650,
            chunk_overlap=100,
            separators=["\n\n", "\n", ". ", " "],
        )
        chunks = splitter.split_text(full_text)
        documents = []
        for i, chunk in enumerate(chunks):
            cleaned = chunk.strip()
            if len(cleaned) < 25:
                continue
            documents.append({
                "id": f"resume_pdf_{i}",
                "text": cleaned,
                "metadata": {
                    "source": "resume.pdf",
                    "source_type": "resume",
                    "section": "Resume",
                    "entity_id": "person-nabil",
                    "entity_type": "person",
                    "claim_status": "VERIFIED",
                    "confidence": "high",
                    "text": cleaned,
                },
            })
        print(f"[OK] Parsed {len(documents)} chunks from {file_path.name}")
        return documents
    except Exception as e:
        print(f"[ERROR] Failed to parse PDF: {e}")
        return []


def run_ingestion():
    print("==================================================")
    print("Portfolio RAG ingestion (canonical + resume + notes)")
    print(f"Target: {config.MONGODB_DB}.{config.MONGODB_COLLECTION}")
    print("==================================================")

    if not config.MONGODB_URI or not (config.HF_TOKEN or config.EMBEDDING_URL):
        raise RuntimeError("Set MONGODB_URI, and either HF_TOKEN or EMBEDDING_URL")

    all_docs = (
        load_canonical_documents()
        + load_pdf_documents(config.RESUME_PDF_PATH)
        + load_markdown_documents(config.SOURCE_NOTES_PATH)
    )
    if not all_docs:
        print("[ERROR] No documents loaded! Aborting ingestion.")
        return

    print("[INFO] Generating embeddings via Hugging Face Inference...")
    embeddings = HuggingFaceEmbeddings().embed_documents([doc["text"] for doc in all_docs])

    vectors = AtlasVectorStore()
    count = vectors.replace_all(all_docs, embeddings)
    print(f"[OK] Stored {count} chunks. Building the vector index...")
    vectors.ensure_index()
    print("[DONE] Ingestion completed successfully!")


if __name__ == "__main__":
    run_ingestion()
