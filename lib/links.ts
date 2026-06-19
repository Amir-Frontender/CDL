import type { Locale } from "@/lib/i18n";

export const telegramAdmin = "https://t.me/CDL_admin";
export const telegramMain = "https://t.me/casadilusso_uzb";
export const telegramVintage = "https://t.me/casadilussovintage";
export const instagram = "https://www.instagram.com/casadilusso.uzb/";
export const supportEmail = "support@casadilusso.uz";
export const supportEmailHref = `mailto:${supportEmail}`;
export const whatsapp =
  "https://api.whatsapp.com/send?text=Hello%20Casa%20di%20Lusso%2C%20I%20would%20like%20to%20view%20the%20collection.";

export function orderHref(locale: Locale) {
  const text =
    locale === "ru"
      ? "Здравствуйте! Хочу посмотреть коллекцию Casa di Lusso."
      : locale === "uz"
        ? "Salom! Casa di Lusso kolleksiyasini ko'rmoqchiman."
        : "Hello! I would like to view the Casa di Lusso collection.";

  return `${telegramAdmin}?text=${encodeURIComponent(text)}`;
}
