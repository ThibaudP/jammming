import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist({ tracklist, addTrack, removeTrack }) {
  return (
    <ul className="tracklist">
      {tracklist &&
        tracklist.map((track, idx) => (
          <Track key={`trk-${idx}`} track={track} />
        ))}
    </ul>
  );
}

export default Tracklist;
