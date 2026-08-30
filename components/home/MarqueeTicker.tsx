"use client";

import React from "react";
import { Sparkles, ShieldCheck, CheckCircle2, Zap, Truck, Award } from "lucide-react";

export default function MarqueeTicker() {
  const items = [
    { text: "Premium Quality Supplements", icon: Award },
    { text: "Science-Backed Formulas", icon: Sparkles },
    { text: "Third-Party Tested", icon: ShieldCheck },
    { text: "Free Shipping Over ₹9,999", icon: Truck },
    { text: "100% Authentic Products", icon: CheckCircle2 },
    { text: "Sasta Nahi, Sabse Accha", icon: Zap },
  ];

  return (
    <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black py-3.5 overflow-hidden font-black text-xs uppercase tracking-widest select-none shadow-md">
      <div className="flex w-max animate-marquee space-x-8 items-center">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span className="text-black font-black text-base">★</span>
            <item.icon className="w-4 h-4 text-black inline" />
            <span className="text-black">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
