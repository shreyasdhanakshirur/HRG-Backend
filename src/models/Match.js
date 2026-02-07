const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  name: String,
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  format: { type: String, enum: ['T20','T10','T50','unlimited'], default: 'T20' },
  oversPerInnings: { type: Number, default: 20 },
  tossWonBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  electedTo: { type: String, enum: ['bat','bowl'] },
  status: { type: String, enum: ['scheduled','inprogress','completed'], default: 'scheduled' },
  startedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', MatchSchema);
