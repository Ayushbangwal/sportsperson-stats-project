const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const statisticsSchema = new mongoose.Schema({
  // Common statistics
  matches: {
    type: Number,
    default: 0
  },
  
  // Cricket specific
  runs: {
    type: Number,
    default: 0
  },
  battingAverage: {
    type: Number,
    default: 0
  },
  strikeRate: {
    type: Number,
    default: 0
  },
  centuries: {
    type: Number,
    default: 0
  },
  halfCenturies: {
    type: Number,
    default: 0
  },
  
  // Football specific
  goals: {
    type: Number,
    default: 0
  },
  assists: {
    type: Number,
    default: 0
  },
  yellowCards: {
    type: Number,
    default: 0
  },
  redCards: {
    type: Number,
    default: 0
  },
  
  // Basketball specific
  pointsPerGame: {
    type: Number,
    default: 0
  },
  rebounds: {
    type: Number,
    default: 0
  },
  blocks: {
    type: Number,
    default: 0
  },
  steals: {
    type: Number,
    default: 0
  },
  
  // Tennis specific
  matchesPlayed: {
    type: Number,
    default: 0
  },
  matchesWon: {
    type: Number,
    default: 0
  },
  titles: {
    type: Number,
    default: 0
  },
  grandSlamTitles: {
    type: Number,
    default: 0
  }
});

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sport: {
    type: String,
    required: true,
    enum: ['Cricket', 'Football', 'Basketball', 'Tennis'],
    index: true
  },
  country: {
    type: String,
    required: true,
    index: true
  },
  age: {
    type: Number,
    required: true,
    min: 15,
    max: 60
  },
  team: {
    type: String,
    required: true,
    index: true
  },
  position: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  debutYear: {
    type: Number,
    required: true
  },
  statistics: {
    type: statisticsSchema,
    default: () => ({})
  },
  achievements: {
    type: [achievementSchema],
    default: []
  },
  popularity: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for win percentage (Tennis)
playerSchema.virtual('winPercentage').get(function() {
  if (this.sport === 'Tennis' && this.statistics.matchesPlayed > 0) {
    return ((this.statistics.matchesWon / this.statistics.matchesPlayed) * 100).toFixed(2);
  }
  return 0;
});

// Virtual for total achievements
playerSchema.virtual('totalAchievements').get(function() {
  return this.achievements.length;
});

// Index for search functionality
playerSchema.index({ name: 'text', sport: 'text', country: 'text', team: 'text' });

// Pre-save middleware to calculate popularity based on achievements and statistics
playerSchema.pre('save', function(next) {
  // Calculate popularity based on achievements and performance
  let popularityScore = 0;
  
  // Base popularity from achievements
  popularityScore += this.achievements.length * 5;
  
  // Sport-specific popularity calculation
  if (this.sport === 'Cricket') {
    popularityScore += this.statistics.centuries * 10;
    popularityScore += this.statistics.runs / 1000;
  } else if (this.sport === 'Football') {
    popularityScore += this.statistics.goals * 8;
    popularityScore += this.statistics.assists * 3;
  } else if (this.sport === 'Basketball') {
    popularityScore += this.statistics.pointsPerGame * 5;
    popularityScore += this.statistics.titles * 15;
  } else if (this.sport === 'Tennis') {
    popularityScore += this.statistics.grandSlamTitles * 20;
    popularityScore += this.statistics.titles * 10;
  }
  
  this.popularity = Math.min(100, Math.round(popularityScore));
  
  next();
});

module.exports = mongoose.model('Player', playerSchema);
