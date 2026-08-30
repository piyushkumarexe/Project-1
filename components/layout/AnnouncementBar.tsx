"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, Truck, Zap } from "lucide-react";

export default function AnnouncementBar() {
  const announcements = [
    { text: "100% Authentic Supplements", icon: ShieldCheck },
    { text: "Same day fastest shipping", icon: Truck },
    { text: "FREE SHIPPING ON ALL ORDERS ABOVE ₹9,999", icon: Zap },
    { text: "WhatsApp Support : +91 7288830003", icon: MessageCircle, href: "https://wa.me/917288830003?text=Hi%2C+I+want+to+know+more+about+the+supplements" },
    { text: "Third-Party Lab Tested & Certified", icon: ShieldCheck },
    { text: "Imported Authentic Batches Only", icon: Zap },
  ];

  return (
    <div className="bg-[#000000] border-b border-[#1f2430] text-xs text-amber-400 font-medium py-2 overflow-hidden select-none relative z-40">
      <div className="flex w-max animate-marquee space-x-8 items-center">
        {/* Repeating twice for seamless infinite loop */}
        {[...announcements, ...announcements, ...announcements].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold">
            <span className="text-amber-500">★</span>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-amber-300 flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <item.icon className="w-3.5 h-3.5 text-emerald-400 inline" />
                <span>{item.text}</span>
              </a>
            ) : (
              <span className="text-gray-200 flex items-center gap-1.5">
                <item.icon className="w-3.5 h-3.5 text-amber-400 inline" />
                <span>{item.text}</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
