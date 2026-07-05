import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Contact Us</h1>
        <p className="text-stone-500 mt-2">Questions, private events, or feedback &mdash; we'd love to hear from you</p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 mb-4">Get in Touch</h2>
          <ul className="space-y-3 text-stone-600">
            <li>221 Maple Street, Springfield</li>
            <li>(555) 123-4567</li>
            <li>hello@emberandoak.example</li>
          </ul>
        </div>

        <div>
          {sent ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
              Thanks, {form.name || 'friend'}! Your message has been sent &mdash; we'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-amber-700 px-8 py-3 font-semibold text-white hover:bg-amber-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
