"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? 24 : size === "lg" ? 38 : 32;
  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className={`group flex items-center gap-2.5 select-none transition-transform active:scale-95 ${className}`}>
      {/* Brand Icon Shield */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
        >
          {/* Shield Outline */}
          <path
            d="M24 4L7 11V22C7 32.5 14.3 42.2 24 45C33.7 42.2 41 32.5 41 22V11L24 4Z"
            fill="url(#logoShieldGrad)"
            stroke="url(#logoBorderGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Alpha / Apex Chevron Upward Arrow */}
          <path
            d="M24 13L33 28H27L24 23L21 28H15L24 13Z"
            fill="#ffffff"
          />
          {/* Flame / Core Inset */}
          <path
            d="M24 22L28 29H20L24 22Z"
            fill="#f59e0b"
          />
          <defs>
            <linearGradient id="logoShieldGrad" x1="7" y1="4" x2="41" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e2433" />
              <stop offset="1" stopColor="#0a0d13" />
            </linearGradient>
            <linearGradient id="logoBorderGrad" x1="7" y1="4" x2="41" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-tighter uppercase text-white font-sans ${textSize}`}>
          ALPHA <span className="text-amber-400">GAINS</span>
        </div>
        <span className="text-[8px] tracking-[0.25em] font-bold text-gray-400 uppercase">
          Nutrition &amp; Performance
        </span>
      </div>
    </Link>
  );
}
