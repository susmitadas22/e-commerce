import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "loremflickr.com" },
      { hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
