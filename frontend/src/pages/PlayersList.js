import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, User, MapPin, Briefcase, Trophy } from 'lucide-react';
import { playerAPI } from '../services/api';

const PlayersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    sport: searchParams.get('sport') || '',
    country: '',
    team: '',
    sortBy: 'popularity',
    sortOrder: 'desc'
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const sports = ['Cricket', 'Football', 'Basketball', 'Tennis'];
  const countries = ['India', 'USA', 'England', 'Australia', 'Spain', 'France', 'Germany', 'Brazil'];
  const teams = [
    'Mumbai Indians', 'Chennai Super Kings', 'Manchester United', 'Liverpool', 
    'Real Madrid', 'Barcelona', 'Lakers', 'Warriors', 'Nadal Team', 'Federer Team'
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'name', label: 'Name' },
    { value: 'age', label: 'Age' },
    { value: 'debutYear', label: 'Debut Year' },
    { value: 'totalAchievements', label: 'Most Achievements' }
  ];

  useEffect(() => {
    fetchPlayers();
  }, [filters, currentPage, searchQuery]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 12,
        ...filters
      };

      if (searchQuery) {
        const searchRes = await playerAPI.searchPlayers(searchQuery, filters.sport);
        setPlayers(searchRes.data.players);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalPlayers: searchRes.data.players.length
        });
      } else {
        const res = await playerAPI.getPlayers(params);
        setPlayers(res.data.players);
        setPagination(res.data);
      }
    } catch (error) {
      setError('Failed to fetch players');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Players Directory</h1>
          <p className="text-gray-400">
            {pagination.totalPlayers || 0} players found
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players..."
              className="search-input w-64 px-4 py-2 pr-10 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sports-primary"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-sports-card rounded-xl p-6 border border-sports-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-200">Filters</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sports-primary hover:text-sports-secondary"
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
            <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {/* Sport Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Sport</label>
              <select
                value={filters.sport}
                onChange={(e) => handleFilterChange('sport', e.target.value)}
                className="w-full px-3 py-2 bg-sports-dark border border-sports-border rounded-lg text-gray-300 focus:outline-none focus:border-sports-primary"
              >
                <option value="">All Sports</option>
                {sports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="w-full px-3 py-2 bg-sports-dark border border-sports-border rounded-lg text-gray-300 focus:outline-none focus:border-sports-primary"
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Team Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Team</label>
              <select
                value={filters.team}
                onChange={(e) => handleFilterChange('team', e.target.value)}
                className="w-full px-3 py-2 bg-sports-dark border border-sports-border rounded-lg text-gray-300 focus:outline-none focus:border-sports-primary"
              >
                <option value="">All Teams</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 bg-sports-dark border border-sports-border rounded-lg text-gray-300 focus:outline-none focus:border-sports-primary"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="w-full px-3 py-2 bg-sports-dark border border-sports-border rounded-lg text-gray-300 focus:outline-none focus:border-sports-primary"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Players Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="loading-spinner"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : players.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No players found</p>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {players.map((player, index) => (
            <motion.div
              key={player._id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={`/player/${player.id}`}>
                <div className="card-hover bg-sports-card border border-sports-border rounded-xl overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-sports-primary to-sports-secondary">
                    <img
                      src={player.image || `https://picsum.photos/seed/${player.name}/400/300`}
                      alt={player.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-2 right-2 bg-sports-dark bg-opacity-90 px-2 py-1 rounded-lg">
                      <span className="text-xs font-semibold text-sports-primary">
                        {player.sport}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-sports-dark bg-opacity-90 px-2 py-1 rounded-lg">
                      <Trophy className="h-3 w-3 text-yellow-500 inline mr-1" />
                      <span className="text-xs text-gray-300">
                        {player.totalAchievements || player.achievements?.length || 0}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-200 mb-2">{player.name}</h3>
                    
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-3 w-3" />
                        <span>{player.team}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>{player.country}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Age: {player.age}</span>
                        <span className="text-xs">Popularity: {player.popularity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <motion.div variants={itemVariants} className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="px-3 py-1 bg-sports-card border border-sports-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-sports-primary transition-colors"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-sports-primary text-white'
                    : 'bg-sports-card border border-sports-border hover:border-sports-primary'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNext}
            className="px-3 py-1 bg-sports-card border border-sports-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-sports-primary transition-colors"
          >
            Next
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlayersList;
