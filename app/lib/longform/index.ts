import zh from "./zh";
import en from "./en";
import { LONGFORM_SLUGS, type LongformPage, type LongformSet, type LongformSlug } from "./types";

const SETS: Record<string, LongformSet> = { zh, en };
const FALLBACK: LongformSet = zh;

export function getLongform(lang: string): LongformSet {
  return SETS[lang] ?? FALLBACK;
}

export function isLongformSlug(value: string): value is LongformSlug {
  return (LONGFORM_SLUGS as readonly string[]).includes(value);
}

export function getLongformPage(lang: string, slug: string): LongformPage | undefined {
  if (!isLongformSlug(slug)) return undefined;
  return getLongform(lang)[slug];
}

/** 所有长尾页的路径（含语言前缀），供 sitemap 与内链复用。 */
export function longformPaths(lang: string): string[] {
  return LONGFORM_SLUGS.map((slug) => `/${lang}/${slug}`);
}

export { LONGFORM_SLUGS };
export type { LongformPage, LongformSet, LongformSlug };
