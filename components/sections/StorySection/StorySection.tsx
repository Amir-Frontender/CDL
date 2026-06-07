import Image from "next/image";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import styles from "./StorySection.module.css";

export function StorySection({ t }: { t: Messages }) {
  return (
    <section className={`${styles.story} section`}>
      <AnimatedSection className={styles.kicker}>{t.story.kicker}</AnimatedSection>
      <AnimatedSection className={styles.copy}>
        <p className="eyebrow">{t.story.eyebrow}</p>
        <h2>{t.story.title}</h2>
        <p>{t.story.body}</p>
        <p>{t.story.note}</p>
      </AnimatedSection>
      <AnimatedSection className={styles.media}>
        <Image src="/images/spring-table.jpg" alt={t.gallery.items.springTable} fill sizes="(max-width: 860px) 100vw, 42vw" />
      </AnimatedSection>
    </section>
  );
}
