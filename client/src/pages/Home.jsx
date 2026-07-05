import { Link } from "react-router-dom";
import { menu } from "../data/menu";

const featured = menu.flatMap((c) => c.items).slice(0, 3);

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
                    <p className="uppercase tracking-[0.3em] text-amber-300 text-sm mb-4">
                        Downtown Springfield
                    </p>
                    <h1 className="font-serif text-4xl sm:text-6xl font-bold mb-4">
                        Ember &amp; Oak
                    </h1>
                    <p className="text-lg text-stone-100 mb-8">
                        Wood-fired, seasonal dishes served in a warm, unhurried
                        dining room.
                    </p>
                    <Link
                        to="/booking"
                        className="inline-flex items-center rounded-full bg-amber-700 px-8 py-3 font-semibold hover:bg-amber-800 transition-colors"
                    >
                        Reserve a Table
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl font-bold text-stone-900">
                        From the Kitchen
                    </h2>
                    <p className="text-stone-500 mt-2">
                        A few favorites from our seasonal menu
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-3">
                    {featured.map((item) => (
                        <div
                            key={item.name}
                            className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-48 w-full object-cover"
                                loading="lazy"
                            />
                            <div className="p-5">
                                <div className="flex items-baseline justify-between gap-2">
                                    <h3 className="font-serif font-semibold text-stone-900">
                                        {item.name}
                                    </h3>
                                    <span className="text-amber-700 font-semibold">
                                        ${item.price}
                                    </span>
                                </div>
                                <p className="text-sm text-stone-500 mt-1">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
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
                <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
                        Ready for a table?
                    </h2>
                    <p className="text-stone-600 mb-8">
                        Booking takes less than a minute &mdash; pick a date,
                        time, and party size, and we'll confirm instantly.
                    </p>
                    <Link
                        to="/booking"
                        className="inline-flex items-center rounded-full bg-amber-700 px-8 py-3 font-semibold text-white hover:bg-amber-800 transition-colors"
                    >
                        Reserve a Table
                    </Link>
                </div>
            </section>
        </div>
    );
}
