"""Export canonical knowledge JSON for the Next.js frontend."""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.knowledge_store import KnowledgeStore


def main():
    store = KnowledgeStore()
    payload = store.export_public_dict()
    out = ROOT / "src" / "data" / "canonical.json"
    out.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
