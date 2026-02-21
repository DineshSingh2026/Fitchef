import { images } from '../lib/images';

export default function ImageStrip() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-white py-6 sm:py-8 px-4 sm:px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-ink">
            Gallery
          </h2>
        </div>
      </div>
      <div className="py-10 sm:py-12 px-4 sm:px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl overflow-hidden shadow-md aspect-[16/10]">
            <img
              src={images.banner}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {images.gallery.map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-md aspect-[16/10]">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
