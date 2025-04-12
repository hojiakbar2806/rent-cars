import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  serverActions: {
    bodySizeLimit: "10mb", 
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rent-cars.hojiakbar.me",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
