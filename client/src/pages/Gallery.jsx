import { gallery } from '../data/gallery';

export default function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Gallery</h1>
        <p className="text-stone-500 mt-2">A look inside Ember &amp; Oak</p>
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {gallery.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className="w-full rounded-2xl break-inside-avoid shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}
