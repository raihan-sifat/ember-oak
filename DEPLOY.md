# Deployment architecture

Ember & Oak is split across three free-tier services rather than one, because
the two halves of the app (and its data) have fundamentally different hosting
needs.

| Piece | What it is | Hosted on |
|---|---|---|
| `client/` | The React site (static HTML/CSS/JS after build) | **Vercel** |
| `server/` | The Express API (a long-running Node process) | **Render** |
| Bookings data | The database | **Turso** (hosted SQLite) |

## Why three separate services

**Vercel serves `client/` as static files.** After `vite build`, the site is
just HTML/CSS/JS with no server-side code to execute — Vercel's CDN can serve
those files instantly and cheaply, with no cold starts.

**Render runs `server/` as a persistent process.** The Express API has to
stay alive, listen for requests, and execute code (validate a booking, query
the database) on every call — that needs an actual long-running Node process,
which is a different kind of hosting than serving static files.

**Turso holds the bookings data, separate from the API server.** Render's
free tier gives the server no persistent disk — any file it writes gets
wiped on every restart, redeploy, or wake from sleep. Turso is an always-on,
separately hosted SQLite-compatible database, so bookings survive all of
that regardless of what happens to the API process.

## How they talk to each other

- The client calls the API over HTTPS using a build-time environment
  variable (`VITE_API_URL`) pointing at the Render URL — never hardcoded.
- The API only accepts requests from the deployed client's origin via a
  `CLIENT_ORIGIN` environment variable, enforced through CORS — this is what
  stops arbitrary other sites from calling the API directly.
- The API connects to Turso using a database URL and an auth token, both
  supplied as environment variables at deploy time and never committed to
  the repo. All secrets live only in each host's dashboard.

## Operational notes

- **Cold starts**: Render's free tier sleeps the API after 15 minutes of
  inactivity. The first request after that takes ~30-50 seconds while it
  wakes back up — expected free-tier behavior, not a bug.
- **No custom domain**: the free `*.vercel.app` / `*.onrender.com`
  subdomains are used as-is, which is fine for a portfolio piece.
- See the project's own notes for other intentionally-out-of-scope gaps
  (no auth on `/admin`, Contact form doesn't send anywhere, etc.).
