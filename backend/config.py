"""Environment-driven settings for the digital twin backend."""

import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
load_dotenv(dotenv_path=ROOT_DIR / ".env")

# Primary: an open Hugging Face model served by vLLM. Skipped while the URL is unset.
VLLM_BASE_URL = os.getenv("VLLM_BASE_URL", "").strip().rstrip("/")
VLLM_API_KEY = os.getenv("VLLM_API_KEY", "")
VLLM_MODEL = os.getenv("VLLM_MODEL") or "Qwen/Qwen3-4B-AWQ"

# Fallback for when the GPU machine is unreachable.
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "cohere/north-mini-code:free")
FALLBACK_LLM_MODELS = [
    m.strip()
    for m in os.getenv(
        "FALLBACK_LLM_MODELS",
        "liquid/lfm-2.5-2.6b:free,google/gemma-4-31b-it:free",
    ).split(",")
    if m.strip()
]

MONGODB_URI = os.getenv("MONGODB_URI", "")
MONGODB_DB = os.getenv("MONGODB_DB", "portfolio")
MONGODB_COLLECTION = os.getenv("MONGODB_COLLECTION", "knowledge_chunks")
MONGODB_VECTOR_INDEX = os.getenv("MONGODB_VECTOR_INDEX", "knowledge_vector")

HF_TOKEN = os.getenv("HF_TOKEN", "")
# Local dev: a text-embeddings-inference server for the same model, which needs no token.
EMBEDDING_URL = os.getenv("EMBEDDING_URL", "").strip()
HF_INFERENCE_URL = "https://router.huggingface.co/hf-inference"
# Fixed here rather than in the environment: the model, its dimensions, the
# stored vectors, and MIN_DENSE_SCORE only make sense together.
EMBEDDING_MODEL = "sentence-transformers/all-mpnet-base-v2"
EMBEDDING_DIMENSIONS = 768

# Everything the API reads at runtime must live inside backend/: Vercel deploys
# this directory on its own, so paths above it do not exist in production.
KNOWLEDGE_DIR = BASE_DIR / "knowledge"
SOURCE_NOTES_PATH = KNOWLEDGE_DIR / "source-notes.md"

# Only read by ingest.py, which runs from a full checkout.
RESUME_PDF_PATH = ROOT_DIR / "public" / "resume.pdf"
