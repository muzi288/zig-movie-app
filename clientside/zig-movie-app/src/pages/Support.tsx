// src/pages/Support.tsx
import React from 'react';
import '../App.css';

const Support: React.FC = () => {
  return (
    <div className="container mt-5 support-page">
      <h2 className="page-title">Support</h2>

      <div className="info-card">
        <h4>Need Help?</h4>
        <p>
          If you experience any issues or have questions about the app, we’re
          here to help.
        </p>
      </div>

      <div className="info-card">
        <h4>Common Issues</h4>
        <ul>
          <li>Movies not loading — check your internet connection</li>
          <li>Favorites missing — browser storage may have been cleared</li>
          <li>Search not returning results — try different keywords</li>
        </ul>
      </div>

      <div className="info-card">
        <h4>Contact</h4>
        <p>
          For feedback or support requests, please reach out via:
        </p>
        <p className="support-email">
          📧 <strong>support@muzizigmovies.app</strong>
        </p>
      </div>
    </div>
  );
};

export default Support;