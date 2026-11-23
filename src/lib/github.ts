import { personalInfo } from "@/lib/canonical";

/** Live public repository count, refreshed daily. Null when GitHub cannot be reached, so nothing is shown. */
export async function getPublicRepoCount(): Promise<number | null> {
  try {
    const user = personalInfo.github.split("/").pop();
    const res = await fetch(`https://api.github.com/users/${user}`, {
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const { public_repos } = await res.json();
    return typeof public_repos === "number" ? public_repos : null;
  } catch {
    return null;
  }
}
