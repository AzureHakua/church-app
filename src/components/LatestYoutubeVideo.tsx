'use client'

import { useEffect, useState } from 'react';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UC0vf874o7o51DV2gHkZOq8A';
const CACHE_KEY = 'youtube_latest_video';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export default function LatestYoutubeVideo() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmount

    async function fetchLatestVideo() {
      try {
        // First check if we have a valid API key
        if (!YOUTUBE_API_KEY) {
          console.error('YouTube API key is not configured');
          setIsLoading(false);
          return;
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
              }
              return;
            }
          }
        } catch (cacheError) {
          console.error('Cache error:', cacheError);
          localStorage.removeItem(CACHE_KEY); // Clear invalid cache
        }

        // Fetch new data
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
        );
        
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status}`);
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

        // Update state only if component is still mounted
        if (isMounted) {
          setVideoId(newVideoId);
        }
      } catch (error) {
        console.error('Error fetching YouTube video:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    // Initial fetch
    fetchLatestVideo();

    // Set up interval for periodic checks
    const intervalId = setInterval(fetchLatestVideo, CACHE_DURATION);

    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array since we don't have any dependencies

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!videoId) {
    return <div>No video available</div>;
  }

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1`}
        title="Latest YouTube Video"
        className="border-0"  // Tailwind class for no border
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}