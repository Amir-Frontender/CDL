import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import uz from "@/messages/uz.json";

export const locales = ["ru", "en", "uz"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  uz: "UZ",
};

export const messages = {
  ru,
  en,
  uz,
} satisfies Record<Locale, typeof en>;

export type Messages = typeof en;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
