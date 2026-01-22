// src/pages/Faq.tsx
import React from 'react';
import '../App.css';

const Faq: React.FC = () => {
  return (
    <div className="container mt-5 faq-page">
      <h2 className="page-title">Frequently Asked Questions</h2>

      <div className="info-card">
        <h4>What is Muzi’s Zig Movie App?</h4>
        <p>
          Muzi’s Zig Movie App is a movie discovery platform that allows users
          to explore trending and popular movies, search by title, filter by
          genre, and save favorites for later viewing.
        </p>
      </div>

      <div className="info-card">
        <h4>Where does the movie data come from?</h4>
        <p>
          Movie information is fetched from a backend service that integrates
          with a third-party movie database API to ensure accurate and up-to-date
          data.
        </p>
      </div>

      <div className="info-card">
        <h4>Do I need an account to use the app?</h4>
        <p>
          No account is required. Favorites are saved locally in your browser
          for convenience.
        </p>
      </div>

      <div className="info-card">
        <h4>Why don’t I see a movie I searched for?</h4>
        <p>
          Some movies may not be available in the database or may be temporarily
          unavailable. Try refining your search or checking spelling.
        </p>
      </div>
    </div>
  );
};

export default Faq;