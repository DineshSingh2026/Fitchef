import { images } from '../lib/images';

const CREATIONS = [
  {
    key: 'creationGourmet',
    title: 'Gourmet plated',
    description: 'Chef-crafted dishes with professional presentation.',
  },
  {
    key: 'creationIngredients',
    title: 'Fresh ingredients',
    description: 'Quality produce and precise nutrition in mind.',
  },
  {
    key: 'creationBowls',
    title: 'Vibrant bowls',
    description: 'Ready-to-eat, nutritious meal options.',
  },
];

export default function HealthyCreations() {
  return (
    <section id="healthy-creations" className="relative scroll-mt-6">
      {/* Section name in its own white bar so it's always visible */}
      <div className="bg-white py-8 sm:py-10 px-4 sm:px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mb-2 sm:mb-3">
            Our Healthy Creations
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            From gourmet plates to fresh ingredients and vibrant bowls — crafted for your wellness.
          </p>
        </div>
      </div>
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CREATIONS.map((item) => (
            <div
              key={item.key}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={images[item.key]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
