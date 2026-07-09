const express = require('express');
const cors = require('cors');
const { initDb } = require('./db');
const bookingsRouter = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

// CLIENT_ORIGIN unset (local dev) -> allow all. Set it in production to lock
// CORS down to the deployed client's origin.
app.use(cors(CLIENT_ORIGIN ? { origin: CLIENT_ORIGIN } : undefined));
app.use(express.json());

app.use('/api/bookings', bookingsRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Booking API listening on http://localhost:${PORT}`);
  });
});
