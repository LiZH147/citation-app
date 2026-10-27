import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../globals.css";
import { SITE_URL, absoluteUrl, hreflangAlternates } from "@/app/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

/** /zh 与 /en 在构建期预渲染为完整静态 HTML。 */
export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === "zh";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isZh
        ? "参考文献格式转换器 - BibTeX/APA 转 GB/T 7714-2015 国标"
        : "Citation Format Converter - BibTeX/APA to GB/T 7714-2015",
      template: "%s | ConvertGB",
    },
    description: isZh
      ? "免费在线参考文献格式转换器：BibTeX、APA 一键转 GB/T 7714-2015 国标，支持 DOI 与 arXiv 抓取。纯浏览器本地解析，不上传文献、无需注册。"
      : "Convert BibTeX or APA citations to GB/T 7714-2015 in one click. Paste a DOI or arXiv ID to fetch metadata. Runs in your browser — nothing uploaded, no signup.",
    keywords: isZh
      ? [
          "参考文献格式转换",
          "GB/T 7714",
          "BibTeX转国标",
          "APA转GB7714",
          "GB7714在线转换",
          "GB/T 7714-2015",
          "论文参考文献格式",
          "国标参考文献生成器",
          "学术引用格式",
          "Zotero国标输出",
          "EndNote转GB7714",
          "百度学术格式转换",
          "知网引用格式",
          "文献管理格式转换",
          "BibTeX to Chinese standard online",
          "citation formatter",
          "reference converter",
        ]
      : [
          "citation format converter",
          "GB/T 7714",
          "BibTeX to Chinese standard",
          "APA to GB7714",
          "GB/T 7714-2015 converter",
          "academic citation tool",
          "reference formatter",
          "Chinese citation standard",
          "Zotero GB7714",
          "online citation converter",
          "BibTeX formatter",
          "free reference converter",
        ],
    verification: { google: "FXB77H9qDSQQl29HkRAm5NTO9Na6yWzEWOE0R7kzQEM" },
    category: "education",
    referrer: "origin-when-cross-origin",
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
      type: "website",
      siteName: "ConvertGB",
      title: isZh ? "参考文献格式转换器 - BibTeX/APA 转 GB/T 7714-2015" : "Citation Format Converter - BibTeX/APA to GB/T 7714-2015",
      description: isZh
        ? "BibTeX/APA 转 GB/T 7714-2015 国标格式，支持 DOI 与 arXiv 自动抓取，纯浏览器本地解析。"
        : "BibTeX/APA to GB/T 7714-2015 with DOI and arXiv lookup, parsed entirely in your browser.",
      url: absoluteUrl(`/${lang}`),
      locale: isZh ? "zh_CN" : "en_US",
      alternateLocale: isZh ? ["en_US"] : ["zh_CN"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ConvertGB — GB/T 7714 citation converter" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? "参考文献格式转换器 - BibTeX/APA 转 GB/T 7714-2015" : "Citation Format Converter - BibTeX/APA to GB/T 7714-2015",
      description: isZh ? "BibTeX/APA 转 GB/T 7714-2015，支持 DOI/arXiv 抓取，浏览器本地解析。" : "BibTeX/APA to GB/T 7714-2015 with DOI/arXiv lookup, parsed in your browser.",
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: absoluteUrl(`/${lang}`),
      languages: hreflangAlternates(""),
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }],
      other: [{ rel: "apple-touch-icon-precomposed", url: "/apple-icon-180x180.png" }],
    },
    manifest: "/manifest.json",
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const htmlLang = lang === "en" ? "en" : "zh-CN";

  return (
    <html lang={htmlLang}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KX53PFH0WC" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KX53PFH0WC');
        `}</Script>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased font-sans bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
