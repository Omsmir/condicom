import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    turbo: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // The domain of the image source
        port: '', // Leave empty if not using a specific port
        pathname: '/images/**', // Define the path pattern
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Example for Firebase
      },
      {
        hostname:"picsum.photos"
      }
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: isProd ? "http:backend:8080" : "http://localhost:8080",
  },
};

export default nextConfig;
