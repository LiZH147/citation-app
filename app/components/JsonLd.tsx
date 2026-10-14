import type { Translations } from "@/app/lib/translations";

interface Props {
  lang: string;
  t: Translations;
}

export default function JsonLd({ lang, t }: Props) {
  const baseUrl = "https://www.convertgb.shop";
  const pageUrl = `${baseUrl}/${lang}`;
  const isZh = lang === "zh";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Website ──
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: isZh
          ? "ConvertGB - 参考文献格式转换器"
          : "ConvertGB - Citation Format Converter",
        alternateName: ["ConvertGB", "参考文献格式转换器", "Citation Converter"],
        url: baseUrl,
        description: isZh
          ? "免费在线学术文献格式转换工具，BibTeX/APA/MLA 转 GB/T 7714-2015 国标格式。"
          : "Free online academic citation format converter — BibTeX, APA, MLA to GB/T 7714-2015.",
        inLanguage: isZh ? "zh-CN" : "en",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/${lang}#converter?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        publisher: { "@id": `${baseUrl}/#org` },
      },

      // ── Organization ──
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#org`,
        name: "ConvertGB",
        url: baseUrl,
        sameAs: [
          "https://github.com/LiZH147/citation-app",
        ],
      },

      // ── SoftwareApplication ──
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/#app`,
        name: isZh
          ? "ConvertGB 参考文献格式转换器"
          : "ConvertGB Citation Format Converter",
        url: pageUrl,
        description: isZh
          ? "免费在线学术文献格式转换工具，支持一键将 BibTeX、APA、MLA 转换为中国国家标准 GB/T 7714-2015 格式。纯前端解析保障学术隐私安全。"
          : "Free online citation format converter. One-click conversion from BibTeX, APA, MLA to China National Standard GB/T 7714-2015.",
        applicationCategory: "EducationalApplication",
        applicationSubCategory: "ReferenceManagement",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
        browserRequirements: "Requires JavaScript",
        author: { "@id": `${baseUrl}/#org` },
        inLanguage: isZh ? "zh-CN" : "en-US",
        datePublished: "2025-01-01",
        dateModified: new Date().toISOString().slice(0, 10),
        softwareVersion: "2.0",
        license: "https://opensource.org/licenses/MIT",
        screenshot: `${baseUrl}/opengraph-image`,
        featureList: isZh
          ? "支持 BibTeX 解析, APA 文本识别, DOI 自动查找, 手动录入, GB/T 7714-2015 输出, APA 第7版输出, BibTeX 导出, RIS 导出"
          : "BibTeX parsing, APA text recognition, DOI auto-lookup, manual entry, GB/T 7714-2015 output, APA 7th edition output, BibTeX export, RIS export",
      },

      // ── FAQPage ──
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: t.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
        dateModified: new Date().toISOString().slice(0, 10),
      },

      // ── BreadcrumbList ──
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isZh ? "ConvertGB 首页" : "ConvertGB Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isZh ? "参考文献格式转换器" : "Citation Format Converter",
            item: `${pageUrl}/#converter`,
          },
        ],
      },

      // ── HowTo (conversion guide) ──
      {
        "@type": "HowTo",
        name: isZh ? "如何转换参考文献格式" : "How to Convert Citation Formats",
        description: isZh
          ? "三步将 BibTeX、APA、MLA 转换为 GB/T 7714-2015 国标格式"
          : "Three steps to convert BibTeX, APA, MLA to GB/T 7714-2015",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: isZh ? "粘贴引用数据" : "Paste citation data",
            text: isZh
              ? "将 Zotero、EndNote、百度学术或其他工具导出的 BibTeX / APA / MLA 格式文本粘贴至输入区。"
              : "Paste BibTeX, APA, or MLA formatted text exported from Zotero, EndNote, or Google Scholar.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: isZh ? "选择目标格式" : "Choose output format",
            text: isZh
              ? "在顶部工具栏切换期望的输出格式：国标 GB/T 7714-2015 或 APA（第7版）。"
              : "Select the desired output format: GB/T 7714-2015 or APA 7th edition.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: isZh ? "复制或下载结果" : "Copy or download result",
            text: isZh
              ? "点击「复制结果」一键复制，或通过下载按钮导出为 BibTeX、RIS 或纯文本文件。"
              : "Click 'Copy Result' to copy, or use the download button to export as BibTeX, RIS, or plain text.",
          },
        ],
        totalTime: "PT1M",
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