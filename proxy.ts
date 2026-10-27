import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["zh", "en"] as const;
const DEFAULT_LOCALE = "zh";

/**
 * 语言路由补全。
 *
 * 知识库明确的反例：不要按 Accept-Language 自动跳转
 * （「影响了 Google 收录网页，赶紧去掉跳转逻辑」）。
 * 因此这里对所有缺失语言前缀的路径做 **确定性** 308 永久重定向，
 * 与请求头无关，Googlebot 与真实用户永远落到同一个 URL；
 * 语言版本之间的关系交由 hreflang（含 x-default）表达。
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 静态文件与资源请求直接放行（/gb7714.csl、图标、图片等）
  if (/\.[a-z0-9]+$/i.test(pathname)) return;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/((?!_next|api|sitemap|robots|opengraph-image|manifest|favicon|apple-icon|android-icon).*)",
  ],
};
