# Claims and evidence

Allowed statuses: `VERIFIED`, `BUILT`, `EXPERIMENTAL`, `LEARNING`, `PLANNED`, `ASPIRATIONAL`, `UNVERIFIED`.

Evidence priority (strongest first):

1. This repository / dedicated GitHub repo
2. Reproducible benchmark object
3. Resume
4. Listed demo URL
5. Structured portfolio YAML
6. Personal statement (`source-notes.md`)
7. Aspirational material

Confidence (`HIGH` / `MEDIUM` / `LOW` / `NONE`) is **not** a Pinecone similarity score.

Notable downgrades vs older site copy:

- FITMAN is `active_development`, not production.
- Groq `<300ms`, LiveKit `<200ms`, RAG `<500ms` are not verified benchmarks.
- LoRA/QLoRA/PEFT/SFT/DPO/DeepSpeed/FSDP/vLLM are learning or unverified.
- BM25 + RRF + BGE rerank was marketing copy; this repo uses dense + lexical overlap.
