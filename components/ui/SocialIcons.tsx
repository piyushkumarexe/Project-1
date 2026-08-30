import React from "react";

/**
 * Lucide dropped brand marks, so the social glyphs ship with the brand kit.
 * Kept as simple, currentColor-driven SVGs so they inherit hover colours.
 */

export function InstagramGlyph({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeGlyph({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="4.5" />
      <path d="M10.4 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}
