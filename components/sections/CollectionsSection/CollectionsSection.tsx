import Image from "next/image";
import { collectionItems } from "@/data/collections";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./CollectionsSection.module.css";

export function CollectionsSection({ t }: { t: Messages }) {
  return (
    <section className="section" id="collection">
      <AnimatedSection>
        <SectionHeading eyebrow={t.collections.eyebrow} title={t.collections.title}>
          <p>{t.collections.body}</p>
        </SectionHeading>
      </AnimatedSection>

      <div className={styles.grid}>
        {collectionItems.map((item) => {
          const content = t.collections.items[item.id];
          return (
            <AnimatedSection className={styles.card} key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={content.title}
                data-cursor="card"
                data-cursor-label={t.cursor.explore}
              >
                <div className={styles.image}>
                  <Image
                    src={item.image}
                    alt={content.title}
                    fill
                    sizes="(max-width: 620px) calc(100vw - 36px), (max-width: 1080px) 50vw, 33vw"
                  />
                  <span>{t.actions.viewDetails}</span>
                </div>
                <div className={styles.copy}>
                  <span>{content.meta}</span>
                  <h3>{content.title}</h3>
                  <p>{content.price}</p>
                </div>
              </a>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
