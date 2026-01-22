// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './Header';
import MovieDetailWrapper from './MovieDetailWrapper';
import TrendingSlider from './components/TrendingSlider';
import Faq from './pages/Faq';          
import Support from './pages/Support';  
import './App.css';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

const genresMap: { [id: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  18: 'Drama',
  27: 'Horror',
  878: 'Sci-Fi',
  53: 'Thriller',
};

const App: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');

  // ❤️ FAVORITES
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-bg' : 'light-bg';
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchPopularMovies = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/popular`);
    const data = await res.json();
    setPopularMovies(data);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/search?query=${searchQuery}`
    );
    const data = await res.json();
    setSearchResults(data);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const isFavorite = (id: number) =>
    favorites.some((movie) => movie.id === id);

  const baseMovies = searchResults.length ? searchResults : popularMovies;

  const moviesToShow = baseMovies.filter(
    (movie) =>
      selectedGenre === 'All' ||
      movie.genre_ids.some((id) => genresMap[id] === selectedGenre)
  );

  return (
    <div>
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        genres={Object.values(genresMap)}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              {searchResults.length === 0 && (
                <TrendingSlider
                  movies={popularMovies.slice(0, 5)}
                  genresMap={genresMap}
                />
              )}

              <div className="container mt-4">
                <h2 className="text-center">
                  {searchResults.length ? 'Search Results' : 'Popular Movies'}
                </h2>

                {searchResults.length > 0 && (
                  <div className="text-center mb-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={clearSearch}
                    >
                      Clear Search
                    </button>
                  </div>
                )}

                <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
                  {moviesToShow.map((movie) => (
                    <div
                      key={movie.id}
                      className="card bg-dark text-light"
                      style={{ width: '12rem' }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="card-img-top movie-poster"
                        alt={movie.title}
                      />

                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start">
                          <h5 className="card-title">{movie.title}</h5>

                          <div
                            className={`favorite-icon heart ${
                              isFavorite(movie.id) ? 'active' : ''
                            }`}
                            onClick={() => toggleFavorite(movie)}
                          >
                            {isFavorite(movie.id) ? '♥' : '♡'}
                          </div>
                        </div>

                        <p style={{ fontSize: '0.8rem' }}>
                          ⭐ {movie.vote_average.toFixed(2)}
                        </p>

                        <Link
                          to={`/movie/${movie.id}`}
                          className="btn btn-sm btn-primary mt-auto"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          }
        />

        {/* ⭐ FAVORITES */}
        <Route
          path="/favorites"
          element={
            <div className="container mt-4">
              <h2 className="text-center">Your Favorites</h2>

              {favorites.length === 0 ? (
                <p className="text-center mt-4">No favorite movies yet.</p>
              ) : (
                <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
                  {favorites.map((movie) => (
                    <div
                      key={movie.id}
                      className="card bg-dark text-light"
                      style={{ width: '12rem' }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="card-img-top movie-poster"
                        alt={movie.title}
                      />

                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start">
                          <h5 className="card-title">{movie.title}</h5>

                          <div
                            className="favorite-icon heart active"
                            onClick={() => toggleFavorite(movie)}
                          >
                            ♥
                          </div>
                        </div>

                        <p style={{ fontSize: '0.8rem' }}>
                          ⭐ {movie.vote_average.toFixed(2)}
                        </p>

                        <Link
                          to={`/movie/${movie.id}`}
                          className="btn btn-sm btn-primary mt-auto"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
        />

        {/* FAQ */}
        <Route path="/faq" element={<Faq />} />

        {/* SUPPORT */}
        <Route path="/support" element={<Support />} />

        {/* MOVIE DETAIL */}
        <Route path="/movie/:id" element={<MovieDetailWrapper />} />
      </Routes>
    </div>
  );
};

export default App;