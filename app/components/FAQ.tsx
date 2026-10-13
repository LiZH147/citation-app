"use client";
import { useState } from "react";

interface FAQProps {
  faqRef: React.RefObject<HTMLDivElement | null>;
}

export default function FAQ({ faqRef }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      ref={faqRef}
      id="faq"
      className="max-w-3xl mx-auto px-4 py-12 md:py-16"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-2xl md:text-3xl font-extrabold text-center mb-3"
      >
        常见问题
      </h2>
      <p className="text-center text-slate-500 mb-10 text-sm">
        关于转换器使用的常见疑问
      </p>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm md:text-base text-slate-800 hover:text-blue-700 transition-colors"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              aria-controls={`faq-panel-${i}`}
            >
              <span>{faq.q}</span>
              <svg
                className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === i && (
              <div
                id={`faq-panel-${i}`}
                className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 长尾关键词标签 */}
      <div className="mt-10 border-t border-dashed border-slate-200 pt-6">
        <h3 className="text-center text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
          相关搜索
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "这个转换器支持哪些输入格式？",
    a: "目前支持 BibTeX（.bib 文件/文本）、APA（第7版）文本和 MLA 格式文本。您可以粘贴从 Zotero、EndNote、百度学术、Google Scholar 导出的引用数据，工具会自动识别并转换为目标格式。",
  },
  {
    q: "GB/T 7714-2015 和 APA 有什么区别？",
    a: "GB/T 7714-2015 是中国国家标准《信息与文献 参考文献著录规则》，广泛用于中文期刊和学位论文（如知网、万方、维普要求）。APA（American Psychological Association）第7版是英文论文常用的引用格式。两者在作者姓名展示、标点符号、著录顺序等方面有显著差异，本工具可在两者间一键切换。",
  },
  {
    q: "我的引用数据会被上传到服务器吗？",
    a: "不会。本工具采用纯前端处理技术，所有引用数据的解析和格式转换都在您的浏览器中完成，绝不将您的学术数据上传到任何服务器。您可以离线使用，学术隐私得到充分保障。",
  },
  {
    q: "如何处理包含中文作者的引用？",
    a: "中文姓名在 BibTeX 中通常以拼音或「姓, 名」的格式书写。本工具内置中文语言包，转换 GB/T 7714-2015 时能正确处理「等」「和」等中文称谓，以及「卷」「期」「页」等字段名称的本地化。",
  },
  {
    q: "输出结果可以复制到 Word 或 LaTeX 中吗？",
    a: "可以，点击「复制结果」按钮即可将格式化的参考文献复制到系统剪贴板，然后粘贴到 Word、WPS 或 LaTeX 编辑器中。输出的 HTML 格式保留粗体和斜体等排版标记。",
  },
  {
    q: "为什么转换后格式看起来不太对？",
    a: "请检查输入的引用数据是否完整——缺失的字段（如作者、期刊名、页码）会导致输出不完整。如果 BibTeX 文本格式不规范，请尝试在 Zotero 等工具中先做清理再粘贴。",
  },
];

const keywords = [
  "#APA转国标",
  "#BibTeX转GB/T7714",
  "#MLA转GB7714",
  "#论文参考文献格式",
  "#国标参考文献",
  "#知网引用格式转换",
  "#Zotero国标输出",
  "#GB/T7714-2015",
  "#学术引用格式在线",
  "#参考文献排版工具",
];