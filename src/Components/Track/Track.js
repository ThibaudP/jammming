import './Track.css';
import { truncateText } from '../../utils/helpers';
import { useEffect, useRef, useState } from 'react';
import Spotify from '../../utils/Spotify';

function Track({ track, addTrack, removeTrack, isRemove }) {
  const handleClick = () => {
    if (!isRemove) {
      addTrack(track);
    } else {
      removeTrack(track);
    }
  };

  const [trackPreviewUrl, setTrackPreviewUrl] = useState('');

  const audioRef = useRef(null);

  // const getTrackPreview = async () => {
  //   setTrackPreviewUrl(await Spotify.getTrackPreview(track.id));
  // }

  useEffect(() => {
    const getTrackPreview = async () => {
      setTrackPreviewUrl(await Spotify.getTrackPreview(track.id));
    };
    getTrackPreview();
  }, [track]);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioPlayback = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = (e) => {
    if (isPlaying) {
      setIsPlaying(false);
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
      <div className="previewPlayer" onClick={handleAudioPlayback}>
        {isPlaying ? '⏸' : '⏵'}
      </div>
      <audio
        ref={audioRef}
        src={trackPreviewUrl}
        onEnded={handleAudioEnded}
      ></audio>
    </li>
  );
}

export default Track;
