import Image from "next/image";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./BeforeAfterSection.module.css";

export function BeforeAfterSection({ t }: { t: Messages }) {
  return (
    <section className={`${styles.compare} section`}>
      <AnimatedSection>
        <SectionHeading eyebrow={t.beforeAfter.eyebrow} title={t.beforeAfter.title} centered />
      </AnimatedSection>
      <div className={styles.grid}>
        <AnimatedSection className={styles.panel}>
          <Image src="/images/tea-set.jpg" alt={t.beforeAfter.before} fill sizes="(max-width: 860px) 100vw, 50vw" />
          <div>
            <span>{t.beforeAfter.before}</span>
            <p>{t.beforeAfter.beforeText}</p>
          </div>
        </AnimatedSection>
        <AnimatedSection className={styles.panel}>
          <Image src="/images/vintage-green-table.jpg" alt={t.beforeAfter.after} fill sizes="(max-width: 860px) 100vw, 50vw" />
          <div>
            <span>{t.beforeAfter.after}</span>
            <p>{t.beforeAfter.afterText}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
