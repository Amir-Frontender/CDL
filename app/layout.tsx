import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = "https://casadilusso.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Casa di Lusso | Premium Tableware & Vintage Collections",
    template: "%s | Casa di Lusso",
  },
  description:
    "Curated luxury tableware, premium porcelain, European brands and exclusive vintage pieces for elegant living.",
  applicationName: "Casa di Lusso",
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
  authors: [{ name: "Casa di Lusso" }],
  creator: "Casa di Lusso",
  publisher: "Casa di Lusso",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Casa di Lusso",
    title: "Casa di Lusso | Premium Tableware & Vintage Collections",
    description:
      "Curated luxury tableware and timeless vintage pieces for elegant living.",
    images: [
      {
        url: "/images/hero-service.jpg",
        width: 1200,
        height: 630,
        alt: "Casa di Lusso premium table setting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa di Lusso | Premium Tableware & Vintage Collections",
    description:
      "Curated luxury tableware and timeless vintage pieces for elegant living.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Casa di Lusso",
    url: siteUrl,
    image: `${siteUrl}/images/hero-service.jpg`,
    description:
      "Curated luxury tableware, premium porcelain and exclusive vintage pieces.",
    brand: {
      "@type": "Brand",
      name: "Casa di Lusso",
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

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
