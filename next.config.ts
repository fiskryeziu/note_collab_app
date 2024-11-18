import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
