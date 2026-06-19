import type { ReactNode } from "react";
import { inter, playfair } from "@/app/fonts";
import "@/app/globals.css";

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <meta name="mailru-domain" content="ffxviVrVpQp0ARgF" />
      <body>{children}</body>
    </html>
  );
}
