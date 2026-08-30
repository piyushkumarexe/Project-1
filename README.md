# Alpha Gains — 100% Authentic Performance Nutrition & Supplements E-Commerce Platform

> **"SASTA NAHI, SABSE ACCHA"** (Not Cheap, But The Best)

Alpha Gains is a modern e-commerce platform built for authentic imported fitness nutrition, whey proteins, clinical peptides, high-stimulant pre-workouts, mass gainers, and synergistic stacks.

---

## 🌟 Key Features

- **100% Matching SuppX UI & Brand Identity**: Dark athletic color scheme (`#090b0e`, `#121622`, Gold/Amber accents `#f59e0b`), bold uppercase athletic typography, badges, and trust indicators.
- **Shop By Goal Combos & Stacks**: 8 synergistic athlete bundles with interactive bundle builders and up to 35% discount stack pricing.
- **Comprehensive 10-Category Catalog**: Proteins, Mass Gainers, Testosterone Boosters, Pre-Workouts, Creatine, Natural Steroids & Peptides, Organ Health, BCAAs & EAAs, Multivitamins & Omega-3, Collagen & Joint Support.
- **Real-Time Batch Code Authenticity Verifier**: Real-time lookup of batch HPLC lab analysis reports (e.g. `AG-WHEY-2026`, `AG-CREAT-8841`, `AG-PRE-5510`, `AG-PEP-9021`).
- **Interactive Sliding Cart Drawer & Full Cart Page**: Free shipping threshold progress bar (Free above ₹9,999), instant promo code apply (`ALPHAFIRST10`, `BULK20`), seller notes, and quantity controls.
- **Quick View Modal & Gallery Zoom**: Instant popup preview on product cards without leaving the page.
- **Multi-Step Secure Checkout**: Real-time address validation, 6-digit PIN code matching, payment simulation (UPI QR, Cards, NetBanking, COD), and celebratory confetti confirmation.
- **Live Order Tracking Portal**: Lookup shipment progress, tracking numbers, and courier timelines.
- **Age Verification (18+) Modal**: Confirmation prompt for adult performance nutrition with persistent memory.
- **Cookie Consent Banner & 10% Welcome Discount Popup**.
- **Interactive WhatsApp Support Widget**: Instant direct chat triggers with pre-filled inquiries.
- **Customer Reviews & Rating System**: Verified buyer badges and submission modal.

---

## 🎨 Brand Kit — Where The Logo Lives

All brand assets are driven from **one file**: `lib/brand.ts`.

| File | Use |
| --- | --- |
| `public/logo.svg` | Primary lockup (shield mark + ALPHA GAINS wordmark + tagline) — header, footer, modals |
| `public/logo-mark.svg` | Icon only — favicon, PWA, cart chip, loader, WhatsApp widget |
| `public/logo-stacked.svg` | Centred lockup for pop-ups / splash |
| `public/logo-white.svg` / `logo-black.svg` | Monochrome lockups for photos, invoices, packaging, stickers |
| `public/logo.png` | 1024px raster — social share, WhatsApp DP, uploads |
| `public/og/og-image.png` | 1200×630 link-preview image (WhatsApp / Instagram / Google) |
| `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` | Browser tab, bookmarks, iOS home screen |
| `public/icons/*`, `app/manifest.ts` | Android / PWA install icons (192, 512, maskable) |

### Swap in your own logo in 30 seconds

1. Drop the file into `public/` — e.g. `public/logo.png`.
2. In `lib/brand.ts` point `logo.src` to `"/logo.png"` (and `logo.withWordmark` to `true`
   if your file already includes the "ALPHA GAINS" text).
3. Done — `components/layout/Logo.tsx` renders it in the header, mobile drawer, footer,
   age gate, welcome pop-up, cart drawer, checkout success, loader and 404 page.
   If the file is ever missing, the component falls back to the built-in vector mark,
   so the site can never show a broken image.

Regenerate the favicon / PWA / share rasters from a new `public/logo-mark.svg`:

```bash
npm i -D sharp      # build-time only tool
npm run brand:assets
```

Typography: condensed athletic display face (Oswald + Archivo Black, loaded in
`app/layout.tsx`) with a safe system fallback, dark athletic palette
(`#090b0e` ink, `#121622` panels, `#f59e0b` gold) exposed as Tailwind tokens
(`bg-brand-ink`, `text-brand-gold`, `font-display`) in `app/globals.css`.

---

##  Homepage Layout (Suppx-matched, then pushed further)

1. Full-bleed **hero banner slider** — 3 cinematic slides, auto-play, swipe, keyboard,
   progress dots, Ken-Burns zoom, floating featured-stack card
2. **Categories** grid with product render art tiles
3. **Shop By Goal** combos & stacks (up to 35% off)
4. **Bestsellers** with category filter pills
5. **Athlete reviews** wall + service pillars + rating summary
6. **Why Buy From Alpha Gains** trust section
7. Marquee ticker
8. Category spotlight (peptides / pre-workout)
9. Real-time **batch authenticity verifier**
10. **FAQ & support** accordion
11. Brand mission + WhatsApp CTA
12. App-style **mobile bottom tab bar** with logo chip (Home / Shop / Combos / Wishlist / Bag)

---

## 🔒 Security Architecture & Hardening

1. **Never Trust the Client**: Strict server-side recalculation of all cart totals, coupon discounts, and shipping rules.
2. **Rate Limiting**: Sliding-window in-memory rate limiting on all API routes (`/api/orders`, `/api/verify-batch`, `/api/newsletter`, `/api/contact`, `/api/reviews`, `/api/coupons`). Returns `429 Too Many Requests` with `Retry-After`.
3. **Input Sanitization & XSS Defense**: Strict Zod schema validation and HTML character escaping on all incoming user payloads.
4. **IDOR / BOLA Prevention**: Safe query parameters with authorization matching on order lookup.
5. **Security Headers**: HSTS, Content-Security-Policy, X-Content-Type-Options (`nosniff`), Referrer-Policy (`strict-origin-when-cross-origin`), Permissions-Policy.
6. **Graceful Error Handling**: Generic safe error messages without internal stack trace exposure.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15/16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom Animations (Marquees, Glows, Shimmers)
- **Icons**: Lucide React
- **Validation**: Zod
- **Effects**: Canvas Confetti

---

## 📦 Running Locally

```bash
# Install dependencies
npm install

# Run build
npm run build

# Start production server
npm start
```
