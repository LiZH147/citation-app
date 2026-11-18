import { NextResponse } from "next/server";

const CREEM_API_BASE = "https://api.creem.io/v1";

function serverNotConfigured() {
  return NextResponse.json(
    {
      error: "server_not_configured",
      message:
        "License validation is not configured on the server yet. The site owner needs to set CREEM_API_KEY in the deployment environment variables.",
    },
    { status: 500 }
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) return serverNotConfigured();

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
    res = await fetch(`${CREEM_API_BASE}/licenses/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ key, instance_id: instanceId }),
    });
  } catch {
    return NextResponse.json(
      {
        error: "upstream_error",
        message: "Could not reach the license server. Please try again.",
      },
      { status: 502 }
    );
  }

  // Drain the body so the connection can be reused; the payload itself
  // carries no fields this route needs beyond the status code.
  await res.json().catch(() => ({}));

  if (res.ok) return NextResponse.json({ valid: true });
  if (res.status === 404) {
    return NextResponse.json({ valid: false, reason: "invalid" });
  }
  if (res.status === 410) {
    return NextResponse.json({ valid: false, reason: "revoked_or_expired" });
  }
  if (res.status === 401) return serverNotConfigured();
  return NextResponse.json(
    {
      error: "upstream_error",
      message: "License validation failed. Please try again later.",
    },
    { status: 502 }
  );
}
