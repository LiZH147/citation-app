import { NextResponse } from "next/server";

const CREEM_API_BASE = "https://api.creem.io/v1";

/** CREEM_API_KEY must be set in the deployment environment variables
 *  (Vercel dashboard → project → Settings → Environment Variables,
 *  Production). The key never leaves the server. */
function serverNotConfigured() {
  return NextResponse.json(
    {
      error: "server_not_configured",
      message:
        "License activation is not configured on the server yet. The site owner needs to set CREEM_API_KEY in the deployment environment variables.",
    },
    { status: 500 }
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) return serverNotConfigured();

  let body: { key?: unknown; instance_name?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { error: "invalid_request", message: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const key = typeof body.key === "string" ? body.key.trim() : "";
  const instanceName =
    typeof body.instance_name === "string" && body.instance_name.trim()
      ? body.instance_name.trim()
      : "browser";
  if (!key) {
    return NextResponse.json(
      { error: "missing_key", message: "A license key is required." },
      { status: 400 }
    );
  }

  let res: Response;
  try {
    res = await fetch(`${CREEM_API_BASE}/licenses/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ key, instance_name: instanceName }),
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

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (res.ok) {
    // Creem returns the new instance id; accept the documented field
    // and fall back to a nested/wrapped shape if present.
    const nested =
      data.data && typeof data.data === "object"
        ? (data.data as Record<string, unknown>)
        : {};
    const instanceId =
      (typeof data.instance_id === "string" && data.instance_id) ||
      (typeof nested.instance_id === "string" && nested.instance_id) ||
      (typeof data.id === "string" && data.id) ||
      "";
    if (!instanceId) {
      return NextResponse.json(
        {
          error: "upstream_error",
          message: "License server returned an unexpected response.",
        },
        { status: 502 }
      );
    }
    return NextResponse.json({ instance_id: instanceId });
  }

  if (res.status === 404) {
    return NextResponse.json(
      {
        error: "invalid_key",
        message:
          "This license key is invalid. Check the key on your order confirmation page or email receipt and try again.",
      },
      { status: 400 }
    );
  }
  if (res.status === 403) {
    return NextResponse.json(
      {
        error: "activation_limit",
        message:
          "This license key has reached its activation limit. Remove it from another device first, or contact support.",
      },
      { status: 403 }
    );
  }
  if (res.status === 401) return serverNotConfigured();
  return NextResponse.json(
    {
      error: "upstream_error",
      message: "License activation failed. Please try again later.",
    },
    { status: 502 }
  );
}
