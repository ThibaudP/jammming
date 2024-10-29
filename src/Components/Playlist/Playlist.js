import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlist, onPlaylistNameUpdate }) {
  return (
    <div className="playlist card">
      <input
        type="text"
        value={playlist.name}
        onChange={onPlaylistNameUpdate}
      ></input>
      <Tracklist tracklist={playlist.tracklist} />
      <button className="saveButton">Save to Spotify</button>
    </div>
  );
}

export default Playlist;
