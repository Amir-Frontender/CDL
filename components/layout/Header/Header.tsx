import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { localeLabels, locales, type Locale, type Messages } from "@/lib/i18n";
import { navigationItems } from "@/data/navigation";
import { orderHref } from "@/lib/links";
import styles from "./Header.module.css";

type HeaderProps = {
  locale: Locale;
  t: Messages;
};

export function Header({ locale, t }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href={`/${locale}#top`} aria-label={t.brand.name}>
        <Image src="/images/brand-mark.png" alt="" width={34} height={46} priority />
        <span>{t.brand.name}</span>
      </Link>

      <nav className={styles.nav} aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <Link href={`/${locale}${item.href}`} key={item.id}>
            {t.navigation[item.id]}
          </Link>
        ))}
      </nav>

      <div className={styles.localeSwitcher} aria-label="Language switcher">
        {locales.map((item) => (
          <Link className={locale === item ? styles.active : ""} href={`/${item}`} key={item}>
            {localeLabels[item]}
          </Link>
        ))}
      </div>

      <a className={styles.action} href={orderHref(locale)} target="_blank" rel="noreferrer">
        <Send size={16} />
        <span>{t.actions.telegram}</span>
      </a>
    </header>
  );
}
