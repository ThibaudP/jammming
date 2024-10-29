import './Track.css';

function Track({ track }) {
  return (
    <li className="track">
      <span className="name">{track.name}</span>
      <br />
      <span className="info">
        {track.artist} - {track.album}
      </span>
      <div className="track-button">+</div>
    </li>
  );
}

export default Track;
