"use client";

import { Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { testimonialItems } from "@/data/section-items";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./TestimonialsSection.module.css";

export function TestimonialsSection({ t }: { t: Messages }) {
  return (
    <section className={`${styles.testimonials} section`}>
      <AnimatedSection>
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
      </AnimatedSection>
      <AnimatedSection>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={18}
          slidesPerView={1}
          breakpoints={{ 860: { slidesPerView: 3 } }}
          className={styles.swiper}
          data-cursor="drag"
          data-cursor-label={t.cursor.drag}
        >
          {testimonialItems.map((id) => {
            const item = t.testimonials.items[id];
            return (
              <SwiperSlide key={id}>
                <article className={styles.card}>
                  <Sparkles aria-hidden />
                  <p>&ldquo;{item.quote}&rdquo;</p>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </AnimatedSection>
    </section>
  );
}
