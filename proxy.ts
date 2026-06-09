import { NextRequest, NextResponse } from "next/server";

const telegramPreviewVersion = "20260609";
const telegramBotPattern = /TelegramBot/i;
const staleTelegramLocales = new Set(["/ru", "/ru/", "/en", "/en/"]);

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") ?? "";

  if (
    telegramBotPattern.test(userAgent) &&
    staleTelegramLocales.has(pathname) &&
    !searchParams.has("tg_og")
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.set("tg_og", telegramPreviewVersion);
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ru/:path*", "/en/:path*"],
};
