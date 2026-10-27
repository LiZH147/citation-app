import type { Translations } from "@/app/lib/translations";

interface FAQProps {
  t: Translations;
}

/**
 * FAQ 使用原生 <details>/<summary>：
 * 答案始终存在于服务端 HTML 中，不依赖 JavaScript 展开，
 * 既满足结构化数据 FAQPage 与页面正文的一致性，也避免
 * 搜索引擎抓到「只有问题没有答案」的页面。
 */
export default function FAQ({ t }: FAQProps) {
  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 py-12 md:py-16" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl md:text-3xl font-extrabold text-center mb-3">{t.faqTitle}</h2>
      <p className="text-center text-slate-500 mb-10 text-sm">{t.faqSubtitle}</p>

      <div className="space-y-3">
        {t.faqs.map((faq, i) => (
          <details
            key={i}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            open={i === 0}
          >
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm md:text-base text-slate-800 hover:text-blue-700 transition-colors">
              <span>{faq.q}</span>
              <svg
                className="w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
          </details>
        ))}
      </div>

      <div className="mt-10 border-t border-dashed border-slate-200 pt-6">
        <h3 className="text-center text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">{t.faqRelatedSearch}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {t.faqKeywords.map((kw) => (
            <span key={kw} className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">{kw}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
