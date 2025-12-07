const express = require('express');
const router = express.Router();
const Alert = require('../models/alert');

// GET /api/alerts
router.get('/', async (req, res) => {
  const rows = await Alert.find().sort({ createdAt: -1 }).limit(200).lean();
  res.json(rows);
});

// POST /api/alerts (create)
router.post('/', async (req, res) => {
  const doc = await Alert.create(req.body);
  res.json(doc);
});

// POST /api/alerts/mark-read
router.post('/mark-read', async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids array required' });
  await Alert.updateMany({ _id: { $in: ids } }, { $set: { read: true } });
  res.json({ ok: true });
});

module.exports = router;

