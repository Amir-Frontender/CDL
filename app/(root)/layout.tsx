import type { ReactNode } from "react";
import { inter, playfair } from "@/app/fonts";
import "@/app/globals.css";

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
