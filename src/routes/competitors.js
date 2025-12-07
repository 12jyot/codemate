const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const Campaign = require('../models/campaign');

// GET /api/competitors
router.get('/', async (req, res) => {
  const q = req.query.q;
  const filter = q ? { name: new RegExp(q, 'i') } : {};
  const list = await Company.find(filter).limit(500).lean();
  res.json(list);
});

// GET /api/competitors/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const company = await Company.findById(id).lean();
    if (!company) return res.status(404).json({ error: 'Not found' });
    const activeCampaigns = await Campaign.find({ companyId: id }).sort({ createdAt: -1 }).limit(20).lean();
    res.json({ ...company, activeCampaigns });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/competitors (create / upsert)
router.post('/', async (req, res) => {
  const body = req.body;
  try {
    let c = await Company.findOne({ name: body.name });
    if (c) {
      Object.assign(c, body);
      await c.save();
      return res.json(c);
    }
    c = await Company.create(body);
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
