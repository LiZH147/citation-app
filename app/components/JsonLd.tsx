import type { Translations } from "@/app/lib/translations";

interface Props {
  lang: string;
  t: Translations;
}

export default function JsonLd({ lang, t }: Props) {
  const baseUrl = `https://www.convertgb.shop/${lang}`;
  const isZh = lang === "zh";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: isZh ? "参考文献格式转换器 (ConvertGB)" : "Citation Format Converter (ConvertGB)",
        url: baseUrl,
        description: isZh
          ? "免费在线学术文献格式转换工具，支持一键将 BibTeX、APA、MLA 转换为中国国家标准 GB/T 7714-2015 格式。"
          : "Free online citation format converter. One-click conversion from BibTeX, APA, MLA to China National Standard GB/T 7714-2015.",
        applicationCategory: "EducationalApplication",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
        browserRequirements: "Requires JavaScript",
        author: { "@type": "Organization", name: "ConvertGB" },
        inLanguage: isZh ? "zh-CN" : "en-US",
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isZh ? "ConvertGB 首页" : "ConvertGB Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: isZh ? "参考文献格式转换器" : "Citation Format Converter", item: `${baseUrl}/#converter` },
        ],
      },
      {
        "@type": "WebSite",
        name: isZh ? "ConvertGB - 参考文献格式转换器" : "ConvertGB - Citation Format Converter",
        alternateName: "ConvertGB",
        url: baseUrl,
        description: isZh
          ? "免费在线学术文献格式转换工具，BibTeX/APA/MLA 转 GB/T 7714-2015 国标。"
          : "Free online academic citation format converter. BibTeX, APA, MLA to GB/T 7714-2015.",
        inLanguage: isZh ? "zh-CN" : "en",
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