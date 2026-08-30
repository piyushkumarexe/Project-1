"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Flame, Zap, Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="relative bg-[#090b0e] border-b border-[#1f2430] overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/15 via-orange-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Genuine Imported Performance Nutrition</span>
            </div>

            {/* Slogan */}
            <div className="space-y-2">
              <div className="text-amber-400 font-black text-lg sm:text-2xl uppercase tracking-wider italic">
                &ldquo;SASTA NAHI, SABSE ACCHA&rdquo;
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
                UNLEASH YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500">ALPHA POTENTIAL</span>
              </h1>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              India&apos;s trusted source for 100% authentic, third-party lab-certified whey isolates, clinical peptides, high-stimulant pre-workouts, and mass building combos. Zero compromise on quality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/collections/all"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#shop-by-goal"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#141822] hover:bg-[#1d2332] text-white font-bold text-sm uppercase tracking-wider border border-[#242c3e] flex items-center justify-center gap-2 transition-all"
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Explore Combos</span>
              </Link>

              <Link
                href="/pages/authenticity"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-sm uppercase tracking-wider border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Batch</span>
              </Link>
            </div>

            {/* Trust Bullet Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#1f2533] text-center lg:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">10,000+</div>
                <div className="text-[11px] text-gray-400 uppercase font-semibold">Athletes Fueled</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">100%</div>
                <div className="text-[11px] text-gray-400 uppercase font-semibold">Lab Certified</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">Same Day</div>
                <div className="text-[11px] text-gray-400 uppercase font-semibold">Fast Shipping</div>
              </div>
            </div>
          </div>

          {/* Right Featured Banner Graphic Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-[#121622] via-[#1a202f] to-[#0f121a] border border-[#242e42] p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
              {/* Highlight Badge */}
              <div className="flex justify-between items-center z-10">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-wider">
                  Top Rated Stack
                </span>
                <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock &amp; Verified
                </span>
              </div>

              {/* Graphic Composition */}
              <div className="relative flex items-center justify-center my-4 py-2">
                <div className="w-48 h-48 rounded-full bg-amber-500/20 blur-2xl absolute" />
                {/* SVG 3D Supplement Composition */}
                <svg viewBox="0 0 200 160" className="w-full h-44 drop-shadow-2xl">
                  {/* Background Jar */}
                  <rect x="30" y="30" width="60" height="90" rx="8" fill="#131722" stroke="#f59e0b" strokeWidth="1.5" />
                  <rect x="38" y="20" width="44" height="12" rx="2" fill="#2d3748" />
                  <text x="60" y="75" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="900">CREATINE</text>
                  <text x="60" y="88" textAnchor="middle" fill="#ffffff" fontSize="7">300G PURE</text>

                  {/* Foreground Center Tub */}
                  <rect x="75" y="15" width="80" height="115" rx="10" fill="#0b0e14" stroke="#eab308" strokeWidth="2" />
                  <rect x="85" y="5" width="60" height="14" rx="3" fill="#374151" />
                  <text x="115" y="55" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900" letterSpacing="1">ALPHA GAINS</text>
                  <text x="115" y="70" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="900">WHEY GOLD</text>
                  <text x="115" y="85" textAnchor="middle" fill="#9ca3af" fontSize="8">24G PROTEIN • ISOLATE</text>
                  <polygon points="115,92 118,98 124,99 120,103 121,109 115,106 109,109 110,103 106,99 112,98" fill="#f59e0b" />

                  {/* Bottle Right */}
                  <rect x="135" y="45" width="45" height="75" rx="6" fill="#151b26" stroke="#ef4444" strokeWidth="1.2" />
                  <rect x="142" y="36" width="30" height="10" rx="2" fill="#1f2937" />
                  <text x="157.5" y="80" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="900">SEXCHARGE</text>
                  <text x="157.5" y="92" textAnchor="middle" fill="#ffffff" fontSize="6">TEST BOOST</text>
                </svg>
              </div>

              {/* Bottom Card Info */}
              <div className="bg-[#0b0e14] p-3.5 rounded-xl border border-[#1f2638] flex items-center justify-between z-10">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Complete Power Combo</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-black text-amber-400">₹7,249</span>
                    <span className="text-xs text-gray-500 line-through">₹10,999</span>
                    <span className="text-[10px] font-bold text-rose-400">-34% OFF</span>
                  </div>
                </div>
                <Link
                  href="/products/belive-complete-power-combo-ultimate-performance-wellness-stack"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase"
                >
                  View Stack
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
