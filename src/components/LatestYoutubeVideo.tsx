// src/components/LatestYoutubeVideo.tsx
'use client'

import { useEffect, useState } from 'react';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Note: changed to NEXT_PUBLIC
const CHANNEL_ID = 'UC0vf874o7o51DV2gHkZOq8A';

export default function LatestYoutubeVideo() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
        );
        
        const data = await response.json();
        setVideoId(data.items[0].id.videoId);
      } catch (error) {
        console.error('Error fetching YouTube video:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLatestVideo();
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
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}