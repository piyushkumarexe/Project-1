/**
 * ============================================================================
 *  ALPHA GAINS — SINGLE SOURCE OF TRUTH FOR THE BRAND
 * ============================================================================
 *  Logo, colours, contact details & social links all live here.
 *
 *  👉 WANT TO SWAP THE LOGO?
 *     1. Drop your logo file into `public/`  (e.g. `public/logo.png`)
 *     2. Change `BRAND.logo.src` below to "/logo.png"
 *     3. If your file already contains the "ALPHA GAINS" wordmark, keep
 *        `logo.withWordmark = true`. If it is icon only, set it to false and
 *        the site will render the wordmark text next to it.
 *  Everything (header, footer, mobile drawer, popups, cart, checkout,
 *  loading screen, 404, favicon, PWA icons, WhatsApp/OG share image)
 *  reads from this file — one change updates the whole website.
 * ============================================================================
 */

export const BRAND = {
  /** Display name used in headers / titles */
  name: "Alpha Gains",
  /** Legal / SEO name */
  legalName: "Alpha Gains Nutrition",
  /** Hero slogan — italic, uppercase, everywhere */
  slogan: "SASTA NAHI, SABSE ACCHA",
  /** Small line under the wordmark */
  subTagline: "Nutrition & Performance",
  /** One liner for meta description / footer */
  tagline:
    "100% Authentic Imported Performance Nutrition — Whey, Creatine, Pre-Workout, Mass Gainers, Natural Peptides & Health Stacks.",
  /** Site url (used for SEO / structured data / share links) */
  url: "https://www.alphagains.in",

  logo: {
    /** Full brand logo (icon + wordmark). Replace with your own file any time. */
    src: "/logo.svg",
    /** Icon only — favicons, PWA, cart badge, loading screen */
    mark: "/logo-mark.svg",
    /** High resolution raster of the full logo — social share, print, WhatsApp DP */
    png: "/logo.png",
    /** Monochrome white version — for photos / dark overlays / stickers */
    white: "/logo-white.svg",
    /** Does `src` already include the "ALPHA GAINS" text? */
    withWordmark: true,
    /** Rendered height (px) of the logo in the header */
    height: 40,
  },

  contact: {
    whatsappCountryCode: "91",
    whatsappNumber: "7288830003",
    whatsappDisplay: "+91 7288830003",
    phoneDisplay: "+91 72888 30003",
    email: "support@alphagains.in",
    hours: "10:00 AM – 8:00 PM IST (Mon – Sat)",
    address: "Alpha Gains Distribution Hub, Varanasi, Uttar Pradesh, India",
    gstinNote: "GSTIN available on all tax invoices",
    instagram: "https://instagram.com/alphagains.in",
    youtube: "https://youtube.com/@alphagains",
    freeShipThreshold: 9999,
    welcomeCoupon: "ALPHAFIRST10",
  },

  colors: {
    ink: "#090b0e",
    panel: "#121622",
    border: "#232a3b",
    gold: "#f59e0b",
    goldLight: "#fbbf24",
    goldDark: "#d97706",
  },
} as const;

/** Build a pre-filled WhatsApp deep link for the brand number. */
export function waLink(message: string = "Hi Alpha Gains, I want to know more about your supplements.") {
  return `https://wa.me/${BRAND.contact.whatsappCountryCode}${BRAND.contact.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export const BRAND_ALT = `${BRAND.name} — ${BRAND.slogan}`;
