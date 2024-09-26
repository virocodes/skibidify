import axios from 'axios';
import { NextResponse } from 'next/server';

export  async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    try {
      const response = await axios.get('https://api.genius.com/search', {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GENIUS_API_KEY}`,
        },
        params: {
          q: query,
        },
      });

      // Forward the response from Genius API to the client
      return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}