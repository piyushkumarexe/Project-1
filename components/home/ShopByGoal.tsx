"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMBOS } from "@/data/combos";
import { Flame, Star, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ShopByGoal() {
  const { addToCart } = useCart();
  const [activeGoal, setActiveGoal] = useState<string>("All");

  const goals = ["All", "Muscle Gain", "Fat Loss", "Performance", "Peptides", "Bulking"];

  const filteredCombos = activeGoal === "All" ? COMBOS : COMBOS.filter((c) => c.goal === activeGoal);

  const handleQuickAddCombo = (combo: typeof COMBOS[0]) => {
    addToCart({
      id: combo.id,
      slug: combo.slug,
      title: combo.title,
      brand: "Alpha Gains",
      category: combo.category,
      categorySlug: "combos",
      originalPrice: combo.originalPrice,
      salePrice: combo.salePrice,
      discountPercentage: combo.discountPercentage,
      rating: combo.rating,
      reviewsCount: combo.reviewsCount,
      inStock: combo.inStock,
      image: combo.image,
      galleryImages: [combo.image],
      shortDescription: combo.description,
      description: combo.description,
      benefits: combo.includedItems,
      supplementFacts: [],
      howToUse: "Follow individual product labels for best synergistic results.",
      tags: ["Combo", "Stack", combo.goal],
      reviews: [],
    });
  };

  return (
    <section id="shop-by-goal" className="relative">
      {/* Dark hero band header */}
      <div className="relative overflow-hidden studio-dark">
        <Image
          src="/images/goal-banner.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">SHOP BY GOAL</h2>
          <p className="mt-2 text-sm sm:text-base text-white/80">Find out our best combos</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 text-red-600 text-xs font-black uppercase tracking-widest">
            <Flame className="w-4 h-4 fill-red-600 text-red-600" />
            <span>Engineered synergistic stacks — save up to 35%</span>
          </div>

          {/* Goal Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {goals.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setActiveGoal(g)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all ${
                  activeGoal === g
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-neutral-50 text-neutral-700 hover:text-black border border-neutral-200"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCombos.map((combo) => (
            <div
              key={combo.id}
              className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Media Card Top */}
              <div className="relative aspect-square m-2 rounded-xl studio-red p-4 flex items-center justify-center overflow-hidden">
                {/* Discount Tag */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-red-600 text-white font-semibold text-[12px] shadow">
                  -{combo.discountPercentage}%
                </div>

                {/* Badge */}
                {combo.badge && (
                  <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full bg-black/80 text-white font-semibold text-[10px] uppercase tracking-wide">
                    {combo.badge}
                  </div>
                )}

                {/* Visual Graphic Representation */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-red-600/15 blur-2xl absolute" />
                  <svg viewBox="0 0 160 120" className="w-full h-28 drop-shadow-xl">
                    {/* Stack Elements */}
                    <rect x="25" y="30" width="45" height="70" rx="6" fill="#f7f7f8" stroke="#e11d2a" strokeWidth="1.2" />
                    <text x="47.5" y="65" textAnchor="middle" fill="#e11d2a" fontSize="7" fontWeight="900">STACK</text>
                    <text x="47.5" y="78" textAnchor="middle" fill="#ffffff" fontSize="6">STAGE 1</text>

                    <rect x="58" y="15" width="55" height="85" rx="8" fill="#ffffff" stroke="#dc2626" strokeWidth="1.8" />
                    <text x="85.5" y="52" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">ALPHA</text>
                    <text x="85.5" y="66" textAnchor="middle" fill="#f43f4e" fontSize="8" fontWeight="900">COMBO</text>
                    <polygon points="85.5,74 88,79 94,80 90,84 91,89 85.5,86 80,89 81,84 77,80 83,79" fill="#e11d2a" />

                    <rect x="100" y="35" width="35" height="60" rx="5" fill="#f7f7f8" stroke="#ef4444" strokeWidth="1.2" />
                    <text x="117.5" y="68" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="900">BOOST</text>
                  </svg>
                </div>
              </div>

              {/* Combo Information */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">
                    {combo.goal} Stack
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {combo.title}
                  </h3>

                  {/* Included Items List */}
                  <div className="mt-2.5 space-y-1">
                    <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
                      Bundle Includes:
                    </div>
                    {combo.includedItems.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="text-[11px] text-neutral-700 flex items-center gap-1.5 line-clamp-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {combo.includedItems.length > 3 && (
                      <span className="text-[10px] text-red-600 font-semibold pl-4">
                        +{combo.includedItems.length - 3} more supplements
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-neutral-100 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[16px] font-semibold text-red-600">
                        Rs. {combo.salePrice.toLocaleString("en-IN")}.00
                      </div>
                      <div className="text-[13px] text-neutral-400 line-through">
                        Rs. {combo.originalPrice.toLocaleString("en-IN")}.00
                      </div>
                    </div>

                    <div className="text-right text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      SAVE ₹{(combo.originalPrice - combo.salePrice).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAddCombo(combo)}
                    className="w-full py-3 rounded-full bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Bundle to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
