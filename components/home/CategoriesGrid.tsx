"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";

/** Photographic art per category slug, falls back to the red studio gradient. */
const CATEGORY_IMAGES: Record<string, string> = {
  proteins: "/images/cat-whey.jpg",
  gainer: "/images/cat-gainer.jpg",
  "performance-nutrition": "/images/cat-test.jpg",
  "pre-workout": "/images/cat-preworkout.jpg",
  creatine: "/images/cat-creatine.jpg",
  igf: "/images/cat-peptides.jpg",
  "organ-health": "/images/cat-peptides.jpg",
  "bcaa-eaa": "/images/cat-preworkout.jpg",
  "multi-vitamins-omega": "/images/cat-test.jpg",
  "skin-nail-hair-joint-support": "/images/cat-creatine.jpg",
};

export default function CategoriesGrid() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 uppercase tracking-tight">Categories</h2>
        </div>

        {/* Horizontal scroll rail on mobile, grid on desktop */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-3 sm:px-6 lg:px-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible snap-x snap-mandatory">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.slug}`}
              className="group relative flex-shrink-0 w-[46%] sm:w-[30%] lg:w-auto aspect-square overflow-hidden snap-start"
            >
              <Image
                src={CATEGORY_IMAGES[category.slug] || "/images/cat-whey.jpg"}
                alt={category.name}
                fill
                sizes="(max-width: 1024px) 46vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                <h3 className="text-white font-bold uppercase text-[11px] sm:text-xs leading-tight drop-shadow">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
