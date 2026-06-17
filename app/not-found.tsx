import type { Metadata } from "next";
import { NotFoundExperience } from "@/components/sections/NotFoundExperience/NotFoundExperience";
import { defaultLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "404 | Casa di Lusso",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GlobalNotFound() {
  return <NotFoundExperience locale={defaultLocale} />;
}
