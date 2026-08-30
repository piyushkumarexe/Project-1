"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Quote, BadgeCheck, ArrowRight, ShieldCheck, Truck, RotateCcw, Headset } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { BRAND } from "@/lib/brand";

/** Verified-buyer wall + rating summary (social proof Suppx leans on hard). */
export default function SocialProof() {
  const allReviews = PRODUCTS.flatMap((p) =>
    (p.reviews ?? []).map((r) => ({ ...r, product: p.title, slug: p.slug, price: p.salePrice }))
  ).sort((a, b) => b.rating - a.rating);

  const avg =
    allReviews.length > 0
      ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
      : 0;

  const featured = allReviews.slice(0, 6);
  const totalReviews = PRODUCTS.reduce((s, p) => s + (p.reviewsCount ?? 0), 0);

  const pillars = [
    { icon: ShieldCheck, title: "No Counterfeits", copy: "100% money-back if a batch fails verification" },
    { icon: Truck, title: "Same-Day Dispatch", copy: "Packed & shipped before 6 PM IST" },
    { icon: RotateCcw, title: "7-Day Exchange", copy: "Unopened tubs, zero questions asked" },
    { icon: Headset, title: "Coach On WhatsApp", copy: BRAND.contact.whatsappDisplay },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#0b0e14] border-b border-[#1f2430] relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-9">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-400 mb-1">
              Rated By Real Lifters
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              ATHLETE REVIEWS
            </h2>
          </div>

          {/* Rating summary */}
          <div className="flex items-center gap-5 rounded-2xl bg-[#0e121b] border border-[#232b3d] px-5 py-3.5">
            <div className="text-center">
              <div className="text-3xl font-black text-white leading-none">{avg.toFixed(1)}</div>
              <div className="flex items-center gap-0.5 mt-1.5 justify-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${s <= Math.round(avg) ? "fill-amber-400 text-amber-400" : "text-[#2b354a]"}`}
                  />
                ))}
              </div>
            </div>
            <div className="w-px h-11 bg-[#232b3d]" />
            <div className="text-[11px] leading-relaxed text-gray-400">
              <span className="block font-black text-white uppercase tracking-wide">
                {totalReviews.toLocaleString("en-IN")}+ verified reviews
              </span>
              <span className="block">across 25+ lab-tested products</span>
            </div>
          </div>
        </div>

        {/* Review wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((rev, i) => (
            <figure
              key={`${rev.id}-${i}`}
              className="relative bg-[#0e121b] border border-[#202738] rounded-2xl p-5 flex flex-col justify-between ring-gold-hover"
            >
              <Quote className="w-7 h-7 text-amber-500/25 absolute top-4 right-4" />
              <div>
                <div className="flex items-center gap-0.5 mb-2.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-[#2b354a]"}`}
                    />
                  ))}
                </div>
                <figcaption className="text-sm font-black text-white uppercase leading-snug">
                  {rev.title}
                </figcaption>
                <p className="text-[13px] text-gray-400 mt-2 leading-relaxed line-clamp-4">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#1c2432] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/25 to-[#161b26] border border-[#2b354a] flex items-center justify-center text-[11px] font-black text-amber-300 flex-shrink-0">
                    {rev.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gray-200">
                      <span className="truncate">{rev.author}</span>
                      {rev.verifiedPurchase && <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                    </span>
                    <span className="block text-[10px] text-gray-500 truncate">Verified Buyer</span>
                  </span>
                </div>
                <Link
                  href={`/products/${rev.slug}`}
                  className="text-[10px] font-black uppercase tracking-wide text-amber-400 hover:text-amber-300 flex items-center gap-1 flex-shrink-0"
                >
                  <span>Buy</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </figure>
          ))}
        </div>

        {/* Service pillars */}
        <div className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex items-center gap-3 rounded-xl bg-[#0e121b] border border-[#1c2432] px-3.5 py-3"
            >
              <span className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 flex-shrink-0">
                <p.icon className="w-4.5 h-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-black uppercase tracking-wide text-white truncate">
                  {p.title}
                </span>
                <span className="block text-[10px] text-gray-500 truncate">{p.copy}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Trust strip with brand mark on the wall */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#1c2432] bg-[#0e121b] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Image
              src={BRAND.logo.mark}
              alt={BRAND.name}
              width={26}
              height={26}
              unoptimized
              className="w-[26px] h-[26px]"
            />
            <span className="text-[11px] font-bold uppercase tracking-wide text-gray-300">
              {BRAND.slogan} — reviews are from verified Alpha Gains orders only
            </span>
          </div>
          <Link
            href="/collections/all?sort=rating"
            className="text-[11px] font-black uppercase tracking-wider text-amber-400 hover:text-amber-300"
          >
            See rated bestsellers →
          </Link>
        </div>
      </div>
    </section>
  );
}
