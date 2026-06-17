import { notFound } from "next/navigation";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { HeroSection } from "@/components/sections/HeroSection/HeroSection";
import { StorySection } from "@/components/sections/StorySection/StorySection";
import { CollectionsSection } from "@/components/sections/CollectionsSection/CollectionsSection";
import { WhyCasaSection } from "@/components/sections/WhyCasaSection/WhyCasaSection";
import { TrustSection } from "@/components/sections/TrustSection/TrustSection";
import { FeaturedBrandsSection } from "@/components/sections/FeaturedBrandsSection/FeaturedBrandsSection";
import { GallerySection } from "@/components/sections/GallerySection/GallerySection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection/BeforeAfterSection";
import { StatsSection } from "@/components/sections/StatsSection/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection/ContactSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton/BackToTopButton";
import { buildStructuredData } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const activeLocale = locale as Locale;
  const t = getMessages(activeLocale);
  const structuredData = buildStructuredData(t, activeLocale);

  return (
    <>
      <SmoothScroll />
      <Header locale={activeLocale} t={t} />
      <main>
        <HeroSection locale={activeLocale} t={t} />
        <StorySection t={t} />
        <CollectionsSection t={t} />
        <div className="section-divider" aria-hidden="true" />
        <WhyCasaSection t={t} />
        <TrustSection t={t} />
        <FeaturedBrandsSection t={t} />
        <GallerySection t={t} />
        <BeforeAfterSection t={t} />
        <StatsSection t={t} />
        <TestimonialsSection t={t} />
        <FAQSection t={t} />
        <ContactSection t={t} />
      </main>
      <Footer locale={activeLocale} t={t} />
      <BackToTopButton label={t.actions.backToTop} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
