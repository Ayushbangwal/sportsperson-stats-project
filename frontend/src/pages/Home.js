import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Trophy, TrendingUp, Users, Star, ArrowRight } from 'lucide-react';
import { playerAPI } from '../services/api';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topPlayers, setTopPlayers] = useState([]);
  const [sportsStats, setSportsStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sports = [
    { name: 'Cricket', icon: '🏏', color: 'from-orange-500 to-red-500' },
    { name: 'Football', icon: '⚽', color: 'from-green-500 to-emerald-500' },
    { name: 'Basketball', icon: '🏀', color: 'from-orange-500 to-yellow-500' },
    { name: 'Tennis', icon: '🎾', color: 'from-yellow-500 to-green-500' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  
  try {
  const [topPlayersRes, statsRes] = await Promise.all([
    playerAPI.getTopPlayers({ limit: 6 }),
    playerAPI.getSportsStats()
  ]);

  setTopPlayers(
    Array.isArray(topPlayersRes?.data?.players)
      ? topPlayersRes.data.players
      : []
  );

  setSportsStats(
    Array.isArray(statsRes?.data?.stats)
      ? statsRes.data.stats
      : []
  );

} catch (error) {
  console.error("Error fetching data:", error);
} finally {
  setLoading(false);
}
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/players?search=${searchQuery}`);
    }
  };

  const handleSportClick = (sport) => {
    navigate(`/players?sport=${sport}`);
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Sports Analytics
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover player stats, records, and achievements across all sports
          </motion.p>

          {/* Search Bar */}
          <motion.form 
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for any player..."
                className="search-input w-full px-6 py-4 pr-14 rounded-xl text-lg text-gray-300 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-sports-primary hover:bg-sports-secondary text-white p-3 rounded-lg transition-all"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </motion.form>
        </div>
      </motion.section>

      {/* Sports Categories */}
      <motion.section variants={itemVariants}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gradient">Explore Sports</h2>
          <p className="text-gray-400">Browse players by sport category</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sports.map((sport, index) => (
            <motion.button
              key={sport.name}
              onClick={() => handleSportClick(sport.name)}
              className="sport-card p-6 rounded-xl text-center group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`text-5xl mb-3 bg-gradient-to-r ${sport.color} bg-clip-text text-transparent`}>
                {sport.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-200 group-hover:text-sports-primary transition-colors">
                {sport.name}
              </h3>
              {sportsStats.find(stat => stat._id === sport.name) && (
                <p className="text-sm text-gray-500 mt-1">
                  {sportsStats.find(stat => stat._id === sport.name).count} players
                </p>
              )}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Top Players */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gradient">Top Players</h2>
            <p className="text-gray-400">Most popular athletes this week</p>
          </div>
          <Link
            to="/players"
            className="flex items-center space-x-2 text-sports-primary hover:text-sports-secondary transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPlayers.map((player, index) => (
              <motion.div
                key={player._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link to={`/player/${player._id}`}>
                  <div className="card-hover bg-sports-card border border-sports-border rounded-xl p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={player.image || `https://picsum.photos/seed/${player.name}/60/60`}
                          alt={player.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="absolute -top-1 -right-1 bg-sports-primary rounded-full p-1">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-200">{player.name}</h3>
                        <p className="text-sm text-gray-400">{player.sport}</p>
                        <p className="text-xs text-gray-500">{player.team}</p>
                      </div>
                      <div className="text-right">
                        <TrendingUp className="h-4 w-4 text-sports-success mb-1" />
                        <p className="text-xs text-gray-400">Popularity</p>
                        <p className="text-sm font-semibold text-sports-primary">{player.popularity}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Stats Overview */}
      <motion.section variants={itemVariants} className="bg-sports-card rounded-xl p-8 border border-sports-border">
        <h2 className="text-2xl font-bold mb-6 text-gradient">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <Users className="h-8 w-8 text-sports-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-200">
              {sportsStats.reduce((acc, stat) => acc + stat.count, 0)}
            </p>
            <p className="text-sm text-gray-400">Total Players</p>
          </div>
          <div className="text-center">
            <Trophy className="h-8 w-8 text-sports-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-200">
              {sportsStats.reduce((acc, stat) => acc + stat.totalAchievements, 0)}
            </p>
            <p className="text-sm text-gray-400">Total Achievements</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 text-sports-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-200">{sports.length}</p>
            <p className="text-sm text-gray-400">Sports Covered</p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-sports-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-200">
              {sportsStats.length > 0 
                ? Math.round(sportsStats.reduce((acc, stat) => acc + stat.averageAge, 0) / sportsStats.length)
                : 0}
            </p>
            <p className="text-sm text-gray-400">Average Age</p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
