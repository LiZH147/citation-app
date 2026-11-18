/**
 * Citation Converter Pro — license key handling (client side).
 *
 * A buyer gets a license key from Creem after checkout (order
 * confirmation page and email receipt). Activation is verified
 * server-side through /api/license/activate, which talks to Creem
 * with the server-only CREEM_API_KEY. The browser only ever stores
 * the key and the instance_id Creem returns.
 *
 * Storage key: "convertgb_pro_license" in localStorage.
 */

export interface StoredLicense {
  key: string;
  instance_id: string;
}

const STORAGE_KEY = "convertgb_pro_license";

export function loadStoredLicense(): StoredLicense | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredLicense>;
    if (typeof parsed.key !== "string" || typeof parsed.instance_id !== "string") return null;
    return { key: parsed.key, instance_id: parsed.instance_id };
  } catch {
    return null;
  }
}

export function saveStoredLicense(license: StoredLicense): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(license));
  } catch {
    // storage unavailable (private mode, quota) — Pro just won't persist
  }
}

export function clearStoredLicense(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Show only the first/last 4 characters of a key in the UI. */
export function maskKey(key: string): string {
  const clean = key.trim();
  if (clean.length <= 8) return "••••••••";
  return `${clean.slice(0, 4)}••••${clean.slice(-4)}`;
}

function newInstanceName(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    // fall through to the fallback below
  }
  return `browser-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: string; message: string };

async function postJson<T>(url: string, body: unknown): Promise<ApiResult<T>> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, code: "network_error", message: "Network request failed." };
  }
  let data: Record<string, unknown> = {};
  try {
    data = (await res.json()) as Record<string, unknown>;
  } catch {
    // non-JSON response — treat by status below
  }
  if (res.ok) return { ok: true, data: data as T };
  const code = typeof data.error === "string" ? data.error : "unknown_error";
  const message =
    typeof data.message === "string" && data.message
      ? data.message
      : `Request failed (HTTP ${res.status}).`;
  return { ok: false, code, message };
}

/**
 * Activate a license key for this browser. Generates a fresh
 * per-browser instance name (crypto.randomUUID) so each browser
 * uses one activation slot, then stores the instance_id Creem
 * returns alongside the key.
 */
export async function activateLicense(
  key: string
): Promise<ApiResult<StoredLicense>> {
  const result = await postJson<{ instance_id?: string }>(
    "/api/license/activate",
    { key: key.trim(), instance_name: newInstanceName() }
  );
  if (!result.ok) return result;
  const instanceId =
    typeof result.data.instance_id === "string" ? result.data.instance_id : "";
  if (!instanceId) {
    return {
      ok: false,
      code: "upstream_error",
      message: "License server returned an unexpected response.",
    };
  }
  return { ok: true, data: { key: key.trim(), instance_id: instanceId } };
}

export interface ValidateOutcome {
  valid: boolean;
  reason?: string;
}

/** Check a stored license against Creem. Returns valid:false when the
 *  key was revoked/expired or is no longer recognised. */
export async function validateStoredLicense(
  license: StoredLicense
): Promise<ApiResult<ValidateOutcome>> {
  const result = await postJson<{ valid?: boolean; reason?: string }>(
    "/api/license/validate",
    { key: license.key, instance_id: license.instance_id }
  );
  if (!result.ok) return result;
  return {
    ok: true,
    data: {
      valid: result.data.valid === true,
      reason:
        typeof result.data.reason === "string" ? result.data.reason : undefined,
    },
  };
}

/** Free this browser's activation slot on Creem. Best effort — a
 *  failure here must not block removing the license locally. */
export async function deactivateStoredLicense(
  license: StoredLicense
): Promise<void> {
  await postJson("/api/license/deactivate", {
    key: license.key,
    instance_id: license.instance_id,
  });
}
