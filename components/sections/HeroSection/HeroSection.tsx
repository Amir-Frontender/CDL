"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Locale, Messages } from "@/lib/i18n";
import { orderHref } from "@/lib/links";
import { Button } from "@/components/ui/Button/Button";
import styles from "./HeroSection.module.css";

type HeroSectionProps = {
  locale: Locale;
  t: Messages;
};

export function HeroSection({ locale, t }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section className={styles.hero} id="top" ref={heroRef}>
      <motion.div className={styles.image} style={{ y: heroY, scale: heroScale }}>
        <Image src="/images/hero-service.jpg" alt={t.metadata.ogAlt} fill priority sizes="100vw" />
      </motion.div>
      <div className={styles.overlay} />
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p className={styles.lead}>{t.hero.lead}</p>
        <div className={styles.actions}>
          <Button href="#collection">
            {t.actions.exploreCollection}
            <ArrowUpRight size={17} />
          </Button>
          <Button href={orderHref(locale)} target="_blank" rel="noreferrer" variant="ghost">
            {t.actions.contactUs}
          </Button>
        </div>
      </motion.div>
      <div className={styles.scroll}>{t.hero.scroll}</div>
    </section>
  );
}
