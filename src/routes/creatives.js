const express = require('express');
const router = express.Router();
const Creative = require('../models/creative');

// GET /api/creatives
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.campaignId) filter.campaignId = req.query.campaignId;
  if (req.query.companyId) filter.companyId = req.query.companyId;
  const list = await Creative.find(filter).sort({ createdAt: -1 }).limit(500).lean();
  res.json(list);
});

// POST /api/creatives
router.post('/', async (req, res) => {
  const payload = req.body;
  const doc = await Creative.create(payload);
  res.json(doc);
});

module.exports = router;
