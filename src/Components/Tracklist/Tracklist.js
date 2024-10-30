import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist({ tracklist, addTrack, removeTrack, isRemove }) {
  return (
    <ul className="tracklist">
      {tracklist &&
        tracklist.map((track, idx) => (
          <Track
            key={`trk-${idx}`}
            track={track}
            addTrack={addTrack}
            removeTrack={removeTrack}
            isRemove={isRemove}
          />
        ))}
    </ul>
  );
}

export default Tracklist;
