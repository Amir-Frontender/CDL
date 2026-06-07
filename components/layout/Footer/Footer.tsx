import Image from "next/image";
import Link from "next/link";
import { Camera, Gem, MessageCircle, Send } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import type { Locale, Messages } from "@/lib/i18n";
import { instagram, telegramMain, telegramVintage, whatsapp } from "@/lib/links";
import styles from "./Footer.module.css";

type FooterProps = {
  locale: Locale;
  t: Messages;
};

export function Footer({ locale, t }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Link className={styles.brand} href={`/${locale}#top`} aria-label={t.brand.name}>
        <Image src="/images/brand-mark.png" alt="" width={40} height={54} />
        <span>{t.brand.name}</span>
      </Link>

      <div className={styles.links}>
        {navigationItems.map((item) => (
          <Link href={`/${locale}${item.href}`} key={item.id}>
            {t.navigation[item.id]}
          </Link>
        ))}
      </div>

      <div className={styles.social}>
        <a href={telegramMain} target="_blank" rel="noreferrer" aria-label={t.actions.telegram}>
          <Send size={18} />
        </a>
        <a href={instagram} target="_blank" rel="noreferrer" aria-label={t.actions.instagram}>
          <Camera size={18} />
        </a>
        <a href={telegramVintage} target="_blank" rel="noreferrer" aria-label="Vintage Telegram">
          <Gem size={18} />
        </a>
        <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={t.actions.whatsapp}>
          <MessageCircle size={18} />
        </a>
      </div>

      <p>{t.footer.copyright}</p>
    </footer>
  );
}
