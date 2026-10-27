import type { Translations } from "@/app/lib/translations";

interface Props {
  t: Translations;
  lang: string;
}

export default function Guide({ t, lang }: Props) {
  const isZh = lang === "zh";
  const steps = [
    { title: t.guideStep1Title, desc: t.guideStep1Desc },
    { title: t.guideStep2Title, desc: t.guideStep2Desc },
    { title: t.guideStep3Title, desc: t.guideStep3Desc },
  ];

  const rows = [
    {
      input: "BibTeX (.bib)",
      source: isZh ? "Zotero、JabRef、Google Scholar" : "Zotero, JabRef, Google Scholar",
      output: "GB/T 7714 · APA · BibTeX",
    },
    {
      input: isZh ? "APA 文本" : "APA text",
      source: isZh ? "知网、Google Scholar、PubMed" : "CNKI, Google Scholar, PubMed",
      output: "GB/T 7714 · APA",
    },
    {
      input: "DOI / arXiv",
      source: isZh ? "Crossref、arXiv（自动抓取元数据）" : "Crossref, arXiv (metadata fetched automatically)",
      output: "GB/T 7714 · APA · BibTeX",
    },
  ];

  return (
    <section id="guide" className="max-w-4xl mx-auto px-4 py-12 md:py-16" aria-labelledby="guide-heading">
      <h2 id="guide-heading" className="text-2xl md:text-3xl font-extrabold text-center mb-4">{t.guideTitle}</h2>
      <p className="text-center text-slate-500 mb-10 text-sm max-w-2xl mx-auto leading-relaxed">
        {isZh
          ? "三步完成转换：粘贴文献、选择目标格式、复制结果。全部解析在你的浏览器内完成，文献内容不会发送到任何服务器。"
          : "Three steps: paste your references, pick the target style, copy the result. Everything is parsed inside your browser — your references never leave the page."}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-lg mb-4">{i + 1}</div>
            <h3 className="font-bold mb-2 text-slate-800">{step.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">{t.formatTableTitle}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="p-4 font-bold text-slate-700">{t.formatTableInput}</th>
                <th className="p-4 font-bold text-slate-700">{t.formatTableSource}</th>
                <th className="p-4 font-bold text-slate-700">{t.formatTableOutput}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.input}>
                  <td className="p-4 font-mono text-blue-700 text-xs whitespace-nowrap">{row.input}</td>
                  <td className="p-4 text-slate-600">{row.source}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">{row.output}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-2 text-sm">{isZh ? "支持哪些国标细节" : "GB/T 7714 details covered"}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isZh
              ? "按 GB/T 7714-2015 顺序编码制输出：责任者超过 3 位取前 3 位加「等」，西文姓名缩写不加缩写点，文献类型标识（[J]/[M]/[C]/[D]/[EB/OL] 等）按类型自动补全，DOI 置于条目末尾。"
              : "Output follows the GB/T 7714-2015 numeric system: more than three authors truncated to three plus “et al”, Western initials without periods, document-type codes ([J]/[M]/[C]/[D]/[EB/OL]) added automatically, and DOI appended at the end."}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-2 text-sm">{isZh ? "导出与复用" : "Export and reuse"}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isZh
              ? "转换结果可一键复制，或下载为 .bib / .ris / .txt 文件，直接导入 Zotero、EndNote、NoteExpress 或粘贴进 Word 参考文献表。"
              : "Copy a result with one click, or download it as .bib / .ris / .txt to import into Zotero, EndNote, NoteExpress, or paste into your Word bibliography."}
          </p>
        </div>
      </div>
    </section>
  );
}
