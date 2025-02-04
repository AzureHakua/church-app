import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || 'not-set',
    NEXT_PUBLIC_ADMIN_PASSWORD_HASH: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH || 'not-set',
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

if (process.env.NODE_ENV !== 'production') {
  console.log('Next.js Config Environment Variables:', {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ? 'set' : 'not-set',
    adminHash: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH ? 'set' : 'not-set',
    env: process.env.NODE_ENV,
  });
}

export default nextConfig