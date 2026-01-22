import React from "react";
import { GENRES } from "../constants/genres";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids?: number[];
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="card bg-dark text-light glowing-poster" style={{ width: '12rem' }}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className="card-img-top"
      />

      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <div className="d-flex justify-content-between text-xs">
          <span>⭐ {movie.vote_average.toFixed(2)}</span>
          <span>{movie.release_date?.slice(0, 4)}</span>
        </div>

        <div className="mt-1">
          {movie.genre_ids?.map((id) => (
            <span key={id} className="badge bg-secondary me-1">
              {GENRES[id]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}