const express = require('express');
const db = require('../db');

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

router.post('/', (req, res) => {
  const errors = validateBooking(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const { name, contact, date, time, party_size, notes } = req.body;

  const stmt = db.prepare(`
    INSERT INTO bookings (name, contact, date, time, party_size, notes)
    VALUES (@name, @contact, @date, @time, @party_size, @notes)
  `);

  const info = stmt.run({
    name: name.trim(),
    contact: contact.trim(),
    date,
    time,
    party_size: Number(party_size),
    notes: notes ? notes.trim() : null,
  });

  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ booking });
});

router.get('/', (req, res) => {
  const bookings = db.prepare('SELECT * FROM bookings ORDER BY date, time').all();
  res.json({ bookings });
});

router.delete('/:id', (req, res) => {
  const info = db.prepare('DELETE FROM bookings WHERE id = ?').run(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ errors: ['Booking not found.'] });
  }
  res.status(204).end();
});

module.exports = router;
