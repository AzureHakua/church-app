import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UC0vf874o7o51DV2gHkZOq8A';

export async function GET() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
  );
  
  const data = await response.json();
  const videoId = data.items[0].id.videoId;
  
  return NextResponse.json({ videoId });
}
