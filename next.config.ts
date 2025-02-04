import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
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

console.log('Next.js Config Environment Check:', {
  youtubeKeyExists: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  adminHashExists: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH,
});

export default nextConfig