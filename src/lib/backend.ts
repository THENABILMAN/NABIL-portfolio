import type { NextRequest } from "next/server";

/** Read per call: Vercel injects the binding at runtime, not during builds. */
export function backendUrl(path: string): string {
  const base = (process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
  return `${base}${path}`;
}

/** Without this, the backend rate-limits every visitor as a single client. */
export function clientIpHeaders(req: NextRequest): Record<string, string> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim();
  return ip ? { "X-Forwarded-For": ip } : {};
}
