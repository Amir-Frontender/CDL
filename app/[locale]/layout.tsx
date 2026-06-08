import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { inter, playfair } from "@/app/fonts";
import "@/app/globals.css";
import { LuxuryCursor } from "@/components/ui/LuxuryCursor/LuxuryCursor";
import { buildMetadata, buildStructuredData } from "@/lib/seo";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return buildMetadata(locale, getMessages(locale));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale as Locale);
  const structuredData = buildStructuredData(t);

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <LuxuryCursor labels={t.cursor} />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
