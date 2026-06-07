import { ImageResponse } from "next/og";
import { defaultLocale, getMessages, isLocale } from "@/lib/i18n";
import { getOgAssetUrl, ogContentType, ogSize } from "@/lib/og";

export const alt = "Casa di Lusso premium tableware social preview";
export const size = ogSize;
export const contentType = ogContentType;

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const t = getMessages(activeLocale);
  const imageUrl = getOgAssetUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#F5EFE6",
          color: "#0F0E0C",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(245,239,230,1) 0%, rgba(245,239,230,0.98) 42%, rgba(15,14,12,0.08) 57%, rgba(15,14,12,0.36) 100%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          width={660}
          height={630}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 660,
            height: 630,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 83% 25%, rgba(255,255,255,0.18), transparent 28%), linear-gradient(180deg, rgba(15,14,12,0.02), rgba(15,14,12,0.18))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 64,
            width: 520,
            height: 500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "42px 0",
          }}
        >
          <div
            style={{
              width: 86,
              height: 2,
              background: "#B99A5B",
              marginBottom: 34,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 92,
              lineHeight: 0.9,
              letterSpacing: 0,
              color: "#0F0E0C",
              marginBottom: 30,
            }}
          >
            {t.og.title}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 470,
              fontSize: 30,
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6F1D1B",
              marginBottom: 22,
            }}
          >
            {t.og.subtitle}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 440,
              fontSize: 25,
              lineHeight: 1.35,
              color: "#3A332B",
            }}
          >
            {t.og.tagline}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 58,
            width: 150,
            height: 1,
            background: "rgba(185,154,91,0.72)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 26,
            border: "1px solid rgba(185,154,91,0.34)",
          }}
        />
      </div>
    ),
    {
      ...ogSize,
    },
  );
}
