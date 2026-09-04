import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

/** Called by the admin panel after any content change. Verifies the admin JWT against the API, then purges the cached site data. */
export async function POST(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return NextResponse.json({ ok: false }, { status: 401 });
  const check = await fetch(`${API_URL}/api/auth/me`, { headers: { authorization: auth }, cache: "no-store" }).catch(() => null);
  if (!check?.ok) return NextResponse.json({ ok: false }, { status: 401 });
  revalidateTag("content", "max");
  return NextResponse.json({ ok: true });
}
