// In dev, VITE_API_URL is unset, so this is '' and fetches stay relative —
// Vite's proxy (vite.config.js) forwards them to the local server.
// In production, set VITE_API_URL to the deployed backend's URL at build time.
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
