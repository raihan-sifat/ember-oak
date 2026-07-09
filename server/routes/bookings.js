const express = require('express');
const { db } = require('../db');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,}$/;

function validateBooking(body) {
  const errors = [];
  const { name, contact, date, time, party_size, notes } = body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Name is required.');
  }

  if (!contact || typeof contact !== 'string' || (!EMAIL_RE.test(contact.trim()) && !PHONE_RE.test(contact.trim()))) {
    errors.push('A valid email or phone number is required.');
  }

  if (!date || Number.isNaN(Date.parse(date))) {
    errors.push('A valid date is required.');
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(date) < today) {
      errors.push('Date cannot be in the past.');
    }
  }

  const timeMatch = typeof time === 'string' && time.match(/^(\d{2}):(\d{2})$/);
  if (!timeMatch || Number(timeMatch[1]) > 23 || Number(timeMatch[2]) > 59) {
    errors.push('A valid time is required.');
  }

  const size = Number(party_size);
  if (!Number.isInteger(size) || size < 1 || size > 20) {
    errors.push('Party size must be between 1 and 20.');
  }

  if (notes && typeof notes !== 'string') {
    errors.push('Notes must be text.');
  }

  return errors;
}

// libsql rows come back as Row objects keyed by column name; spread into a
// plain object so res.json() serializes exactly the columns we expect.
function rowToBooking(row) {
  return {
    id: Number(row.id),
    name: row.name,
    contact: row.contact,
    date: row.date,
    time: row.time,
    party_size: Number(row.party_size),
    notes: row.notes,
    created_at: row.created_at,
  };
}

router.post('/', async (req, res) => {
  const errors = validateBooking(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const { name, contact, date, time, party_size, notes } = req.body;

  const insertResult = await db.execute({
    sql: `
      INSERT INTO bookings (name, contact, date, time, party_size, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    args: [name.trim(), contact.trim(), date, time, Number(party_size), notes ? notes.trim() : null],
  });

  const selectResult = await db.execute({
    sql: 'SELECT * FROM bookings WHERE id = ?',
    args: [insertResult.lastInsertRowid],
  });

  res.status(201).json({ booking: rowToBooking(selectResult.rows[0]) });
});

router.get('/', async (req, res) => {
  const result = await db.execute('SELECT * FROM bookings ORDER BY date, time');
  res.json({ bookings: result.rows.map(rowToBooking) });
});

router.delete('/:id', async (req, res) => {
  const result = await db.execute({
    sql: 'DELETE FROM bookings WHERE id = ?',
    args: [req.params.id],
  });
  if (result.rowsAffected === 0) {
    return res.status(404).json({ errors: ['Booking not found.'] });
  }
  res.status(204).end();
});

module.exports = router;
