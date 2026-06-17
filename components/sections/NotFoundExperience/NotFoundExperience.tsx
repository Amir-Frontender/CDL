"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Button } from "@/components/ui/Button/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { LuxuryCursor } from "@/components/ui/LuxuryCursor/LuxuryCursor";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { orderHref } from "@/lib/links";
import styles from "./NotFoundExperience.module.css";

const featuredCards = [
  {
    id: "modern",
    image: "/images/green-table.jpg",
  },
  {
    id: "vintage",
    image: "/images/vintage-pink-set.jpg",
  },
  {
    id: "exclusive",
    image: "/images/art-plates.jpg",
  },
  {
    id: "newArrivals",
    image: "/images/spring-table.jpg",
  },
] as const;

function getLocaleFromPathname(pathname: string, fallbackLocale: Locale): Locale {
  const candidate = pathname.split("/").filter(Boolean)[0];
  return isLocale(candidate) ? candidate : fallbackLocale;
}

type NotFoundExperienceProps = {
  locale: Locale;
  includeCursor?: boolean;
};

export function NotFoundExperience({ locale: fallbackLocale, includeCursor = false }: NotFoundExperienceProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname, fallbackLocale);
  const t = getMessages(locale);
  const homeHref = `/${locale}`;
  const collectionHref = `/${locale}#collection`;
  const contactHref = orderHref(locale);

  return (
    <div className={styles.shell}>
      <SmoothScroll />
      {includeCursor ? <LuxuryCursor labels={t.cursor} /> : null}
      <Header locale={locale} t={t} />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="not-found-title">
          <div className={styles.media}>
            <Image
              src="/images/hero-service.jpg"
              alt={t.notFound.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>

          <AnimatedSection className={styles.copy}>
            <p className={styles.eyebrow}>{t.notFound.eyebrow}</p>
            <h1 id="not-found-title">404</h1>
            <h2>{t.notFound.title}</h2>
            <p>{t.notFound.body}</p>
            <p>{t.notFound.invitation}</p>

            <div className={styles.actions}>
              <Button href={collectionHref} data-cursor-label={t.cursor.explore}>
                {t.notFound.actions.explore}
                <ArrowRight size={16} />
              </Button>
              <Button href={homeHref} variant="dark" data-cursor-label={t.cursor.open}>
                {t.notFound.actions.home}
                <Home size={16} />
              </Button>
              <Button href={contactHref} variant="dark" target="_blank" rel="noreferrer" data-cursor-label={t.cursor.contact}>
                {t.notFound.actions.contact}
                <Send size={16} />
              </Button>
            </div>
          </AnimatedSection>
        </section>

        <section className={styles.featured} aria-labelledby="featured-collections-title">
          <AnimatedSection className={styles.heading}>
            <p>{t.notFound.featured.eyebrow}</p>
            <h2 id="featured-collections-title">{t.notFound.featured.title}</h2>
          </AnimatedSection>

          <div className={styles.grid}>
            {featuredCards.map((card, index) => {
              const content = t.notFound.featured.items[card.id];

              return (
                <AnimatedSection className={styles.card} delay={index * 0.08} key={card.id}>
                  <Link href={collectionHref} data-cursor="card" data-cursor-label={t.cursor.explore}>
                    <div className={styles.cardImage}>
                      <Image
                        src={card.image}
                        alt={content.title}
                        fill
                        sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      />
                    </div>
                    <div className={styles.cardCopy}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{content.title}</h3>
                      <p>{content.text}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </section>
      </main>
      <div className={styles.footerFrame}>
        <Footer locale={locale} t={t} />
      </div>
    </div>
  );
}
