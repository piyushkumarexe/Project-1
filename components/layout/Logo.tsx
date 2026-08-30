"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/brand";

/**
 * THE single logo component — header, footer, drawers, modals, splash, 404.
 * It reads every path from `lib/brand.ts`, so swapping `public/logo.svg`
 * for your own file updates the entire site.
 */

export type LogoVariant = "full" | "stacked" | "mark";
export type LogoSize = "sm" | "md" | "lg" | "xl";

/** Mobile keeps the lockup smaller so the header never wraps. */
const HEIGHT_CLASS: Record<LogoSize, string> = {
  sm: "h-[22px] sm:h-[26px]",
  md: "h-[30px] sm:h-[34px]",
  lg: "h-[34px] sm:h-[42px]",
  xl: "h-[46px] sm:h-[58px]",
};
const HEIGHT_PX: Record<LogoSize, number> = { sm: 26, md: 34, lg: 42, xl: 58 };

/** Pure-vector fallback mark. Renders the brand even if an image file is missing. */
export function LogoMark({
  size = 34,
  className = "",
  glow = true,
}: {
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={BRAND.name}
      className={`${className} ${glow ? "drop-shadow-[0_0_14px_rgba(245,158,11,0.45)]" : ""}`}
    >
      <defs>
        <linearGradient id="agGoldInline" x1="10" y1="4" x2="86" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset=".34" stopColor="#F59E0B" />
          <stop offset=".7" stopColor="#D97706" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="agCoreInline" x1="18" y1="14" x2="78" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#212A3C" />
          <stop offset=".55" stopColor="#111622" />
          <stop offset="1" stopColor="#070A0F" />
        </linearGradient>
      </defs>
      <path d="M48 3.5 8.5 18.8v28.4C8.5 68.4 25.4 86.3 48 92.5c22.6-6.2 39.5-24.1 39.5-45.3V18.8z" fill="url(#agGoldInline)" />
      <path d="M48 11.8 16.7 24.6v22.6c0 17 13.6 31.8 31.3 37 17.7-5.2 31.3-20 31.3-37V24.6z" fill="url(#agCoreInline)" />
      <path d="M48 24 71 68H58.6L48 46.4 37.4 68H25z" fill="#FFFFFF" />
      <path d="M43.5 55.6h9L55.6 62H40.4z" fill="url(#agGoldInline)" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  size?: LogoSize;
  variant?: LogoVariant;
  /** Where the logo points to */
  href?: string | null;
  /** "onDark" = white wordmark, "onLight" = ink wordmark */
  theme?: "onDark" | "onLight";
  /** Show the shield + tagline block (only used when the logo file is icon-only) */
  showTagline?: boolean;
}

export default function Logo({
  className = "",
  size = "md",
  variant = "full",
  href = "/",
  theme = "onDark",
  showTagline = true,
}: LogoProps) {
  const [failed, setFailed] = useState(false);
  const h = HEIGHT_PX[size];

  const src =
    variant === "mark" ? BRAND.logo.mark : variant === "stacked" ? "/logo-stacked.svg" : BRAND.logo.src;
  const aspect = variant === "stacked" ? 360 / 230 : 600 / 112;

  const img = failed ? (
    <span className="flex items-center gap-2.5">
      <LogoMark size={Math.round(h * (variant === "mark" ? 1.3 : 1.1))} />
      {variant !== "mark" && (
        <span className="flex flex-col leading-none">
          <span
            className="font-black uppercase tracking-tight"
            style={{ fontSize: h * 0.62, color: theme === "onDark" ? "#fff" : "#0b0e14" }}
          >
            ALPHA <span className="text-amber-400">GAINS</span>
          </span>
          {showTagline && (
            <span
              className="font-bold uppercase"
              style={{ fontSize: Math.max(7, h * 0.24), letterSpacing: "0.24em", color: "#94a3b8" }}
            >
              {BRAND.subTagline}
            </span>
          )}
        </span>
      )}
    </span>
  ) : (
    <Image
      src={src}
      alt={`${BRAND.name} — ${BRAND.slogan}`}
      width={Math.round(h * aspect)}
      height={h}
      sizes={`${Math.round(h * aspect)}px`}
      // SVGs must bypass the image optimizer (dangerouslyAllowSVG is off by default)
      unoptimized
      style={{ width: "auto", height: "100%", maxWidth: "100%" }}
      className="w-auto h-full object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(245,158,11,0.35)]"
      onError={() => setFailed(true)}
    />
  );

  const heightClass =
    variant === "stacked" ? "h-[46px] sm:h-[64px]" : HEIGHT_CLASS[size];

  const content = <span className={`block ${heightClass}`}>{img}</span>;

  if (!href) return <span className={`inline-flex select-none ${className}`}>{content}</span>;

  return (
    <Link
      href={href}
      aria-label={`${BRAND.name} home`}
      className={`group inline-flex items-center select-none transition-all duration-300 active:scale-[0.97] ${className}`}
    >
      {content}
    </Link>
  );
}
