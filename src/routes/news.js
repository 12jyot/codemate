const express = require('express');
const router = express.Router();
const News = require('../models/news');

// GET /api/news
router.get('/', async (req, res) => {
  const q = req.query.q;
  const filter = {};
  if (q) filter.title = new RegExp(q, 'i');
  const list = await News.find(filter).sort({ publishedAt: -1 }).limit(500).lean();
  res.json(list);
});

// POST /api/news
router.post('/', async (req, res) => {
  const doc = await News.create(req.body);
  res.json(doc);
});

module.exports = router;
