import React from 'react';
import Track from '../Track/Track';

function Tracklist() {
  const trackArray = [
    {
      title: 'Track 1',
    },
    {
      title: 'Track 2',
    },
    {
      title: 'Track 3',
    },
  ];

  return (
    <div className="tracklist">
      {trackArray.map((track, idx) => (
        <Track key={`trk-${idx}`} title={track.title} />
      ))}
    </div>
  );
}

export default Tracklist;
