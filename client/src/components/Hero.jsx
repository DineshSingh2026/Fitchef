import { useState } from 'react';
import { images } from '../lib/images';

const CTA_TEXT = 'Get Exclusive Early Access';

export default function Hero({ onCtaClick }) {
  const [hover, setHover] = useState(false);

  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center overflow-hidden bg-white">
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="FitChef — Gourmet wellness"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl px-4 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16">
        <h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-ink tracking-tight animate-fade-in-up mb-4 sm:mb-5"
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        >
          Elevate Your Daily Nutrition
        </h1>

        <p
          className="font-display text-xl sm:text-2xl md:text-3xl text-[#16a34a] font-semibold mb-2 sm:mb-3 animate-fade-in-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
        >
          Gourmet Wellness, Delivered.
        </p>

        <p
          className="text-slate-600 text-xs sm:text-sm md:text-base max-w-md mb-8 sm:mb-10 animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
        >
          Launching Soon — Be First. Eat Exceptionally.
        </p>

        <div
          className="animate-fade-in-up w-full sm:w-auto"
          style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
        >
          <button
            type="button"
            onClick={onCtaClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`
              w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-md font-medium tracking-wide transition-all duration-200 min-h-[48px] text-white
              ${hover
                ? 'bg-[#22c55e] shadow-lg scale-[1.02]'
                : 'bg-[#16a34a] hover:bg-[#22c55e] active:bg-[#15803d]'
              }
            `}
          >
            {CTA_TEXT}
          </button>
        </div>
      </div>
    </section>
  );
}
