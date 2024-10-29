import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <form className="searchBar">
      <input type="text" placeholder="Search tracks, artists, albums..." />
      <input type="submit" value="Search" className="searchButton" />
    </form>
  );
}

export default SearchBar;
