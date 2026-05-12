import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { categories } from "@/lib/products";

const category = categories.bags;

function BagsPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const images = category.images;

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto h-20 px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="font-display text-gold text-xl md:text-2xl tracking-[0.3em]">
            OLIIVELINE
          </Link>
          <Link to="/" className="text-xs md:text-sm tracking-[0.3em] uppercase font-display text-gold hover:text-cream transition-colors">
            ← Back
          </Link>
        </div>
      </header>

      <section className="pt-32 md:pt-40 pb-12 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <div className="section-label mb-6">Collection</div>
        <h1 className="font-display text-gold text-4xl md:text-6xl tracking-[0.15em] mb-5">{category.title}</h1>
        <p className="font-body italic text-cream/85 text-lg md:text-xl mb-6">{category.tagline}</p>
        <p className="font-body text-cream/70 max-w-2xl mx-auto">{category.description}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-7">
          {category.tags.map((t) => (
            <span key={t} className="text-[11px] tracking-[0.2em] uppercase font-display text-gold bg-olive/30 border border-olive rounded-full px-3 py-1.5">
              {t}
            </span>
          ))}
        </div>
        <div className="mx-auto mt-8 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      <section className="px-4 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {images.map((src, idx) => (
            <button
              key={src}
              onClick={() => setLightbox(idx)}
              className="group relative w-full aspect-square overflow-hidden border border-gold/30 hover:border-gold transition-all bg-olive-deep"
            >
              <img
                src={src}
                alt={`${category.title} ${idx + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-2 left-3 text-[10px] tracking-[0.25em] font-display text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link to="/" hash="contact" className="gold-link">
            Enquire Now →
          </Link>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
          onClick={() => setLightbox(null)}
        >
          <button aria-label="Close" className="absolute top-6 right-6 text-gold text-3xl" onClick={() => setLightbox(null)}>✕</button>
          <button
            aria-label="Previous"
            className="absolute left-4 md:left-10 text-gold text-4xl px-4 py-2 hover:scale-110 transition-transform"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length)); }}
          >‹</button>
          <img src={images[lightbox]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain border border-gold/40" onClick={(e) => e.stopPropagation()} />
          <button
            aria-label="Next"
            className="absolute right-4 md:right-10 text-gold text-4xl px-4 py-2 hover:scale-110 transition-transform"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? null : (i + 1) % images.length)); }}
          >›</button>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/80 font-display tracking-[0.3em] text-xs">
            {lightbox + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/products/bags")({
  component: BagsPage,
});
