/**
 * 参考文献格式转换核心逻辑
 * 输入：BibTeX / APA 文本 / DOI / arXiv；输出：GB/T 7714-2015 / APA / BibTeX
 * 注意：MLA 输入与输出均未实现，页面文案不得宣称支持。
 */
import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";

let cslInitialized = false;

/** 初始化 CSL 模板和中文语言包（单例） */
export async function initCSL(): Promise<boolean> {
  if (cslInitialized) return true;

  try {
    const [resStyle, resLocale] = await Promise.all([
      fetch("/gb7714.csl"),
      fetch(
        "https://raw.githubusercontent.com/citation-style-language/locales/master/locales-zh-CN.xml"
      ),
    ]);

    const [cslText, localeText] = await Promise.all([
      resStyle.text(),
      resLocale.text(),
    ]);

    const config = plugins.config.get("@csl");
    if (config) {
      config.locales.add("zh-CN", localeText);
      config.templates.add("gb7714", cslText);
      cslInitialized = true;
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/** 解析 APA 文本为 CSL-JSON 条目（启发式） */
export function parseAPA(text: string): Record<string, unknown>[] {
  const entries = text
    .split(/\n{2,}|(?=\r?\n●|\r?\n-\s)/)
    .map((s) => s.trim())
    .filter(Boolean);

  const items: Record<string, unknown>[] = [];

  for (const entry of entries) {
    const m = entry.match(/^(.+?)\s*\(\s*([^)]+)\s*\)\.\s*(.+)$/);
    if (!m) continue;

    let authorsPart = m[1].trim();
    const dateStr = m[2].trim();
    const rest = m[3].trim();

    authorsPart = authorsPart.replace(/(\.{3,}|…|et al\.?)/gi, "");

    let year: number | undefined;
    let month: number | undefined;
    const dateMatch = dateStr.match(
      /(\d{4})(?:\s*,\s*([A-Za-z]+)(?:\s*(\d{1,2}))?)?/
    );
    if (dateMatch) {
      year = parseInt(dateMatch[1], 10);
      if (dateMatch[2]) {
        const months: Record<string, number> = {
          january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
          july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
        };
        month = months[dateMatch[2].toLowerCase()] || undefined;
      }
    }

    let title = "";
    let remainder = rest;
    const firstDot = rest.indexOf(".");
    if (firstDot !== -1) {
      title = rest.slice(0, firstDot).trim();
      remainder = rest.slice(firstDot + 1).trim();
    } else {
      title = rest;
      remainder = "";
    }

    let container = "";
    let pages: string | undefined;
    let itemType = "article-journal";

    if (
      /\bIn\b/i.test(remainder) ||
      /Proceedings|Conference|Symposium|Proceeding/i.test(remainder)
    ) {
      itemType = "paper-conference";
      const inMatch = remainder.match(
        /In\s+([^().,]+(?:[^()]*?))(?:\(|,|$)/i
      );
      container = inMatch ? inMatch[1].trim() : remainder.replace(/^In\s+/i, "").trim();
      const ppMatch =
        remainder.match(/pp\.?\s*([0-9\-–—]+)/i) ||
        remainder.match(/\((?:pp\.?\s*)?([0-9\-–—]+)\)/i);
      if (ppMatch) pages = ppMatch[1].trim();
    } else {
      const jMatch = remainder.match(
        /^([^,]+),\s*([0-9]+)(?:\s*\(\s*([0-9]+)\s*\))?,?\s*(?:pp\.?\s*)?([0-9\-–—]+)?\.?$/
      );
      if (jMatch) {
        container = jMatch[1].trim();
        const volume = jMatch[2];
        const issue = jMatch[3];
        pages = jMatch[4];
        if (volume) container += issue ? `, ${volume}(${issue})` : `, ${volume}`;
      } else {
        const ppMatch =
          remainder.match(/pp\.?\s*([0-9\-–—]+)/i) ||
          remainder.match(/([0-9\-–—]+)\.?$/);
        if (ppMatch) pages = ppMatch[1].trim();
        container = remainder.replace(/\(.*pp\.?[^)]*\)/i, "").trim();
      }
    }

    if (pages) pages = pages.replace(/^pp\.?\s*/i, "");

    const authors: { family: string; given: string }[] = [];
    const authorRegex =
      /([A-Za-z\u4e00-\u9fa5'`·-]+(?:\s+[A-Za-z\u4e00-\u9fa5'`·-]+)*),\s*([^,;&]+)(?:,|&| and|$)/g;
    let aMatch;
    while ((aMatch = authorRegex.exec(authorsPart + ",")) !== null) {
      authors.push({
        family: aMatch[1].trim(),
        given: (aMatch[2] || "").replace(/\s+/g, " ").replace(/\.$/, "").trim(),
      });
    }
    if (authors.length === 0) {
      const fallback = authorsPart
        .split(/\s+(?:&|and)\s+/)
        .map((s) => s.trim())
        .filter(Boolean);
      for (const name of fallback) {
        const parts = name.split(/\s+/);
        const family = parts.pop() || name;
        const given = parts.join(" ");
        authors.push({ family, given });
      }
    }

    items.push({
      id: String(items.length + 1),
      type: itemType,
      title: title.replace(/\.$/, "").trim(),
      author: authors,
      "container-title": container || undefined,
      issued: year
        ? { "date-parts": [[year].concat(month ? [month] : [])] }
        : undefined,
      page: pages || undefined,
    });
  }

  return items;
}

/** 转换引用格式 */
export function convertCitation(
  input: string,
  outFormat: string
): string {
  // 优先尝试 citation-js 自动识别
  try {
    const cite = new Cite(input);
    return cite.format("bibliography", {
      format: "html",
      template: outFormat,
      lang: outFormat === "gb7714" ? "zh-CN" : "en-US",
    });
  } catch {
    // 回退到 APA 解析 + 转换
    const cslItems = parseAPA(input);
    if (cslItems.length === 0) {
      throw new Error("无法解析输入的引用格式");
    }
    const cite = new Cite(cslItems);
    return cite.format("bibliography", {
      format: "html",
      template: outFormat,
      lang: outFormat === "gb7714" ? "zh-CN" : "en-US",
    });
  }
}

// ─── 导出 ────────────────────────────────────────────

export type ExportFormat = "bibtex" | "ris" | "txt";

/** 将输入导出为 BibTeX / RIS / 纯文本 */
export function convertAndExport(
  input: string,
  format: ExportFormat
): string {
  const cite = tryParse(input);
  switch (format) {
    case "bibtex":
      return cite.format("bibtex");
    case "ris":
      return cite.format("ris");
    case "txt": {
      const html = cite.format("bibliography", {
        format: "html",
        template: "apa",
        lang: "en-US",
      });
      return stripHtml(html).trim();
    }
  }
}

/** 统一尝试 BibTeX 解析 → APA 启发式回退 */
function tryParse(input: string): InstanceType<typeof Cite> {
  try {
    return new Cite(input);
  } catch {
    const items = parseAPA(input);
    if (!items.length) throw new Error("无法解析输入的引用格式");
    return new Cite(items);
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

// ─── 输入格式检测 ────────────────────────────────────

export type InputFormat = "bibtex" | "apa" | "doi" | "url" | "unknown";

/** 自动检测输入格式类型 */
export function detectInputFormat(input: string): InputFormat {
  if (!input.trim()) return "unknown";

  // DOI
  if (/^\s*10\.\d{4,}\/[\S]+/.test(input) || /^\s*doi:\s*10\./i.test(input))
    return "doi";

  // URL
  if (/^\s*https?:\/\//i.test(input.trim()))
    return "url";

  // BibTeX
  if (/^\s*@\w+\s*\{/.test(input))
    return "bibtex";

  // APA 文本 (Author (Year). Title.)
  if (/^.+\(\d{4}[a-z]?\)\.\s+.+/i.test(input))
    return "apa";

  return "unknown";
}

// ─── 从 CSL-JSON 转换 ──────────────────────────────────

/** 将 CSL-JSON 条目转换为指定格式的 HTML */
export function citeFromCSLJSON(
  items: Record<string, unknown>[],
  template: string
): string {
  const cite = new Cite(items);
  return cite.format("bibliography", {
    format: "html",
    template,
    lang: template === "gb7714" ? "zh-CN" : "en-US",
  });
}