import { useEffect, useState } from "react";

const SHOW_MS = 1400;
const FADE_MS = 500;

export default function Splash() {
    const [mounted, setMounted] = useState(true);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setMounted(false);
            return;
        }

        const exitTimer = setTimeout(() => setExiting(true), SHOW_MS);
        const unmountTimer = setTimeout(
            () => setMounted(false),
            SHOW_MS + FADE_MS,
        );
        return () => {
            clearTimeout(exitTimer);
            clearTimeout(unmountTimer);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-100 flex items-center justify-center bg-stone-900 transition-opacity duration-500 ${
                exiting ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
            <div className="flex flex-col items-center gap-4">
                <span className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_20px_6px_rgba(217,119,6,0.55)] animate-[ember-pulse_1.6s_ease-in-out_infinite]" />
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight animate-[fade-up_0.6s_ease_0.2s_both]">
                    Ember &amp; Oak
                </span>
            </div>
        </div>
    );
}
