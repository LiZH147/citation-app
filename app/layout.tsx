import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.convertgb.shop'),
  title: "参考文献格式转换器 - 免费 APA, MLA, BibTeX 转 GB/T 7714-2015",
  description: "专业学术文献格式转换工具，支持一键将 BibTeX、APA、MLA 转换为中国国标 GB/T 7714-2015 格式。",

  // 就是这里！添加 google 验证字段
  verification: {
    google: "FXB77H9qDSQQl29HkRAm5NTO9Na6yWzEWOE0R7kzQEM",
  },
  
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
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-icon-precomposed.png",
      },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  // 对应 msapplication-TileImage
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
  },
};
// 修改后的 layout.tsx 核心部分
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased font-sans"> {/* 直接用 Tailwind 的系统字体类 */}
        {children}
      </body>
    </html>
  )
}
