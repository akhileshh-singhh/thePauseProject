import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Allows images to load if they are coming through the tunnel
      {
        protocol: "https",
        hostname: "**.ngrok-free.dev",
      },
    ],
  },
  // This helps Next.js recognize the ngrok address as a valid host
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;