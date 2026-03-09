const express = require('express');
const router = express.Router();

const {
  getPlayers,
  getPlayer,
  searchPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getPlayersBySport,
  getTopPlayers,
  getSportsStats
} = require('../controllers/playerController');

// Basic CRUD routes
router.get('/', getPlayers);
router.get('/search', searchPlayers);
router.get('/sport/:sport', getPlayersBySport);
router.get('/top', getTopPlayers);
router.get('/stats', getSportsStats);
router.get('/:id', getPlayer);
router.post('/', createPlayer);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

module.exports = router;
