import type { Translations } from "@/app/lib/translations";

interface Props {
  t: Translations;
}

export default function Guide({ t }: Props) {
  const steps = [
    { title: t.guideStep1Title, desc: t.guideStep1Desc },
    { title: t.guideStep2Title, desc: t.guideStep2Desc },
    { title: t.guideStep3Title, desc: t.guideStep3Desc },
  ];

  return (
    <section id="guide" className="max-w-4xl mx-auto px-4 py-12 md:py-16" aria-labelledby="guide-heading">
      <h2 id="guide-heading" className="text-2xl md:text-3xl font-extrabold text-center mb-10">{t.guideTitle}</h2>

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
              <tr>
                <td className="p-4 font-mono text-blue-700 text-xs">BibTeX (.bib)</td>
                <td className="p-4 text-slate-600">Zotero, JabRef, Google Scholar</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">GB/T 7714 / APA</span></td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-blue-700 text-xs">{t.apaLabel.split("(")[0].trim()}</td>
                <td className="p-4 text-slate-600">CNKI, Google Scholar</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">GB/T 7714</span></td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-blue-700 text-xs">MLA</td>
                <td className="p-4 text-slate-600">ProQuest, Gale Literature</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">GB/T 7714 / APA</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}