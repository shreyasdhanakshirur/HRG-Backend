const Team = require('../models/Team');

exports.create = async (req, res) => {
  const t = new Team(req.body);
  await t.save();
  res.status(201).json(t);
};

exports.list = async (req, res) => {
  const teams = await Team.find().populate('players').limit(100);
  res.json(teams);
};

exports.get = async (req, res) => {
  const t = await Team.findById(req.params.id).populate('players');
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
};
