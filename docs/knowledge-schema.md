# Knowledge schema

Root: `knowledge/`

| Path | Contents |
| :--- | :--- |
| `person.yaml` | Identity, contact, hardware (personal statement) |
| `education.yaml` | NSU undergraduate CSE |
| `experience/data-island.yaml` | Internship |
| `projects/*.yaml` | Per-project architecture, contribution, limitations, links |
| `skills/catalog.yaml` | Proficiency category + claim status |
| `claims/claims.yaml` | Atomic claims |
| `benchmarks/catalog.yaml` | Only evidenced measurements |
| `philosophy/engineering.md` | How Nabil wants to work |
| `aspirations/future.md` | Goals, not achievements |
| `source-notes.md` | Original unstructured notes |

Export:

```
python backend/export_canonical.py
```

writes `src/data/canonical.json`.

Re-index Pinecone:

```
python backend/ingest.py
```
