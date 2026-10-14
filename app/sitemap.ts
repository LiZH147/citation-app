import type { MetadataRoute } from "next";

const baseUrl = "https://www.convertgb.shop";
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/zh`,
      lastModified,
      changeFrequency: "daily",
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
      changeFrequency: "daily",
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