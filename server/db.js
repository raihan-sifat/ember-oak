const { createClient } = require('@libsql/client');
const path = require('path');

// TURSO_DATABASE_URL unset (local dev) -> fall back to a local file, same
// pattern as CLIENT_ORIGIN/VITE_API_URL: no cloud account needed to run
// `npm run dev`. Set both env vars in production to use a hosted Turso DB
// (which, unlike Render's free-tier local disk, actually persists).
const url = process.env.TURSO_DATABASE_URL || `file:${path.join(__dirname, 'bookings.db')}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({ url, authToken });

async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      party_size INTEGER NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}

module.exports = { db, initDb };
