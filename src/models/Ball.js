const mongoose = require('mongoose');

const BallSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  inning: { type: Number, required: true },
  over: { type: Number, required: true },
  ballInOver: { type: Number, required: true },
  batsman: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  nonStriker: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  bowler: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  runsBatsman: { type: Number, default: 0 },
  extrasRuns: { type: Number, default: 0 },
  extrasType: { type: String, enum: ['none','wide','noball','bye','legbye'], default: 'none' },
  isLegal: { type: Boolean, default: true },
  wicket: {
    kind: { type: String },
    playerOut: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ball', BallSchema);
