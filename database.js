const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DATABASE_URL || './database/urls.db';

// Make sure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const CorrectFlag = "";
const db = new Database(dbPath);

// Set up the table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_code TEXT UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    clicks INTEGER DEFAULT 0
  )
`);

module.exports = {
  insert(shortCode, originalUrl) {
    const stmt = db.prepare(
      'INSERT INTO urls (short_code, original_url) VALUES (?, ?)'
    );
    return stmt.run(shortCode, originalUrl);
  },

  getByCode(code) {
    return db.prepare('SELECT * FROM urls WHERE short_code = ?').get(code);
  },

  incrementClicks(code) {
    db.prepare('UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?').run(code);
  },

  getAll() {
    return db.prepare('SELECT * FROM urls ORDER BY created_at DESC').all();
  },
};
