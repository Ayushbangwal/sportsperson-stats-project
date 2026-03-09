import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlayersList from './pages/PlayersList';
import PlayerProfile from './pages/PlayerProfile';
import Favorites from './pages/Favorites';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sports-darker">
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<PlayersList />} />
            <Route path="/player/:id" element={<PlayerProfile />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;
