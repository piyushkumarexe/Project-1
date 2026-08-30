"use client";

import React from "react";
import { LogoMark } from "@/components/layout/Logo";
import { BRAND } from "@/lib/brand";

/** Route / suspense fallback — branded loader instead of a blank screen. */
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-[#090b0e] py-24">
      <div className="relative flex items-center justify-center">
        <span className="logo-halo absolute inset-0 -m-8 rounded-full bg-amber-500/25 blur-2xl" />
        <LogoMark size={78} className="relative" />
      </div>
      <div className="text-center space-y-1.5">
        <div className="text-sm font-black uppercase tracking-[0.3em] text-white">
          {BRAND.name}
        </div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-amber-400 font-bold">
          {BRAND.slogan}
        </div>
      </div>
      <div className="w-44 h-1 rounded-full bg-[#1a2130] overflow-hidden">
        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 animate-marquee" />
      </div>
      <p className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold">
        Loading authentic stock…
      </p>
    </div>
  );
}
