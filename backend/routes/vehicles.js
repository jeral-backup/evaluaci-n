const express = require('express');
const { Vehicle } = require('../models');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// Create
router.post('/', requireAuth, async (req, res) => {
  try {
    const { plate, type, model, notes } = req.body;
    if (!plate || !type) return res.status(400).json({ error: 'plate and type required' });
    const v = await Vehicle.create({ plate, type, model, notes });
    res.json(v);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Read all
router.get('/', requireAuth, async (req, res) => {
  const list = await Vehicle.findAll();
  res.json(list);
});

// Read one
router.get('/:id', requireAuth, async (req, res) => {
  const v = await Vehicle.findByPk(req.params.id);
  if (!v) return res.status(404).json({ error: 'Not found' });
  res.json(v);
});

// Update
router.put('/:id', requireAuth, async (req, res) => {
  const v = await Vehicle.findByPk(req.params.id);
  if (!v) return res.status(404).json({ error: 'Not found' });
  const { plate, type, model, notes } = req.body;
  await v.update({ plate, type, model, notes });
  res.json(v);
});

// Delete
router.delete('/:id', requireAuth, async (req, res) => {
  const v = await Vehicle.findByPk(req.params.id);
  if (!v) return res.status(404).json({ error: 'Not found' });
  await v.destroy();
  res.json({ ok: true });
});

module.exports = router;
