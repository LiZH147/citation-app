"use client";
import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";
import { initCSL, convertCitation, convertAndExport, detectInputFormat, citeFromCSLJSON, type ExportFormat, type InputFormat } from "@/app/lib/converter";
import { lookupDOI } from "@/app/lib/doi-lookup";
import type { Translations } from "@/app/lib/translations";

type OutputFormat = "gb7714" | "apa";
type ViewFormat = OutputFormat | "bibtex";

interface Props { t: Translations; }

// ─── localStorage 历史记录 ───────────────────────────

interface HistoryItem { input: string; output: string; format: OutputFormat; ts: number; label: string; }

function loadHistory(): HistoryItem[] {
  try { return JSON.parse(localStorage.getItem("convertgb_history") || "[]"); }
  catch { return []; }
}
function saveHistory(items: HistoryItem[]) {
  try { localStorage.setItem("convertgb_history", JSON.stringify(items.slice(0, 20))); }
  catch { /* quota exceeded */ }
}

// ─── 组件 ──────────────────────────────────────────────

export default function Converter({ t }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(placeholder(t.outputPlaceholder));
  const [outFormat, setOutFormat] = useState<OutputFormat>("gb7714");
  const [viewFormat, setViewFormat] = useState<ViewFormat>("gb7714");
  const [viewOutput, setViewOutput] = useState(placeholder(t.outputPlaceholder));
  const [isReady, setIsReady] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasRegistered = useRef(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const outputCache = useRef<Map<string, string>>(new Map());

  // DOI 查找
  const [doiInput, setDoiInput] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);

  // 格式检测
  const [detectedFormat, setDetectedFormat] = useState<InputFormat>("unknown");

  // 手动录入
  const [showForm, setShowForm] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 初始化 CSL
  useEffect(() => {
    if (hasRegistered.current) return;
    initCSL().then((ok) => { if (ok) hasRegistered.current = true; setIsReady(true); }).catch(() => setIsReady(true));
  }, []);

  // 加载历史
  useEffect(() => { setHistory(loadHistory()); }, []);

  // 实时格式检测
  useEffect(() => {
    setDetectedFormat(detectInputFormat(input));
  }, [input]);

  // 转换
  useEffect(() => {
    if (!input.trim()) {
      setOutput(placeholder(t.outputPlaceholder));
      setError(null);
      return;
    }
    const cacheKey = `${input}||${outFormat}`;
    const cached = outputCache.current.get(cacheKey);
    if (cached) { setOutput(cached); setError(null); return; }

    const timer = setTimeout(() => {
      setIsConverting(true);
      setError(null);
      try {
        const result = convertCitation(input, outFormat);
        setOutput(result);
        outputCache.current.set(cacheKey, result);
        if (outputCache.current.size > 50) {
          const keys = outputCache.current.keys();
          outputCache.current.delete(keys.next().value!);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "";
        if (!input.trim()) setError(t.errorEmpty);
        else if (msg.includes("无法解析") || msg.includes("parse")) setError(t.errorParse);
        else setError(msg || t.errorParse);
      } finally {
        setIsConverting(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [input, outFormat, t]);

  // 视图格式输出（格式对照标签）
  useEffect(() => {
    if (!input.trim()) {
      setViewOutput(placeholder(t.outputPlaceholder));
      return;
    }
    if (viewFormat === outFormat) {
      setViewOutput(output);
      return;
    }
    setIsConverting(true);
    try {
      const fmt = viewFormat as "gb7714" | "apa";
      if (viewFormat === "bibtex") {
        try {
          const bibtex = convertAndExport(input, "bibtex");
          setViewOutput(`<pre class="font-mono text-xs whitespace-pre-wrap text-slate-700">${escapeHtml(bibtex)}</pre>`);
        } catch {
          setViewOutput(placeholder(t.outputPlaceholder));
        }
      } else {
        const result = convertCitation(input, fmt);
        setViewOutput(result);
      }
    } catch {
      setViewOutput(placeholder(t.outputPlaceholder));
    } finally {
      setIsConverting(false);
    }
  }, [input, viewFormat, outFormat, output, t.outputPlaceholder]);

  const hasResult = !!viewOutput && !viewOutput.includes("italic");

  // 复制
  const copyResult = useCallback(async () => {
    if (!viewOutput) return;
    try {
      const temp = document.createElement("div");
      temp.style.cssText = "position:fixed;left:-9999px;top:-9999px";
      temp.innerHTML = viewOutput;
      document.body.appendChild(temp);
      const text = temp.innerText || temp.textContent || "";
      document.body.removeChild(temp);
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.cssText = "position:fixed;left:-9999px;top:-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (input.trim() && hasResult) {
        const label = input.trim().slice(0, 120);
        const newItem: HistoryItem = { input: input.trim(), output: viewOutput, format: outFormat, ts: Date.now(), label };
        const updated = [newItem, ...history.filter(h => h.input !== input.trim())].slice(0, 20);
        setHistory(updated);
        saveHistory(updated);
      }
    } catch { alert("Copy failed."); }
  }, [viewOutput, input, hasResult, outFormat, history]);

  // 下载
  const download = useCallback((fmt: ExportFormat) => {
    try {
      const text = convertAndExport(input.trim(), fmt);
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const extMap: Record<ExportFormat, string> = { bibtex: "bib", ris: "ris", txt: "txt" };
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `citation.${extMap[fmt]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch { setError(t.errorParse); }
  }, [input, t]);

  // DOI 查找
  const doLookup = useCallback(async () => {
    if (!doiInput.trim()) return;
    setIsLookingUp(true);
    setError(null);
    try {
      const { cslItems, sourceName } = await lookupDOI(doiInput.trim());
      const result = citeFromCSLJSON(cslItems, outFormat);
      setOutput(result);
      setInput(`# ${sourceName}\n# DOI: ${doiInput.trim()}\n${JSON.stringify(cslItems[0], null, 2)}`);
      setError(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.includes("not found") || msg.includes("404")) setError(t.errorDoi);
      else if (msg.includes("fetch") || msg.includes("Network")) setError(t.errorNetwork);
      else setError(msg || t.errorDoi);
    } finally { setIsLookingUp(false); }
  }, [doiInput, outFormat, t]);

  // 清空
  const clearAll = useCallback(() => {
    setInput(""); setDoiInput(""); setOutput(placeholder(t.outputPlaceholder)); setError(null); outputCache.current.clear();
  }, [t.outputPlaceholder]);

  // 手动录入表单
  const [form, setForm] = useState<Record<string,string>>({ author: "", title: "", journal: "", year: "", volume: "", issue: "", pages: "" });
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    const item: Record<string, unknown> = {
      id: `manual-${Date.now()}`,
      type: form.journal.toLowerCase().includes("conf") || form.journal.toLowerCase().includes("proc") ? "paper-conference" : "article-journal",
      title: form.title,
      author: parseAuthorString(form.author),
      "container-title": form.journal || undefined,
      issued: form.year ? { "date-parts": [[parseInt(form.year)]] } : undefined,
      volume: form.volume || undefined,
      issue: form.issue || undefined,
      page: form.pages || undefined,
    };
    for (const k of Object.keys(item)) if (item[k] === undefined) delete item[k];
    try {
      const html = citeFromCSLJSON([item], outFormat);
      setOutput(html);
      const bibtex = `@${item.type}{${item.id},\n  author = {${(item.author as {family:string;given:string}[])?.map(a => `${a.family}, ${a.given}`).join(" and ")}},\n  title = {${item.title}},\n  ${form.journal ? `journal = {${form.journal}},\n  ` : ""}${form.year ? `year = {${form.year}},\n  ` : ""}}`;
      setInput(bibtex);
      setShowForm(false);
      setError(null);
    } catch { setError(t.errorParse); }
  };

  const formatBadge = (fmt: InputFormat): string => {
    const map: Record<InputFormat, string> = {
      bibtex: t.inputFormatBibtex, apa: t.inputFormatApa, doi: t.inputFormatDoi, url: t.inputFormatDoi, unknown: t.inputFormatUnknown,
    };
    return map[fmt] || map.unknown;
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
    if (item.format !== outFormat) setOutFormat(item.format);
    setError(null);
  };

  return (
    <section id="converter" className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* ── 顶部工具栏 ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-800">{t.converterTitle}</h2>
            <span className="hidden sm:block text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500">{t.converterSubtitle}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label htmlFor="fmt-select" className="text-sm text-slate-600">{t.outputFormat}</label>
            <select
              id="fmt-select"
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={outFormat}
              onChange={(e) => setOutFormat(e.target.value as OutputFormat)}
            >
              <option value="gb7714">{t.gbt7714Label}</option>
              <option value="apa">{t.apaLabel}</option>
            </select>
            <button onClick={() => setShowForm(true)} className="text-xs px-2 py-1.5 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors">{t.manualEntryBtn}</button>
            <button onClick={clearAll} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">{t.clearBtn}</button>
          </div>
        </div>

        {/* ── DOI 查找栏 ── */}
        <div className="px-4 md:px-6 pt-4 flex gap-2">
          <input
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder={t.doiPlaceholder}
            value={doiInput}
            onChange={(e) => setDoiInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doLookup()}
          />
          <button
            onClick={doLookup}
            disabled={isLookingUp || !doiInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors flex items-center gap-1.5"
          >
            {isLookingUp && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
            {isLookingUp ? t.doiLooking : t.doiLookupBtn}
          </button>
        </div>

        {/* ── 输入 / 输出 ── */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* 输入 */}
          <div className="relative">
            {/* 格式徽章 */}
            {input.trim() && (
              <div className="absolute top-2 right-3 z-10">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  detectedFormat === "bibtex" ? "bg-purple-100 text-purple-700" :
                  detectedFormat === "apa" ? "bg-green-100 text-green-700" :
                  detectedFormat === "doi" || detectedFormat === "url" ? "bg-amber-100 text-amber-700" :
                  "bg-slate-100 text-slate-500"
                }`}>{formatBadge(detectedFormat)}</span>
              </div>
            )}
            <textarea
              className="w-full h-72 md:h-96 p-5 font-mono text-sm border-0 bg-slate-50/30 focus:bg-white focus:ring-0 outline-none resize-y placeholder:text-slate-400 transition-colors"
              placeholder={t.inputPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Input citations" spellCheck={false}
            />
          </div>

          {/* 输出 */}
          <div className="relative bg-blue-50/20">
            {/* 格式标签 */}
            {input.trim() && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1">
                <span className="text-[10px] text-slate-400 mr-1">{t.viewFormatTabs}</span>
                {(["gb7714", "apa", "bibtex"] as ViewFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setViewFormat(fmt)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      viewFormat === fmt
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {fmt === "gb7714" ? t.viewFormatGB : fmt === "apa" ? t.viewFormatAPA : t.viewFormatBibtex}
                  </button>
                ))}
              </div>
            )}
            <div
              ref={outputRef}
              className="w-full h-72 md:h-96 p-5 pt-12 overflow-y-auto prose prose-sm prose-blue max-w-none"
              aria-live="polite" aria-label="Conversion result"
              dangerouslySetInnerHTML={{ __html: viewOutput }}
            />
            {isConverting && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  {t.converting}
                </div>
              </div>
            )}
            {/* 操作按钮组 */}
            {hasResult && !isConverting && (
              <div className="absolute top-3 right-3 flex gap-1.5">
                <button onClick={copyResult} className="bg-white shadow-md hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 border border-slate-200 transition-all active:scale-95">{copied ? t.copiedBtn : t.copyBtn}</button>
                <DropdownButton t={t} onDownload={download} />
              </div>
            )}
          </div>
        </div>

        {/* ── 错误 ── */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-700 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {/* ── 历史记录 ── */}
        {history.length > 0 && (
          <div className="px-4 md:px-6 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-700">{t.recentTitle}</h3>
              <button
                onClick={() => { setHistory([]); saveHistory([]); }}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors"
              >{t.recentClearBtn}</button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {history.slice(0, 10).map((item, i) => (
                <button
                  key={i}
                  onClick={() => loadHistoryItem(item)}
                  className="flex-shrink-0 max-w-[200px] text-left px-3 py-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-xs text-slate-600 truncate transition-colors"
                  title={item.label}
                >
                  <span className="font-mono text-[10px] text-slate-400 block">{item.format === "gb7714" ? "GB/T 7714" : "APA"}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 手动录入 Modal ── */}
      {showForm && <ManualFormOverlay t={t} form={form} setForm={setForm} onSubmit={submitForm} onClose={() => setShowForm(false)} />}
    </section>
  );
}

// ─── 子组件 ──────────────────────────────────────────────

function placeholder(text: string): string {
  return `<p class="text-slate-400 italic text-sm">${text}</p>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** 下载下拉 */
function DropdownButton({ t, onDownload }: { t: Translations; onDownload: (fmt: ExportFormat) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="bg-white shadow-md hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 transition-all active:scale-95 flex items-center gap-1">
        ⬇ <span className="hidden sm:inline">Download</span> ▾
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 w-36">
          <button onClick={() => { onDownload("bibtex"); setOpen(false); }} className="block w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 transition-colors">{t.downloadBib}</button>
          <button onClick={() => { onDownload("ris"); setOpen(false); }} className="block w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 transition-colors">{t.downloadRis}</button>
          <button onClick={() => { onDownload("txt"); setOpen(false); }} className="block w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 transition-colors">{t.downloadTxt}</button>
        </div>
      )}
    </div>
  );
}

/** 手动录入 Modal */
function ManualFormOverlay({ t, form, setForm, onSubmit, onClose }: {
  t: Translations; form: Record<string,string>; setForm: React.Dispatch<React.SetStateAction<Record<string,string>>>; onSubmit: (e: FormEvent) => void; onClose: () => void;
}) {
  const set = (k: string) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-slate-800 mb-4">{t.formTitle}</h3>
        <div className="space-y-3">
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t.formAuthor} value={form.author} onChange={set("author")} />
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t.formTitleField} value={form.title} onChange={set("title")} required />
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t.formJournal} value={form.journal} onChange={set("journal")} />
          <div className="grid grid-cols-4 gap-2">
            <input className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t.formYear} value={form.year} onChange={set("year")} />
            <input className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t.formVolume} value={form.volume} onChange={set("volume")} />
            <input className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t.formIssue} value={form.issue} onChange={set("issue")} />
            <input className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t.formPages} value={form.pages} onChange={set("pages")} />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button type="submit" className="flex-1 bg-blue-600 text-white font-bold rounded-xl py-2.5 text-sm hover:bg-blue-700 transition-colors">{t.formGenerate}</button>
          <button type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-600 font-bold rounded-xl py-2.5 text-sm hover:bg-slate-200 transition-colors">{t.formCancel}</button>
        </div>
      </form>
    </div>
  );
}

function parseAuthorString(s: string): { family: string; given: string }[] {
  if (!s.trim()) return [];
  return s.split(/[,;&]| and |\s+&\s+/i).map((a) => a.trim()).filter(Boolean).map((name) => {
    const parts = name.split(/\s+/);
    if (parts.length === 1) return { family: parts[0], given: "" };
    const family = parts.pop()!;
    const given = parts.join(" ");
    return { family, given };
  });
}