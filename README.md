<div align="center">

<img src="client/public/favicon.svg" width="96" alt="Ember & Oak logo" />

# Ember & Oak

*Wood-fired, seasonal cooking — with a full-stack reservation system.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Turso](https://img.shields.io/badge/Turso-4FF8D2?style=flat-square&logo=turso&logoColor=black)](https://turso.tech)

[Features](#features) • [Tech stack](#tech-stack) • [Architecture](#architecture) • [Database](#database) • [Getting started](#getting-started) • [API](#api) • [Scripts](#scripts) • [Roadmap](#roadmap) • [Deployment](#deployment)

</div>

Ember & Oak is a full-stack restaurant marketing site with a working table
reservation system. The front end is a polished, responsive multi-page site
(hero, menu, gallery, about, contact), and the back end is a real Express API
persisting bookings to SQLite — with validation, an admin dashboard, and a
free-tier deployment split across three services:

```
Browse menu → Reserve a table → Get confirmed instantly → Manage bookings in admin
```

> [!NOTE]
> This project was built as a portfolio showcase, demonstrating full CRUD,
> server-side validation, responsive and accessible UI/UX, SQLite-backed
> persistence, and production deployment across Vercel, Render, and Turso.

## Features

- **Marketing pages** — Home (hero, stats, featured dishes, testimonials),
  Menu (categorized starters/mains/desserts), Gallery, About (story, hours,
  embedded map), and Contact
- **Reservation booking** — date, time, and party-size pickers with instant
  confirmation and a friendly success state
- **Server-side validation** — name, email-or-phone, no past dates, HH:MM
  time, and party size 1–20 are enforced by the API, not just the form
- **Admin dashboard** — all reservations in one table, sorted by date/time,
  with cancel and refresh
- **Animations** — splash screen, scroll-reveal, and page-transition effects
- **Responsive** — mobile hamburger nav, adaptive grids, and a sticky header
  across every viewport

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router 7 |
| Linting | oxlint |
| Backend | Node.js, Express 5 |
| Database | Turso (libSQL / SQLite), local file fallback |
| Deployment | Vercel (client) + Render (API) + Turso (database) |

## Architecture

Two independent packages with no shared runtime: `client/` is a static Vite
site, `server/` is a long-running Express process. In development, Vite
proxies `/api` to the local server so both halves work as one app.

```
client/                     # React site (Vite)
├── src/
│   ├── pages/              # Home, Menu, Gallery, About, Contact, Booking, Admin
│   ├── components/         # Navbar, Footer, Splash, Reveal
│   ├── data/               # menu.js, gallery.js (placeholder content)
│   └── lib/                # api.js — VITE_API_URL with dev-proxy fallback
└── public/                 # favicon, icons

server/                     # Express API
├── index.js                # app setup, CORS, /api/health
├── db.js                   # Turso/libSQL client + schema initialization
└── routes/bookings.js      # create / list / cancel + validation
```

## Database

A single `bookings` table, created automatically on startup:

| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key, auto-increment |
| `name` | TEXT | Guest name |
| `contact` | TEXT | Email or phone |
| `date` | TEXT | `YYYY-MM-DD` |
| `time` | TEXT | `HH:MM` |
| `party_size` | INTEGER | 1–20 |
| `notes` | TEXT | Optional |
| `created_at` | TEXT | Defaults to `datetime('now')` |

In development the database is a local `server/bookings.db` file, created on
first run and git-ignored. In production, `db.js` connects to a hosted Turso
database via environment variables, so bookings survive restarts and redeploys.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20.19+ (or 22.12+)
- npm

No cloud account is required — local development works out of the box with
zero environment variables.

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/raihan-sifat/ember-oak.git
cd ember-oak

# 2. Start the API (http://localhost:4000)
cd server
npm install
npm run dev

# 3. In a second terminal, start the client (http://localhost:5173)
cd client
npm install
npm run dev
```

Vite's proxy (`client/vite.config.js`) forwards `/api` requests to
`localhost:4000`, so the site just works. The `.env.example` files in each
package document the production-only variables (`VITE_API_URL`,
`CLIENT_ORIGIN`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`) — leave them unset
for local dev.

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check → `{ "status": "ok" }` |
| `POST` | `/api/bookings` | Create a booking → 201 with `{ booking }` or 400 with `{ errors }` |
| `GET` | `/api/bookings` | List all bookings, ordered by date and time |
| `DELETE` | `/api/bookings/:id` | Cancel a booking → 204, or 404 with `{ errors }` |

```bash
curl -X POST http://localhost:4000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada Lovelace","contact":"ada@example.com",\
       "date":"2026-09-01","time":"19:30","party_size":4}'
```

## Scripts

| Directory | Command | Description |
|---|---|---|
| `client/` | `npm run dev` | Vite dev server on port 5173 |
| `client/` | `npm run build` | Production build |
| `client/` | `npm run lint` | Lint with oxlint |
| `client/` | `npm run preview` | Preview the production build |
| `server/` | `npm run dev` | API with nodemon on port 4000 |
| `server/` | `npm start` | Run the API with plain Node |

## Roadmap

| Milestone | Status |
|---|---|
| Marketing pages (Home, Menu, Gallery, About, Contact) | ✅ Done |
| Reservation booking + server-side validation | ✅ Done |
| Admin dashboard (list, cancel, refresh) | ✅ Done |
| Deployment (Vercel + Render + Turso) | ✅ Done |
| Auth for the admin dashboard | 🚧 Planned |
| Contact form wired to a backend | 🚧 Planned |
| Table capacity / availability checking | 🚧 Planned |
| Real restaurant photography and contact details | 🚧 Planned |

## Deployment

The app is deliberately split across three free tiers — see
[DEPLOY.md](DEPLOY.md) for the full walkthrough:

1. Push the repo to GitHub and import `client/` in Vercel (static hosting).
2. Deploy `server/` as a web service on Render (long-running Node process).
3. Create a Turso database and set `TURSO_DATABASE_URL` +
   `TURSO_AUTH_TOKEN` on Render; set `VITE_API_URL` at build time on Vercel;
   set `CLIENT_ORIGIN` on Render to lock down CORS.
4. Done — no credit card required.

> [!NOTE]
> Demo scope by design: menu/gallery photos are hotlinked from Unsplash,
> contact details are placeholders, and `/admin` has no authentication.
> The first request after Render's free tier sleeps can take ~30–50s to wake.
