import { cacheLife } from "next/cache";
import { getTranslations } from "@/app/lib/translations";
import { getLongform, LONGFORM_SLUGS } from "@/app/lib/longform";
import Header from "@/app/components/Header";
import Converter from "@/app/components/Converter";
import Guide from "@/app/components/Guide";
import FAQ from "@/app/components/FAQ";
import Footer from "@/app/components/Footer";
import PrivacyNotice from "@/app/components/PrivacyNotice";
import JsonLd from "@/app/components/JsonLd";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import ToolLinks from "@/app/components/ToolLinks";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  "use cache";
  cacheLife("max");

  const { lang } = await params;
  const t = getTranslations(lang);
  const isZh = lang === "zh";
  const set = getLongform(lang);
  const navLinks = LONGFORM_SLUGS.map((slug) => ({
    href: `/${lang}/${slug}`,
    label: set[slug].h1,
  }));

  return (
    <>
      <JsonLd lang={lang} t={t} />
      <div className="min-h-screen flex flex-col">
        <Header
          t={t}
          langSwitcher={<LanguageSwitcher currentLang={lang} />}
          navLinks={navLinks}
        />
        <main className="flex-1">
          <Converter t={t} />
          <PrivacyNotice t={t} />
          <Guide t={t} lang={lang} />
          <ToolLinks
            heading={isZh ? "按输入格式查看详细用法" : "Guides by input format"}
            subtitle={
              isZh
                ? "每个页面只讲一个格式转换问题，含字段对照表与常见错误。"
                : "One page per conversion problem, with field-mapping tables and common pitfalls."
            }
            items={navLinks}
          />
          <FAQ t={t} />
        </main>
        <Footer t={t} />
      </div>
    </>
  );
}
