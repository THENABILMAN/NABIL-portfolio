import { NextRequest } from "next/server";
import { backendUrl, clientIpHeaders } from "@/lib/backend";

export const maxDuration = 60;

const STREAM_TIMEOUT_MS = 55_000;

function jsonError(error: string, status: number) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")?.trim() ?? "";
  if (!query) return jsonError("Query cannot be empty.", 400);

  try {
    const backend = await fetch(backendUrl(`/api/chat/stream?query=${encodeURIComponent(query)}`), {
      headers: { Accept: "text/event-stream", ...clientIpHeaders(req) },
      cache: "no-store",
      signal: AbortSignal.timeout(STREAM_TIMEOUT_MS),
    });

    if (!backend.ok || !backend.body) {
      return jsonError("Stream unavailable.", backend.status || 502);
    }

    return new Response(backend.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return jsonError("Backend stream unreachable.", 502);
  }
}
