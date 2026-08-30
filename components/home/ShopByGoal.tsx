"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <section id="shop-by-goal" className="py-16 bg-[#0b0e14] border-b border-[#1f2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-xs font-black uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>Engineered Synergistic Stacks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              SHOP BY GOAL
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Find out our best combos — save up to 35% on complete stacked nutrition
            </p>
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
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-[#141822] text-gray-300 hover:text-white border border-[#222838]"
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
              className="group bg-[#10141d] border border-[#202738] hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Media Card Top */}
              <div className="relative aspect-[4/3] bg-gradient-to-b from-[#161b26] to-[#0d1017] p-4 flex items-center justify-center overflow-hidden">
                {/* Discount Tag */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-md">
                  -{combo.discountPercentage}% OFF
                </div>

                {/* Badge */}
                {combo.badge && (
                  <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 font-bold text-[10px] uppercase">
                    {combo.badge}
                  </div>
                )}

                {/* Visual Graphic Representation */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-amber-500/15 blur-2xl absolute" />
                  <svg viewBox="0 0 160 120" className="w-full h-28 drop-shadow-xl">
                    {/* Stack Elements */}
                    <rect x="25" y="30" width="45" height="70" rx="6" fill="#1b2230" stroke="#f59e0b" strokeWidth="1.2" />
                    <text x="47.5" y="65" textAnchor="middle" fill="#f59e0b" fontSize="7" fontWeight="900">STACK</text>
                    <text x="47.5" y="78" textAnchor="middle" fill="#ffffff" fontSize="6">STAGE 1</text>

                    <rect x="58" y="15" width="55" height="85" rx="8" fill="#0c1017" stroke="#eab308" strokeWidth="1.8" />
                    <text x="85.5" y="52" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">ALPHA</text>
                    <text x="85.5" y="66" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="900">COMBO</text>
                    <polygon points="85.5,74 88,79 94,80 90,84 91,89 85.5,86 80,89 81,84 77,80 83,79" fill="#f59e0b" />

                    <rect x="100" y="35" width="35" height="60" rx="5" fill="#18202d" stroke="#ef4444" strokeWidth="1.2" />
                    <text x="117.5" y="68" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="900">BOOST</text>
                  </svg>
                </div>
              </div>

              {/* Combo Information */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">
                    {combo.goal} Stack
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {combo.title}
                  </h3>

                  {/* Included Items List */}
                  <div className="mt-2.5 space-y-1">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Bundle Includes:
                    </div>
                    {combo.includedItems.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="text-[11px] text-gray-300 flex items-center gap-1.5 line-clamp-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {combo.includedItems.length > 3 && (
                      <span className="text-[10px] text-amber-400 font-semibold pl-4">
                        +{combo.includedItems.length - 3} more supplements
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-[#1a2130] space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-base font-black text-amber-400">
                        ₹{combo.salePrice.toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs text-gray-500 line-through">
                        ₹{combo.originalPrice.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="text-right text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      SAVE ₹{(combo.originalPrice - combo.salePrice).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAddCombo(combo)}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/10 active:scale-[0.98]"
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
