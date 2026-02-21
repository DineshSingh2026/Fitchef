import { images } from '../lib/images';

export default function Footer() {
  return (
    <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto text-center w-full min-w-0">
        <img
          src={images.logo}
          alt="FitChef"
          className="h-7 w-auto sm:h-8 mx-auto mb-4 object-contain object-center max-w-[140px] sm:max-w-[160px]"
        />
        <p className="text-slate-500 text-xs sm:text-sm">
          © 2026 FitChef. Launching Soon.
        </p>
      </div>
    </footer>
  );
}
