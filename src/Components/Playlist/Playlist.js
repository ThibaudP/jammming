import './Playlist.css';
import { useRef } from 'react';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlist, onPlaylistNameUpdate, onPlaylistSend, removeTrack }) {
  const inputRef = useRef(null);

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }

  return (
    <div className="playlist card">
      <input
        ref={inputRef}
        type="text"
        value={playlist.name}
        onChange={onPlaylistNameUpdate}
        onClick={handleInputClick}
      ></input>
      <Tracklist
        tracklist={playlist.tracklist}
        removeTrack={removeTrack}
        isRemove={true}
      />
      {playlist.tracklist.length !== 0 && (
        <button className="saveButton" onClick={onPlaylistSend}>Save to Spotify</button>
      )}
    </div>
  );
}

export default Playlist;
