// src/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './assets/logo.png';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  genres: string[];
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;

  // 🔍 SEARCH (NEW)
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  handleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  genres,
  selectedGenre,
  setSelectedGenre,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <header className="app-header">
      {/* LEFT: Logo */}
      <div className="header-left">
        <img src={logo} alt="Muzi’s Zig Movie App" className="header-logo" />
      </div>

      {/* CENTER: Theme toggle */}
      <div className="header-center">
        <div className="theme-toggle" onClick={toggleDarkMode}>
          <div className={`toggle-track ${!darkMode ? 'light' : ''}`}>
            <div className="toggle-thumb">
              {darkMode ? '🌙' : '☀️'}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Navigation + Search */}
      <nav className="header-nav">
        <Link to="/">Home</Link>

        {/* Genres */}
        <div className="nav-dropdown">
          <span className="nav-link">Genres</span>
          <div className="dropdown-menu">
            <div
              className={`dropdown-item ${selectedGenre === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedGenre('All')}
            >
              All
            </div>
            {genres.map((g) => (
              <div
                key={g}
                className={`dropdown-item ${selectedGenre === g ? 'active' : ''}`}
                onClick={() => setSelectedGenre(g)}
              >
                {g}
              </div>
            ))}
          </div>
        </div>

        <Link to="/favorites">Favorites</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/support">Support</Link>

        {/* 🔍 SEARCH BAR (NEW, FAR RIGHT) */}
        <div className="header-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;