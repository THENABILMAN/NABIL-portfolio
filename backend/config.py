import os
from pathlib import Path
from dotenv import load_dotenv

# Locate root directory and load .env
BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
ENV_PATH = ROOT_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

# OpenRouter Configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "nex-agi/nex-n2.5-mini:free")
FALLBACK_LLM_MODELS = [
    "liquid/lfm-2.5-2.6b:free",
    "inclusionai/ling-3.0-flash-vl:free",
    "cohere/north-mini-code:free",
]

# Pinecone Configuration
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "nabilprotfolio")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "llama-text-embed-v2")
EMBEDDING_DIMENSION = int(os.getenv("EMBEDDING_DIMENSION", "1024"))

# Data Source Paths
KNOWLEDGE_BASE_PATH = ROOT_DIR / "public" / "knowledegebase.md"
RESUME_PDF_PATH = ROOT_DIR / "public" / "resume.pdf"

# Server Configuration
HOST = os.getenv("BACKEND_HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", os.getenv("BACKEND_PORT", "8000")))
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://thenabilman.com",
    "*"
]
