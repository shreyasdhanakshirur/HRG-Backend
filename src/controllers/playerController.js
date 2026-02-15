const Player = require('../models/Player');

exports.create = async (req, res) => {
  const p = new Player(req.body);
  await p.save();
  res.status(201).json(p);
};
exports.list = async (req, res) => {
  const players = await Player.find().limit(100);
  res.json(players);
};

exports.get = async (req, res) => {
  const p = await Player.findById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
};
exports.seed = async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [];
    const created = [];
    for (const element of items) {
      const p = new Player(element);
      await p.save();
      created.push(p);
    }
    return res.status(201).json({ message: 'Players seeded successfully', createdCount: created.length });
  } catch (err) {
    console.error('Error seeding players:', err);
    return res.status(500).json({ error: 'Seeding failed', details: err.message });
  }
};
