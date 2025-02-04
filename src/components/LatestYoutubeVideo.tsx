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
    async function fetchLatestVideo() {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { videoId, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setVideoId(videoId);
            setIsLoading(false);
            return;
          }
        }

        // Only fetch if cache is expired or doesn't exist
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
        );
        
        const data = await response.json();
        const newVideoId = data.items[0].id.videoId;
        
        // Save to cache with timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          videoId: newVideoId,
          timestamp: Date.now()
        }));
        
        setVideoId(newVideoId);
      } catch (error) {
        console.error('Error fetching YouTube video:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLatestVideo();
    const interval = setInterval(fetchLatestVideo, CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!videoId) return <div>No video found</div>;

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Latest YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}