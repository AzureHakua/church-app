import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || 'TEST_KEY',
    NEXT_PUBLIC_ADMIN_PASSWORD_HASH: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

// Debug at build time
console.log('Build-time env check:', {
  hasYoutubeKey: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  youtubeKeyType: typeof process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  hasAdminHash: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH,
});

export default nextConfig