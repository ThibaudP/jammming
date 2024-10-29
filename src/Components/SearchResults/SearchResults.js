import React from 'react';
import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults() {
  return (
    <div className="searchResults card">
      <h2>Results</h2>
      <Tracklist />
    </div>
  );
}

export default SearchResults;
