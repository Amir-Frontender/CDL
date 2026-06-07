import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export const ogContentType = "image/png";
export const ogImageAsset = "/images/hero-service.jpg";

export function getLocalizedOgImagePath(locale: Locale) {
  if (locale === "ru") return "/telegram-preview.jpg";
  return `/telegram-preview-${locale}.jpg`;
}

export function getAbsoluteOgImageUrl(locale: Locale) {
  return new URL(getLocalizedOgImagePath(locale), siteUrl).toString();
}

export function getOgAssetUrl(path = ogImageAsset) {
  return new URL(path, siteUrl).toString();
}
