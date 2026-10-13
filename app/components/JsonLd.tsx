/**
 * JSON-LD 结构化数据 —— 帮助搜索引擎理解页面内容
 * Schema.org: WebApplication + FAQPage
 */
export default function JsonLd() {
  const baseUrl = "https://www.convertgb.shop";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "参考文献格式转换器 (ConvertGB)",
        url: baseUrl,
        description:
          "免费在线学术文献格式转换工具，支持一键将 BibTeX、APA、MLA 转换为中国国家标准 GB/T 7714-2015 格式。",
        applicationCategory: "EducationalApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "CNY",
        },
        browserRequirements: "Requires JavaScript",
        author: {
          "@type": "Organization",
          name: "ConvertGB",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "这个引用格式转换器支持哪些输入格式？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "支持 BibTeX（.bib 文件/文本）、APA（第7版）和 MLA 格式文本。可以粘贴从 Zotero、EndNote、百度学术、Google Scholar 导出的引用数据，工具会自动识别并转换为目标格式。",
            },
          },
          {
            "@type": "Question",
            name: "GB/T 7714-2015 和 APA 有什么区别？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "GB/T 7714-2015 是中国国家标准《信息与文献 参考文献著录规则》，广泛用于中文期刊和学位论文。APA（第7版）是英文论文常用的引用格式。两者在作者姓名展示、标点符号、著录顺序等方面有显著差异。",
            },
          },
          {
            "@type": "Question",
            name: "我的引用数据会被上传到服务器吗？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "不会。本工具采用纯前端处理，所有数据解析和格式转换都在浏览器中完成，绝不将学术数据上传到任何服务器，确保学术隐私。",
            },
          },
          {
            "@type": "Question",
            name: "如何复制转换结果到 Word 或 LaTeX 中？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "点击「复制结果」按钮即可将格式化的参考文献复制到系统剪贴板，然后粘贴到 Word、WPS 或 LaTeX 编辑器中。",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ConvertGB 首页",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "参考文献格式转换器",
            item: `${baseUrl}/#converter`,
          },
        ],
      },
      {
        "@type": "WebSite",
        name: "ConvertGB - 参考文献格式转换器",
        alternateName: "ConvertGB",
        url: baseUrl,
        description:
          "免费在线学术文献格式转换工具，BibTeX/APA/MLA 转 GB/T 7714-2015 国标。",
        inLanguage: "zh-CN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}