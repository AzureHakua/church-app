import baseConfig from './next.config.base.js'
import type { NextConfig } from 'next'

// Debug log during build
console.log('Next.js Build Environment:', {
  hasYoutubeKey: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  hasAdminHash: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH,
  publicVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')),
});

const config: NextConfig = {
  ...baseConfig,
  // Any additional config you need
}

export default config