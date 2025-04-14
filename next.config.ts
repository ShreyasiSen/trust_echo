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
module.exports = {
  images: {
    domains: ['baidyabatibookings.s3.ap-south-1.amazonaws.com'], // Replace with your S3 bucket domain
  },
};
export default nextConfig;
