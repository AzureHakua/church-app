'use client'

import { useEffect, useState } from 'react';

export default function LatestYoutubeVideo() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestVideo() {
      // Debug logging
      console.log('Environment check:', {
        hasKey: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        envVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')),
      });

      if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
        setError('YouTube API key is not configured');
        setIsLoading(false);
        return;
      }

      try {
        const CHANNEL_ID = 'UC0vf874o7o51DV2gHkZOq8A';
        const CACHE_KEY = 'youtube_latest_video';
        const CACHE_DURATION = 3600000;

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
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const newVideoId = data.items?.[0]?.id?.videoId;
        
        if (!newVideoId) {
          throw new Error('No video found');
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          videoId: newVideoId,
          timestamp: Date.now()
        }));

        if (isMounted) {
          setVideoId(newVideoId);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load video');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLatestVideo();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (!videoId) return <div className="text-center p-4">No video available</div>;

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1`}
        title="Latest YouTube Video"
        className="w-full h-full rounded-lg border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}