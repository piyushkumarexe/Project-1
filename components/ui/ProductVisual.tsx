"use client";

import React from "react";

interface ProductVisualProps {
  id?: string;
  category?: string;
  title: string;
  brand?: string;
  flavor?: string;
  isPeptide?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function ProductVisual({
  category = "Proteins",
  title,
  brand = "Alpha Gains",
  isPeptide = false,
  className = "w-full h-full",
}: ProductVisualProps) {
  // Determine color theme based on category or product type
  let primaryColor = "#e11d2a"; // Gold / Amber
  let secondaryColor = "#f0f0f2"; // Deep slate
  let glowColor = "rgba(245, 158, 11, 0.4)";
  let jarType: "tub" | "bottle" | "dropper" | "pack" = "tub";

  const lowerTitle = title.toLowerCase();
  const lowerCat = category.toLowerCase();

  if (isPeptide || lowerCat.includes("peptide") || lowerCat.includes("igf") || lowerTitle.includes("genesis")) {
    jarType = "dropper";
    primaryColor = "#06b6d4"; // Cyan
    glowColor = "rgba(6, 182, 212, 0.4)";
  } else if (lowerCat.includes("organ") || lowerTitle.includes("livoguard") || lowerTitle.includes("liver")) {
    jarType = "bottle";
    primaryColor = "#10b981"; // Emerald
    glowColor = "rgba(16, 185, 129, 0.4)";
  } else if (lowerCat.includes("testosterone") || lowerTitle.includes("sexcharge") || lowerTitle.includes("tongkat")) {
    jarType = "bottle";
    primaryColor = "#ef4444"; // Crimson Red
    glowColor = "rgba(239, 68, 68, 0.4)";
  } else if (lowerCat.includes("pre-workout") || lowerTitle.includes("preworkout")) {
    jarType = "tub";
    primaryColor = "#f97316"; // Electric Orange
    glowColor = "rgba(249, 115, 22, 0.4)";
  } else if (lowerCat.includes("creatine") || lowerTitle.includes("creatine")) {
    jarType = "tub";
    primaryColor = "#dc2626"; // Pure Gold
    glowColor = "rgba(234, 179, 8, 0.4)";
  } else if (lowerCat.includes("multi") || lowerCat.includes("omega") || lowerTitle.includes("ashwagandha")) {
    jarType = "bottle";
    primaryColor = "#3b82f6"; // Royal Blue
    glowColor = "rgba(59, 130, 246, 0.4)";
  } else if (lowerCat.includes("collagen") || lowerTitle.includes("collagen")) {
    jarType = "tub";
    primaryColor = "#ec4899"; // Rose Pink
    glowColor = "rgba(236, 72, 153, 0.4)";
  } else if (lowerCat.includes("gainer") || lowerTitle.includes("bulk")) {
    jarType = "tub";
    primaryColor = "#dc2626"; // Bold Red
    glowColor = "rgba(220, 38, 38, 0.4)";
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden p-4 select-none ${className}`}>
      {/* Dynamic Background Glow */}
      <div
        className="absolute w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500 group-hover:scale-125"
        style={{ background: primaryColor }}
      />

      {/* 3D Rendered Supplement Graphic */}
      {jarType === "tub" && (
        <svg viewBox="0 0 200 240" className="w-full h-full max-h-[220px] drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]">
          <defs>
            <linearGradient id={`tubGrad-${title.slice(0, 4)}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7f7f8" />
              <stop offset="30%" stopColor="#f0f0f2" />
              <stop offset="60%" stopColor="#f7f7f8" />
              <stop offset="90%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id={`lidGrad-${title.slice(0, 4)}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e5e5e7" />
              <stop offset="50%" stopColor="#f7f7f8" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id={`accentGrad-${title.slice(0, 4)}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <filter id={`glow-${title.slice(0, 4)}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={primaryColor} floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Tub Shadow */}
          <ellipse cx="100" cy="225" rx="65" ry="10" fill="rgba(0,0,0,0.6)" filter="blur(4px)" />

          {/* Tub Body */}
          <path
            d="M 45,70 Q 40,140 46,215 Q 100,225 154,215 Q 160,140 155,70 Z"
            fill={`url(#tubGrad-${title.slice(0, 4)})`}
            stroke="#f0f0f2"
            strokeWidth="1"
          />

          {/* Shoulder Curve */}
          <path d="M 45,70 Q 100,60 155,70 Q 150,55 140,50 L 60,50 Q 50,55 45,70 Z" fill="#f0f0f2" />

          {/* Lid */}
          <rect x="52" y="32" width="96" height="18" rx="3" fill={`url(#lidGrad-${title.slice(0, 4)})`} stroke="#e5e5e7" strokeWidth="1" />
          {/* Lid ridges */}
          <line x1="60" y1="34" x2="60" y2="48" stroke="#e5e5e7" strokeWidth="1" />
          <line x1="75" y1="34" x2="75" y2="48" stroke="#e5e5e7" strokeWidth="1" />
          <line x1="90" y1="34" x2="90" y2="48" stroke="#e5e5e7" strokeWidth="1" />
          <line x1="110" y1="34" x2="110" y2="48" stroke="#e5e5e7" strokeWidth="1" />
          <line x1="125" y1="34" x2="125" y2="48" stroke="#e5e5e7" strokeWidth="1" />
          <line x1="140" y1="34" x2="140" y2="48" stroke="#e5e5e7" strokeWidth="1" />

          {/* Label Background */}
          <path
            d="M 48,90 Q 100,82 152,90 L 150,195 Q 100,205 50,195 Z"
            fill="#ffffff"
            stroke="#f0f0f2"
            strokeWidth="0.8"
          />

          {/* Accent Foil Stripe */}
          <path
            d="M 48,90 Q 100,82 152,90 L 152,104 Q 100,96 48,104 Z"
            fill={`url(#accentGrad-${title.slice(0, 4)})`}
          />

          {/* Brand Name */}
          <text x="100" y="122" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">
            {brand.toUpperCase()}
          </text>

          {/* Badge Icon */}
          <circle cx="100" cy="140" r="14" fill="#f7f7f8" stroke={primaryColor} strokeWidth="1.5" />
          <polygon points="100,131 103,137 109,138 105,142 106,148 100,145 94,148 95,142 91,138 97,137" fill={primaryColor} />

          {/* Product Category Subtext */}
          <text x="100" y="166" textAnchor="middle" fill={primaryColor} fontSize="8" fontWeight="800" letterSpacing="0.8">
            {category.slice(0, 18).toUpperCase()}
          </text>

          {/* Gold Bottom Accent Ribbon */}
          <path
            d="M 50,185 Q 100,195 150,185 L 149,193 Q 100,203 51,193 Z"
            fill={`url(#accentGrad-${title.slice(0, 4)})`}
          />

          {/* Light Reflection Highlight */}
          <path
            d="M 54,95 Q 65,140 56,190"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}

      {jarType === "bottle" && (
        <svg viewBox="0 0 200 240" className="w-full h-full max-h-[220px] drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]">
          <defs>
            <linearGradient id={`botGrad-${title.slice(0, 4)}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7f7f8" />
              <stop offset="35%" stopColor="#f0f0f2" />
              <stop offset="70%" stopColor="#f7f7f8" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id={`botLid-${title.slice(0, 4)}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0f0f2" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* Bottle Shadow */}
          <ellipse cx="100" cy="225" rx="50" ry="8" fill="rgba(0,0,0,0.6)" filter="blur(4px)" />

          {/* Bottle Body */}
          <path
            d="M 58,75 Q 55,140 60,215 Q 100,223 140,215 Q 145,140 142,75 Q 138,62 120,55 L 80,55 Q 62,62 58,75 Z"
            fill={`url(#botGrad-${title.slice(0, 4)})`}
            stroke="#f0f0f2"
            strokeWidth="1"
          />

          {/* Neck & Cap */}
          <rect x="74" y="28" width="52" height="27" rx="3" fill={`url(#botLid-${title.slice(0, 4)})`} stroke="#e5e5e7" strokeWidth="1" />
          <line x1="82" y1="30" x2="82" y2="53" stroke="#e5e5e7" strokeWidth="1" />
          <line x1="94" y1="30" x2="94" y2="53" stroke="#e5e5e7" strokeWidth="1" />
          <line x1="106" y1="30" x2="106" y2="53" stroke="#e5e5e7" strokeWidth="1" />
          <line x1="118" y1="30" x2="118" y2="53" stroke="#e5e5e7" strokeWidth="1" />

          {/* Label */}
          <path
            d="M 60,95 Q 100,88 140,95 L 138,195 Q 100,203 62,195 Z"
            fill="#ffffff"
            stroke="#f0f0f2"
            strokeWidth="0.8"
          />

          {/* Label Top Bar */}
          <path d="M 60,95 Q 100,88 140,95 L 140,105 Q 100,98 60,105 Z" fill={primaryColor} />

          {/* Brand */}
          <text x="100" y="122" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" letterSpacing="1.5">
            {brand.toUpperCase()}
          </text>

          {/* Shield / Flame */}
          <path d="M 100,132 L 109,136 L 106,147 Q 100,154 100,154 Q 100,154 94,147 L 91,136 Z" fill={primaryColor} opacity="0.9" />

          {/* Subtext */}
          <text x="100" y="172" textAnchor="middle" fill={primaryColor} fontSize="7" fontWeight="800">
            60 CAPSULES | 100% PURE
          </text>

          {/* Bottom Foil */}
          <path d="M 62,187 Q 100,195 138,187 L 137,193 Q 100,201 63,193 Z" fill={primaryColor} />

          {/* Gloss */}
          <path d="M 67,100 Q 75,140 70,185" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {jarType === "dropper" && (
        <svg viewBox="0 0 200 240" className="w-full h-full max-h-[220px] drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]">
          <defs>
            <linearGradient id={`dropGrad-${title.slice(0, 4)}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="40%" stopColor="#0e7490" />
              <stop offset="80%" stopColor="#075985" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="100" cy="225" rx="42" ry="7" fill="rgba(0,0,0,0.6)" filter="blur(4px)" />

          {/* Dropper Rubber Bulb */}
          <ellipse cx="100" cy="28" rx="14" ry="16" fill="#f7f7f8" stroke="#e5e5e7" />

          {/* Dropper Collar Ring */}
          <rect x="80" y="40" width="40" height="15" rx="2" fill="#d1d5db" stroke="#9ca3af" />
          <rect x="83" y="52" width="34" height="6" rx="1" fill="#e5e5e7" />

          {/* Glass Amber / Cobalt Bottle */}
          <path
            d="M 68,80 Q 64,145 68,215 Q 100,222 132,215 Q 136,145 132,80 Q 128,68 116,62 L 84,62 Q 72,68 68,80 Z"
            fill={`url(#dropGrad-${title.slice(0, 4)})`}
            stroke="#0284c7"
            strokeWidth="0.8"
          />

          {/* Liquid Level */}
          <path d="M 69,110 Q 100,105 131,110 L 132,215 Q 100,222 68,215 Z" fill="#0369a1" opacity="0.85" />

          {/* Label */}
          <rect x="73" y="115" width="54" height="75" rx="3" fill="#f7f7f8" stroke="#0284c7" strokeWidth="1" />

          <text x="100" y="132" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="900" letterSpacing="1">
            PEPTIDE
          </text>
          <text x="100" y="146" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">
            IGF-1
          </text>
          <line x1="82" y1="154" x2="118" y2="154" stroke="#0284c7" strokeWidth="1" />
          <text x="100" y="167" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontWeight="700">
            60 ML • ORAL
          </text>
          <text x="100" y="180" textAnchor="middle" fill="#22d3ee" fontSize="6" fontWeight="800">
            99.7% HPLC PURITY
          </text>

          {/* Glass Gloss */}
          <path d="M 74,90 L 74,200" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}

    </div>
  );
}
