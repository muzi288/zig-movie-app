// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  query: string;
  setQuery: (q: string) => void;
  handleSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ query, setQuery, handleSearch }) => {
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* App title */}
      <Link to="/" className="navbar-brand unique-font">
        Muzi’s Zig Movie App
      </Link>

      <div className="collapse navbar-collapse justify-content-between">
        {/* Nav links */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/favorites">Favorites</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/faq">FAQ</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/support">Support</Link></li>
        </ul>

        {/* 🔍 SEARCH BAR (RIGHT SIDE) */}
        <div className="header-search">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyPress}
          />
          <button onClick={handleSearch} aria-label="Search">
            🔍
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;