import { getTranslations } from "@/app/lib/translations";
import HomeClient from "./HomeClient";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return <HomeClient lang={lang} t={t} />;
}