import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from './MovieDetail';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/movie/${id}`);
        if (!res.ok) throw new Error('Movie not found');
        const data: Movie = await res.json();
        setMovie(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="mt-4">Loading movie details...</div>;
  if (error) return <div className="mt-4 text-danger">{error}</div>;
  if (!movie) return <div className="mt-4">No movie data available.</div>;

  return <MovieDetail movie={movie} />;
};

export default MovieDetailWrapper;
