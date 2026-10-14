import type { MetadataRoute } from "next";

const baseUrl = "https://www.convertgb.shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const today = lastModified.toISOString().split("T")[0];

  return [
    {
      url: `${baseUrl}/zh`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          "zh-CN": `${baseUrl}/zh`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
      alternates: {
        languages: {
          "zh-CN": `${baseUrl}/zh`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
}

export function generateSitemapIndex() {
  return [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
  ];
}