import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  // 基础 TDK (Title, Description, Keywords) —— SEO 最重要的三要素
  metadataBase: new URL("https://www.convertgb.shop"),
  title: {
    default:
      "参考文献格式转换器 - BibTeX/APA/MLA 转 GB/T 7714-2015 国标 | ConvertGB",
    template: "%s | ConvertGB",
  },
  description:
    "免费在线学术文献格式转换工具，支持一键将 BibTeX、APA、MLA 格式转换为中国国家标准 GB/T 7714-2015。支持知网、百度学术、Zotero 导出的引用数据，纯前端解析保障学术隐私安全。",
  keywords: [
    "参考文献格式转换",
    "GB/T 7714",
    "BibTeX转国标",
    "APA转GB7714",
    "MLA转GB/T 7714",
    "论文参考文献",
    "国标参考文献格式",
    "学术引用格式",
    "GB7714在线转换",
    "毕业论文参考文献",
  ],

  // Google Search Console 验证
  verification: {
    google: "FXB77H9qDSQQl29HkRAm5NTO9Na6yWzEWOE0R7kzQEM",
  },

  // Open Graph —— 社交分享优化
  openGraph: {
    type: "website",
    siteName: "ConvertGB - 参考文献格式转换器",
    title: "参考文献格式转换器 - BibTeX/APA/MLA 转 GB/T 7714-2015",
    description:
      "免费在线文献格式转换工具，一键转换 APA、MLA、BibTeX 为国标 GB/T 7714-2015 格式。",
    url: "https://www.convertgb.shop",
    locale: "zh_CN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ConvertGB 参考文献格式转换器",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "参考文献格式转换器 - BibTeX/APA/MLA 转 GB/T 7714-2015",
    description:
      "免费在线学术文献格式转换工具，一键转换为国标 GB/T 7714-2015 格式。",
    images: ["/opengraph-image"],
  },

  // 其他重要的 meta 标签
  alternates: {
    canonical: "https://www.convertgb.shop",
    languages: {
      "zh-CN": "https://www.convertgb.shop",
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // 图标配置
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "apple-touch-icon-precomposed", url: "/apple-icon-precomposed.png" },
    ],
  },
  manifest: "/manifest.json",

  // Windows 磁贴
  other: {
    "msapplication-TileColor": "#2563eb",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "baidu-site-verification": "codeva-",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KX53PFH0WC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B1SEQEKBE1');
          `}
        </Script>

        {/* 预链接 DNS —— 加速外部资源加载 */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />

        {/* Preconnect for faster connections */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}