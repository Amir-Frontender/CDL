import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ru/",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/cdl-telegram-:slug.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
