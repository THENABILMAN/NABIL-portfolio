"""Hugging Face embeddings (hosted, or a local server via EMBEDDING_URL), used for both indexing and search."""

import time
from typing import List, Optional

import httpx

import config

MAX_ATTEMPTS = 3
TIMEOUT_SECONDS = 8.0
RETRYABLE = {429, 500, 502, 503, 504}


class HuggingFaceEmbeddings:
    def __init__(self, token: Optional[str] = None, model: Optional[str] = None):
        self.model = model or config.EMBEDDING_MODEL
        self.token = token or config.HF_TOKEN
        self.url = config.EMBEDDING_URL or f"{config.HF_INFERENCE_URL}/models/{self.model}/pipeline/feature-extraction"

    def _embed(self, inputs: List[str], attempts: int) -> List[List[float]]:
        for attempt in range(attempts):
            last = attempt == attempts - 1
            try:
                res = httpx.post(
                    self.url,
                    headers={"Authorization": f"Bearer {self.token}"} if self.token else {},
                    json={"inputs": inputs, "truncate": True},
                    timeout=TIMEOUT_SECONDS,
                )
            except httpx.TransportError:
                if last:
                    raise
            else:
                if last or res.status_code not in RETRYABLE:
                    res.raise_for_status()
                    vectors = res.json()
                    if len(vectors) != len(inputs) or any(len(v) != config.EMBEDDING_DIMENSIONS for v in vectors):
                        raise ValueError(f"{self.model} did not return {config.EMBEDDING_DIMENSIONS}-dimension vectors")
                    return vectors
            time.sleep(1 + attempt)
        raise RuntimeError("unreachable")

    def embed_documents(self, texts: List[str], batch_size: int = 16) -> List[List[float]]:
        embeddings: List[List[float]] = []
        for i in range(0, len(texts), batch_size):
            batch = [t if t.strip() else " " for t in texts[i : i + batch_size]]
            embeddings.extend(self._embed(batch, MAX_ATTEMPTS))
        return embeddings

    def embed_query(self, text: str) -> List[float]:
        # One attempt: a visitor is waiting, and lexical search covers a miss.
        return self._embed([text.strip() or "general query"], 1)[0]
