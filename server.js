require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database');
const urlRoutes = require('./routes/urls');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', urlRoutes);

// Redirect short URLs
app.get('/:code', (req, res) => {
  const { code } = req.params;

  const row = db.getByCode(code);

  if (!row) {
    return res.status(404).send('Short URL not found.');
  }

  db.incrementClicks(code);
  res.redirect(row.original_url);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
