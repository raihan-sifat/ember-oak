import { menu } from '../data/menu';

export default function Menu() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Our Menu</h1>
        <p className="text-stone-500 mt-2">Seasonal ingredients, wood-fired preparation</p>
      </div>

      {menu.map((category) => (
        <div key={category.category} className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-amber-700 mb-6 border-b border-stone-200 pb-2">
            {category.category}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <div key={item.name} className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm">
                <img src={item.image} alt={item.name} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif font-semibold text-stone-900">{item.name}</h3>
                    <span className="text-amber-700 font-semibold">${item.price}</span>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
