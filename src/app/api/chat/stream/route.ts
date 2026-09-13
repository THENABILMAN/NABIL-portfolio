import { NextRequest } from "next/server";

const BACKEND_FASTAPI_URL = process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:8000";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")?.trim() ?? "";
  if (!query) {
    return new Response(JSON.stringify({ error: "Query cannot be empty." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const backend = await fetch(
      `${BACKEND_FASTAPI_URL}/api/chat/stream?query=${encodeURIComponent(query)}`,
      {
        headers: { Accept: "text/event-stream" },
        cache: "no-store",
      }
    );

    if (!backend.ok || !backend.body) {
      return new Response(JSON.stringify({ error: "Stream unavailable." }), {
        status: backend.status || 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(backend.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Backend stream unreachable." }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
