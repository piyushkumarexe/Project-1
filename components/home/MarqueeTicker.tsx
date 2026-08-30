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
    <div className="bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white py-3.5 overflow-hidden font-black text-xs uppercase tracking-widest select-none shadow-md">
      <div className="flex w-max animate-marquee space-x-8 items-center">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span className="text-white font-black text-base">★</span>
            <item.icon className="w-4 h-4 text-white inline" />
            <span className="text-white">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
