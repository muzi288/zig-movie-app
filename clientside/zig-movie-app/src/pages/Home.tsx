import { useEffect, useState } from "react";
import { getPopularMovies } from "../api";
import MovieCard from "../components/MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    getPopularMovies().then(setMovies);
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const moviesToShow = showFavorites
    ? movies.filter(m => favorites.includes(m.id))
    : movies;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-4">
        Muzi's Zig App
      </h1>

      <div className="text-center mb-4">
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showFavorites ? "Show All Movies" : "View Favorites"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {moviesToShow.map(movie => (
          <div key={movie.id} className="relative">
            <MovieCard movie={movie} />

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(movie.id)}
              className="absolute top-2 right-2 text-xl"
            >
              {favorites.includes(movie.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
