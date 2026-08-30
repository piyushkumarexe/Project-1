"use client";

import React from "react";

export default function AnnouncementBar() {
  const announcements = [
    { text: "Same day fastest shipping" },
    { text: "Free shipping on all orders above ₹9,999" },
    { text: "100% authentic supplements" },
    { text: "WhatsApp support : +91 7288830003", href: "https://wa.me/917288830003?text=Hi%2C+I+want+to+know+more+about+the+supplements" },
    { text: "Third-party lab tested & certified" },
    { text: "Imported authentic batches only" },
  ];

  return (
    <div className="bg-black text-white text-[11px] sm:text-xs py-2.5 overflow-hidden select-none relative z-40">
      <div className="flex w-max animate-marquee items-center">
        {[...announcements, ...announcements, ...announcements].map((item, idx) => (
          <div key={idx} className="flex items-center">
            <span className="mx-8 text-white/70">★</span>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase tracking-[0.12em] font-semibold hover:underline"
              >
                {item.text}
              </a>
            ) : (
              <span className="uppercase tracking-[0.12em] font-semibold">{item.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
