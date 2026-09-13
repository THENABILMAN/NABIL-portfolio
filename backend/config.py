import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
ENV_PATH = ROOT_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "nex-agi/nex-n2.5-mini:free")
FALLBACK_LLM_MODELS = [
    m.strip()
    for m in os.getenv(
        "FALLBACK_LLM_MODELS",
        "liquid/lfm-2.5-2.6b:free,inclusionai/ling-3.0-flash-vl:free,cohere/north-mini-code:free",
    ).split(",")
    if m.strip()
]

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "nabilprotfolio")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "llama-text-embed-v2")
EMBEDDING_DIMENSION = int(os.getenv("EMBEDDING_DIMENSION", "1024"))

KNOWLEDGE_DIR = ROOT_DIR / "knowledge"
KNOWLEDGE_BASE_PATH = ROOT_DIR / "public" / "knowledgebase.md"
LEGACY_KNOWLEDGE_BASE_PATH = ROOT_DIR / "public" / "knowledegebase.md"
RESUME_PDF_PATH = ROOT_DIR / "public" / "resume.pdf"

HOST = os.getenv("BACKEND_HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", os.getenv("BACKEND_PORT", "8000")))
INGEST_SECRET = os.getenv("INGEST_SECRET", "")

_default_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://thenabilman.com",
    "https://thenabilman.vercel.app",
]
_extra = os.getenv("ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS = _default_origins + [o.strip() for o in _extra.split(",") if o.strip()]
