import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Django media URLs like http://127.0.0.1:8000/media/... in development
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
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