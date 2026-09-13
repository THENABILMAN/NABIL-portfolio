import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.knowledge_store import KnowledgeStore
from backend.rag_service import RAGService, INSUFFICIENT


def collect_sse(gen):
    import asyncio

    async def _run():
        events = []
        async for line in gen:
            events.append(line)
        return events

    return asyncio.run(_run())


def test_identity_not_impersonation():
    store = KnowledgeStore()
    ans = store.fast_resolve("Who is Nabil?")
    assert ans is not None
    lowered = ans.answer.lower()
    assert ("portfolio ai agent" in lowered) or ("digital twin" in lowered)
    assert "i am mohammad ali nabil" not in lowered


def test_data_island():
    store = KnowledgeStore()
    ans = store.fast_resolve("What did Nabil do at The Data Island?")
    assert ans.entity_id == "data-island"
    assert "AI Engineer Intern" in ans.answer
    assert ans.grounded is True


def test_fitman_not_production():
    store = KnowledgeStore()
    ans = store.fast_resolve("How does FITMAN work?")
    assert ans.entity_id == "fitman"
    assert "production" not in ans.answer.lower().split("active_development")[0] or "active_development" in ans.answer
    assert "active_development" in ans.answer
    assert "< 300" not in ans.answer and "<300" not in ans.answer


def test_fastapi_skill():
    store = KnowledgeStore()
    ans = store.fast_resolve("Does Nabil use FastAPI?")
    assert ans is not None
    assert ans.entity_id == "fastapi"
    assert ans.claims or "BUILT" in ans.answer or "Hands-on" in ans.answer


def test_deepspeed_not_expert():
    store = KnowledgeStore()
    ans = store.fast_resolve("Is Nabil an expert in DeepSpeed?")
    assert ans is not None
    assert ans.entity_id == "deepspeed"
    assert "UNVERIFIED" in ans.answer or "Familiar" in ans.answer
    assert "expert" not in ans.answer.lower() or "not" in ans.answer.lower()


def test_lora_learning():
    store = KnowledgeStore()
    ans = store.fast_resolve("Does Nabil know LoRA?")
    assert ans is not None
    assert ans.entity_id == "lora"
    assert "LEARNING" in ans.answer


def test_unknown_users():
    store = KnowledgeStore()
    ans = store.fast_resolve("How many users does FITMAN have?")
    # classifier may route to fitman project first because "fitman" is in query
    svc = RAGService(store=store)
    if ans and ans.entity_id == "fitman":
        assert "users" not in ans.answer.lower() or "not documented" in ans.answer.lower() or "limitation" in ans.answer.lower()
    result = svc.get_fast_response("How many users does FITMAN have?")
    # still must not invent a user count
    if result:
        assert "10,000" not in result["answer"]
        assert "million" not in result["answer"].lower()


def test_google_internship_refusal():
    store = KnowledgeStore()
    ans = store.fast_resolve("Tell me about Nabil's Google internship.")
    assert ans is not None
    assert ans.grounded is False
    assert ans.sources == []
    assert "don't have enough verified information" in ans.answer.lower()


def test_empty_retrieval_no_fake_citations():
    store = KnowledgeStore()
    svc = RAGService(store=store)
    chunks = svc.retrieve("zzzz-nonexistent-quantum-banana-certificate-42")
    assert chunks == [] or all("quantum-banana" not in (c.get("text") or "") for c in chunks)


def test_planned_not_built_claim():
    store = KnowledgeStore()
    prod = next(c for c in store.claims if c["id"] == "claim-fitman-production")
    built = next(c for c in store.claims if c["id"] == "claim-fitman-built")
    assert prod["status"] == "UNVERIFIED"
    assert built["status"] == "BUILT"
    assert prod["status"] != "BUILT"


def test_generate_unknown_without_llm():
    import asyncio
    store = KnowledgeStore()
    svc = RAGService(store=store)
    result = asyncio.run(svc.generate_response("What is Nabil's unpublished quantum paper DOI?"))
    assert result["grounded"] is False
    assert result["sources"] == []
    assert result["confidence"] == "NONE"
    assert INSUFFICIENT.split(".")[0].lower() in result["answer"].lower()


def test_stream_fast_path_and_refusal():
    store = KnowledgeStore()
    svc = RAGService(store=store)
    events = collect_sse(svc.stream_response("hello"))
    blob = "".join(events)
    assert "canonical-fast-path" in blob
    events2 = collect_sse(svc.stream_response("Nabil unpublished quantum paper DOI xyz"))
    blob2 = "".join(events2)
    assert '"sources": []' in blob2 or "don't have enough verified information" in blob2


def test_history_not_facts():
    store = KnowledgeStore()
    # Visitor cannot inject 20 years of experience into canonical person record
    assert "20 years" not in json.dumps(store.person)
    svc = RAGService(store=store)
    ans = svc.get_fast_response("Who is Nabil?")
    assert "20 years" not in ans["answer"]


if __name__ == "__main__":
    tests = [v for k, v in list(globals().items()) if k.startswith("test_")]
    failed = 0
    for fn in tests:
        try:
            fn()
            print(f"PASS {fn.__name__}")
        except Exception as e:
            failed += 1
            print(f"FAIL {fn.__name__}: {e}")
    if failed:
        sys.exit(1)
    print(f"All {len(tests)} tests passed.")
