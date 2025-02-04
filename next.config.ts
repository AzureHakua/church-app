import type { NextConfig } from 'next'

console.log('Next.js Build Environment:', {
  hasYoutubeKey: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  hasAdminHash: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH,
  publicVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')),
});

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    NEXT_PUBLIC_ADMIN_PASSWORD_HASH: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig