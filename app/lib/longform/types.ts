// 长尾落地页内容契约（一页一词）
// 依据知识库《04-SEO与收录排名》与群聊动态知识：
//  - 「一个关键词 = 一个页面」
//  - 「核心关键词密度 3%~5%」「正文尽可能 800 单词左右」
//  - 「图文并茂 + 真实信息增量」才可能拿到靠前排名
//  - 每页必须有独立 title / description / h1（TDH 不共用）

/** 允许的页面 slug（URL 段，ASCII kebab-case）。 */
export const LONGFORM_SLUGS = [
  "bibtex-to-gb7714",
  "apa-to-gb7714",
  "gb7714-format",
  "zotero-gb7714",
  "doi-to-gb7714",
] as const;

export type LongformSlug = (typeof LONGFORM_SLUGS)[number];

export interface LongformSection {
  /** H2 小标题，应包含长尾词或其自然变体。 */
  h2: string;
  /** 2~4 段正文，每段 2~5 句，含具体事实（数字、代码、字段名、平台名）。 */
  paragraphs: string[];
  /** 可选：要点清单。 */
  list?: string[];
  /** 可选：对照表，用于承载结构化信息增量。 */
  table?: { headers: string[]; rows: string[][] };
}

export interface LongformFaq {
  q: string;
  a: string;
}

export interface LongformPage {
  /** 必须 ∈ LONGFORM_SLUGS。 */
  slug: LongformSlug;
  /** 该页唯一的核心关键词（一页一词）。 */
  keyword: string;
  /** <title>（不含品牌后缀，品牌由模板追加），建议 ≤ 45 字符。 */
  title: string;
  /** meta description，建议 120~155 字符，含核心词。 */
  description: string;
  /** 页面唯一 H1，须含核心词。 */
  h1: string;
  /** 首屏导语 1 段（2~3 句），点明这个页面解决什么需求。 */
  intro: string;
  /** 正文主体，建议 ≥ 4 个 section，总正文 800 词左右。 */
  sections: LongformSection[];
  /** 4~6 条真实长尾疑问，用于 FAQPage 结构化数据与页面 FAQ 区。 */
  faqs: LongformFaq[];
  /** 内链：相关页面 slug，2~3 个。 */
  relatedSlugs: LongformSlug[];
  /** 主 CTA 文案（指向转换器）。 */
  ctaPrimary: string;
  /** 次 CTA 文案（指向指南/常见问题）。 */
  ctaSecondary: string;
  /** 内容最后更新日期（ISO，YYYY-MM-DD）。 */
  updated: string;
}

export type LongformSet = Record<LongformSlug, LongformPage>;
