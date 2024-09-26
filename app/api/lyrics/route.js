import { NextResponse } from 'next/server';
import { getLyrics, getSong } from 'genius-lyrics-api';


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const artist = searchParams.get('artist');

  if (!title || !artist) {
    return NextResponse.json({ error: 'Missing title or artist' }, { status: 400 });
  }

  try {
    // Step 1: Search for the song by title and artist
    const options = {
      apiKey: process.env.NEXT_PUBLIC_GENIUS_API_KEY,
      title: title,
      artist: artist,
      optimizeQuery: true,
    }

    const lyrics = await getLyrics(options);

    return NextResponse.json({ lyrics: lyrics }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lyrics' }, { status: 500 });
  }
}