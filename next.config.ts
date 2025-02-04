import type { NextConfig } from 'next'

// Debug log during build
console.log('Next.js Build Environment Check:', {
  hasYoutubeKey: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  hasAdminHash: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH,
  publicVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')),
  youtubeKeyLength: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY?.length ?? 0,
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
  },
  // Ensure these are preserved even if configure-pages tries to modify them
  basePath: '',
  assetPrefix: ''
}

export default nextConfig