// src/components/TrendingSlider.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrendingSlider.css';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string;
  genre_ids: number[];
}

interface Props {
  movies: Movie[];
  genresMap: Record<number, string>;
}

const TrendingSlider: React.FC<Props> = ({ movies, genresMap }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (!movies.length) return null;

  const movie = movies[index];

  return (
    <div
      className="trending-slider fade-slide"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : undefined,
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      role="button"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="trending-overlay" />

      <div className="trending-content">
        <h1>{movie.title}</h1>

        <div className="trending-genres">
          {movie.genre_ids
            .map((id) => genresMap[id])
            .filter(Boolean)
            .slice(0, 3)
            .join(' • ')}
        </div>

        <p className="trending-overview">
          {movie.overview?.slice(0, 160)}…
        </p>
      </div>

      {/* Pagination dots */}
      <div className="trending-dots">
        {movies.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingSlider;