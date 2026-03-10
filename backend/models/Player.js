const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  team: {
    type: String
  },
  age: {
    type: Number
  },
  popularity: {
    type: Number,
    default: 0
  },
  achievements: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Player", playerSchema);