import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/api/embed/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // or use "SAMEORIGIN" if you want to restrict it
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *", // or set specific domain instead of *
          },
        ],
      },
    ];
  },
};

export default nextConfig;
