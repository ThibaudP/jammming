import './Track.css';

function Track({ track, addTrack, removeTrack, isRemove }) {
  const handleClick = () => {
    if (!isRemove) {
      addTrack(track);
    } else {
      removeTrack(track);
    }
  };

  return (
    <li className="track">
      <span className="name">{track.name}</span>
      <br />
      <span className="info">
        {track.artist} - {track.album}
      </span>
      <div className="track-button" onClick={handleClick}>
        {isRemove ? '-' : '+'}
      </div>
    </li>
  );
}

export default Track;
