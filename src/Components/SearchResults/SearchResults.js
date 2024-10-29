import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({ searchResults }) {
  return (
    <div className="searchResults card">
      <h2>Results</h2>
      <Tracklist tracklist={searchResults} />
    </div>
  );
}

export default SearchResults;
