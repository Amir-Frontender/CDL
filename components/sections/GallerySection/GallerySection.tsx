"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./GallerySection.module.css";

export function GallerySection({ t }: { t: Messages }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className={`${styles.gallerySection} section`} id="gallery">
      <AnimatedSection>
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title}>
          <p>{t.gallery.body}</p>
        </SectionHeading>
      </AnimatedSection>

      <div className={styles.masonry}>
        {galleryItems.map((item, index) => (
          <AnimatedSection key={item.id}>
            <button
              className={"tall" in item ? `${styles.tile} ${styles.tall}` : styles.tile}
              type="button"
              onClick={() => setLightbox(index)}
            >
              <Image
                src={item.src}
                alt={t.gallery.items[item.id]}
                fill
                sizes="(max-width: 620px) calc(100vw - 36px), (max-width: 860px) 50vw, 25vw"
              />
            </button>
          </AnimatedSection>
        ))}
      </div>

      {lightbox !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={t.actions.closeGallery}>
          <button className={styles.close} type="button" onClick={() => setLightbox(null)} aria-label={t.actions.close}>
            <X />
          </button>
          <button
            className={styles.stage}
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={t.actions.closeGallery}
          >
            <Image
              src={galleryItems[lightbox].src}
              alt={t.gallery.items[galleryItems[lightbox].id]}
              fill
              sizes="(max-width: 620px) 100vw, 92vw"
              priority
            />
          </button>
        </div>
      )}
    </section>
  );
}
