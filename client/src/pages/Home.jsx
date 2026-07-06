import { Link } from "react-router-dom";
import { menu } from "../data/menu";
import { gallery } from "../data/gallery";
import Reveal from "../components/Reveal";

const featured = menu.flatMap((c) => c.items).slice(0, 3);
const galleryPreview = gallery.slice(0, 4);

const stats = [
  { value: "10+", label: "Years in Springfield" },
  { value: "100%", label: "Local, Seasonal Produce" },
  { value: "700°F", label: "Wood-Fired Grill" },
  { value: "4.9★", label: "Average Guest Rating" },
];

const features = [
  {
    title: "Wood-Fired Cooking",
    desc: "Every dish passes over an open oak flame, the same technique we've used since day one.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22c4.418 0 7-2.686 7-6.5 0-3.5-2.5-5.5-3.5-8.5-1 1.5-2 2-2 2 .5-3-1-6-3.5-7 .5 3-1 5-3 7.5C5.5 11 5 13 5 15.5 5 19.314 7.582 22 12 22Z"
      />
    ),
  },
  {
    title: "Farm to Table",
    desc: "We work directly with growers within 50 miles, so the menu changes with the seasons.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21c-4-2-7-5.5-7-10a7 7 0 0 1 14 0c0 4.5-3 8-7 10Zm0 0V9"
      />
    ),
  },
  {
    title: "Curated Wine List",
    desc: "Small-production bottles chosen to match the char and smoke of the kitchen.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 3h8l-1 7a3 3 0 0 1-3 3 3 3 0 0 1-3-3L8 3Zm4 10v6m-3 0h6"
      />
    ),
  },
];

export default function Home() {
  return (
    <div>
      <section
        className="relative h-[70vh] min-h-105 flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&h=900&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-4 max-w-2xl">
          <p className="uppercase tracking-[0.3em] text-amber-300 text-sm mb-4 animate-[fade-up_0.6s_ease_both]">
            Downtown Springfield
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold mb-4 animate-[fade-up_0.6s_ease_0.1s_both]">
            Ember &amp; Oak
          </h1>
          <p className="text-lg text-stone-100 mb-8 animate-[fade-up_0.6s_ease_0.2s_both]">
            Wood-fired, seasonal dishes served in a warm, unhurried dining
            room.
          </p>
          <div className="animate-[fade-up_0.6s_ease_0.3s_both]">
            <Link
              to="/booking"
              className="inline-flex items-center rounded-full bg-amber-700 px-8 py-3 font-semibold hover:bg-amber-800 transition-colors"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-amber-700">
                {stat.value}
              </p>
              <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <Reveal className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            From the Kitchen
          </h2>
          <p className="text-stone-500 mt-2">
            A few favorites from our seasonal menu
          </p>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.name} delay={i * 120}>
              <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md h-full">
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif font-semibold text-stone-900">
                      {item.name}
                    </h3>
                    <span className="text-amber-700 font-semibold">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/menu"
            className="text-amber-700 font-semibold hover:text-amber-800"
          >
            View Full Menu &rarr;
          </Link>
        </div>
      </section>

      <section className="bg-stone-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Why Ember &amp; Oak
            </h2>
            <p className="text-stone-500 mt-2">
              What keeps our regulars coming back
            </p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 120}>
                <div className="rounded-2xl bg-white border border-stone-200 p-8 text-center h-full shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700 mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-7 w-7"
                    >
                      {feature.icon}
                    </svg>
                  </span>
                  <h3 className="font-serif font-semibold text-lg text-stone-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <Reveal className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Inside Ember &amp; Oak
          </h2>
          <p className="text-stone-500 mt-2">A glimpse of the dining room</p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {galleryPreview.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 100} className="overflow-hidden rounded-2xl">
              <Link to="/gallery" className="block group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-40 sm:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/gallery"
            className="text-amber-700 font-semibold hover:text-amber-800"
          >
            View Full Gallery &rarr;
          </Link>
        </div>
      </section>

      <section className="bg-stone-900 py-16">
        <Reveal className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-10 w-10 text-amber-600/40 mx-auto mb-6"
          >
            <path d="M9.5 6C6 6 3.5 8.7 3.5 12.3 3.5 15.4 5.6 17.5 8.3 17.5c2 0 3.4-1.4 3.4-3.2 0-1.7-1.1-2.9-2.7-2.9-.4 0-.8.1-1 .2.2-2 1.9-3.5 4-3.9L11.4 6c-.6.1-1.3.1-1.9 0Zm10 0c-3.5 0-6 2.7-6 6.3 0 3.1 2.1 5.2 4.8 5.2 2 0 3.4-1.4 3.4-3.2 0-1.7-1.1-2.9-2.7-2.9-.4 0-.8.1-1 .2.2-2 1.9-3.5 4-3.9L21.4 6c-.6.1-1.3.1-1.9 0Z" />
          </svg>
          <p className="font-serif text-2xl sm:text-3xl text-white leading-relaxed mb-6">
            "The best wood-fired cooking in Springfield &mdash; every plate
            feels like it was made for you, in a room that feels like home."
          </p>
          <p className="text-amber-400 font-semibold">Springfield Weekly</p>
        </Reveal>
      </section>

      <section className="bg-stone-100 py-16">
        <Reveal className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
            Ready for a table?
          </h2>
          <p className="text-stone-600 mb-8">
            Booking takes less than a minute &mdash; pick a date, time, and
            party size, and we'll confirm instantly.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center rounded-full bg-amber-700 px-8 py-3 font-semibold text-white hover:bg-amber-800 transition-colors"
          >
            Reserve a Table
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
