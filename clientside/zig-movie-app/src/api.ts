const API_URL = process.env.REACT_APP_API_URL || "https://localhost:5001";


// Get top 20 popular movies
export async function getPopularMovies() {
  const res = await fetch(`${API_URL}/api/popular`);

  if (!res.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await res.json();
  console.log("POPULAR MOVIES:", data);

  return data; // <-- ARRAY
}

// Search movies by title
export async function searchMovies(query: string) {
  const res = await fetch(
    `${API_URL}/api/search?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await res.json();
  console.log("SEARCH RESULTS:", data);

  return data; // <-- ARRAY
}

// Get single movie by ID
export async function getMovieById(id: number) {
  const res = await fetch(`${API_URL}/api/movie/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}
