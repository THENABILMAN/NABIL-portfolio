import { NextRequest, NextResponse } from "next/server";
import canonical from "@/data/canonical.json";
import { parseTwinResponse } from "@/lib/api";
import type { TwinResponse } from "@/types/portfolio";

const BACKEND_FASTAPI_URL = process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:8000";

function insufficient(): TwinResponse {
  return {
    answer:
      "I don't have enough verified information in Nabil's portfolio knowledge base to answer that accurately.",
    grounded: false,
    confidence: "NONE",
    sources: [],
    claims: [],
    entity: null,
    model: "frontend-guard",
  };
}

function localFastPath(message: string): TwinResponse | null {
  const q = message.trim().toLowerCase().replace(/[?!.,]/g, "");
  const person = canonical.person;
  if (/^(hi|hello|hey|who are you|who is nabil|about nabil)$/i.test(q)) {
    return {
      answer: `${person.agent_identity}\n\n${person.name} (${person.brand}) — ${person.headline}. ${person.summary}`,
      grounded: true,
      confidence: "HIGH",
      sources: [
        {
          source_id: "person.yaml",
          source_type: "structured_knowledge",
          title: "Canonical identity",
          url: person.github,
          section: "identity",
          relevance: 1,
        },
      ],
      claims: [],
      entity: { type: "person", id: "person-nabil" },
      model: "canonical-fast-path",
    };
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body?.history) ? body.history.slice(-4) : [];

    if (!message) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);
      const fastapiRes = await fetch(`${BACKEND_FASTAPI_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (fastapiRes.ok) {
        return NextResponse.json(parseTwinResponse(await fastapiRes.json()));
      }
    } catch {
      // backend offline — fall through to local identity path
    }

    const local = localFastPath(message);
    if (local) return NextResponse.json(local);

    return NextResponse.json(insufficient());
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
