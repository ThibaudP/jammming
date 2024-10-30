import { useState, useMemo, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify';

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

  const [searchResults, setSearchResults] = useState([]);

  const [playlist, setPlaylist] = useState({
    name: 'New Playlist',
    tracklist: [],
  });

  const playlistUris = useMemo(() => {
    return playlist.tracklist.map((track) => `spotify:track:${track.id}`);
  }, [playlist.tracklist]);

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

  const handlePlaylistSend = (e) => {
    e.preventDefault();
    // send to spotify here

    setPlaylist({
      name: 'New Playlist',
      tracklist: [],
    });
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // console.log(searchTerm);
    const searchResults = await Spotify.searchTrack(searchTerm);
    setSearchResults(searchResults);
  };

  useEffect(() => {
    const authToken = Spotify.getAccessToken();
  }, []);

  return (
    <div className="App">
      <h1>
        Ja<span className="h1-accent">mmm</span>ing
      </h1>
      <SearchBar
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />
      <div className="results-playlist">
        <SearchResults searchResults={searchResults} addTrack={addTrack} />
        <Playlist
          playlist={playlist}
          onPlaylistNameUpdate={handlePlaylistNameUpdate}
          removeTrack={removeTrack}
          onPlaylistSend={handlePlaylistSend}
        />
      </div>
    </div>
  );
}

export default App;
