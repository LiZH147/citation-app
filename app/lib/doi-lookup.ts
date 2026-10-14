/**
 * DOI / URL → CSL-JSON 元数据查找
 * 通过 Crossref REST API（免费，无需 API key）
 */

export interface LookupResult {
  cslItems: Record<string, unknown>[];
  sourceName: string;   // 用于展示的引用来源名称
}

/** 从 DOI 或学术 URL 获取元数据 */
export async function lookupDOI(input: string): Promise<LookupResult> {
  const trimmed = input.trim();

  // 提取 DOI
  const doiMatch = trimmed.match(/10\.\d{4,}\/[\S]+/);
  if (!doiMatch) {
    // 尝试作为 arXiv ID
    const arxivMatch = trimmed.match(/(?:arxiv\.org\/abs\/|arXiv:)([\d.]+)/i);
    if (arxivMatch) return lookupArxiv(arxivMatch[1]);

    throw new Error(
      "Could not find a DOI or recognized identifier in the input. " +
      "Please paste a DOI (e.g. 10.1000/xyz) or an arXiv URL."
    );
  }

  const doi = doiMatch[0].replace(/[;,.]$/, ""); // 去掉尾部标点
  const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error(`DOI "${doi}" not found in Crossref.`);
    throw new Error(`Crossref lookup failed (HTTP ${res.status}).`);
  }

  const data = await res.json();
  const msg = data.message;

  // 构建短引用来源名
  const firstAuthor = msg.author?.[0];
  const authorName = firstAuthor
    ? `${firstAuthor.family || firstAuthor.given || ""}`
    : "Unknown";
  const year = msg.issued?.["date-parts"]?.[0]?.[0] || "";
  const sourceName = `${authorName}${year ? ` (${year})` : ""}`;

  // 转换到 CSL-JSON
  const item: Record<string, unknown> = {
    id: doi,
    type: mapType(msg.type),
    DOI: doi,
    title: Array.isArray(msg.title) ? msg.title[0] : msg.title || "",
    author: (msg.author || []).map((a: Record<string, unknown>) => ({
      family: a.family || "",
      given: a.given || "",
    })),
    "container-title": Array.isArray(msg["container-title"])
      ? msg["container-title"][0]
      : msg["container-title"] || undefined,
    issued: msg.issued?.["date-parts"]?.[0]
      ? { "date-parts": [msg.issued["date-parts"][0]] }
      : undefined,
    volume: msg.volume || undefined,
    issue: msg.issue || undefined,
    page: msg.page || undefined,
    publisher: msg.publisher || undefined,
    URL: msg.URL || `https://doi.org/${doi}`,
  };

  // 移除 undefined 字段
  for (const k of Object.keys(item)) {
    if (item[k] === undefined) delete item[k];
  }

  return { cslItems: [item], sourceName };
}

/** arXiv ID → 元数据 */
async function lookupArxiv(arxivId: string): Promise<LookupResult> {
  const cleanId = arxivId.replace(/v\d+$/, ""); // 去版本号
  const url = `https://export.arxiv.org/api/query?id_list=${encodeURIComponent(cleanId)}&max_results=1`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("arXiv lookup failed.");

  const xml = await res.text();
  const titleMatch = xml.match(/<title>(.+?)<\/title>/);
  const entryTitle = titleMatch?.[1]?.replace(/\n/g, " ").trim() || "";

  const authorMatches = [...xml.matchAll(/<author>\s*<name>(.+?)<\/name>\s*<\/author>/g)];
  const authors = authorMatches.map((m) => {
    const parts = m[1].split(/\s+/);
    const family = parts.pop() || m[1];
    const given = parts.join(" ");
    return { family, given };
  });

  const yearMatch = xml.match(/<published>(\d{4})/);
  const year = yearMatch?.[1];

  const sourceName = `${authors[0]?.family || "Unknown"}${year ? ` (${year})` : ""}`;

  return {
    cslItems: [{
      id: `arxiv:${cleanId}`,
      type: "article",
      title: entryTitle,
      author: authors,
      issued: year ? { "date-parts": [[parseInt(year)]] } : undefined,
      URL: `https://arxiv.org/abs/${cleanId}`,
      publisher: "arXiv",
      "container-title": "arXiv preprint",
    }],
    sourceName,
  };
}

/** Crossref type → CSL type */
function mapType(crossrefType: string | undefined): string {
  const map: Record<string, string> = {
    "journal-article": "article-journal",
    "book": "book",
    "book-chapter": "chapter",
    "proceedings-article": "paper-conference",
    "conference-paper": "paper-conference",
    "dissertation": "thesis",
    "report": "report",
    "dataset": "dataset",
    "posted-content": "article",
    "standard": "document",
    "monograph": "book",
  };
  return map[crossrefType || ""] || "article-journal";
}