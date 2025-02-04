'use client'

import { useEffect, useState } from 'react';

export default function LatestYoutubeVideo() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestVideo() {
      // Debug logging at start of fetch
      console.log('YouTube Component Environment:', {
        hasApiKey: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        apiKeyLength: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY?.length ?? 0,
        envVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')),
        timestamp: new Date().toISOString(),
      });

      try {
        const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const CHANNEL_ID = 'UC0vf874o7o51DV2gHkZOq8A';
        const CACHE_KEY = 'youtube_latest_video';
        const CACHE_DURATION = 3600000; // 1 hour in milliseconds

        if (!YOUTUBE_API_KEY) {
          console.error('API Key Missing:', {
            timestamp: new Date().toISOString(),
            envVars: Object.keys(process.env),
          });
          throw new Error('YouTube API key is not configured');
        }

        // Check cache
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const { videoId, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
              if (isMounted) {
                setVideoId(videoId);
                setIsLoading(false);
                setError(null);
              }
              return;
            }
          }
        } catch (cacheError) {
          console.error('Cache error:', cacheError);
          localStorage.removeItem(CACHE_KEY);
        }

        // Fetch new data
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`YouTube API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        
        if (!data.items?.[0]?.id?.videoId) {
          throw new Error('No video ID found in response');
        }

        const newVideoId = data.items[0].id.videoId;

        // Update cache
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            videoId: newVideoId,
            timestamp: Date.now()
          }));
        } catch (cacheError) {
          console.error('Failed to cache video ID:', cacheError);
        }

        if (isMounted) {
          setVideoId(newVideoId);
          setError(null);
        }
      } catch (error) {
        console.error('Error Debug:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
          type: error instanceof Error ? error.constructor.name : typeof error,
        });
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Failed to load video');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLatestVideo();
    const interval = setInterval(fetchLatestVideo, 3600000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!videoId) return <div>No video available</div>;

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1`}
        title="Latest YouTube Video"
        className="border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}