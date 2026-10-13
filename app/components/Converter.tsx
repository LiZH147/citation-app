"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { initCSL, convertCitation } from "@/app/lib/converter";

type OutputFormat = "gb7714" | "apa";

export default function Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(htmlTextFallback(""));
  const [outFormat, setOutFormat] = useState<OutputFormat>("gb7714");
  const [isReady, setIsReady] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasRegistered = useRef(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // 缓存前端输出 HTML
  const outputCache = useRef<Map<string, string>>(new Map());

  // 初始化 CSL
  useEffect(() => {
    if (hasRegistered.current) return;
    initCSL()
      .then((ok) => {
        if (ok) {
          hasRegistered.current = true;
          setIsReady(true);
        }
      })
      .catch(() => {
        // 即使初始化失败，也允许尝试转换
        setIsReady(true);
      });
  }, []);

  // 防抖转换
  useEffect(() => {
    if (!input.trim()) {
      setOutput(htmlTextFallback(""));
      setError(null);
      return;
    }

    const cacheKey = `${input}||${outFormat}`;
    const cached = outputCache.current.get(cacheKey);
    if (cached) {
      setOutput(cached);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      setIsConverting(true);
      setError(null);
      try {
        const result = convertCitation(input, outFormat);
        setOutput(result);
        outputCache.current.set(cacheKey, result);
        // 限制缓存大小
        if (outputCache.current.size > 50) {
          const keys = outputCache.current.keys();
          outputCache.current.delete(keys.next().value!);
        }
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : "转换失败，请检查输入的引用格式";
        setError(message);
      } finally {
        setIsConverting(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [input, outFormat]);

  // 复制
  const copyResult = useCallback(async () => {
    if (!output) return;
    try {
      const temp = document.createElement("div");
      temp.style.cssText = "position:fixed;left:-9999px;top:-9999px";
      temp.innerHTML = output;
      document.body.appendChild(temp);
      const text = temp.innerText || temp.textContent || "";
      document.body.removeChild(temp);

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // 回退
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.cssText = "position:fixed;left:-9999px;top:-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("复制失败，请手动选择文本复制");
    }
  }, [output]);

  // 清空
  const clearAll = useCallback(() => {
    setInput("");
    setOutput(htmlTextFallback(""));
    setError(null);
    outputCache.current.clear();
  }, []);

  return (
    <section id="converter" className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* 工具栏 */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-800">格式转换</h2>
            <span className="hidden sm:block text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500">
              支持 BibTeX、APA、MLA 格式
            </span>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="fmt-select" className="text-sm text-slate-600">
              输出格式：
            </label>
            <select
              id="fmt-select"
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={outFormat}
              onChange={(e) => setOutFormat(e.target.value as OutputFormat)}
            >
              <option value="gb7714">GB/T 7714-2015（国标）</option>
              <option value="apa">APA（第7版）</option>
            </select>
            <button
              onClick={clearAll}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              title="清空全部"
            >
              清空
            </button>
          </div>
        </div>

        {/* 双栏编辑区 */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* 输入区 */}
          <div className="relative">
            <textarea
              className="w-full h-72 md:h-96 p-5 font-mono text-sm border-0 bg-slate-50/30 focus:bg-white focus:ring-0 outline-none resize-y placeholder:text-slate-400 transition-colors"
              placeholder={`请粘贴 BibTeX 源码或 APA/MLA 格式文本...

示例 BibTeX：
@article{zhang2026,
  author = {张三 and 李四},
  title = {深度学习在自然语言处理中的应用},
  journal = {软件学报},
  year = {2026},
  volume = {37},
  pages = {1-15}
}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="输入参考文献"
              spellCheck={false}
            />
          </div>

          {/* 输出区 */}
          <div className="relative bg-blue-50/20">
            <div
              ref={outputRef}
              className="w-full h-72 md:h-96 p-5 overflow-y-auto prose prose-sm prose-blue max-w-none"
              aria-live="polite"
              aria-label="转换结果"
              dangerouslySetInnerHTML={{ __html: output }}
            />
            {isConverting && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  转换中...
                </div>
              </div>
            )}
            {output && !isConverting && (
              <button
                onClick={copyResult}
                className="absolute top-3 right-3 bg-white shadow-md hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 border border-slate-200 transition-all active:scale-95"
                aria-label={copied ? "已复制" : "复制结果"}
              >
                {copied ? "✓ 已复制" : "复制结果"}
              </button>
            )}
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-700 flex items-center gap-2">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}
      </div>
    </section>
  );
}

/** 占位 HTML */
function htmlTextFallback(text: string): string {
  if (!text) {
    return '<p class="text-slate-400 italic text-sm">转换结果将在此显示...</p>';
  }
  return text;
}