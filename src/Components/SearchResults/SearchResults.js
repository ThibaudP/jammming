import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({ searchResults, addTrack }) {
  return (
    <div className="searchResults card">
      <h2>Results</h2>
      <Tracklist tracklist={searchResults} addTrack={addTrack} />
    </div>
  );
}

export default SearchResults;
