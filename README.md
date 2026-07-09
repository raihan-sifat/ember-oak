# Ember & Oak — Restaurant Website + Reservation System

Portfolio project combining a restaurant marketing site with a full-stack
reservation booking system.

## Structure

- `client/` — React (Vite) + Tailwind CSS frontend: Home, Menu, Gallery,
  About, Contact, Booking, and an Admin bookings dashboard.
- `server/` — Node.js + Express API backed by SQLite (`better-sqlite3`),
  handling booking creation, validation, listing, and cancellation.

## Running locally

**Backend** (http://localhost:4000):

```bash
cd server
npm install
npm run dev
```

**Frontend** (http://localhost:5173, proxies `/api` to the backend):

```bash
cd client
npm install
npm run dev
```

## API

- `POST /api/bookings` — create a booking (`name`, `contact`, `date`, `time`,
  `party_size`, `notes?`). Validates all fields server-side.
- `GET /api/bookings` — list all bookings.
- `DELETE /api/bookings/:id` — cancel a booking.

## Deploying

See [DEPLOY.md](DEPLOY.md) for a free (no credit card) walkthrough:
Vercel for the client, Render for the API, Turso for a persistent database.

## Notes

- Menu and gallery photos are hotlinked from Unsplash for demo purposes only
  — swap in real restaurant photography before using this for a client.
- `server/bookings.db` is created automatically on first run and is
  git-ignored.
