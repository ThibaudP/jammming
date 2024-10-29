import { useState, StrictMode } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  const trackList = [
    {
      name: 'Hey Jude',
      artist: 'The Beatles',
      album: '1 (Remastered)',
      id: '0aym2LBJBk9DAYuHHutrIl',
    },
    {
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      id: '1AhDOtG9vPSOmsWgNW0BEY',
    },
    {
      name: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California (2013 Remaster)',
      id: '40riOy7x9W7GXjyGp4pjAv',
    },
    {
      name: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      album: 'Nevermind',
      id: '5ghIJDpPoe3CfHMGu71E6T',
    },
  ];

  const [searchResults, setSearchResults] = useState(trackList);
  const [playlist, setPlaylist] = useState({
    name: 'New Playlist',
    tracklist: trackList,
  });

  const handlePlaylistNameUpdate = (e) => {
    const newName = e.target.value;
    setPlaylist((prevPlaylist) => ({...prevPlaylist, name: newName}));
  }

  return (
    <StrictMode>
      <div className="App">
        <h1>
          Ja<span className="h1-accent">mmm</span>ing
        </h1>
        <SearchBar />
        <div className="results-playlist">
          <SearchResults searchResults={searchResults} />
          <Playlist playlist={playlist} onPlaylistNameUpdate={handlePlaylistNameUpdate} />
        </div>
      </div>
    </StrictMode>
  );
}

export default App;
