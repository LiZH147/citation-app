"use client";
import { useRef, useCallback } from "react";
import type { Translations } from "@/app/lib/translations";
import Header from "@/app/components/Header";
import Converter from "@/app/components/Converter";
import Guide from "@/app/components/Guide";
import FAQ from "@/app/components/FAQ";
import Footer from "@/app/components/Footer";
import PrivacyNotice from "@/app/components/PrivacyNotice";
import JsonLd from "@/app/components/JsonLd";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

interface Props {
  lang: string;
  t: Translations;
}

export default function HomeClient({ lang, t }: Props) {
  const faqRef = useRef<HTMLDivElement>(null);
  const scrollToFAQ = useCallback(() => {
    faqRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <JsonLd lang={lang} t={t} />
      <div className="min-h-screen flex flex-col">
        <Header t={t} onScrollToFAQ={scrollToFAQ} langSwitcher={<LanguageSwitcher currentLang={lang} />} />

        <main className="flex-1">
          <Converter t={t} />
          <PrivacyNotice t={t} />
          <Guide t={t} />
          <FAQ t={t} faqRef={faqRef} />
        </main>

        <Footer t={t} />
      </div>
    </>
  );
}