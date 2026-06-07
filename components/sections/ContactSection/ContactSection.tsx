import { Camera, MessageCircle, Send } from "lucide-react";
import { instagram, telegramMain, whatsapp } from "@/lib/links";
import type { Messages } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/AnimatedSection/AnimatedSection";
import styles from "./ContactSection.module.css";

export function ContactSection({ t }: { t: Messages }) {
  return (
    <section className={`${styles.contact} section`} id="contacts">
      <AnimatedSection>
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2>{t.contact.title}</h2>
        <p>{t.contact.body}</p>
        <div className={styles.actions}>
          <a href={telegramMain} target="_blank" rel="noreferrer">
            <Send />
            {t.actions.telegram}
          </a>
          <a href={instagram} target="_blank" rel="noreferrer">
            <Camera />
            {t.actions.instagram}
          </a>
          <a href={whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle />
            {t.actions.whatsapp}
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}
