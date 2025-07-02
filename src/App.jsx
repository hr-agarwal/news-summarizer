import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MySummaries from './pages/MySummaries';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/summaries" element={<MySummaries />} />
      </Routes>
    </Router>
  );
};

export default App;
