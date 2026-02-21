import { images } from '../lib/images';

const logoSrc = images.logo.includes(' ') ? images.logo.replace(/ /g, '%20') : images.logo;

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b transition-colors duration-200
        bg-white border-slate-200 shadow-sm
        lg:bg-white/85 lg:backdrop-blur-md lg:border-slate-200/40 lg:shadow-sm lg:shadow-black/5"
    >
      <div className="w-full pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 xl:pl-10 xl:pr-10 flex items-center justify-between gap-4 h-14 sm:h-16 md:h-[72px] lg:h-20">
        <button
          type="button"
          onClick={scrollToTop}
          className="focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2 rounded-md p-1 -m-1 flex items-center shrink-0"
          aria-label="FitChef — go to top"
        >
          <img
            src={logoSrc}
            alt="FitChef"
            className="h-8 w-auto sm:h-9 md:h-10 lg:h-11 xl:h-12 max-w-[180px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[300px] object-contain object-left drop-shadow-sm"
          />
        </button>
        <p className="text-[#16a34a] font-display text-right text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold italic tracking-wide shrink-0 max-w-[48%] sm:max-w-[52%] md:max-w-[55%] leading-snug">
          Redefining Wellness Through Gourmet Excellence
        </p>
      </div>
    </header>
  );
}
