import { BadgeCheck, Gem, ShieldCheck, Truck } from "lucide-react";
import { whyItems } from "@/data/section-items";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./WhyCasaSection.module.css";

const icons = {
  curated: BadgeCheck,
  vintage: Gem,
  brands: ShieldCheck,
  delivery: Truck,
};

export function WhyCasaSection({ t }: { t: Messages }) {
  return (
    <section className={`${styles.why} section`} id="why">
      <AnimatedSection>
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} centered />
      </AnimatedSection>
      <div className={styles.grid}>
        {whyItems.map((id) => {
          const Icon = icons[id];
          const item = t.why.items[id];
          return (
            <AnimatedSection className={styles.card} key={id}>
              <Icon aria-hidden />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
