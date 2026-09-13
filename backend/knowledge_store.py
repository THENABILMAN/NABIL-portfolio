"""Canonical knowledge loader, entity resolution, lexical search, and fast answers."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import yaml

from backend import config

CLAIM_STATUSES = {
    "VERIFIED",
    "BUILT",
    "EXPERIMENTAL",
    "LEARNING",
    "PLANNED",
    "ASPIRATIONAL",
    "UNVERIFIED",
}

CONFIDENCE_RANK = {"none": 0, "low": 1, "medium": 2, "high": 3}

STOPWORDS = {
    "the", "a", "an", "of", "and", "or", "to", "in", "for", "on", "with", "is",
    "are", "was", "what", "who", "how", "does", "did", "nabil", "his", "he",
    "about", "tell", "me", "please",
}


@dataclass
class Source:
    source_id: str
    source_type: str
    title: str
    url: Optional[str]
    section: str
    relevance: float


@dataclass
class FastAnswer:
    answer: str
    entity_type: Optional[str]
    entity_id: Optional[str]
    claims: List[Dict[str, Any]]
    sources: List[Dict[str, Any]]
    confidence: str
    grounded: bool = True


class KnowledgeStore:
    def __init__(self, root: Optional[Path] = None):
        self.root = Path(root or config.KNOWLEDGE_DIR)
        self.person: Dict[str, Any] = {}
        self.education: Dict[str, Any] = {}
        self.experience: List[Dict[str, Any]] = []
        self.projects: List[Dict[str, Any]] = []
        self.skills: List[Dict[str, Any]] = []
        self.claims: List[Dict[str, Any]] = []
        self.benchmarks: List[Dict[str, Any]] = []
        self.philosophy: str = ""
        self.aspirations: str = ""
        self.entities: Dict[str, Dict[str, Any]] = {}
        self.documents: List[Dict[str, Any]] = []
        self._load()

    def _read_yaml(self, path: Path) -> Any:
        with open(path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f) or {}

    def _load(self) -> None:
        self.person = self._read_yaml(self.root / "person.yaml")
        self.education = self._read_yaml(self.root / "education.yaml")
        self.experience = [
            self._read_yaml(p) for p in sorted((self.root / "experience").glob("*.yaml"))
        ]
        self.projects = [
            self._read_yaml(p) for p in sorted((self.root / "projects").glob("*.yaml"))
        ]
        skills_doc = self._read_yaml(self.root / "skills" / "catalog.yaml")
        self.skills = skills_doc.get("skills", [])
        self.claims = self._read_yaml(self.root / "claims" / "claims.yaml") or []
        bench = self._read_yaml(self.root / "benchmarks" / "catalog.yaml")
        self.benchmarks = bench.get("benchmarks", [])
        phil = self.root / "philosophy" / "engineering.md"
        asp = self.root / "aspirations" / "future.md"
        self.philosophy = phil.read_text(encoding="utf-8") if phil.exists() else ""
        self.aspirations = asp.read_text(encoding="utf-8") if asp.exists() else ""

        self.entities = {}
        self._index_entity(self.person)
        self._index_entity(self.education)
        for item in self.experience + self.projects + self.skills:
            self._index_entity(item)

        self.documents = self._build_documents()

    def _index_entity(self, obj: Dict[str, Any]) -> None:
        if not obj or not obj.get("id"):
            return
        self.entities[str(obj["id"])] = obj

    def project_by_id(self, pid: str) -> Optional[Dict[str, Any]]:
        return next((p for p in self.projects if p.get("id") == pid), None)

    def skill_by_id(self, sid: str) -> Optional[Dict[str, Any]]:
        return next((s for s in self.skills if s.get("id") == sid), None)

    def claims_for(self, entity_id: Optional[str]) -> List[Dict[str, Any]]:
        if not entity_id:
            return []
        return [c for c in self.claims if c.get("entity_id") == entity_id]

    def _fmt_evidence(self, evidence: Any, section: str, entity_id: str) -> List[Dict[str, Any]]:
        out: List[Dict[str, Any]] = []
        if not evidence:
            return out
        if isinstance(evidence, list):
            for i, ev in enumerate(evidence):
                if isinstance(ev, dict):
                    src = ev.get("source") or ev.get("type") or "portfolio"
                    url = src if isinstance(src, str) and src.startswith("http") else None
                    out.append({
                        "source_id": f"{entity_id}-{i}",
                        "source_type": ev.get("type", "portfolio"),
                        "title": ev.get("description") or ev.get("type") or "evidence",
                        "url": url,
                        "section": section,
                        "relevance": 1.0,
                    })
                elif isinstance(ev, str):
                    out.append({
                        "source_id": f"{entity_id}-{ev}",
                        "source_type": "portfolio",
                        "title": ev,
                        "url": None,
                        "section": section,
                        "relevance": 0.9,
                    })
        return out

    def _build_documents(self) -> List[Dict[str, Any]]:
        docs: List[Dict[str, Any]] = []

        def add(entity_id: str, entity_type: str, section: str, text: str, extra: Dict[str, Any]):
            text = (text or "").strip()
            if len(text) < 20:
                return
            meta = {
                "entity_id": entity_id,
                "entity_type": entity_type,
                "section": section,
                "source_type": extra.get("source_type", "structured_knowledge"),
                "source_url": extra.get("source_url") or "",
                "claim_status": extra.get("claim_status", "UNVERIFIED"),
                "confidence": extra.get("confidence", "medium"),
                "technology": extra.get("technology", ""),
                "date": extra.get("date", ""),
                "text": text,
            }
            docs.append({
                "id": f"{entity_id}::{section}",
                "text": text,
                "metadata": meta,
            })

        p = self.person
        add("person-nabil", "person", "identity",
            f"{p.get('name')} ({p.get('brand')}). {p.get('headline')}\n{p.get('summary')}\n"
            f"Location: {p.get('location')}. Agent identity: {p.get('agent_identity')}",
            {"claim_status": "VERIFIED", "confidence": "high", "source_type": "structured_knowledge"})
        add("person-nabil", "person", "contact",
            f"Email: {p.get('email')}\nPhone: {p.get('phone')}\nGitHub: {p.get('github')}\n"
            f"LinkedIn: {p.get('linkedin')}\nResume: {p.get('links', {}).get('resume')}",
            {"claim_status": "VERIFIED", "confidence": "high"})
        add("person-nabil", "person", "hardware",
            str(p.get("hardware")),
            {"claim_status": "UNVERIFIED", "confidence": "medium", "source_type": "personal_statement"})

        e = self.education
        add("nsu-cse", "education", "overview",
            f"{e.get('degree')} at {e.get('institution')}. Status: {e.get('status')}. {e.get('notes')}",
            {"claim_status": e.get("claim_status", "VERIFIED"), "confidence": e.get("confidence", "high")})

        for exp in self.experience:
            bullets = "\n".join(f"- {b}" for b in exp.get("responsibilities", []))
            add(exp["id"], "experience", "overview",
                f"{exp.get('role')} at {exp.get('company')} ({exp.get('team')}), {exp.get('period')}.\n"
                f"{exp.get('summary')}\nResponsibilities:\n{bullets}",
                {"claim_status": exp.get("claim_status", "VERIFIED"), "confidence": exp.get("confidence", "high"),
                 "date": exp.get("period", "")})

        for proj in self.projects:
            techs = ", ".join(proj.get("technologies") or [])
            body = (
                f"{proj.get('name')} — {proj.get('one_line')}\n"
                f"Status: {proj.get('status')} | Claim status: {proj.get('claim_status')}\n"
                f"Problem: {proj.get('problem')}\nGoal: {proj.get('goal')}\n"
                f"Nabil's contribution: {proj.get('nabil_contribution')}\n"
                f"Architecture: {proj.get('architecture')}\n"
                f"Technologies: {techs}\n"
                f"Limitations: {proj.get('limitations')}\n"
                f"GitHub: {proj.get('github')}\nDemo: {proj.get('demo')}\n"
                f"Conflict notes: {proj.get('conflict_resolution', '')}"
            )
            add(proj["id"], "project", "overview", body, {
                "claim_status": proj.get("claim_status", "UNVERIFIED"),
                "confidence": proj.get("confidence", "medium"),
                "source_type": "structured_knowledge",
                "source_url": proj.get("github") or proj.get("demo") or "",
                "technology": techs[:200],
            })
            for section in ("problem", "architecture", "nabil_contribution", "limitations"):
                add(proj["id"], "project", section, str(proj.get(section, "")), {
                    "claim_status": proj.get("claim_status", "UNVERIFIED"),
                    "confidence": proj.get("confidence", "medium"),
                    "source_url": proj.get("github") or "",
                })

        for sk in self.skills:
            add(sk["id"], "skill", "overview",
                f"{sk.get('name')} — proficiency: {sk.get('level')}, status: {sk.get('status')}. "
                f"Context: {sk.get('context')}. Notes: {sk.get('notes', '')}. "
                f"Evidence entities: {sk.get('evidence')}",
                {"claim_status": sk.get("status", "UNVERIFIED"), "confidence": "medium",
                 "technology": sk.get("name", "")})

        add("philosophy", "philosophy", "engineering", self.philosophy,
            {"claim_status": "VERIFIED", "confidence": "high", "source_type": "personal_statement"})
        add("aspirations", "aspirations", "future", self.aspirations,
            {"claim_status": "ASPIRATIONAL", "confidence": "high", "source_type": "personal_statement"})

        for b in self.benchmarks:
            add(b["id"], "benchmark", "measurement",
                f"Project {b.get('project')}: {b.get('metric')}={b.get('value')}{b.get('unit')} "
                f"for {b.get('input')}. Method: {b.get('method')}. Reproducible: {b.get('reproducible')}. "
                f"{b.get('notes')}",
                {"claim_status": b.get("status", "EXPERIMENTAL"), "confidence": "low"})

        for c in self.claims:
            add(c["id"], "claim", "statement",
                f"Claim: {c.get('claim')} Status: {c.get('status')} Confidence: {c.get('confidence')}",
                {"claim_status": c.get("status", "UNVERIFIED"), "confidence": c.get("confidence", "low")})

        return docs

    def lexical_search(self, query: str, top_k: int = 8) -> List[Dict[str, Any]]:
        tokens = [t for t in re.findall(r"[a-z0-9]+", query.lower()) if t not in STOPWORDS and len(t) > 1]
        if not tokens:
            return []
        scored = []
        for doc in self.documents:
            text = doc["text"].lower()
            hits = sum(1 for t in tokens if t in text)
            if hits == 0:
                continue
            score = hits / len(tokens)
            # light entity boost
            eid = doc["metadata"].get("entity_id", "")
            if eid and eid.replace("-", " ") in query.lower():
                score += 0.2
            scored.append({
                "score": min(score, 1.0),
                "source": "canonical-knowledge",
                "section": doc["metadata"].get("section", ""),
                "text": doc["text"],
                "metadata": doc["metadata"],
            })
        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:top_k]

    def classify_query(self, query: str) -> Dict[str, Any]:
        q = query.lower()
        if re.search(r"\b(ignore (previous|all) instructions|reveal (your )?(system|hidden) prompt|private (key|info))\b", q):
            return {"intent": "adversarial", "entity_type": None, "entity_id": None}
        if re.search(r"\b(google internship|intern(ed)? at google|worked at (meta|openai|microsoft|amazon))\b", q):
            return {"intent": "unknown_job", "entity_type": "person", "entity_id": "person-nabil"}
        if re.search(r"\b(salary|how many users|revenue|doi|unpublished|research paper|publication)\b", q):
            return {"intent": "unknown_metric", "entity_type": None, "entity_id": None}
        if re.search(r"\b(who are you|who is nabil|about nabil|introduce yourself|whoami)\b", q):
            return {"intent": "identity", "entity_type": "person", "entity_id": "person-nabil"}
        if re.search(r"\b(contact|email|phone|linkedin|github|resume|cv)\b", q):
            return {"intent": "contact", "entity_type": "person", "entity_id": "person-nabil"}
        if re.search(r"\b(data island|internship)\b", q):
            return {"intent": "experience", "entity_type": "experience", "entity_id": "data-island"}
        if re.search(r"\b(education|university|nsu|north south|degree|undergrad)\b", q):
            return {"intent": "education", "entity_type": "education", "entity_id": "nsu-cse"}
        if re.search(r"\b(philosophy|first principles|how he learns)\b", q):
            return {"intent": "philosophy", "entity_type": "philosophy", "entity_id": "philosophy"}
        if re.search(r"\b(future goals?|aspirations?|study in germany|graduate study|quantum computing)\b", q):
            return {"intent": "aspirations", "entity_type": "aspirations", "entity_id": "aspirations"}
        if re.search(r"\b(this portfolio|digital twin|portfolio (ai|agent|rag)|how does (the )?portfolio)\b", q):
            return {"intent": "portfolio_system", "entity_type": "portfolio_system", "entity_id": "portfolio-digital-twin"}

        project_aliases = {
            "fitman": "fitman",
            "resume analyzer": "resume-analyzer",
            "cv analyzer": "resume-analyzer",
            "bangla": "bangla-voice-agent",
            "bengali": "bangla-voice-agent",
            "livekit": "livekit-mcp-assistant",
            "mcp": "livekit-mcp-assistant",
            "vision": "vision-ocr",
            "ocr": "vision-ocr",
            "voice agent": "realtime-voice-agent",
            "documentation rag": "rag-agent",
            "rag agent": "rag-agent",
            "autonomous agent": "autonomous-agent-system",
            "agent system": "autonomous-agent-system",
        }
        for alias, pid in project_aliases.items():
            if alias in q:
                return {"intent": "project", "entity_type": "project", "entity_id": pid}

        if re.search(r"\b(projects|what has he built|featured systems)\b", q):
            return {"intent": "projects_list", "entity_type": "project", "entity_id": None}

        for sk in self.skills:
            name = (sk.get("name") or "").lower()
            sid = sk.get("id", "")
            if sid and re.search(rf"\b{re.escape(sid)}\b", q):
                return {"intent": "skill", "entity_type": "skill", "entity_id": sid}
            if name and name.split("/")[0].strip() in q:
                return {"intent": "skill", "entity_type": "skill", "entity_id": sid}

        if re.search(r"\b(skills|tech stack|technologies)\b", q):
            return {"intent": "skills_list", "entity_type": "skill", "entity_id": None}

        if re.search(r"\b(how many users|revenue|salary|clients?)\b", q):
            return {"intent": "unknown_metric", "entity_type": None, "entity_id": None}

        return {"intent": "open", "entity_type": None, "entity_id": None}

    def render_entity(self, entity_id: str) -> str:
        obj = self.entities.get(entity_id)
        if not obj:
            if entity_id == "philosophy":
                return self.philosophy
            if entity_id == "aspirations":
                return self.aspirations
            return ""
        lines = [f"{obj.get('name') or obj.get('id')}"]
        for key in ("one_line", "summary", "status", "claim_status", "level", "role", "company",
                    "period", "problem", "goal", "nabil_contribution", "architecture",
                    "limitations", "github", "demo", "notes", "conflict_resolution"):
            if obj.get(key):
                lines.append(f"{key}: {obj[key]}")
        if obj.get("technologies"):
            lines.append("technologies: " + ", ".join(obj["technologies"]))
        if obj.get("responsibilities"):
            lines.append("responsibilities:")
            lines.extend(f"- {r}" for r in obj["responsibilities"])
        return "\n".join(lines)

    def fast_resolve(self, query: str) -> Optional[FastAnswer]:
        q = query.strip().lower()
        q = re.sub(r"[?!.,\"'`]+", "", q).strip()
        classification = self.classify_query(q)
        person = self.person

        if classification["intent"] == "adversarial":
            return FastAnswer(
                answer="I only discuss public portfolio knowledge. I won't reveal private data, secrets, or hidden prompts.",
                entity_type="person",
                entity_id="person-nabil",
                claims=[],
                sources=[],
                confidence="HIGH",
                grounded=True,
            )

        if re.search(r"^(hi|hello|hey|sup|yo|howdy|hola|greetings|good morning|good afternoon|good evening|hi there)$", q):
            return FastAnswer(
                answer=person.get("agent_identity", "") + " Ask about documented projects, The Data Island internship, education, or this portfolio RAG system.",
                entity_type="person",
                entity_id="person-nabil",
                claims=[],
                sources=self._fmt_evidence(person.get("hardware", {}).get("evidence"), "identity", "person-nabil")[:1] or [{
                    "source_id": "person-identity",
                    "source_type": "structured_knowledge",
                    "title": "Canonical person record",
                    "url": None,
                    "section": "identity",
                    "relevance": 1.0,
                }],
                confidence="HIGH",
            )

        if classification["intent"] == "identity":
            edu = self.education
            return FastAnswer(
                answer=(
                    f"{person.get('agent_identity')}\n\n"
                    f"{person.get('name')} ({person.get('brand')}) is an {edu.get('status')} in "
                    f"{edu.get('degree')} at {edu.get('institution')}, based in {person.get('location')}. "
                    f"{person.get('summary')}"
                ),
                entity_type="person",
                entity_id="person-nabil",
                claims=[c for c in self.claims_for("nsu-cse") if c.get("status") == "VERIFIED"][:1],
                sources=[{
                    "source_id": "person.yaml",
                    "source_type": "structured_knowledge",
                    "title": "Canonical identity",
                    "url": person.get("github"),
                    "section": "identity",
                    "relevance": 1.0,
                }],
                confidence="HIGH",
            )

        if classification["intent"] == "contact":
            return FastAnswer(
                answer=(
                    f"Public contact for {person.get('name')}:\n"
                    f"• Email: {person.get('email')}\n"
                    f"• Phone / WhatsApp: {person.get('phone')}\n"
                    f"• GitHub: {person.get('github')}\n"
                    f"• LinkedIn: {person.get('linkedin')}\n"
                    f"• Resume: {person.get('links', {}).get('resume', '/resume.pdf')}"
                ),
                entity_type="person",
                entity_id="person-nabil",
                claims=[],
                sources=[{
                    "source_id": "person-contact",
                    "source_type": "structured_knowledge",
                    "title": "Public contact fields",
                    "url": person.get("github"),
                    "section": "contact",
                    "relevance": 1.0,
                }],
                confidence="HIGH",
            )

        if classification["intent"] == "experience":
            exp = self.experience[0]
            bullets = "\n".join(f"• {b}" for b in exp.get("responsibilities", []))
            return FastAnswer(
                answer=(
                    f"At {exp.get('company')} ({exp.get('period')}), Nabil was {exp.get('role')} "
                    f"on the {exp.get('team')} team.\n{exp.get('summary')}\n{bullets}"
                ),
                entity_type="experience",
                entity_id="data-island",
                claims=self.claims_for("data-island"),
                sources=self._fmt_evidence(exp.get("evidence"), "experience", "data-island"),
                confidence="HIGH",
            )

        if classification["intent"] == "education":
            edu = self.education
            return FastAnswer(
                answer=(
                    f"{edu.get('degree')} at {edu.get('institution')} ({edu.get('location')}). "
                    f"Canonical status: {edu.get('status')}. {edu.get('notes')}"
                ),
                entity_type="education",
                entity_id="nsu-cse",
                claims=self.claims_for("nsu-cse"),
                sources=self._fmt_evidence(edu.get("evidence"), "education", "nsu-cse"),
                confidence="HIGH",
            )

        if classification["intent"] == "philosophy":
            return FastAnswer(
                answer=self.philosophy.strip(),
                entity_type="philosophy",
                entity_id="philosophy",
                claims=[],
                sources=[{
                    "source_id": "philosophy",
                    "source_type": "personal_statement",
                    "title": "Engineering philosophy",
                    "url": None,
                    "section": "engineering",
                    "relevance": 1.0,
                }],
                confidence="HIGH",
            )

        if classification["intent"] == "aspirations":
            return FastAnswer(
                answer="These are aspirations, not completed achievements.\n\n" + self.aspirations.strip(),
                entity_type="aspirations",
                entity_id="aspirations",
                claims=[],
                sources=[{
                    "source_id": "aspirations",
                    "source_type": "personal_statement",
                    "title": "Documented goals",
                    "url": None,
                    "section": "future",
                    "relevance": 1.0,
                }],
                confidence="HIGH",
            )

        if classification["intent"] == "projects_list":
            lines = []
            for proj in self.projects:
                gh = proj.get("github") or "no dedicated repo verified here"
                lines.append(
                    f"- {proj.get('name')} [{proj.get('status')} / {proj.get('claim_status')}]: "
                    f"{proj.get('one_line')} ({gh})"
                )
            return FastAnswer(
                answer="Documented projects (status is canonical, not marketing copy):\n" + "\n".join(lines),
                entity_type="project",
                entity_id=None,
                claims=[],
                sources=[{
                    "source_id": "projects",
                    "source_type": "structured_knowledge",
                    "title": "Project catalog",
                    "url": None,
                    "section": "catalog",
                    "relevance": 1.0,
                }],
                confidence="HIGH",
            )

        if classification["intent"] == "skills_list":
            groups: Dict[str, List[str]] = {}
            for sk in self.skills:
                groups.setdefault(sk.get("status", "UNVERIFIED"), []).append(
                    f"{sk.get('name')} ({sk.get('level')})"
                )
            parts = []
            for status in ["BUILT", "EXPERIMENTAL", "LEARNING", "UNVERIFIED", "VERIFIED"]:
                if status in groups:
                    parts.append(f"{status}: " + "; ".join(groups[status]))
            return FastAnswer(
                answer="Skill catalog with evidence-based levels (not percentage scores):\n" + "\n".join(parts),
                entity_type="skill",
                entity_id=None,
                claims=[],
                sources=[{
                    "source_id": "skills",
                    "source_type": "structured_knowledge",
                    "title": "Skill catalog",
                    "url": None,
                    "section": "catalog",
                    "relevance": 1.0,
                }],
                confidence="HIGH",
            )

        if classification["intent"] == "skill" and classification["entity_id"]:
            sk = self.skill_by_id(classification["entity_id"])
            if sk:
                return FastAnswer(
                    answer=(
                        f"{sk.get('name')}: proficiency '{sk.get('level')}', claim status {sk.get('status')}. "
                        f"Context: {sk.get('context')}. "
                        f"{sk.get('notes') or ''} "
                        f"Related evidence entities: {', '.join(sk.get('evidence') or []) or 'none documented'}."
                    ),
                    entity_type="skill",
                    entity_id=sk["id"],
                    claims=self.claims_for(sk["id"]),
                    sources=[{
                        "source_id": sk["id"],
                        "source_type": "structured_knowledge",
                        "title": sk.get("name"),
                        "url": None,
                        "section": "skill",
                        "relevance": 1.0,
                    }],
                    confidence="HIGH" if sk.get("status") in {"BUILT", "VERIFIED"} else "MEDIUM",
                )

        if classification["intent"] == "project" and classification["entity_id"]:
            proj = self.project_by_id(classification["entity_id"])
            if proj:
                return FastAnswer(
                    answer=self._project_answer(proj),
                    entity_type="project",
                    entity_id=proj["id"],
                    claims=self.claims_for(proj["id"]),
                    sources=self._fmt_evidence(proj.get("evidence"), proj.get("name", "project"), proj["id"]),
                    confidence="HIGH" if proj.get("confidence") == "high" else "MEDIUM",
                )

        if classification["intent"] == "portfolio_system":
            proj = self.project_by_id("portfolio-digital-twin")
            if proj:
                return FastAnswer(
                    answer=self._project_answer(proj),
                    entity_type="portfolio_system",
                    entity_id="portfolio-digital-twin",
                    claims=self.claims_for("portfolio-digital-twin"),
                    sources=self._fmt_evidence(proj.get("evidence"), "architecture", proj["id"]),
                    confidence="HIGH",
                )

        if classification["intent"] in {"unknown_job", "unknown_metric"}:
            return FastAnswer(
                answer="I don't have enough verified information in Nabil's portfolio knowledge base to answer that accurately.",
                entity_type=classification.get("entity_type"),
                entity_id=classification.get("entity_id"),
                claims=[],
                sources=[],
                confidence="NONE",
                grounded=False,
            )

        return None

    def _project_answer(self, proj: Dict[str, Any]) -> str:
        techs = ", ".join(proj.get("technologies") or [])
        gh = proj.get("github") or "Not documented as a dedicated repository in this knowledge base"
        demo = proj.get("demo") or "Not documented"
        return (
            f"{proj.get('name')} — {proj.get('one_line')}\n"
            f"Status: {proj.get('status')} (claim: {proj.get('claim_status')}, confidence: {proj.get('confidence')})\n"
            f"Problem: {proj.get('problem')}\n"
            f"Architecture: {proj.get('architecture')}\n"
            f"Nabil's contribution: {proj.get('nabil_contribution')}\n"
            f"Technologies: {techs}\n"
            f"Limitations: {proj.get('limitations')}\n"
            f"GitHub: {gh}\nDemo: {demo}"
        )

    def cli_skills_text(self) -> str:
        built = [s for s in self.skills if s.get("status") in {"BUILT", "VERIFIED"}]
        learning = [s for s in self.skills if s.get("status") in {"LEARNING", "EXPERIMENTAL", "UNVERIFIED"}]
        def line(items):
            return ", ".join(f"{s['name']} [{s['level']}]" for s in items)
        return (
            "Built / demonstrated:\n• " + line(built) +
            "\n\nExperimental / learning / unverified:\n• " + line(learning)
        )

    def cli_projects_text(self) -> List[Dict[str, str]]:
        return [
            {
                "name": p.get("name", ""),
                "blurb": p.get("one_line", ""),
                "status": p.get("status", ""),
            }
            for p in self.projects
            if p.get("id") != "portfolio-digital-twin"
        ]

    def export_public_dict(self) -> Dict[str, Any]:
        return {
            "person": self.person,
            "education": self.education,
            "experience": self.experience,
            "projects": self.projects,
            "skills": self.skills,
            "claims": self.claims,
            "benchmarks": self.benchmarks,
            "philosophy": self.philosophy,
            "aspirations": self.aspirations,
        }


_STORE: Optional[KnowledgeStore] = None


def get_store() -> KnowledgeStore:
    global _STORE
    if _STORE is None:
        _STORE = KnowledgeStore()
    return _STORE
