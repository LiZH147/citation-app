import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === "zh";

  return {
    metadataBase: new URL("https://www.convertgb.shop"),
    title: {
      default: isZh
        ? "参考文献格式转换器 - BibTeX/APA/MLA 转 GB/T 7714-2015 国标 | ConvertGB"
        : "Citation Format Converter - BibTeX/APA/MLA to GB/T 7714 | ConvertGB",
      template: "%s | ConvertGB",
    },
    description: isZh
      ? "免费在线学术文献格式转换工具，支持一键将 BibTeX、APA、MLA 格式转换为中国国家标准 GB/T 7714-2015。纯前端解析保障学术隐私安全。"
      : "Free online academic citation format converter. One-click conversion from BibTeX, APA, MLA to China National Standard GB/T 7714-2015.",
    keywords: isZh
      ? ["参考文献格式转换", "GB/T 7714", "BibTeX转国标", "APA转GB7714", "GB7714在线转换"]
      : ["citation format converter", "GB/T 7714", "BibTeX to Chinese standard", "APA to GB7714"],
    verification: { google: "FXB77H9qDSQQl29HkRAm5NTO9Na6yWzEWOE0R7kzQEM" },
    openGraph: {
      type: "website",
      siteName: "ConvertGB",
      title: isZh ? "参考文献格式转换器" : "Citation Format Converter",
      description: isZh
        ? "BibTeX/APA/MLA 转 GB/T 7714-2015 国标格式"
        : "BibTeX/APA/MLA to GB/T 7714-2015",
      url: `https://www.convertgb.shop/${lang}`,
      locale: isZh ? "zh_CN" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ConvertGB" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? "参考文献格式转换器" : "Citation Format Converter",
      description: isZh ? "BibTeX/APA/MLA 转 GB/T 7714-2015" : "BibTeX/APA/MLA to GB/T 7714-2015",
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: `https://www.convertgb.shop/${lang}`,
      languages: {
        "zh-CN": "https://www.convertgb.shop/zh",
        "en-US": "https://www.convertgb.shop/en",
      },
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KX53PFH0WC" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B1SEQEKBE1');
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