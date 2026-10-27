import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { LONGFORM_SLUGS } from "@/app/lib/longform/types";
import { getLongform } from "@/app/lib/longform";
import { absoluteUrl, hreflangAlternates } from "@/app/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");

  const lastModified = new Date();
  const langs = ["zh", "en"] as const;

  const homeEntries: MetadataRoute.Sitemap = langs.map((lang) => ({
    url: absoluteUrl(`/${lang}`),
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: hreflangAlternates("") },
  }));

  const articleEntries: MetadataRoute.Sitemap = langs.flatMap((lang) => {
    const set = getLongform(lang);
    return LONGFORM_SLUGS.map((slug) => ({
      url: absoluteUrl(`/${lang}/${slug}`),
      lastModified: new Date(set[slug].updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: hreflangAlternates(`/${slug}`) },
    }));
  });

  return [...homeEntries, ...articleEntries];
}
