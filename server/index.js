const express = require('express');
const cors = require('cors');
const bookingsRouter = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingsRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Booking API listening on http://localhost:${PORT}`);
});
