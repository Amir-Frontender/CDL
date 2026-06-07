import { statsItems } from "@/data/stats";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { Counter } from "@/components/ui/Counter/Counter";
import styles from "./StatsSection.module.css";

export function StatsSection({ t }: { t: Messages }) {
  return (
    <section className={styles.statistics}>
      <div className={styles.grid}>
        {statsItems.map((item) => (
          <AnimatedSection className={styles.card} key={item.id}>
            <Counter value={item.value} suffix={item.suffix} />
            <p>{t.stats[item.id]}</p>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
