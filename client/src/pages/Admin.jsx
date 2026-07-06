import { useEffect, useState } from 'react';
import { apiUrl } from '../lib/api';

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadBookings() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl('/api/bookings'));
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      setError('Could not load bookings.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleDelete(id) {
    if (!confirm('Cancel this booking?')) return;
    await fetch(apiUrl(`/api/bookings/${id}`), { method: 'DELETE' });
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Bookings Admin</h1>
          <p className="text-stone-500 mt-1">All reservations, newest by date/time first</p>
        </div>
        <button
          type="button"
          onClick={loadBookings}
          className="rounded-full border border-stone-300 px-5 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-stone-500">Loading bookings...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-stone-500">No bookings yet.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
          <table className="min-w-full divide-y divide-stone-200 text-sm">
            <thead className="bg-stone-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Time</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Contact</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Party</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700">Notes</th>
                <th className="px-4 py-3 text-left font-semibold text-stone-700"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 whitespace-nowrap">{b.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{b.time}</td>
                  <td className="px-4 py-3">{b.name}</td>
                  <td className="px-4 py-3">{b.contact}</td>
                  <td className="px-4 py-3">{b.party_size}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{b.notes || '—'}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(b.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
