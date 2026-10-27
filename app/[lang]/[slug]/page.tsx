import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import { getTranslations } from "@/app/lib/translations";
import { getLongform, getLongformPage, LONGFORM_SLUGS } from "@/app/lib/longform";
import { absoluteUrl, hreflangAlternates } from "@/app/lib/seo";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import LongformArticle from "@/app/components/LongformArticle";

type Params = { lang: string; slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const langs = ["zh", "en"];
  return langs.flatMap((lang) => LONGFORM_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = getLongformPage(lang, slug);
  if (!page) return {};

  const url = absoluteUrl(`/${lang}/${slug}`);
  const isZh = lang === "zh";

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
      languages: hreflangAlternates(`/${slug}`),
    },
    openGraph: {
      type: "article",
      title: page.title,
      description: page.description,
      url,
      siteName: "ConvertGB",
      locale: isZh ? "zh_CN" : "en_US",
      alternateLocale: isZh ? ["en_US"] : ["zh_CN"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: page.h1 }],
      publishedTime: page.updated,
      modifiedTime: page.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/opengraph-image"],
    },
    other: { "article:modified_time": page.updated },
  };
}

export default async function LongformPageRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  "use cache";
  cacheLife("max");

  const { lang, slug } = await params;
  const page = getLongformPage(lang, slug);
  if (!page) notFound();

  const t = getTranslations(lang);
  const set = getLongform(lang);

  const navLinks = LONGFORM_SLUGS.map((s) => ({
    href: `/${lang}/${s}`,
    label: set[s].h1,
  }));

  const related = page.relatedSlugs
    .filter((s) => s !== page.slug)
    .slice(0, 3)
    .map((s) => ({ href: `/${lang}/${s}`, label: set[s].h1 }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        t={t}
        langSwitcher={<LanguageSwitcher currentLang={lang} />}
        navLinks={navLinks}
        showHero={false}
      />
      <main className="flex-1">
        <LongformArticle page={page} lang={lang} related={related} />
      </main>
      <Footer t={t} />
    </div>
  );
}
