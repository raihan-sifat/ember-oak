import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function linkClass({ isActive }) {
  return `text-sm uppercase tracking-wide transition-colors hover:text-amber-600 ${
    isActive ? 'text-amber-700 font-semibold' : 'text-stone-600'
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur border-b border-stone-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
        <NavLink to="/" className="font-serif text-xl font-bold text-stone-900 tracking-tight">
          Ember &amp; Oak
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <NavLink
            to="/booking"
            className="inline-flex items-center rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800 transition-colors"
          >
            Reserve a Table
          </NavLink>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-stone-700"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/booking"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800 transition-colors"
            >
              Reserve a Table
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
