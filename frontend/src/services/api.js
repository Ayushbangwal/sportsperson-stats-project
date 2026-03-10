import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Player API endpoints
export const playerAPI = {
  // Get all players with optional filters
  getPlayers: (params = {}) => api.get('/players', { params }),
  
  // Get single player by ID
  getPlayer: (id) => api.get(`/players/${id}`),
  
  // Search players by name
  searchPlayers: (name, sport = '') => api.get('/players/search', { params: { name, sport } }),
  
  // Get players by sport
  getPlayersBySport: (sport, params = {}) => api.get(`/players/sport/${sport}`, { params }),
  
  // Get top players
  getTopPlayers: (params = {}) => api.get('/players/top', { params }),
  
  // Get sports statistics
  getSportsStats: () => api.get('/players/stats'),
  
  // Create new player
  createPlayer: (playerData) => api.post('/players', playerData),
  
  // Update player
  updatePlayer: (id, playerData) => api.put(`/players/${id}`, playerData),
  
  // Delete player
  deletePlayer: (id) => api.delete(`/players/${id}`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
