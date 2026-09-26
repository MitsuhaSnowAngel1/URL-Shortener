const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const db = require('../database');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// POST /api/shorten
router.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  // Very basic check
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return res.status(400).json({ error: 'URL must start with http:// or https://' });
  }

  const code = nanoid(6);

  try {
    db.insert(code, url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong.' });
  }

  return res.json({
    short_code: code,
    short_url: `${BASE_URL}/${code}`,
    original_url: url,
  });
});

// GET /api/info/:code
router.get('/info/:code', (req, res) => {
  const row = db.getByCode(req.params.code);

  if (!row) {
    return res.status(404).json({ error: 'Not found.' });
  }

  return res.json({
    short_code: row.short_code,
    original_url: row.original_url,
    created_at: row.created_at,
    clicks: row.clicks,
  });
});

module.exports = router;
