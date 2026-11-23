"""Export the public subset of the knowledge base for the Next.js frontend."""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))

from knowledge_store import KnowledgeStore


def main() -> None:
    payload = KnowledgeStore().export_public_dict()
    out = ROOT / "src" / "data" / "canonical.json"
    out.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8", newline="\n")
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
