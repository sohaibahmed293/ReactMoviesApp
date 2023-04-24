import './App.css';
import { useEffect, useState } from 'react';
import searchIcon from './search.svg';
import Movie from './components/Movie';

// 128f9929

const API_URL = 'http://www.omdbapi.com/?apikey=128f9929';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  const handleKeyPress = (e) => {
    searchMovies(e.target.value);
  }
  return (
    <div className="App">
      <h1>Movie Land</h1>
      <div className='search'>
        <input placeholder='Search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
         onKeyDown={handleKeyPress}/>
        <img src={searchIcon} alt='search icon' onClick={() => searchMovies(searchTerm)}/>
      </div>

      {
        movies?.length > 0 
          ? (
            <div className='container'>
              {movies.map((movie) => (
                <Movie movie={movie} />
              ))}
            </div>
          ) : (
            <h2 className='empty'>No movies found</h2>  
          )
      }
    </div>
  );
}

export default App;
