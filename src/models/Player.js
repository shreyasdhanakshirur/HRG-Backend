const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: String,
  battingStyle: String,
  bowlingStyle: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', PlayerSchema);
