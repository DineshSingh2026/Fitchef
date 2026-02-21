import { images } from '../lib/images';

const FEATURES = [
  {
    title: 'Curated Menus',
    description: 'Chef-designed selections that balance flavor and nutrition for discerning palates.',
    image: 'featureMenus',
  },
  {
    title: 'Effortless Delivery',
    description: 'Premium packaging and reliable delivery so your meals arrive in perfect condition.',
    image: 'featureDelivery',
  },
  {
    title: 'Sustainable Sourcing',
    description: 'Ingredients chosen for quality and responsibility to people and planet.',
    image: 'featureSourcing',
  },
  {
    title: 'Personalized Vitality',
    description: 'Meals tailored to support your energy, goals, and lifestyle.',
    image: 'featureVitality',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-ink text-center mb-3 sm:mb-4">
          Why FitChef
        </h2>
        <p className="text-slate-600 text-center text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-14">
          Premium wellness, delivered with care.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, image }) {
  const src = images[image];
  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100 w-full min-w-0">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-ink mb-1 sm:mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
