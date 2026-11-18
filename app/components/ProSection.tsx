"use client";
import { useState, type FormEvent } from "react";
import type { Translations } from "@/app/lib/translations";
import { maskKey } from "@/app/lib/license";

export type ProStatus =
  | "unknown"
  | "inactive"
  | "active"
  | "invalid"
  | "expired"
  | "error";

/** Creem checkout (payment) links for the two live products. */
export const CREEM_MONTHLY_URL =
  "https://www.creem.io/product/prod_2Nn0E8ajpeX5UnHLAI539K";
export const CREEM_LIFETIME_URL =
  "https://www.creem.io/product/prod_1wpHd5s918GpvwFc2uXA1m";

interface Props {
  t: Translations;
  status: ProStatus;
  licenseKey: string | null;
  onActivate: (
    key: string
  ) => Promise<{ ok: boolean; code?: string; message: string }>;
  onRemove: () => void;
}

function errorMessage(t: Translations, code?: string): string {
  switch (code) {
    case "invalid_key":
      return t.proErrorInvalidKey;
    case "activation_limit":
      return t.proErrorLimit;
    case "server_not_configured":
      return t.proErrorServer;
    case "network_error":
      return t.proErrorNetwork;
    default:
      return t.proErrorUnknown;
  }
}

export default function ProSection({ t, status, licenseKey, onActivate, onRemove }: Props) {
  const [keyInput, setKeyInput] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [notice, setNotice] = useState<{ kind: "error" | "info"; text: string } | null>(null);
  const isPro = status === "active" || status === "error";

  const submitActivate = async (e: FormEvent) => {
    e.preventDefault();
    const key = keyInput.trim();
    if (!key || isActivating) return;
    setIsActivating(true);
    setNotice(null);
    try {
      const result = await onActivate(key);
      if (result.ok) {
        setKeyInput("");
        setNotice(null);
      } else {
        setNotice({ kind: "error", text: errorMessage(t, result.code) });
      }
    } catch {
      setNotice({ kind: "error", text: t.proErrorNetwork });
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div id="pro-section" className="max-w-6xl mx-auto px-4 pb-8 md:pb-12">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">{t.proTitle}</h2>
          <p className="text-sm text-slate-500 mt-1">{t.proSubtitle}</p>
          <p className="text-xs text-slate-400 mt-1">
            {isPro ? t.proCurrentPro : t.proCurrentFree}
          </p>
        </div>

        <div className="p-4 md:p-6">
          {isPro ? (
            /* ── Pro 已激活 ── */
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-green-800">{t.proActiveTitle}</p>
                  <p className="text-sm text-green-700 mt-0.5">{t.proActiveDesc}</p>
                  {licenseKey && (
                    <p className="text-xs text-green-600 font-mono mt-1">
                      {maskKey(licenseKey)}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-xs text-amber-700 mt-1">{t.proVerifyErrorMsg}</p>
                  )}
                </div>
                <button
                  onClick={onRemove}
                  className="text-xs px-3 py-1.5 border border-green-300 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                >
                  {t.proRemoveBtn}
                </button>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-green-800">
                <li>✓ {t.proFeature2}</li>
                <li>✓ {t.proFeature3}</li>
              </ul>
            </div>
          ) : (
            /* ── 免费 / Pro 对照 + 购买 + 激活 ── */
            <>
              {(status === "invalid" || status === "expired") && (
                <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {status === "expired" ? t.proExpiredMsg : t.proInvalidMsg}
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-3">
                {/* 免费版 */}
                <div className="rounded-xl border border-slate-200 p-4 flex flex-col">
                  <p className="font-bold text-slate-800">{t.proFreeName}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{t.proFreePrice}</p>
                  <p className="text-xs text-slate-400 mt-1">{t.proFreeNote}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                    <li>✓ {t.proFreeFeature1}</li>
                    <li>✓ {t.proFreeFeature2}</li>
                    <li>✓ {t.proFreeFeature3}</li>
                  </ul>
                </div>
                {/* Pro 按月 */}
                <div className="rounded-xl border-2 border-blue-600 p-4 bg-blue-50/40 flex flex-col">
                  <p className="font-bold text-slate-800">{t.proMonthlyName}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{t.proMonthlyPrice}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.proMonthlyNote}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                    <li>✓ {t.proFeature1}</li>
                    <li>✓ {t.proFeature2}</li>
                    <li>✓ {t.proFeature3}</li>
                  </ul>
                  <div className="mt-auto pt-4">
                    <a
                      href={CREEM_MONTHLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-blue-600 text-white text-sm font-bold rounded-lg px-3 py-2 hover:bg-blue-700 transition-colors"
                    >
                      {t.proMonthlyBtn}
                    </a>
                  </div>
                </div>
                {/* Pro 买断 */}
                <div className="rounded-xl border border-slate-200 p-4 flex flex-col">
                  <p className="font-bold text-slate-800">{t.proLifetimeName}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{t.proLifetimePrice}</p>
                  <p className="text-xs text-slate-400 mt-1">{t.proLifetimeNote}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                    <li>✓ {t.proFeature1}</li>
                    <li>✓ {t.proFeature2}</li>
                    <li>✓ {t.proFeature3}</li>
                  </ul>
                  <div className="mt-auto pt-4">
                    <a
                      href={CREEM_LIFETIME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-white text-blue-700 text-sm font-bold rounded-lg px-3 py-2 border border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {t.proLifetimeBtn}
                    </a>
                  </div>
                </div>
              </div>

              {/* 激活码 */}
              <form onSubmit={submitActivate} className="mt-5">
                <label
                  htmlFor="pro-key"
                  className="block text-sm font-bold text-slate-700 mb-2"
                >
                  {t.proActivateTitle}
                </label>
                <div className="flex gap-2">
                  <input
                    id="pro-key"
                    className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder={t.proKeyPlaceholder}
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="submit"
                    disabled={isActivating || !keyInput.trim()}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors"
                  >
                    {isActivating ? t.proActivating : t.proActivateBtn}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">{t.proWhereKey}</p>
                {notice && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-2">
                    {notice.text}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
