import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["zh", "en"];
const defaultLocale = "zh";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  // 优先检查中文偏好
  const prefersZh =
    acceptLanguage.includes("zh") || acceptLanguage.includes("zh-CN");
  if (prefersZh) return "zh";
  if (acceptLanguage.includes("en")) return "en";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过静态资源、API 和根级文件
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(ico|png|svg|xml|txt|ico|webmanifest)$/)
  ) {
    return; // 不处理，直接放行
  }

  // 检查路径是否已包含 locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 重定向到带 locale 的路径
  const locale = getLocale(request);
  const newUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}`,
    request.url
  );
  // 保留查询参数
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};