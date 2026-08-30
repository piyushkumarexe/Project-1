"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { Award, ArrowRight, Activity, Zap } from "lucide-react";

export default function CategorySpotlight() {
  const peptideProducts = PRODUCTS.filter((p) => p.categorySlug === "igf").slice(0, 4);
  const preworkoutProducts = PRODUCTS.filter((p) => p.categorySlug === "pre-workout").slice(0, 4);

  return (
    <div className="space-y-16 py-16 bg-[#090b0e] border-b border-[#1f2430]">
      {/* Spotlight 1: Natural Steroids & Peptides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-black uppercase tracking-widest mb-1">
              <Award className="w-4 h-4" />
              <span>Cutting-Edge Anabolic Innovation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight">
              Natural Steroids &amp; Peptides
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Clinically validated non-hormonal peptides, IGF-1 complexes, Dileucine &amp; Ecdysterone
            </p>
          </div>

          <Link
            href="/collections/igf"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider"
          >
            <span>View All Peptides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {peptideProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Spotlight 2: Pre-Workouts & High Stim */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-orange-400 text-xs font-black uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4" />
              <span>Explosive Energy &amp; Nitric Oxide Pumps</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight">
              Pre-Workout Powerhouse
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Laser focus, massive vasodilation, and clean sustained training aggression
            </p>
          </div>

          <Link
            href="/collections/pre-workout"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider"
          >
            <span>View All Pre-Workouts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {preworkoutProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
