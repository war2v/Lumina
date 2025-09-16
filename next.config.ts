import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'vnfootxjsdsbkznjbvpp.supabase.co',
      }
    ]
     
  }
};

export default nextConfig;
