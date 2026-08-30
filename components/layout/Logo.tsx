"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const wordSize = size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl";
  const subSize = size === "sm" ? "text-[7px]" : "text-[8px]";

  return (
    <Link
      href="/"
      className={`group flex flex-col items-center leading-none select-none transition-transform active:scale-95 ${className}`}
    >
      <div className={`relative font-black italic tracking-tighter ${wordSize} whitespace-nowrap`}>
        {/* slash accent above the wordmark */}
        <span className="absolute -top-1.5 left-[10%] h-2 w-3.5 -skew-x-[28deg] bg-black" aria-hidden />
        <span className="text-black">ALPHA</span>
        <span className="text-[#7ac043]">GAINS</span>
      </div>
      <span className={`${subSize} mt-1 font-bold uppercase tracking-[0.2em] text-neutral-700`}>
        Vitamins &amp; Supplements Store
      </span>
    </Link>
  );
}
