import type { NextConfig } from 'next'

// Add build-time logging
console.log('Build-time environment check:', {
  hasYoutubeKey: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  keyLength: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY?.length,
});

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig