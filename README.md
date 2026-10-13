# ConvertGB — 参考文献格式转换器

免费在线学术文献格式转换工具，支持 **BibTeX**、**APA**、**MLA** 一键转换为中国国家标准 **GB/T 7714-2015**。

🌐 网站地址：[https://www.convertgb.shop](https://www.convertgb.shop)

## 功能

- **多格式输入** — 支持 BibTeX (.bib)、APA（第7版）、MLA 格式文本
- **多格式输出** — 输出 GB/T 7714-2015（国标）或 APA（第7版）格式
- **纯前端解析** — 所有引用数据在浏览器本地处理，绝不上传服务器
- **一键复制** — 格式化结果直接复制到剪贴板，粘贴到 Word/WPS/LaTeX
- **实时预览** — 防抖实时转换，边粘贴边看结果
- **全面 SEO** — JSON-LD 结构化数据、OpenGraph、Twitter Card、自动 Sitemap

## 技术栈

- [Next.js 16](https://nextjs.org) — React 全栈框架（App Router）
- [Tailwind CSS 4](https://tailwindcss.com) — 原子化 CSS
- [Citation.js](https://citation.js.org) — CSL 引用格式解析引擎
- [GB/T 7714-2015 CSL](https://github.com/redleafnew/Chinese-STD-GB-T-7714-related-csl) — 中国国家标准样式

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 启动生产服务器
pnpm run start
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 部署到 Vercel

项目已优化为 Vercel 即用型配置：

1. Fork / Push 到你的 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. Vercel 自动检测 Next.js，无需额外配置
4. 绑定自定义域名 `convertgb.shop` 并完成 DNS 配置

## 项目结构

```
├── app/
│   ├── components/     # UI 组件 (Header, Converter, Guide, FAQ, Footer, etc.)
│   ├── lib/            # 核心逻辑 (converter.ts)
│   ├── layout.tsx      # 根布局 + 全局 SEO metadata
│   ├── page.tsx        # 首页
│   ├── loading.tsx     # 加载态
│   ├── error.tsx       # 错误处理
│   ├── not-found.tsx   # 404 页面
│   ├── robots.ts       # 动态 robots.txt
│   ├── sitemap.ts      # 动态 sitemap
│   └── opengraph-image.tsx  # OG 社交分享图片
├── public/             # 静态资源 (favicons, CSL, manifest)
├── next.config.ts      # Next.js 配置
└── package.json
```

## SEO 优化清单

- ✅ 完整的 TDK (Title, Description, Keywords)
- ✅ Open Graph & Twitter Card 标签
- ✅ JSON-LD 结构化数据 (WebApplication + FAQPage + BreadcrumbList)
- ✅ 动态 sitemap.xml 和 robots.txt
- ✅ 语义化 HTML5 结构 (h1-h4 层次, section, nav, main)
- ✅ Canonical URL + hreflang
- ✅ Google Analytics + Google Search Console
- ✅ Mobile-first 响应式设计
- ✅ 安全响应头 (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ DNS prefetch & preconnect 优化