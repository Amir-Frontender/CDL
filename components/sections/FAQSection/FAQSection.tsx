import { faqItems } from "@/data/section-items";
import type { Messages } from "@/lib/i18n";
import { Accordion } from "@/components/ui/Accordion/Accordion";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./FAQSection.module.css";

export function FAQSection({ t }: { t: Messages }) {
  const items = faqItems.map((id) => t.faq.items[id]);

  return (
    <section className={`${styles.faq} section`}>
      <AnimatedSection>
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
      </AnimatedSection>
      <AnimatedSection>
        <Accordion items={items} />
      </AnimatedSection>
    </section>
  );
}
