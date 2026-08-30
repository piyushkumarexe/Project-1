"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import ProductVisual from "@/components/ui/ProductVisual";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

/**
 * Suppx-style category rail/tiles — product render art on a tinted tile so the
 * grid reads like real merchandising instead of plain icon boxes.
 */
export default function CategoriesGrid() {
  return (
    <section id="categories" className="py-14 sm:py-16 bg-[#090b0e] border-b border-[#1f2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-400 mb-1">
              Shop The Rack
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              CATEGORIES
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1.5 max-w-xl">
              10 imported categories — every tub batch-coded and cross-checked against the
              lab report before it ships.
            </p>
          </div>
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View all {CATEGORIES.length} categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.slug}`}
              className="group relative bg-[#0e121b] border border-[#202738] rounded-2xl overflow-hidden transition-all duration-300 ring-gold-hover hover:-translate-y-1 flex flex-col"
            >
              {/* Product render tile */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ProductVisual
                  title={category.name}
                  category={category.name}
                  brand={category.featured ? "ALPHA GAINS" : "AG IMPORT"}
                  isPeptide={category.slug === "igf"}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e121b] via-transparent to-transparent" />

                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/65 border border-[#2b354a] text-[9px] font-black uppercase tracking-wider text-gray-300 backdrop-blur-sm">
                  {category.itemCount} Products
                </span>
                {category.featured && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500 text-black text-[9px] font-black uppercase tracking-wider">
                    Hot
                  </span>
                )}
              </div>

              {/* Label block */}
              <div className="p-3 sm:p-4 -mt-6 relative">
                <h3 className="font-bold text-[11px] sm:text-sm text-white group-hover:text-amber-400 transition-colors uppercase leading-snug line-clamp-2 min-h-[32px] sm:min-h-[36px]">
                  {category.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1 line-clamp-1">
                  {category.tagline}
                </p>

                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-500/90 group-hover:text-amber-400 flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/70" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
