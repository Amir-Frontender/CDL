"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import styles from "./LocaleSwitcher.module.css";

type LocaleSwitcherProps = {
  locale: Locale;
};

const switcherLocales: Array<{ value: Locale; label: string }> = [
  { value: "ru", label: "RU" },
  { value: "en", label: "EN" },
  { value: "uz", label: "UZ" },
];

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;

    const scrollY = window.scrollY;
    router.push(`/${nextLocale}`, { scroll: false });
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: scrollY, left: 0, behavior: "auto" })));
  }

  return (
    <div className={styles.localeSwitcher} aria-label="Language switcher">
      {switcherLocales.map((item) => (
        <button
          className={locale === item.value ? styles.active : ""}
          disabled={locale === item.value}
          key={item.value}
          type="button"
          onClick={() => changeLocale(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
