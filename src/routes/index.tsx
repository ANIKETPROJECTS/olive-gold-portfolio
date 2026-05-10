import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png"; /* Replace logo.png with actual logo file */
import { categories } from "@/lib/products";

const tshirtImages = categories.tshirts.images;
const walletImages = categories.wallets.images;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "OLIIVELINE — Crafted to Command Attention" },
      { name: "description", content: "Premium custom-printed T-shirts and handcrafted wallets. Bulk & retail ready, built for brands that speak before a word is said." },
      { property: "og:title", content: "OLIIVELINE — Premium Custom Manufacturing" },
      { property: "og:description", content: "Custom T-shirts and handcrafted wallets, crafted to command attention." },
    ],
  }),
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Navbar({ onOpen }: { onOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-md border-b border-gold/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="OLIIVELINE Logo"
            className="h-10 md:h-12 w-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform group-hover:scale-105"
          />
          <span className="font-display text-gold text-lg md:text-xl tracking-[0.3em] hidden sm:inline">
            OLIIVELINE
          </span>
        </Link>
        <button
          aria-label="Open menu"
          onClick={onOpen}
          className="flex flex-col gap-[6px] p-2 group"
        >
          <span className="w-8 h-[2px] bg-gold transition-all group-hover:w-10" />
          <span className="w-8 h-[2px] bg-gold transition-all group-hover:w-6" />
          <span className="w-8 h-[2px] bg-gold transition-all group-hover:w-10" />
        </button>
      </div>
    </header>
  );
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  if (!open) return null;
  const links = ["Home", "Products", "Contact"];
  return (
    <div className="fixed inset-0 z-[60] fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <aside
        className="absolute right-0 top-0 h-full w-full md:w-[520px] bg-[#0A0A0A] drawer-in overflow-y-auto"
        style={{
          boxShadow: "inset 40px 0 80px -40px rgba(85,107,47,0.35)",
          borderLeft: "1px solid rgba(212,175,55,0.3)",
        }}
      >
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="absolute top-6 right-6 text-gold text-3xl font-light hover:rotate-90 transition-transform duration-500"
        >
          ✕
        </button>
        <div className="px-10 pt-28 pb-16 flex flex-col items-center text-center">
          <nav className="flex flex-col gap-7 mb-16">
            {links.map((l, i) => (
              <a
                key={l}
                href={l === "Home" ? "#top" : l === "Products" ? "#products" : "#contact"}
                onClick={onClose}
                className="font-display text-gold text-4xl md:text-5xl tracking-[0.25em] hover:text-cream transition-colors"
                style={{ animation: `fade-in 0.6s ease ${0.1 + i * 0.1}s both` }}
              >
                {l.toUpperCase()}
              </a>
            ))}
          </nav>

          <div className="w-full max-w-md">
            <div className="section-label mb-5">About Us</div>
            <p className="font-body text-cream/85 text-lg leading-relaxed italic">
              OLIIVELINE is built on the belief that every product should speak before a word is said.
              From bulk custom tees to handcrafted wallets — we craft quality that represents your brand.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["✦ Premium Quality", "✦ Custom Craftsmanship", "✦ Bulk & Retail Ready"].map((p) => (
                <span
                  key={p}
                  className="text-xs tracking-[0.2em] uppercase font-display text-gold border border-gold/40 rounded-full px-4 py-2 bg-olive-deep/40"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="text-center max-w-3xl">
        <div className="section-label mb-8">Premium Custom Manufacturing</div>
        <h1 className="shimmer-text font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[0.3em] mb-6">
          OLIIVELINE
        </h1>
        <p className="font-body italic text-cream/90 text-xl md:text-2xl mb-8">
          Crafted to Command Attention.
        </p>
        <div className="mx-auto w-40 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      <a
        href="#products"
        aria-label="Scroll down"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bounce-arrow text-gold"
      >
        <svg width="28" height="44" viewBox="0 0 28 44" fill="none">
          <rect x="1" y="1" width="26" height="42" rx="13" stroke="currentColor" strokeWidth="1.2" />
          <path d="M14 10 L14 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M9 18 L14 23 L19 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}

function Divider() {
  return (
    <div className="diamond-divider max-w-5xl mx-auto px-6 py-16">
      <span className="text-gold text-lg">◆</span>
    </div>
  );
}

function ProductCard({
  title,
  description,
  tags,
  images,
}: {
  title: string;
  description: string;
  tags: string[];
  images: string[];
}) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <article className="product-card reveal bg-card border border-gold/60 rounded-sm overflow-hidden flex flex-col">
      <div
        className="relative h-[340px] md:h-[400px] m-3 overflow-hidden"
        style={{ background: "#2A3320", border: "1px solid rgba(212,175,55,0.45)" }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${title} ${i + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`View image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-[3px] transition-all rounded-full ${
                i === active ? "w-6 bg-gold" : "w-2 bg-gold/40 hover:bg-gold/70"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-8 md:p-10 flex flex-col flex-1">
        <h3 className="font-display text-gold text-2xl md:text-3xl mb-4 tracking-wider">
          {title}
        </h3>
        <p className="font-body text-cream/85 text-lg leading-relaxed mb-6 italic">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((t) => (
            <span
              key={t}
              className="text-[11px] tracking-[0.18em] uppercase font-display text-gold bg-olive/30 border border-olive rounded-full px-3 py-1.5"
            >
              {t}
            </span>
          ))}
        </div>
        <a href="#contact" className="gold-link mt-auto self-start">
          Enquire Now →
        </a>
      </div>
    </article>
  );
}

function Products() {
  return (
    <section id="products" className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
      <div className="text-center mb-16 reveal">
        <div className="section-label">What We Create</div>
        <div className="mx-auto mt-6 w-24 h-px bg-gold/60" />
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <ProductCard
          title="Custom Oliive Line T-Shirts"
          description="Bulk custom-printed tees for offices, events, brands & more. Premium fabrics, precise prints, any quantity."
          tags={["Bulk Orders", "Office Wear", "Custom Print"]}
          images={tshirtImages}
        />
        <ProductCard
          title="Custom Oliive Line Wallets"
          description="Handcrafted wallets with custom branding. Perfect for corporate gifts, retail, or personal collections."
          tags={["Corporate Gifting", "Custom Branding", "Premium Leather"]}
          images={walletImages}
        />
      </div>
    </section>
  );
}

function Footer() {
  const items = [
    /* Replace with real email */
    { icon: "✉", label: "Email", value: "hello@oliiveline.com" },
    /* Replace with real phone */
    { icon: "✆", label: "Phone", value: "+91 00000 00000" },
    /* Replace with real location */
    { icon: "✦", label: "Location", value: "Mumbai, India" },
  ];
  return (
    <footer id="contact" className="px-6 py-20 bg-background">
      <div className="diamond-divider max-w-5xl mx-auto mb-16">
        <span className="text-gold text-lg">◆</span>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center reveal">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col items-center gap-2">
            <span className="text-gold text-2xl">{it.icon}</span>
            <span className="section-label text-sage">{it.label}</span>
            <span className="font-body text-cream text-lg">{it.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-20 text-center text-gold/70 text-[11px] tracking-[0.4em] font-display uppercase">
        © 2025 Oliiveline. All Rights Reserved.
      </div>
    </footer>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  useReveal();
  return (
    <div className="relative">
      <Navbar onOpen={() => setOpen(true)} />
      <Drawer open={open} onClose={() => setOpen(false)} />
      <main>
        <Hero />
        <Divider />
        <Products />
        <Footer />
      </main>
    </div>
  );
}
