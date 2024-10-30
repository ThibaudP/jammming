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
      id: '4u7EnebtmKWzUH433cf5Qv',
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
    {
      name: 'Billie Jean',
      artist: 'Michael Jackson',
      album: 'Thriller',
      id: '3S2R0EVwBSAVMd5UMgKTL0',
    },
    {
      name: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV (Remaster)',
      id: '5CQ30WqJwcep0pYcV4AMNc',
    },
    {
      name: 'Imagine',
      artist: 'John Lennon',
      album: 'Imagine',
      id: '7pKfPomDEeI4TPT6EOYjn9',
    },
  ];

  const [searchResults, setSearchResults] = useState(trackList);

  const [playlist, setPlaylist] = useState({
    name: 'New Playlist',
    tracklist: [],
  });

  const addTrack = (track) => {
    if (!playlist.tracklist.find((item) => item.id === track.id)) {
      setPlaylist((oldPlaylist) => ({
        ...oldPlaylist,
        tracklist: [...oldPlaylist.tracklist, track],
      }));
    }
  };

  const removeTrack = (track) => {
    setPlaylist((oldPlaylist) => {
      return {
        ...oldPlaylist,
        tracklist: oldPlaylist.tracklist.filter((item) => item.id !== track.id),
      };
    });
  };

  const handlePlaylistNameUpdate = (e) => {
    const newName = e.target.value;
    setPlaylist((prevPlaylist) => ({ ...prevPlaylist, name: newName }));
  };

  // const [playlistUris, setPlaylistUris] = useState([]);

  return (
    <StrictMode>
      <div className="App">
        <h1>
          Ja<span className="h1-accent">mmm</span>ing
        </h1>
        <SearchBar />
        <div className="results-playlist">
          <SearchResults searchResults={searchResults} addTrack={addTrack} />
          <Playlist
            playlist={playlist}
            onPlaylistNameUpdate={handlePlaylistNameUpdate}
            removeTrack={removeTrack}
          />
        </div>
      </div>
    </StrictMode>
  );
}

export default App;
