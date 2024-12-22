'use client';
import React, { useState } from 'react';
import PlaylistCard from '../components/PlaylistCard';
import SearchBar from '../components/SearchBar';
import { Playlist, allPlaylists } from '@/mocks/playlist';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const [filteredPlaylists, setFilteredPlaylists] =
    useState<Playlist[]>(allPlaylists);
  const router = useRouter();

  const handleSearch = (query: string) => {
    const searchResults = allPlaylists.filter(
      (playlist) =>
        playlist.title.toLowerCase().includes(query.toLowerCase()) ||
        playlist.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlaylists(searchResults);
  };

  const handlePlay = (id: string) => {
    console.log('Play playlist with ID:', id);
  };

  const handleCreateNew = () => {
    router.push('/playlist/create');
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-black mb-6 text-center'>
        Party Wave Jennifer
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onPlay={handlePlay}
          />
        ))}
        <PlaylistCard
          playlist={{
            id: 'add-new',
            title: 'Create New Playlist',
            description: 'Tap to create a new playlist.',
            imageUrl: 'https://example.com/images/create-playlist.jpg',
            trackCount: 0,
            duration: 'N/A',
            createdBy: 'N/A',
            createdDate: 'N/A',
          }}
          onCreateNew={handleCreateNew}
        />
      </div>
    </div>
  );
};

export default HomePage;
