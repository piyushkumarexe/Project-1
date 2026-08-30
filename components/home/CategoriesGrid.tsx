"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import {
  Dumbbell,
  Flame,
  Zap,
  Activity,
  ShieldCheck,
  Award,
  HeartPulse,
  Sparkles,
  ShieldPlus,
  Droplets,
  ArrowUpRight,
} from "lucide-react";

export default function CategoriesGrid() {
  const iconMap: Record<string, React.ReactNode> = {
    Dumbbell: <Dumbbell className="w-6 h-6 text-amber-400" />,
    Flame: <Flame className="w-6 h-6 text-red-400" />,
    Zap: <Zap className="w-6 h-6 text-orange-400" />,
    Activity: <Activity className="w-6 h-6 text-yellow-400" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    Award: <Award className="w-6 h-6 text-cyan-400" />,
    HeartPulse: <HeartPulse className="w-6 h-6 text-rose-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-violet-400" />,
    ShieldPlus: <ShieldPlus className="w-6 h-6 text-blue-400" />,
    Droplets: <Droplets className="w-6 h-6 text-pink-400" />,
  };

  return (
    <section className="py-16 bg-[#090b0e] border-b border-[#1f2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            CATEGORIES
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-2 rounded-full" />
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Explore premium imported supplements tailored for your athletic goals
          </p>
        </div>

        {/* 10 Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.slug}`}
              className="group relative bg-[#121622] hover:bg-[#181e2b] border border-[#202738] hover:border-amber-500/50 rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
            >
              {/* Category Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-[#171d2b] border border-[#252f44] flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-inner">
                {iconMap[category.iconName] || <Dumbbell className="w-6 h-6 text-amber-400" />}
              </div>

              {/* Category Title */}
              <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-400 transition-colors uppercase leading-snug line-clamp-2 min-h-[36px] flex items-center">
                {category.name}
              </h3>

              {/* Tagline */}
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                {category.tagline}
              </p>

              {/* Arrow Indicator */}
              <div className="mt-3 text-[11px] font-bold text-amber-500/80 group-hover:text-amber-400 flex items-center gap-0.5">
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
