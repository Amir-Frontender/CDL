import { BadgeCheck } from "lucide-react";
import { trustItems } from "@/data/section-items";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./TrustSection.module.css";

export function TrustSection({ t }: { t: Messages }) {
  return (
    <section className={`${styles.trust} section`}>
      <AnimatedSection>
        <SectionHeading eyebrow={t.trust.eyebrow} title={t.trust.title} />
      </AnimatedSection>
      <div className={styles.list}>
        {trustItems.map((id) => (
          <AnimatedSection className={styles.item} key={id}>
            <BadgeCheck aria-hidden />
            <span>{t.trust.items[id]}</span>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
