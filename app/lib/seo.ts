/** 站点级 SEO 常量与工具函数（单一事实来源）。 */

export const SITE_URL = "https://www.convertgb.shop";

export const LOCALES = ["zh", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "zh";

/** 默认语言之外的兜底版本，供 hreflang 的 x-default 使用。 */
export const X_DEFAULT_PATH = `/${DEFAULT_LOCALE}`;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * 为给定路径生成 hreflang 映射。
 * `pathWithoutLocale` 必须以 "/" 开头或不带前缀，例如 "" 或 "/bibtex-to-gb7714"。
 */
export function hreflangAlternates(pathWithoutLocale: string): Record<string, string> {
  const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  return {
    "zh-CN": absoluteUrl(`/zh${suffix || ""}`),
    "en-US": absoluteUrl(`/en${suffix || ""}`),
    "x-default": absoluteUrl(`${X_DEFAULT_PATH}${suffix || ""}`),
  };
}

/** 页面语言对应的 BCP-47 值。 */
export function htmlLangOf(lang: string): string {
  return lang === "en" ? "en" : "zh-CN";
}

/** 另一种语言的等价路径，用于语言切换与页面内链。 */
export function otherLocalePath(lang: string, pathWithoutLocale: string): string {
  const other = lang === "en" ? "zh" : "en";
  const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  return `/${other}${suffix || ""}`;
}
