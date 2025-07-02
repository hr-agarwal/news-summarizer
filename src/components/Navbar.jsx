import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Optional: scroll to articles or do something
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🧠 BrainWave News</div>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/summaries" className={styles.link} onClick={() => setMenuOpen(false)}>
          My Summaries
        </Link>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />
          <button
            className={styles.button}
            onClick={() => {
              // Optional: you can scroll to articles or trigger some visual feedback
            }}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
