import Image from "next/image";
import { featuredBrands } from "@/data/brands";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import styles from "./FeaturedBrandsSection.module.css";

export function FeaturedBrandsSection({ t }: { t: Messages }) {
  return (
    <AnimatedSection className={`${styles.logoWall} section`}>
      <p className="eyebrow">{t.brands.eyebrow}</p>
      <h2>{t.brands.title}</h2>
      <div className={styles.carousel} aria-label={t.brands.eyebrow}>
        <div className={styles.track}>
          {[...featuredBrands, ...featuredBrands].map((brand, index) => (
            <div className={styles.logoCard} key={`${brand.name}-${index}`} aria-hidden={index >= featuredBrands.length}>
              <Image
                src={brand.logo}
                alt={index < featuredBrands.length ? brand.name : ""}
                width={brand.width}
                height={brand.height}
              />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
