import { images } from '../lib/images';

export default function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 w-full min-w-0">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl aspect-[4/3] max-h-[280px] sm:max-h-[360px] lg:max-h-[420px]">
              <img
                src={images.about}
                alt="FitChef — Chef-crafted wellness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full min-w-0">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-ink mb-4 sm:mb-6">
              About FitChef
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-5">
              Elevate your daily nutrition with bespoke, chef-crafted meals designed for those who invest in vitality.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              FitChef blends artisanal craftsmanship with science-backed nutrition to create meals that nourish body and soul. Sourced from premium, sustainable ingredients, our gourmet offerings transform healthy eating into an effortless luxury.
            </p>
            <p className="text-gold-dark text-sm font-semibold">
              Currently accepting early access members before official launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
