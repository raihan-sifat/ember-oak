export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-serif text-lg text-white font-bold mb-2">Ember &amp; Oak</div>
          <p>Seasonal, fire-driven cooking in the heart of downtown.</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Hours</div>
          <p>Tue&ndash;Sun: 5:00 PM &ndash; 10:00 PM</p>
          <p>Closed Mondays</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Contact</div>
          <p>221 Maple Street, Springfield</p>
          <p>(555) 123-4567</p>
        </div>
      </div>
      <div className="border-t border-stone-800 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Ember &amp; Oak. Portfolio demo project.
      </div>
    </footer>
  );
}
