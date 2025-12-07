const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');

// GET /api/campaigns
router.get('/', async (req, res) => {
  const q = req.query;
  const filter = {};
  if (q.companyId) filter.companyId = q.companyId;
  const list = await Campaign.find(filter).sort({ createdAt: -1 }).limit(500).lean();
  res.json(list);
});

// GET /api/campaigns/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const c = await Campaign.findById(id).lean();
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

// POST /api/campaigns
router.post('/', async (req, res) => {
  const payload = req.body;
  const doc = await Campaign.create(payload);
  res.json(doc);
});

module.exports = router;
