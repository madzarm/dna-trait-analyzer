import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  // Allow DNA files up to 50MB through middleware
  middlewareClientMaxBodySize: "50mb" as unknown,
} as NextConfig;

export default nextConfig;
