"use client";

import Image from "next/image";
import { useEffect, useState, type WheelEvent } from "react";
import { X } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./GallerySection.module.css";

export function GallerySection({ t }: { t: Messages }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imageScale, setImageScale] = useState(1);

  useEffect(() => {
    if (lightbox === null) return;

    const scrollY = window.scrollY;
    const bodyOverflow = document.body.style.overflow;
    const bodyPosition = document.body.style.position;
    const bodyTop = document.body.style.top;
    const bodyWidth = document.body.style.width;
    const htmlOverflow = document.documentElement.style.overflow;
    window.dispatchEvent(new CustomEvent("cdl:scroll-lock", { detail: { locked: true } }));

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.body.style.position = bodyPosition;
      document.body.style.top = bodyTop;
      document.body.style.width = bodyWidth;
      document.documentElement.style.overflow = htmlOverflow;
      window.dispatchEvent(new CustomEvent("cdl:scroll-lock", { detail: { locked: false } }));
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };
  }, [lightbox]);

  function handleLightboxWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    setImageScale((currentScale) => {
      const nextScale = currentScale - event.deltaY * 0.0014;
      return Math.min(2.6, Math.max(1, Number(nextScale.toFixed(3))));
    });
  }

  function openLightbox(index: number) {
    setImageScale(1);
    setLightbox(index);
  }

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
              onClick={() => openLightbox(index)}
              data-cursor="media"
              data-cursor-label={t.cursor.view}
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
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t.actions.closeGallery}
          onWheel={handleLightboxWheel}
        >
          <button
            className={styles.close}
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={t.actions.close}
            data-cursor-label={t.actions.close}
          >
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
              style={{ transform: `scale(${imageScale})` }}
            />
          </button>
        </div>
      )}
    </section>
  );
}
