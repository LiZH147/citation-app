import type { LongformPage } from "@/app/lib/longform/types";
import { SITE_URL, absoluteUrl } from "@/app/lib/seo";

interface RelatedLink {
  href: string;
  label: string;
}

interface Props {
  page: LongformPage;
  lang: string;
  related: RelatedLink[];
}

export default function LongformArticle({ page, lang, related }: Props) {
  const isZh = lang === "zh";
  const url = absoluteUrl(`/${lang}/${page.slug}`);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ConvertGB", item: absoluteUrl(`/${lang}`) },
      { "@type": "ListItem", position: 2, name: page.h1, item: url },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.h1,
    description: page.description,
    inLanguage: isZh ? "zh-CN" : "en",
    datePublished: page.updated,
    dateModified: page.updated,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: { "@type": "Organization", name: "ConvertGB", url: absoluteUrl(`/${lang}`) },
    publisher: { "@type": "Organization", name: "ConvertGB", url: SITE_URL },
    about: { "@type": "Thing", name: page.keyword },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate-500">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <a href={`/${lang}`} className="hover:text-blue-600 hover:underline">
              {isZh ? "参考文献格式转换器" : "Citation converter"}
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700 font-medium" aria-current="page">
            {page.h1}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 leading-snug">{page.h1}</h1>
      <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-3">{page.intro}</p>
      <p className="text-xs text-slate-400 mb-8">
        {isZh ? "最后更新：" : "Last updated: "}
        <time dateTime={page.updated}>{page.updated}</time>
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-10">
        <p className="text-sm text-blue-900 leading-relaxed mb-3">
          {isZh
            ? "不想手动改格式？把文献粘贴进转换器，直接得到 GB/T 7714-2015 结果，全程在你的浏览器里完成。"
            : "Don't want to reformat by hand? Paste your references into the converter and get GB/T 7714-2015 output — processed entirely in your browser."}
        </p>
        <a
          href={`/${lang}#converter`}
          className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {page.ctaPrimary}
        </a>
      </div>

      {page.sections.map((section, si) => (
        <section key={si} className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-snug">{section.h2}</h2>
          {section.paragraphs.map((p, pi) => (
            <p key={pi} className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
              {p}
            </p>
          ))}

          {section.list && section.list.length > 0 && (
            <ul className="mb-4 space-y-2 pl-1">
              {section.list.map((item, li) => (
                <li key={li} className="text-sm md:text-base text-slate-600 leading-relaxed flex gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0" aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {section.table && (
            <div className="overflow-x-auto mb-4 rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {section.table.headers.map((h, hi) => (
                      <th key={hi} className="text-left font-bold text-slate-700 px-4 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {section.table.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 text-slate-600 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      {page.faqs.length > 0 && (
        <section className="mb-10" aria-labelledby="page-faq-heading">
          <h2 id="page-faq-heading" className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            {isZh ? "常见问题" : "Frequently asked questions"}
          </h2>
          <div className="space-y-3">
            {page.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm md:text-base text-slate-800 hover:text-blue-700">
                  <span>{faq.q}</span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10 bg-slate-900 text-slate-300 rounded-2xl px-6 py-8 text-center">
        <h2 className="text-lg md:text-xl font-bold text-white mb-3">{page.ctaPrimary}</h2>
        <p className="text-sm leading-relaxed mb-5">
          {isZh
            ? "支持 BibTeX、APA 文本、DOI 与 arXiv 链接输入，输出 GB/T 7714-2015、APA、BibTeX。不上传服务器，不需要注册。"
            : "Input BibTeX, APA text, a DOI or an arXiv link. Output GB/T 7714-2015, APA or BibTeX. Nothing is uploaded, no signup."}
        </p>
        <a
          href={`/${lang}#converter`}
          className="inline-flex items-center gap-2 bg-white text-slate-900 text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
        >
          {page.ctaSecondary}
        </a>
      </section>

      {related.length > 0 && (
        <nav aria-label={isZh ? "相关页面" : "Related pages"} className="border-t border-slate-200 pt-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
            {isZh ? "相关页面" : "Related pages"}
          </h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.href}>
                <a href={r.href} className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, articleLd, faqLd]) }}
      />
    </article>
  );
}
