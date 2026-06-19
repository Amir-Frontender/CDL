import type { ReactNode } from "react";
import { inter, playfair } from "@/app/fonts";
import "@/app/globals.css";

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="mailru-domain" content="ffxviVrVpQp0ARgF" />
        <meta httpEquiv="refresh" content="3;url=/ru/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
