"use client";
import { useRef, useCallback } from "react";
import Header from "@/app/components/Header";
import Converter from "@/app/components/Converter";
import Guide from "@/app/components/Guide";
import FAQ from "@/app/components/FAQ";
import Footer from "@/app/components/Footer";
import PrivacyNotice from "@/app/components/PrivacyNotice";
import JsonLd from "@/app/components/JsonLd";

export default function HomePage() {
  const faqRef = useRef<HTMLDivElement>(null);

  const scrollToFAQ = useCallback(() => {
    faqRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <JsonLd />
      <div className="min-h-screen flex flex-col">
        <Header onScrollToFAQ={scrollToFAQ} />

        <main className="flex-1">
          {/* 格式转换器 */}
          <Converter />

          {/* 隐私保护提醒 */}
          <PrivacyNotice />

          {/* 使用指南 */}
          <Guide />

          {/* 常见问题 */}
          <FAQ faqRef={faqRef} />
        </main>

        <Footer />
      </div>
    </>
  );
}