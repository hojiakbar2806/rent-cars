import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "146.190.158.46",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
