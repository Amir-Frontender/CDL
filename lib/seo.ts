import type { Metadata } from "next";
import type { Locale, Messages } from "@/lib/i18n";
import { getAbsoluteOgImageUrl, ogSize } from "@/lib/og";
import { siteUrl } from "@/lib/site";

const openGraphLocales: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  uz: "uz_UZ",
};

export function buildMetadata(locale: Locale, t: Messages): Metadata {
  const ogImageUrl = getAbsoluteOgImageUrl(locale);
  const localizedUrl = new URL(`/${locale}/`, siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t.metadata.title,
      template: `%s | ${t.brand.name}`,
    },
    description: t.metadata.description,
    applicationName: t.brand.name,
    keywords: [
      "Casa di Lusso",
      "premium tableware",
      "luxury porcelain",
      "vintage tableware",
      "Rosenthal",
      "Villeroy & Boch",
      "Wedgwood",
      "Uzbekistan tableware",
    ],
    authors: [{ name: t.brand.name }],
    creator: t.brand.name,
    publisher: t.brand.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
        uz: "/uz",
      },
    },
    openGraph: {
      type: "website",
      url: localizedUrl,
      locale: openGraphLocales[locale],
      siteName: t.brand.name,
      title: t.metadata.title,
      description: t.metadata.description,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: ogSize.width,
          height: ogSize.height,
          type: "image/jpeg",
          alt: t.og.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metadata.title,
      description: t.metadata.description,
      images: [
        {
          url: ogImageUrl,
          alt: t.og.alt,
        },
      ],
    },
    other: {
      "image_src": ogImageUrl,
      "twitter:image:src": ogImageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildStructuredData(t: Messages, locale: Locale) {
  const localizedUrl = new URL(`/${locale}/`, siteUrl).toString();
  const logoUrl = new URL("/images/logo.png", siteUrl).toString();
  const imageUrl = getAbsoluteOgImageUrl(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: t.brand.name,
        url: siteUrl,
        logo: logoUrl,
        image: imageUrl,
        sameAs: [
          "https://t.me/casadilusso_uzb",
          "https://t.me/casadilussovintage",
          "https://www.instagram.com/casadilusso.uzb/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: t.brand.name,
        url: siteUrl,
        inLanguage: locale,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "Store",
        "@id": `${localizedUrl}#store`,
        name: t.brand.name,
        url: localizedUrl,
        image: imageUrl,
        description: t.metadata.description,
        brand: {
          "@type": "Brand",
          name: t.brand.name,
        },
        areaServed: ["Uzbekistan", "CIS", "Worldwide"],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: t.seo.premiumCollections,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: t.seo.vintageCollections,
            },
          },
        ],
      },
    ],
  };
}
