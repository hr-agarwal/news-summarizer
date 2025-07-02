import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        background: 'transparent',
        border: '1px solid var(--primary)',
        color: 'var(--text)',
        padding: '0.4rem 0.8rem',
        borderRadius: '6px',
        cursor: 'pointer',
        marginLeft: '1rem'
      }}
    >
      {darkMode ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeToggle;
