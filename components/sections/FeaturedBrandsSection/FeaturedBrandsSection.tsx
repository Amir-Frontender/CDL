import { featuredBrands } from "@/data/brands";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import styles from "./FeaturedBrandsSection.module.css";

export function FeaturedBrandsSection({ t }: { t: Messages }) {
  return (
    <AnimatedSection className={`${styles.logoWall} section`}>
      <p className="eyebrow">{t.brands.eyebrow}</p>
      <h2>{t.brands.title}</h2>
      <div className={styles.wall} aria-label={t.brands.eyebrow}>
        {featuredBrands.map((brand) => (
          <span key={brand}>{brand}</span>
        ))}
      </div>
    </AnimatedSection>
  );
}
