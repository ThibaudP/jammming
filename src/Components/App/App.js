import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  return (
    <div className="App">
      <h1>
        Ja<span className="h1-accent">mmm</span>ing
      </h1>
      <SearchBar />
      <div className="results-playlist">
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
