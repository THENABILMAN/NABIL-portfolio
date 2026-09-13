import type { ChatTurn, TwinClaim, TwinResponse, TwinSource } from "@/types/portfolio";

const EMPTY: TwinResponse = {
  answer:
    "I don't have enough verified information in Nabil's portfolio knowledge base to answer that accurately.",
  grounded: false,
  confidence: "NONE",
  sources: [],
  claims: [],
  entity: null,
  model: "frontend-guard",
};

function asSources(value: unknown): TwinSource[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is TwinSource => {
    if (!item || typeof item !== "object") return false;
    const row = item as TwinSource;
    return Boolean(row.source_id || row.source_type || row.source || row.title || row.url);
  });
}

function asClaims(value: unknown): TwinClaim[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is TwinClaim => Boolean(item && typeof item === "object"));
}

export function parseTwinResponse(data: unknown): TwinResponse {
  if (!data || typeof data !== "object") return EMPTY;
  const row = data as Record<string, unknown>;
  const answer = typeof row.answer === "string" ? row.answer.trim() : "";
  if (!answer) return EMPTY;

  const grounded = row.grounded === true;
  const sources = grounded ? asSources(row.sources) : [];

  return {
    answer,
    grounded,
    confidence: typeof row.confidence === "string" ? row.confidence : grounded ? "MEDIUM" : "NONE",
    sources,
    claims: asClaims(row.claims),
    entity:
      row.entity && typeof row.entity === "object"
        ? (row.entity as TwinResponse["entity"])
        : null,
    model: typeof row.model === "string" ? row.model : "unknown",
  };
}

export async function askDigitalTwin(
  message: string,
  history: ChatTurn[] = []
): Promise<TwinResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history: history.slice(-4) }),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed (${response.status}).`);
  }

  return parseTwinResponse(await response.json());
}

export type TwinStreamHandlers = {
  onMeta?: (meta: Pick<TwinResponse, "grounded" | "confidence" | "entity" | "claims" | "sources" | "model">) => void;
  onToken?: (token: string) => void;
};

export async function streamDigitalTwin(
  message: string,
  handlers: TwinStreamHandlers
): Promise<TwinResponse> {
  const response = await fetch(`/api/chat/stream?query=${encodeURIComponent(message)}`);
  if (!response.ok || !response.body) {
    throw new Error(`Stream failed (${response.status}).`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let answer = "";
  let grounded = false;
  let confidence = "NONE";
  let sources: TwinSource[] = [];
  let claims: TwinClaim[] = [];
  let entity: TwinResponse["entity"] = null;
  let model = "stream";

  const applyEvent = (payload: Record<string, unknown>) => {
    const type = payload.type;
    if (type === "meta") {
      grounded = payload.grounded === true;
      confidence = typeof payload.confidence === "string" ? payload.confidence : confidence;
      claims = asClaims(payload.claims);
      entity =
        payload.entity && typeof payload.entity === "object"
          ? (payload.entity as TwinResponse["entity"])
          : entity;
      handlers.onMeta?.({ grounded, confidence, entity, claims, sources, model });
    }
    if (type === "sources") {
      sources = grounded || Array.isArray(payload.sources) ? asSources(payload.sources) : [];
      if (!grounded) sources = [];
      handlers.onMeta?.({ grounded, confidence, entity, claims, sources, model });
    }
    if (type === "model" && typeof payload.model === "string") {
      model = payload.model;
    }
    if (type === "token" && typeof payload.token === "string") {
      answer += payload.token;
      handlers.onToken?.(payload.token);
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";
    for (const chunk of chunks) {
      const line = chunk.split("\n").find((l) => l.startsWith("data: "));
      if (!line) continue;
      try {
        applyEvent(JSON.parse(line.slice(6)) as Record<string, unknown>);
      } catch {
        // ignore malformed SSE frames
      }
    }
  }

  if (buffer.trim()) {
    const line = buffer.split("\n").find((l) => l.startsWith("data: "));
    if (line) {
      try {
        applyEvent(JSON.parse(line.slice(6)) as Record<string, unknown>);
      } catch {
        // ignore trailing partial frame
      }
    }
  }

  if (!grounded) {
    sources = [];
  }

  return {
    answer: answer.trim() || EMPTY.answer,
    grounded,
    confidence,
    sources: grounded ? sources : [],
    claims,
    entity,
    model,
  };
}

export async function queryDigitalTwin(
  message: string,
  history: ChatTurn[],
  handlers: TwinStreamHandlers = {}
): Promise<TwinResponse> {
  if (history.length === 0) {
    try {
      return await streamDigitalTwin(message, handlers);
    } catch {
      const result = await askDigitalTwin(message, history);
      handlers.onMeta?.(result);
      handlers.onToken?.(result.answer);
      return result;
    }
  }

  const result = await askDigitalTwin(message, history);
  handlers.onMeta?.(result);
  handlers.onToken?.(result.answer);
  return result;
}
