import type { Translations } from "@/app/lib/translations";

interface Props {
  t: Translations;
}

export default function Footer({ t }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">{t.footerAbout}</h4>
            <p className="text-xs leading-relaxed">{t.footerDesc}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">{t.footerQuickLinks}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#converter" className="hover:text-white transition-colors">{t.navConvert}</a></li>
              <li><a href="#guide" className="hover:text-white transition-colors">{t.navGuide}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{t.navFAQ}</a></li>
              <li><a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">{t.footerDisclaimer}</h4>
            <p className="text-xs leading-relaxed">{t.footerDisclaimerText}</p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {year} ConvertGB. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Next.js</a>{" "}&amp;{" "}
            <a href="https://citation.js.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Citation.js</a>
          </p>
        </div>
      </div>
    </footer>
  );
}