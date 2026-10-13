import type { Translations } from "@/app/lib/translations";

interface Props {
  t: Translations;
}

export default function PrivacyNotice({ t }: Props) {
  return (
    <section className="max-w-4xl mx-auto px-4 pb-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-green-800 mb-1 text-sm">{t.privacyTitle}</h4>
          <p className="text-sm text-green-700 leading-relaxed">{t.privacyDesc}</p>
        </div>
      </div>
    </section>
  );
}