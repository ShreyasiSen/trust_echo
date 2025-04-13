import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/api/embed/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // Allow embedding from any site
            value: "frame-ancestors *",
            
          },
        ],
      },
    ];
  },
};

export default nextConfig;
