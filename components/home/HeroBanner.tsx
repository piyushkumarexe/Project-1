"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Flame } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        {/* Full-bleed rounded hero banner, like the store */}
        <Link
          href="/collections/all"
          className="relative block rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[21/9] group"
        >
          <Image
            src="/images/hero-banner.jpg"
            alt="Alpha Gains — authentic imported supplements"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-white font-black italic uppercase tracking-tight text-xl sm:text-3xl lg:text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Sasta Nahi, Sabse Accha
            </h1>
            <p className="hidden sm:block mt-3 max-w-xl text-white/85 text-sm">
              100% authentic, third-party lab certified imported performance nutrition.
            </p>
            <span className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors">
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        {/* Quick action chips */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <Link
            href="/collections/all"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:border-red-600 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-neutral-800 transition-colors"
          >
            <Flame className="w-4 h-4 text-red-600" />
            Bestsellers
          </Link>
          <Link
            href="/#shop-by-goal"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:border-red-600 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-neutral-800 transition-colors"
          >
            Combos &amp; Stacks
          </Link>
          <Link
            href="/pages/authenticity"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:border-red-600 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-neutral-800 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verify Batch
          </Link>
          <Link
            href="/pages/track-order"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:border-red-600 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-neutral-800 transition-colors"
          >
            Track Order
          </Link>
        </div>
      </div>
    </section>
  );
}
