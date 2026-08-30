"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Flame,
  Truck,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BRAND, waLink } from "@/lib/brand";
import { COMBOS } from "@/data/combos";

interface Slide {
  id: string;
  image: string;
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  copy: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  chips: { label: string; icon: React.ElementType }[];
}

const SLIDES: Slide[] = [
  {
    id: "power-stack",
    image: "/images/hero/hero-tub.jpg",
    eyebrow: "100% Genuine Imported Performance Nutrition",
    titleTop: "UNLEASH YOUR",
    titleAccent: "ALPHA POTENTIAL",
    copy: "Third-party lab-certified whey isolates, clinical-grade peptides, high-stim pre-workouts and mass-building combos. Zero compromise, zero fakes.",
    primary: { label: "Shop Best Sellers", href: "/collections/all" },
    secondary: { label: "Explore Combos", href: "/#shop-by-goal" },
    chips: [
      { label: "HPLC Lab Verified", icon: ShieldCheck },
      { label: "Same Day Dispatch", icon: Truck },
      { label: "Up To 35% Off Stacks", icon: Flame },
    ],
  },
  {
    id: "authenticity",
    image: "/images/hero/hero-gym.jpg",
    eyebrow: "Real Iron Needs Real Fuel",
    titleTop: "SASTA NAHI,",
    titleAccent: "SABSE ACCHA",
    copy: "Scan any batch code and pull the live HPLC report before you buy. Protein purity, heavy-metal clearance and zero spiking — verified, every single tub.",
    primary: { label: "Verify A Batch Code", href: "/pages/authenticity" },
    secondary: { label: "Browse Lab-Tested Stock", href: "/collections/all" },
    chips: [
      { label: "Batch-wise Reports", icon: Sparkles },
      { label: "10,000+ Athletes Fueled", icon: Star },
      { label: "Direct Imports Only", icon: ShieldCheck },
    ],
  },
  {
    id: "goal-stacks",
    image: "/images/hero/hero-athlete.jpg",
    eyebrow: "Bulking • Cutting • Strength • Recovery",
    titleTop: "BUILT FOR THOSE",
    titleAccent: "WHO REFUSE TO SETTLE",
    copy: "Engineered synergistic stacks — protein, creatine, test support, omega and organ protection — bundled to save up to 35% versus buying single bottles.",
    primary: { label: "Build My Stack", href: "/#shop-by-goal" },
    secondary: {
      label: "Talk To A Coach",
      href: waLink("Hi Alpha Gains, help me pick the right stack for my goal."),
    },
    chips: [
      { label: "8 Goal Combos", icon: Flame },
      { label: "Free Shipping Over ₹9,999", icon: Truck },
      { label: "COD + UPI + Cards", icon: ShieldCheck },
    ],
  },
];

const AUTOPLAY_MS = 6500;

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const featured = COMBOS[0];

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, index]);

  const slide = SLIDES[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Alpha Gains featured collections"
      className="relative isolate bg-[#05070a] border-b border-[#1f2430] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* ---------------- Background slides ---------------- */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="100vw"
              quality={80}
              className={`object-cover ${i === index ? "animate-kenburns" : ""}`}
              loading={i === 0 ? "eager" : "lazy"}
              {...(i === 0 ? { fetchPriority: "high" as const, preload: true } : {})}
            />
          </div>
        ))}
        <div className="absolute inset-0 hero-scrim" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090b0e] to-transparent" />
      </div>

      {/* ---------------- Content ---------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[560px] lg:min-h-[640px] py-14 lg:py-16">
          <div className="lg:col-span-7 space-y-6">
            <div
              key={`eyebrow-${slide.id}`}
              className="fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-black uppercase tracking-[0.15em] backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.eyebrow}</span>
            </div>

            <div key={`title-${slide.id}`} className="fade-up space-y-1.5">
              <div className="text-amber-400 font-black text-base sm:text-xl uppercase tracking-[0.18em] italic">
                &ldquo;{BRAND.slogan}&rdquo;
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase leading-[0.98] text-white">
                <span className="block">{slide.titleTop}</span>
                <span className="block text-gradient-gold">{slide.titleAccent}</span>
              </h1>
            </div>

            <p
              key={`copy-${slide.id}`}
              className="fade-up text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl"
            >
              {slide.copy}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 pt-1">
              <Link
                href={slide.primary.href}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{slide.primary.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {slide.secondary.href.startsWith("http") ? (
                <a
                  href={slide.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>{slide.secondary.label}</span>
                </a>
              ) : (
                <Link
                  href={slide.secondary.href}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider border border-white/15 backdrop-blur-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>{slide.secondary.label}</span>
                </Link>
              )}
            </div>

            {/* Chips */}
            <div key={`chips-${slide.id}`} className="fade-up flex flex-wrap gap-2 pt-2">
              {slide.chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 border border-[#232b3d] text-[11px] font-bold uppercase tracking-wide text-gray-200 backdrop-blur-sm"
                >
                  <chip.icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{chip.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ---------------- Right column: combo card + stats ---------------- */}
          <div className="lg:col-span-5">
            <div className="lg:mb-6 mb-8 grid grid-cols-3 gap-3 lg:gap-4">
              {[
                { value: "10,000+", label: "Athletes Fueled" },
                { value: "100%", label: "Lab Certified" },
                { value: "2-4 days", label: "Door Delivery" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-black/50 border border-[#232b3d] px-3 py-3 text-center lg:text-left backdrop-blur-sm"
                >
                  <div className="text-lg sm:text-2xl font-black text-amber-400 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {featured && (
              <div className="relative w-full max-w-md rounded-2xl bg-[#0b0e14]/90 border border-[#26314a] p-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black font-black text-[10px] uppercase tracking-wider">
                    Top Rated Stack
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Batch
                  </span>
                </div>

                <Link href={`/products/${featured.slug}`} className="group flex items-center gap-3.5">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#24304a] flex-shrink-0">
                    <Image
                      src="/images/hero/hero-tub.jpg"
                      alt={featured.title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] sm:text-xs font-bold text-white uppercase leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {featured.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-base font-black text-amber-400">
                        ₹{featured.salePrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] text-gray-500 line-through">
                        ₹{featured.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] font-black text-rose-400">
                        -{featured.discountPercentage}%
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/#shop-by-goal"
                  className="mt-3.5 w-full py-2.5 rounded-lg bg-[#151b28] hover:bg-amber-500 hover:text-black text-white text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View All 8 Stacks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ---------------- Controls ---------------- */}
        <div className="flex items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                aria-current={i === index}
                className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                  i === index ? "w-16 bg-white/20" : "w-6 bg-white/15 hover:bg-white/30"
                }`}
              >
                {i === index && (
                  <span
                    key={`bar-${index}-${paused}`}
                    className={`absolute inset-0 bg-amber-500 ${paused ? "" : "hero-progress"}`}
                  />
                )}
              </button>
            ))}
            <span className="ml-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black text-white border border-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black text-white border border-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
