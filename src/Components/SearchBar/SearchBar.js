import './SearchBar.css';

function SearchBar({ onSearch, searchTerm, onSearchTermChange }) {
  return (
    <form className="searchBar" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Search tracks, artists, albums..."
        value={searchTerm}
        onChange={onSearchTermChange}
      />
      <input type="submit" value="Search" className="searchButton" />
    </form>
  );
}

export default SearchBar;
