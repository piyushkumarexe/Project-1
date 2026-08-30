import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

/** PWA / add-to-home-screen manifest — makes the logo installable on mobile. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — ${BRAND.tagline}`,
    short_name: BRAND.name,
    description: BRAND.tagline,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: BRAND.colors.ink,
    theme_color: BRAND.colors.gold,
    categories: ["shopping", "health", "fitness"],
    lang: "en-IN",
    dir: "ltr",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/logo.png", sizes: "1024x1024", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "Shop All Supplements", url: "/collections/all", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Verify Batch", url: "/pages/authenticity", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Track Order", url: "/pages/track-order", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
