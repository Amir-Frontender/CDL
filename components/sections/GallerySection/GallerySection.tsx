"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type WheelEvent } from "react";
import { X } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./GallerySection.module.css";

export function GallerySection({ t }: { t: Messages }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDesktopViewer, setIsDesktopViewer] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

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

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    function syncViewerMode() {
      setIsDesktopViewer(finePointer.matches);
    }

    syncViewerMode();
    finePointer.addEventListener("change", syncViewerMode);

    return () => {
      finePointer.removeEventListener("change", syncViewerMode);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  function clampPosition(nextPosition: { x: number; y: number }, scale = imageScale) {
    const stage = stageRef.current;
    if (!stage || scale <= 1) {
      return { x: 0, y: 0 };
    }

    const maxX = (stage.clientWidth * (scale - 1)) / 2;
    const maxY = (stage.clientHeight * (scale - 1)) / 2;

    return {
      x: Math.min(maxX, Math.max(-maxX, nextPosition.x)),
      y: Math.min(maxY, Math.max(-maxY, nextPosition.y)),
    };
  }

  function handleStageWheel(event: WheelEvent<HTMLDivElement>) {
    if (!isDesktopViewer) return;

    event.preventDefault();
    event.stopPropagation();

    setImageScale((currentScale) => {
      const nextScale = currentScale - event.deltaY * 0.0014;
      const clampedScale = Math.min(2.6, Math.max(1, Number(nextScale.toFixed(3))));
      setImagePosition((currentPosition) => clampPosition(currentPosition, clampedScale));
      return clampedScale;
    });
  }

  function handleLightboxWheel(event: WheelEvent<HTMLDivElement>) {
    if (!isDesktopViewer) return;

    event.preventDefault();
  }

  function openLightbox(index: number) {
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
    setLightbox(index);
  }

  function closeLightbox() {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    setLightbox(null);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!isDesktopViewer) return;

    event.preventDefault();
    event.stopPropagation();

    if (imageScale <= 1) return;

    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      originX: imagePosition.x,
      originY: imagePosition.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDesktopViewer) return;
    if (!dragRef.current.active) return;

    event.preventDefault();
    event.stopPropagation();

    const nextPosition = {
      x: dragRef.current.originX + event.clientX - dragRef.current.startX,
      y: dragRef.current.originY + event.clientY - dragRef.current.startY,
    };
    dragRef.current.moved =
      dragRef.current.moved ||
      Math.abs(event.clientX - dragRef.current.startX) > 4 ||
      Math.abs(event.clientY - dragRef.current.startY) > 4;

    setImagePosition(clampPosition(nextPosition));
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (!isDesktopViewer) return;
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleStageClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!isDesktopViewer) return;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }

    if (event.detail > 1) {
      return;
    }

    clickTimeoutRef.current = setTimeout(() => {
      closeLightbox();
    }, 320);
  }

  function handleStageDoubleClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!isDesktopViewer) return;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    if (imageScale > 1) {
      setImageScale(1);
      setImagePosition({ x: 0, y: 0 });
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const targetScale = 2.2;
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    setImageScale(targetScale);
    setImagePosition(
      clampPosition(
        {
          x: -offsetX * (targetScale - 1),
          y: -offsetY * (targetScale - 1),
        },
        targetScale,
      ),
    );
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
          onClick={closeLightbox}
          onWheel={handleLightboxWheel}
        >
          <button
            className={styles.close}
            type="button"
            onClick={closeLightbox}
            aria-label={t.actions.close}
            data-cursor-label={t.actions.close}
          >
            <X />
          </button>
          <div
            ref={stageRef}
            className={[
              styles.stage,
              isDesktopViewer ? styles.desktopStage : "",
              isDesktopViewer && imageScale > 1 ? styles.zoomed : "",
            ]
              .filter(Boolean)
              .join(" ")}
            role="presentation"
            onClick={isDesktopViewer ? handleStageClick : (event) => event.stopPropagation()}
            onDoubleClick={isDesktopViewer ? handleStageDoubleClick : undefined}
            onWheel={isDesktopViewer ? handleStageWheel : undefined}
            onPointerDown={isDesktopViewer ? handlePointerDown : undefined}
            onPointerMove={isDesktopViewer ? handlePointerMove : undefined}
            onPointerUp={isDesktopViewer ? handlePointerEnd : undefined}
            onPointerCancel={isDesktopViewer ? handlePointerEnd : undefined}
          >
            <Image
              src={galleryItems[lightbox].src}
              alt={t.gallery.items[galleryItems[lightbox].id]}
              fill
              sizes="(max-width: 620px) 100vw, 92vw"
              priority
              draggable={false}
              style={{
                transform: isDesktopViewer
                  ? `translate3d(${imagePosition.x}px, ${imagePosition.y}px, 0) scale(${imageScale})`
                  : undefined,
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
