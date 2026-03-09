import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Trophy, 
  TrendingUp,
  Heart,
  Share2,
  Target,
  Activity
} from 'lucide-react';
import { playerAPI } from '../services/api';
import PerformanceChart from '../components/PerformanceChart';

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchPlayer();
    checkFavorite();
  }, [id]);

  const fetchPlayer = async () => {
    try {
      const res = await playerAPI.getPlayer(id);
      setPlayer(res.data);
    } catch (error) {
      setError('Player not found');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const getSportSpecificStats = (sport, statistics) => {
    switch (sport) {
      case 'Cricket':
        return [
          { label: 'Matches', value: statistics.matches || 0, icon: Target },
          { label: 'Runs', value: statistics.runs || 0, icon: TrendingUp },
          { label: 'Batting Avg', value: statistics.battingAverage || 0, icon: Activity },
          { label: 'Strike Rate', value: statistics.strikeRate || 0, icon: Target },
          { label: 'Centuries', value: statistics.centuries || 0, icon: Trophy },
          { label: 'Half Centuries', value: statistics.halfCenturies || 0, icon: Trophy },
        ];
      case 'Football':
        return [
          { label: 'Matches', value: statistics.matches || 0, icon: Target },
          { label: 'Goals', value: statistics.goals || 0, icon: TrendingUp },
          { label: 'Assists', value: statistics.assists || 0, icon: Activity },
          { label: 'Yellow Cards', value: statistics.yellowCards || 0, icon: Target },
          { label: 'Red Cards', value: statistics.redCards || 0, icon: Target },
        ];
      case 'Basketball':
        return [
          { label: 'Points Per Game', value: statistics.pointsPerGame || 0, icon: TrendingUp },
          { label: 'Rebounds', value: statistics.rebounds || 0, icon: Activity },
          { label: 'Assists', value: statistics.assists || 0, icon: Activity },
          { label: 'Blocks', value: statistics.blocks || 0, icon: Target },
          { label: 'Steals', value: statistics.steals || 0, icon: Target },
        ];
      case 'Tennis':
        return [
          { label: 'Matches Played', value: statistics.matchesPlayed || 0, icon: Target },
          { label: 'Matches Won', value: statistics.matchesWon || 0, icon: TrendingUp },
          { label: 'Win %', value: player?.winPercentage || 0, icon: Activity },
          { label: 'Titles', value: statistics.titles || 0, icon: Trophy },
          { label: 'Grand Slams', value: statistics.grandSlamTitles || 0, icon: Trophy },
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="text-center py-20">
        <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <p className="text-red-500 text-lg">{error || 'Player not found'}</p>
        <Link to="/players" className="text-sports-primary hover:text-sports-secondary mt-4 inline-block">
          Back to Players
        </Link>
      </div>
    );
  }

  const sportStats = getSportSpecificStats(player.sport, player.statistics);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <Link
        to="/players"
        className="inline-flex items-center space-x-2 text-gray-400 hover:text-sports-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Players</span>
      </Link>

      {/* Player Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-sports-card rounded-xl overflow-hidden border border-sports-border"
      >
        <div className="relative h-64 bg-gradient-to-br from-sports-primary to-sports-secondary">
          <img
            src={player.image || `https://picsum.photos/seed/${player.name}/800/400`}
            alt={player.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sports-darker to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{player.name}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                  <span className="bg-sports-dark bg-opacity-90 px-3 py-1 rounded-full">
                    {player.sport}
                  </span>
                  <span className="bg-sports-dark bg-opacity-90 px-3 py-1 rounded-full">
                    {player.country}
                  </span>
                  <span className="bg-sports-dark bg-opacity-90 px-3 py-1 rounded-full">
                    {player.team}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-lg transition-all ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-sports-dark text-gray-300 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 bg-sports-dark rounded-lg text-gray-300 hover:text-sports-primary transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Basic Information */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-sports-card rounded-xl p-6 border border-sports-border">
          <div className="flex items-center space-x-3 mb-2">
            <User className="h-5 w-5 text-sports-primary" />
            <span className="text-gray-400 text-sm">Position</span>
          </div>
          <p className="text-xl font-semibold text-gray-200">{player.position}</p>
        </div>
        
        <div className="bg-sports-card rounded-xl p-6 border border-sports-border">
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="h-5 w-5 text-sports-primary" />
            <span className="text-gray-400 text-sm">Country</span>
          </div>
          <p className="text-xl font-semibold text-gray-200">{player.country}</p>
        </div>
        
        <div className="bg-sports-card rounded-xl p-6 border border-sports-border">
          <div className="flex items-center space-x-3 mb-2">
            <Briefcase className="h-5 w-5 text-sports-primary" />
            <span className="text-gray-400 text-sm">Team</span>
          </div>
          <p className="text-xl font-semibold text-gray-200">{player.team}</p>
        </div>
        
        <div className="bg-sports-card rounded-xl p-6 border border-sports-border">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="h-5 w-5 text-sports-primary" />
            <span className="text-gray-400 text-sm">Debut Year</span>
          </div>
          <p className="text-xl font-semibold text-gray-200">{player.debutYear}</p>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-sports-card rounded-xl p-6 border border-sports-border"
      >
        <h2 className="text-2xl font-bold mb-6 text-gradient">Performance Statistics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sportStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="text-center"
            >
              <div className="bg-sports-dark rounded-lg p-4 border border-sports-border">
                <stat.icon className="h-6 w-6 text-sports-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-200">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  {stat.label.includes('%') && '%'}
                </p>
                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-sports-card rounded-xl p-6 border border-sports-border"
      >
        <h2 className="text-2xl font-bold mb-6 text-gradient">Performance Analytics</h2>
        <PerformanceChart player={player} />
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-sports-card rounded-xl p-6 border border-sports-border"
      >
        <h2 className="text-2xl font-bold mb-6 text-gradient">Achievements & Records</h2>
        
        {player.achievements && player.achievements.length > 0 ? (
          <div className="space-y-4">
            {player.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-sports-dark rounded-lg p-4 border border-sports-border"
              >
                <div className="flex items-start space-x-3">
                  <Trophy className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-200 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                    <span className="inline-block text-xs bg-sports-primary text-white px-2 py-1 rounded">
                      {achievement.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No achievements recorded yet</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PlayerProfile;
