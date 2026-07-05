import { useState } from 'react';

const initialForm = { name: '', contact: '', date: '', time: '', party_size: 2, notes: '' };

export default function Booking() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState([]);
  const [confirmed, setConfirmed] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, party_size: Number(form.party_size) }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || ['Something went wrong. Please try again.']);
        return;
      }

      setConfirmed(data.booking);
      setForm(initialForm);
    } catch {
      setErrors(['Could not reach the server. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Reserve a Table</h1>
        <p className="text-stone-500 mt-2">Fill in your details and we'll confirm instantly</p>
      </div>

      {confirmed ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-amber-800 mb-2">Booking Confirmed!</h2>
          <p className="text-amber-800">
            Thanks, {confirmed.name}. Your table for {confirmed.party_size} on{' '}
            {new Date(confirmed.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}{' '}
            at {confirmed.time} is booked. A confirmation will be sent to {confirmed.contact}.
          </p>
          <button
            type="button"
            onClick={() => setConfirmed(null)}
            className="mt-6 inline-flex items-center rounded-full bg-amber-700 px-6 py-2 font-semibold text-white hover:bg-amber-800 transition-colors"
          >
            Make Another Booking
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          {errors.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="contact">Email or Phone</label>
              <input
                id="contact"
                name="contact"
                required
                value={form.contact}
                onChange={handleChange}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                min={today}
                required
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="time">Time</label>
              <input
                id="time"
                name="time"
                type="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="party_size">Party Size</label>
              <input
                id="party_size"
                name="party_size"
                type="number"
                min={1}
                max={20}
                required
                value={form.party_size}
                onChange={handleChange}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              placeholder="Allergies, special occasions, seating preferences..."
              className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center rounded-full bg-amber-700 px-8 py-3 font-semibold text-white hover:bg-amber-800 transition-colors disabled:opacity-60"
          >
            {submitting ? 'Booking...' : 'Confirm Reservation'}
          </button>
        </form>
      )}
    </div>
  );
}
