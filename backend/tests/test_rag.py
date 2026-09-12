import asyncio
import sys
from pathlib import Path

# Ensure project root is in sys.path
TEST_DIR = Path(__file__).resolve().parent
BACKEND_DIR = TEST_DIR.parent
ROOT_DIR = BACKEND_DIR.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from backend.rag_service import RAGService

async def main():
    svc = RAGService()
    print("Testing vector retrieval for query: 'FITMAN'...")
    matches = svc.retrieve("Tell me about FITMAN and its architecture")
    print(f"Retrieved {len(matches)} matches:")
    for m in matches:
        print(f" - [{m['score']:.3f}] {m['source']} | {m['section']}")
    
    print("\nTesting full RAG generation via OpenRouter...")
    result = await svc.generate_response("Give me a quick 2-bullet summary of Nabil's experience and what FITMAN is.")
    print("\nModel Used:", result.get("model"))
    print("\nSynthesized Answer:\n", result.get("answer"))
    print("\nSources:\n", result.get("sources"))

if __name__ == "__main__":
    asyncio.run(main())
