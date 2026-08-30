"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight, Trophy } from "lucide-react";

export default function Bestsellers() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Bestsellers" },
    { id: "proteins", label: "Proteins" },
    { id: "creatine", label: "Creatine" },
    { id: "pre-workout", label: "Pre-Workout" },
    { id: "igf", label: "Peptides & Anabolics" },
    { id: "organ-health", label: "Organ Health" },
    { id: "multi-vitamins-omega", label: "Vitamins & Omega" },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.categorySlug === activeCategory);

  return (
    <section className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-red-600 text-xs font-black uppercase tracking-widest mb-1">
              <Trophy className="w-4 h-4" />
              <span>Customer Favorites &amp; Top Re-Orders</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 uppercase tracking-tight">
              BESTSELLERS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Clinically verified formulas delivering real, measurable gains for serious athletes
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-neutral-50 text-neutral-700 hover:text-black border border-neutral-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Shop More Button */}
        <div className="mt-12 text-center">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-neutral-50 hover:bg-red-600 text-neutral-800 hover:text-black border border-neutral-200 hover:border-red-600 font-black text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            <span>Explore All 25+ Authentic Supplements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
