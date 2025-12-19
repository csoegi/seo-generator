import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: '7qbb6tluxkzf6t8y.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ignore lint build error
  },
  typescript: {
    ignoreBuildErrors: true, // ignore typescript build error
  }
};

export default nextConfig;
