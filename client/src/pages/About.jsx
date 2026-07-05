export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        <div>
          <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">Our Story</h1>
          <p className="text-stone-600 leading-relaxed mb-4">
            Ember &amp; Oak opened in 2015 with a simple idea: cook honest, seasonal food over
            an open flame, and serve it in a room that feels like someone's home. Every dish on
            our menu starts with what's fresh that week from local farms, then finishes on the
            wood-fired grill that anchors our open kitchen.
          </p>
          <p className="text-stone-600 leading-relaxed mb-10">
            What began as a small neighborhood spot has grown into a downtown favorite, but the
            philosophy hasn't changed &mdash; simple ingredients, careful technique, and a warm
            table for every guest.
          </p>

          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">Opening Hours</h2>
          <dl className="text-stone-600 divide-y divide-stone-200 border-y border-stone-200">
            <div className="flex justify-between py-3">
              <dt>Monday</dt>
              <dd className="text-stone-400">Closed</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt>Tuesday &ndash; Thursday</dt>
              <dd>5:00 PM &ndash; 9:30 PM</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt>Friday &ndash; Saturday</dt>
              <dd>5:00 PM &ndash; 10:30 PM</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt>Sunday</dt>
              <dd>4:00 PM &ndash; 9:00 PM</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">Find Us</h2>
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
            <iframe
              title="Ember & Oak location map"
              src="https://www.google.com/maps?q=Springfield+downtown+restaurant&output=embed"
              className="w-full h-96 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-stone-600 mt-4">221 Maple Street, Springfield</p>
        </div>
      </div>
    </div>
  );
}
