import os
import sys
import uuid
from pathlib import Path
from typing import List, Dict, Any

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass
BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader
from pinecone import Pinecone

from backend import config
from backend.embeddings import PineconeEmbeddings

def load_markdown_documents(file_path: Path) -> List[Dict[str, Any]]:
    """Loads and splits the knowledge base markdown into rich chunks."""
    if not file_path.exists():
        print(f"[WARN] Markdown file not found at {file_path}")
        return []

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=750,
        chunk_overlap=120,
        separators=["\n## ", "\n### ", "\n\n", "\n", ". ", " "]
    )

    chunks = splitter.split_text(content)
    documents = []
    
    for i, chunk in enumerate(chunks):
        cleaned_chunk = chunk.strip()
        if len(cleaned_chunk) < 20:
            continue
        
        # Determine likely section heading
        first_line = cleaned_chunk.split("\n")[0].replace("#", "").strip()
        section_name = first_line[:60] if first_line else "General Profile"

        documents.append({
            "id": f"kb_md_{i}_{uuid.uuid4().hex[:6]}",
            "text": cleaned_chunk,
            "metadata": {
                "source": "knowledegebase.md",
                "section": section_name,
                "type": "markdown",
                "text": cleaned_chunk
            }
        })
        
    print(f"[OK] Parsed {len(documents)} chunks from {file_path.name}")
    return documents

def load_pdf_documents(file_path: Path) -> List[Dict[str, Any]]:
    """Extracts text from resume PDF and splits into chunks."""
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
            separators=["\n\n", "\n", ". ", " "]
        )

        chunks = splitter.split_text(full_text)
        documents = []
        for i, chunk in enumerate(chunks):
            cleaned = chunk.strip()
            if len(cleaned) < 25:
                continue
            documents.append({
                "id": f"resume_pdf_{i}_{uuid.uuid4().hex[:6]}",
                "text": cleaned,
                "metadata": {
                    "source": "resume.pdf",
                    "section": "Resume Summary",
                    "type": "pdf",
                    "text": cleaned
                }
            })
        print(f"[OK] Parsed {len(documents)} chunks from {file_path.name}")
        return documents
    except Exception as e:
        print(f"[ERROR] Failed to parse PDF: {e}")
        return []

def run_ingestion():
    """Main ingestion runner."""
    print("==================================================")
    print("🚀 Starting Portfolio RAG Vector Ingestion")
    print(f"Target Index: {config.PINECONE_INDEX_NAME}")
    print(f"Embedding Model: {config.EMBEDDING_MODEL} (dim={config.EMBEDDING_DIMENSION})")
    print("==================================================")

    kb_docs = load_markdown_documents(config.KNOWLEDGE_BASE_PATH)
    pdf_docs = load_pdf_documents(config.RESUME_PDF_PATH)
    all_docs = kb_docs + pdf_docs

    if not all_docs:
        print("[ERROR] No documents loaded! Aborting ingestion.")
        return

    print(f"[INFO] Total chunks to index: {len(all_docs)}")

    # Initialize Pinecone
    pc = Pinecone(api_key=config.PINECONE_API_KEY)
    index = pc.Index(config.PINECONE_INDEX_NAME)

    # Initialize Embeddings
    embedder = PineconeEmbeddings(api_key=config.PINECONE_API_KEY, model=config.EMBEDDING_MODEL)

    texts = [doc["text"] for doc in all_docs]
    print("[INFO] Generating embeddings via Pinecone Inference...")
    embeddings = embedder.embed_documents(texts, batch_size=32)
    print(f"[OK] Generated {len(embeddings)} embeddings successfully.")

    # Prepare Pinecone upsert payload
    vectors = []
    for doc, emb in zip(all_docs, embeddings):
        vectors.append({
            "id": doc["id"],
            "values": emb,
            "metadata": doc["metadata"]
        })

    # Upsert in batches of 50
    print(f"[INFO] Upserting vectors to Pinecone index '{config.PINECONE_INDEX_NAME}'...")
    batch_size = 50
    for i in range(0, len(vectors), batch_size):
        batch = vectors[i : i + batch_size]
        index.upsert(vectors=batch)
        print(f"  -> Upserted batch {i // batch_size + 1} ({len(batch)} vectors)")

    print("[DONE] Ingestion completed successfully!")
    stats = index.describe_index_stats()
    print(f"[STATS] Current index vector count: {stats.get('total_vector_count', 'unknown')}")

if __name__ == "__main__":
    run_ingestion()
