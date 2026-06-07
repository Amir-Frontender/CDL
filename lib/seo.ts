import type { Metadata } from "next";
import type { Locale, Messages } from "@/lib/i18n";

export const siteUrl = "https://casadilusso.uz";

export function buildMetadata(locale: Locale, t: Messages): Metadata {
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
      locale,
      url: `/${locale}`,
      siteName: t.brand.name,
      title: t.metadata.title,
      description: t.metadata.description,
      images: [
        {
          url: "/images/hero-service.jpg",
          width: 1200,
          height: 630,
          alt: t.metadata.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metadata.title,
      description: t.metadata.description,
      images: ["/images/hero-service.jpg"],
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

export function buildStructuredData(t: Messages) {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: t.brand.name,
    url: siteUrl,
    image: `${siteUrl}/images/hero-service.jpg`,
    description: t.metadata.description,
    brand: {
      "@type": "Brand",
      name: t.brand.name,
    },
    sameAs: [
      "https://t.me/casadilusso_uzb",
      "https://t.me/casadilussovintage",
      "https://www.instagram.com/casadilusso.uzb/",
    ],
    areaServed: ["Uzbekistan", "CIS", "Worldwide"],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Premium tableware collections",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Exclusive vintage tableware",
        },
      },
    ],
  };
}
