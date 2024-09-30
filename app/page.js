'use client'
import React from "react";
import { useState, useCallback } from "react";
import lodash from "lodash";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchSongs = async (query) => {
    setLoading(true);
    setError(null);
    console.log('searching')
    try {
      console.log('about to search')
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Error fetching songs');
      }
      const data = await response.json();
      console.log('response', data)
      console.log('response')
      setSongs(data.response.hits); // Each song hit will be inside the "hits" array
      setLoading(false);
    } catch (error) {
      console.log(error)
      console.log('error')
      setError('Error fetching songs');
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    lodash.debounce((query) => {
      if (query.trim() !== '') {
        searchSongs(query);
        //console.log(songs);
      }
    }, 300),
    []
  );

  // Handle input change and trigger search
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setSongs([]);
    } else {
      
      debouncedSearch(value);
    }
    setQuery(value);
     // Call the debounced search
    //console.log(value);
  };

  const handleSongClick = (song) => {
    router.push(`/song/${song.result.id}?title=${encodeURIComponent(song.result.title)}&artist=${encodeURIComponent(song.result.primary_artist.name)}&imageUrl=${encodeURIComponent(song.result.song_art_image_url)}`,
      `/song/${song.result.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
  <h1 className="text-6xl font-extrabold mb-4 uppercase tracking-wide">
    Skibidify
  </h1>
  <p className="text-lg mb-10">Search for a song and turn it into brainrot</p>
  <div className="relative w-full max-w-2xl">
    <input
      type="text"
      className="w-full text-2xl border border-gray-600 rounded-full bg-black text-white caret-white p-6 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-xl"
      placeholder="Search for a song..."
      value={query}
      onChange={handleInputChange}
    />

    {/* Dropdown for search results */}
    {songs.length > 0 && (
      <ul className="absolute z-10 w-full mt-4 bg-black text-white rounded-lg shadow-xl max-h-80 overflow-y-auto border border-gray-700">
        {songs.map((song) => (
          <li
            key={song.result.id}
            className="flex items-center p-4 hover:bg-gray-800 cursor-pointer border-b border-gray-700"
            onClick={() => handleSongClick(song)}
          >
            {/* Song Thumbnail */}
            <img
              src={song.result.song_art_image_thumbnail_url}
              alt={song.result.full_title}
              className="w-16 h-16 object-cover mr-4"
            />
            {/* Song Info */}
            <div className="flex flex-col">
              <p className="font-bold text-lg">{song.result.title}</p>
              <p className="text-sm text-gray-400">{song.result.primary_artist.name}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>

  {loading && <p className="mt-4 text-lg animate-pulse">Loading...</p>}

    

</div>

    
  );
}
