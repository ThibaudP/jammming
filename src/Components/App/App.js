import { useState, useMemo, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
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

    Spotify.savePlaylist(playlist, playlistUris);

    setPlaylist({
      name: 'New Playlist',
      tracklist: [],
    });
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
