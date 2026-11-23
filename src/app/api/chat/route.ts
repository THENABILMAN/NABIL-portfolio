import { NextRequest, NextResponse } from "next/server";
import canonical from "@/data/canonical.json";
import { backendUrl, clientIpHeaders } from "@/lib/backend";
import { parseTwinResponse } from "@/lib/api";
import type { ChatTurn, TwinResponse } from "@/types/portfolio";

export const maxDuration = 60;

const BACKEND_TIMEOUT_MS = 50_000;
const MAX_MESSAGE_CHARS = 4000;
const MAX_TURN_CHARS = 2000;

function backendUnavailable(): TwinResponse {
  return {
    answer:
      "The digital twin's knowledge service is unavailable right now, so I can't answer that. The rest of this page still has Nabil's projects, experience, and contact details.",
    grounded: false,
    confidence: "NONE",
    sources: [],
    claims: [],
    entity: null,
    model: "frontend-guard",
  };
}

/** Lets the identity questions survive a backend outage. */
function localFastPath(message: string): TwinResponse | null {
  const q = message.trim().toLowerCase().replace(/[?!.,]/g, "");
  const person = canonical.person;
  if (!/^(hi|hello|hey|who are you|who is nabil|about nabil)$/.test(q)) return null;

  return {
    answer: `${person.agent_identity.trim()}\n\n${person.name} (${person.brand}) — ${person.headline}. ${person.summary.trim()}`,
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

function cleanHistory(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (turn): turn is ChatTurn =>
        (turn?.role === "user" || turn?.role === "assistant") && typeof turn?.content === "string"
    )
    .slice(-4)
    .map((turn) => ({ role: turn.role, content: turn.content.slice(0, MAX_TURN_CHARS) }));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  try {
    const res = await fetch(backendUrl("/api/chat"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...clientIpHeaders(req) },
      body: JSON.stringify({ message, history: cleanHistory(body?.history) }),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    if (res.status === 429) {
      return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
    }
    if (res.ok) {
      return NextResponse.json(parseTwinResponse(await res.json()));
    }
  } catch {
    // Backend offline or too slow: fall through to the local answers.
  }

  return NextResponse.json(localFastPath(message) ?? backendUnavailable());
}
