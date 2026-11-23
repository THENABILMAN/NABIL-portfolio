# Knowledge schema

Root: `backend/knowledge/`

| Path | Contents |
| :--- | :--- |
| `person.yaml` | Identity, contact, hardware (personal statement) |
| `education.yaml` | NSU undergraduate CSE |
| `experience/data-island.yaml` | Internship |
| `projects/*.yaml` | Per-project architecture, contribution, limitations, links |
| `foundations/foundations.yaml` | Self-study areas and topics, self-reported |
| `skills/catalog.yaml` | Proficiency category + claim status |
| `claims/claims.yaml` | Atomic claims |
| `benchmarks/catalog.yaml` | Only evidenced measurements |
| `philosophy/engineering.md` | How Nabil wants to work |
| `aspirations/future.md` | Goals, not achievements |
| `source-notes.md` | Original unstructured notes |

Use `github:` only for a repository that resolves publicly. Unconfirmed URLs go in `github_unverified_url`.

Export the public subset to `src/data/canonical.json`:

```
python backend/export_canonical.py
```

Re-index MongoDB (needs `backend/requirements-ingest.txt`):

```
python backend/ingest.py
```
