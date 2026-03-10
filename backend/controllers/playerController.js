const Player = require('../data/Players');

// @desc    Get all players
// @route   GET /api/players
// @access  Public
exports.getPlayers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sport,
      country,
      team,
      sortBy = 'popularity',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = {};
    if (sport) filter.sport = sport;
    if (country) filter.country = country;
    if (team) filter.team = team;

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const players = await Player.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Player.countDocuments(filter);

    res.json({
      players,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPlayers: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single player
// @route   GET /api/players/:id
// @access  Public
exports.getPlayer = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const player = players.find(p => p.id === id);

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(player);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Search players
// @route   GET /api/players/search
// @access  Public
exports.searchPlayers = async (req, res) => {
  try {
    const { name, sport, limit = 10 } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Search name is required' });
    }

    // Build search query
    const searchQuery = {
      $text: { $search: name }
    };

    if (sport) {
      searchQuery.sport = sport;
    }

    const players = await Player.find(searchQuery)
      .sort({ score: { $meta: 'textScore' }, popularity: -1 })
      .limit(parseInt(limit))
      .select('-__v');

    res.json({ players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create new player
// @route   POST /api/players
// @access  Public
exports.createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    
    res.status(201).json(player);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update player
// @route   PUT /api/players/:id
// @access  Public
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete player
// @route   DELETE /api/players/:id
// @access  Public
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get players by sport
// @route   GET /api/players/sport/:sport
// @access  Public
exports.getPlayersBySport = async (req, res) => {
  try {
    const { sport } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const players = await Player.find({ sport })
      .sort({ popularity: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Player.countDocuments({ sport });

    res.json({
      players,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPlayers: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get top players
// @route   GET /api/players/top
// @access  Public
exports.getTopPlayers = async (req, res) => {
  try {
    const { sport, limit = 10 } = req.query;

    const filter = sport ? { sport } : {};

    const players = await Player.find(filter)
      .sort({ popularity: -1 })
      .limit(parseInt(limit || 10))
      .select('name sport country team image popularity') || [];

    if (!players) {
      return res.json({ players: [] });
    }

    res.json({ players });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get sports statistics
// @route   GET /api/players/stats
// @access  Public
exports.getSportsStats = async (req, res) => {
  try {
const stats = await Player.aggregate([
  {
    $group: {
      _id: '$sport',
      count: { $sum: 1 },
      averageAge: { $avg: '$age' },
      totalAchievements: {
        $sum: {
          $size: { $ifNull: ['$achievements', []] }
        }
      }
    }
  },
  {
    $sort: { count: -1 }
  }
]);
res.json({ stats});
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

  
