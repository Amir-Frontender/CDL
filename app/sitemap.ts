import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const sitemapBaseUrl = "https://casadilusso.uz";
const futureArticleSlugs: string[] = [];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const localePages = locales.map((locale) => ({
    url: `${sitemapBaseUrl}/${locale}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "ru" ? 1 : 0.9,
  }));

  const articlePages = futureArticleSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${sitemapBaseUrl}/${locale}/articles/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [
    {
      url: `${sitemapBaseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...localePages,
    ...articlePages,
  ];
}
