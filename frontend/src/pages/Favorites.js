import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, User, Trash2, Trophy, TrendingUp } from 'lucide-react';
import { playerAPI } from '../services/api';

const Favorites = () => {
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoritePlayers();
  }, []);

  const fetchFavoritePlayers = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (favorites.length === 0) {
        setFavoritePlayers([]);
        setLoading(false);
        return;
      }

      // Fetch players one by one (since we don't have a bulk endpoint)
      const playerPromises = favorites.map(id => playerAPI.getPlayer(id));
      const playerResponses = await Promise.all(playerPromises);
      
      const players = playerResponses.map(res => res.data).filter(Boolean);
      setFavoritePlayers(players);
    } catch (error) {
      console.error('Error fetching favorite players:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (playerId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = favorites.filter(id => id !== playerId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    setFavoritePlayers(prev => prev.filter(player => player._id !== playerId));
  };

  const clearAllFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify([]));
    setFavoritePlayers([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gradient">Favorite Players</h1>
            <p className="text-gray-400">
              {favoritePlayers.length} {favoritePlayers.length === 1 ? 'player' : 'players'} in your favorites
            </p>
          </div>
        </div>

        {favoritePlayers.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </motion.div>

      {/* No Favorites */}
      {favoritePlayers.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="text-center py-20"
        >
          <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">No favorite players yet</h2>
          <p className="text-gray-400 mb-6">
            Start adding players to your favorites to see them here
          </p>
          <Link
            to="/players"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-sports-primary hover:bg-sports-secondary text-white rounded-lg transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Browse Players</span>
          </Link>
        </motion.div>
      ) : (
        /* Favorite Players Grid */
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {favoritePlayers.map((player, index) => (
            <motion.div
              key={player._id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-hover bg-sports-card border border-sports-border rounded-xl overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-sports-primary to-sports-secondary">
                  <Link to={`/player/${player._id}`}>
                    <img
                      src={player.image || `https://picsum.photos/seed/${player.name}/400/300`}
                      alt={player.name}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </Link>
                  
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <div className="bg-sports-dark bg-opacity-90 px-2 py-1 rounded-lg">
                      <span className="text-xs font-semibold text-sports-primary">
                        {player.sport}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFavorite(player._id)}
                      className="bg-red-500 bg-opacity-90 p-2 rounded-lg hover:bg-opacity-100 transition-all"
                    >
                      <Heart className="h-3 w-3 text-white fill-current" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 bg-sports-dark bg-opacity-90 px-2 py-1 rounded-lg">
                    <Trophy className="h-3 w-3 text-yellow-500 inline mr-1" />
                    <span className="text-xs text-gray-300">
                      {player.totalAchievements || player.achievements?.length || 0}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Link to={`/player/${player._id}`}>
                        <h3 className="font-semibold text-lg text-gray-200 hover:text-sports-primary transition-colors">
                          {player.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-400">{player.team}</p>
                      <p className="text-sm text-gray-500">{player.country}</p>
                    </div>
                    
                    <div className="text-right">
                      <TrendingUp className="h-4 w-4 text-sports-success mb-1" />
                      <p className="text-xs text-gray-400">Popularity</p>
                      <p className="text-sm font-semibold text-sports-primary">{player.popularity}</p>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-sports-dark rounded-lg p-2">
                      <p className="text-xs text-gray-400">Age</p>
                      <p className="text-sm font-semibold text-gray-200">{player.age}</p>
                    </div>
                    <div className="bg-sports-dark rounded-lg p-2">
                      <p className="text-xs text-gray-400">Debut</p>
                      <p className="text-sm font-semibold text-gray-200">{player.debutYear}</p>
                    </div>
                    <div className="bg-sports-dark rounded-lg p-2">
                      <p className="text-xs text-gray-400">Position</p>
                      <p className="text-sm font-semibold text-gray-200 truncate">{player.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Summary Stats */}
      {favoritePlayers.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-sports-card rounded-xl p-6 border border-sports-border"
        >
          <h2 className="text-xl font-semibold mb-4 text-gradient">Favorites Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <User className="h-8 w-8 text-sports-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-200">{favoritePlayers.length}</p>
              <p className="text-sm text-gray-400">Total Players</p>
            </div>
            <div className="text-center">
              <Trophy className="h-8 w-8 text-sports-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-200">
                {favoritePlayers.reduce((acc, player) => acc + (player.achievements?.length || 0), 0)}
              </p>
              <p className="text-sm text-gray-400">Total Achievements</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-sports-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-200">
                {favoritePlayers.length > 0 
                  ? Math.round(favoritePlayers.reduce((acc, player) => acc + player.popularity, 0) / favoritePlayers.length)
                  : 0}
              </p>
              <p className="text-sm text-gray-400">Avg Popularity</p>
            </div>
            <div className="text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-200">
                {new Set(favoritePlayers.map(player => player.sport)).size}
              </p>
              <p className="text-sm text-gray-400">Sports Covered</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Favorites;
