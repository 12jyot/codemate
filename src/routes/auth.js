const express = require('express');
const router = express.Router();

// Basic /me endpoint (stub)
router.get('/me', (req, res) => {
  res.json({ id: 'user-1', name: 'Demo User', role: 'admin' });
});

module.exports = router;
