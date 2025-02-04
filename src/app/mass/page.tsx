'use client';

import React from 'react';
import { useEffect, useState } from 'react';

const YouTubeEmbed = () => {
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const CACHE_KEY = 'youtube_latest_video';
    const CACHE_DURATION = 3600000; // 1 hour in milliseconds

    const fetchLatestVideo = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { videoId, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setVideoId(videoId);
            return;
          }
        }

        // Only fetch if cache is expired or doesn't exist
        const CHANNEL_ID = 'UC0vf874o7o51DV2gHkZOq8A';
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
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
        setError('Could not load latest video');
      }
    };

    fetchLatestVideo();
    const interval = setInterval(fetchLatestVideo, CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  if (error) return <div>Error loading video</div>;
  if (!videoId) return <div>Loading...</div>;

  return (
    <div className="w-full h-full aspect-w-16 aspect-h-9">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </div>
  );
};

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-6">
        {/* Left column */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl text-red-500 font-semibold">Thánh Lễ trong tuần:</h3>
          <div className='text-black my-3'>
            <b>CHA XỨ: JOSEPH MARWA, SMA</b><br />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-y-2 sm:gap-x-8">
            {[
              { name: "Thứ Hai - Thứ Sáu:", time: "7:00 AM" },
              { name: "Thứ Bẩy:", time: "7:00 AM (Anh Ngữ)" },
              { name: "", time: "4:00 PM (Anh Ngữ)" },
              { name: "", time: "7:30 PM (Việt Ngữ)" },
              { name: "Chúa Nhật:", time: "7:00 AM (Anh Ngữ)" },
              { name: "", time: "10:00 AM (Anh Ngữ)" },
              { name: "", time: "12:00 PM (Spanish)" },
              { name: "", time: "4:00 PM (Haitian)" }
            ].map((day, index) => (
              <React.Fragment key={index}>
                <div className="text-black font-bold">{day.name}</div>
                <div className="text-black">{day.time}</div>
              </React.Fragment>
            ))}
          </div>
          <div className='text-red-500 my-3'>
            <b>Chầu Thánh Thể:</b><br />
            <span className='text-black'><b>Thứ Năm:</b> Sau Thánh Lễ 7:00 AM đến 6:00 PM<br /></span>
            <span className='text-black'><b>Thứ Bẩy:</b> Sau Thánh Lễ 7:00 AM<br /></span>
          </div>
        </div>


        {/* Right column */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <YouTubeEmbed />
        </div>
      </div>
    </main>
  );
}