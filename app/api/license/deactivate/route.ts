import { NextResponse } from "next/server";

const CREEM_API_BASE = "https://api.creem.io/v1";

/** Frees one activation slot for a license key. Called when a user
 *  removes their license from a browser. Best effort: the client
 *  clears the local license even if this call fails. */
export async function POST(req: Request) {
  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "server_not_configured",
        message:
          "License deactivation is not configured on the server yet. The site owner needs to set CREEM_API_KEY in the deployment environment variables.",
      },
      { status: 500 }
    );
  }

  let body: { key?: unknown; instance_id?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { error: "invalid_request", message: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const key = typeof body.key === "string" ? body.key.trim() : "";
  const instanceId =
    typeof body.instance_id === "string" ? body.instance_id.trim() : "";
  if (!key || !instanceId) {
    return NextResponse.json(
      {
        error: "missing_fields",
        message: "A license key and instance id are required.",
      },
      { status: 400 }
    );
  }

  let res: Response;
  try {
    res = await fetch(`${CREEM_API_BASE}/licenses/deactivate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ key, instance_id: instanceId }),
    });
  } catch {
    return NextResponse.json(
      {
        error: "upstream_error",
        message: "Could not reach the license server.",
      },
      { status: 502 }
    );
  }

  await res.json().catch(() => ({}));

  if (res.ok) return NextResponse.json({ ok: true });
  // 409: the instance is already deactivated — the desired end state.
  if (res.status === 409) return NextResponse.json({ ok: true });
  if (res.status === 404) {
    return NextResponse.json({ ok: false, error: "invalid" });
  }
  if (res.status === 401) {
    return NextResponse.json(
      { ok: false, error: "server_not_configured" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { ok: false, error: "upstream_error" },
    { status: 502 }
  );
}
