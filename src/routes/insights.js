const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');

// Simple example endpoint: product category trends
router.get('/product-categories', async (req, res) => {
  // aggregate categories from campaigns (basic)
  const pipeline = [
    { $unwind: { path: "$productCategories", preserveNullAndEmptyArrays: false } },
    { $group: { _id: "$productCategories", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 50 }
  ];
  const rows = await Campaign.aggregate(pipeline);
  res.json({ categories: rows.map(r => ({ name: r._id, totalCampaigns: r.count })) });
});

module.exports = router;
