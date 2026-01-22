import React from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieDetailProps {
  movie: Movie;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  return (
    <div
      className="movie-detail-bg position-relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Only darken the background */}
      <div
        className="movie-detail-overlay"
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)', // darker background
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />

      <div className="container mt-4 position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          {movie.poster_path && (
            <div className="col-md-4">
              {/* Bright card with permanent white border, no hover */}
              <div
                className="movie-detail-card"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid"
                />
              </div>
            </div>
          )}

          <div className="col-md-8 d-flex flex-column align-items-start text-white">
            <h2 className="mb-3">{movie.title}</h2>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(2)}
            </p>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;