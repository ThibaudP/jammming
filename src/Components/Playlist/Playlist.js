import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist() {
  return (
    <div className="playlist card">
      <h2>My Playlist</h2>
      <Tracklist />
      <button className='saveButton'>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
