import './Track.css';
import { truncateText } from '../../utils/helpers';

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
      <span className="name">{truncateText(track.name, 38)}</span>
      <br />
      <span className="info">
        {truncateText(track.artist, 30)} - {truncateText(track.album, 30)}
      </span>
      <div className="track-button" onClick={handleClick}>
        {isRemove ? '-' : '+'}
      </div>
    </li>
  );
}

export default Track;
