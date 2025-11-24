const express = require('express');
const { Maintenance, Vehicle } = require('../models');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// Create
router.post('/', requireAuth, async (req, res) => {
  try {
    const { vehicleId, performedAt, description, cost } = req.body;
    if (!vehicleId || !performedAt) return res.status(400).json({ error: 'vehicleId and performedAt required' });
    // ensure vehicle exists
    const v = await Vehicle.findByPk(vehicleId);
    if (!v) return res.status(400).json({ error: 'Vehicle not found' });
    const m = await Maintenance.create({ vehicleId, performedAt, description, cost });
    res.json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// List
router.get('/', requireAuth, async (req, res) => {
  const list = await Maintenance.findAll({ include: [Vehicle] });
  res.json(list);
});

// Get
router.get('/:id', requireAuth, async (req, res) => {
  const m = await Maintenance.findByPk(req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  res.json(m);
});

// Update
router.put('/:id', requireAuth, async (req, res) => {
  const m = await Maintenance.findByPk(req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  const { performedAt, description, cost } = req.body;
  await m.update({ performedAt, description, cost });
  res.json(m);
});

// Delete
router.delete('/:id', requireAuth, async (req, res) => {
  const m = await Maintenance.findByPk(req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  await m.destroy();
  res.json({ ok: true });
});

module.exports = router;
