'use client'

import { useEffect, useState } from 'react';

export default function YouTubeEmbed() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestVideo() {
      // Compare both environment variables
      console.log('Environment Variables Status:', {
        youtube: {
          exists: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          value: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY?.substring(0, 3) + '...',  // Only log first 3 chars for security
          type: typeof process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        },
        adminHash: {
          exists: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH,
          value: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH ? 'exists' : 'missing',
          type: typeof process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH
        },
        allEnvVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_'))
      });

      if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
        setError('YouTube API key is not configured');
        setIsLoading(false);
        return;
      }

      try {
        const CHANNEL_ID = 'UC0vf874o7o51DV2gHkZOq8A';
        const CACHE_KEY = 'youtube_latest_video';
        const CACHE_DURATION = 3600000; // 1 hour

        // Check cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { videoId, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
              setVideoId(videoId);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            localStorage.removeItem(CACHE_KEY);
          }
        }

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
        );

        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();

        // Check if data.items exists and has content
        if (!data.items || data.items.length === 0) {
          throw new Error('No videos found for this channel');
        }

        const newVideoId = data.items[0]?.id?.videoId;
        if (!newVideoId) {
          throw new Error('Invalid video data received');
        }

        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          videoId: newVideoId,
          timestamp: Date.now()
        }));

        if (isMounted) {
          setVideoId(newVideoId);
        }
      } catch (err) {
        console.error('YouTube fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load video');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLatestVideo();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-4">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-4 text-red-500">Error: {error}</div>
    </div>
  );

  if (!videoId) return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-4">No video available</div>
    </div>
  );

  return (
    <div className="w-full h-full aspect-w-16 aspect-h-9">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1`}
        title="Latest YouTube Video"
        className="w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}