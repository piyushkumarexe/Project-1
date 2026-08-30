"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Render only the circular emblem, without the wordmark line. */
  markOnly?: boolean;
}

const DIMENSIONS = {
  sm: 40,
  md: 54,
  lg: 96,
} as const;

export default function Logo({ className = "", size = "md", markOnly = false }: LogoProps) {
  const px = DIMENSIONS[size];

  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 select-none transition-transform active:scale-95 ${className}`}
      aria-label="Alpha Gains — Supplements Store"
    >
      <Image
        src="/images/logo-mark.png"
        alt="Alpha Gains"
        width={px}
        height={px}
        priority
        className="rounded-full object-contain transition-transform duration-300 group-hover:scale-105"
        style={{ width: px, height: px }}
      />

      {!markOnly && (
        <span className="hidden sm:flex flex-col leading-none">
          <span
            className={`font-black italic uppercase tracking-tight ${
              size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl"
            }`}
          >
            <span className="text-neutral-900">ALPHA</span>
            <span className="text-red-600"> GAINS</span>
          </span>
          <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-600">
            Supplements Store
          </span>
        </span>
      )}
    </Link>
  );
}
