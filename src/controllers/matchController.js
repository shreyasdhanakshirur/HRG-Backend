const Match = require('../models/Match');
const Ball = require('../models/Ball');
const matchService = require('../services/matchService');

exports.create = async (req, res) => {
  const m = new Match(req.body);
  await m.save();
  res.status(201).json(m);
};

exports.get = async (req, res) => {
  const m = await Match.findById(req.params.id).populate('teamA teamB');
  if (!m) return res.status(404).json({ error: 'Not found' });
  res.json(m);
};

exports.list = async (req, res) => {
  const matches = await Match.find().limit(100).populate('teamA teamB');
  res.json(matches);
};

exports.toss = async (req, res) => {
  const { matchId } = req.params;
  const { tossWonBy, electedTo } = req.body;
  const m = await Match.findById(matchId);
  if (!m) return res.status(404).json({ error: 'Not found' });
  m.tossWonBy = tossWonBy;
  m.electedTo = electedTo;
  await m.save();
  res.json(m);
};

exports.start = async (req, res) => {
  const m = await Match.findById(req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  m.status = 'inprogress';
  m.startedAt = new Date();
  await m.save();
  res.json(m);
};

exports.addDelivery = async (req, res) => {
  const { matchId } = req.params;
  const payload = req.body;
  const m = await Match.findById(matchId);
  if (!m) return res.status(404).json({ error: 'Match not found' });
  // require inning, over, ballInOver, batsman, bowler
  const b = new Ball(Object.assign({}, payload, { match: matchId }));
  await b.save();
  res.status(201).json(b);
};

exports.summary = async (req, res) => {
  const { matchId } = req.params;
  try {
    const summary = await matchService.computeMatchSummary(matchId);
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute summary' });
  }
};
