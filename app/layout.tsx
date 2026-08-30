import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/cart/QuickViewModal";
import AgeVerificationModal from "@/components/layout/AgeVerificationModal";
import CookieConsent from "@/components/layout/CookieConsent";
import WelcomePopup from "@/components/layout/WelcomePopup";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Toast from "@/components/ui/Toast";
import { BRAND } from "@/lib/brand";

const SITE_URL = BRAND.url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | 100% Authentic Imported Supplements & Performance Nutrition`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Sasta Nahi, Sabse Accha. Shop 100% authentic whey protein, creatine, pre-workouts, mass gainers, natural peptides and health stacks at Alpha Gains — every batch lab verified.",
  keywords:
    "Alpha Gains, whey protein, creatine, pre-workout, bodybuilding supplements, imported supplements India, muscle gainer, lab tested supplements, peptides",
  authors: [{ name: BRAND.legalName }],
  creator: BRAND.legalName,
  applicationName: BRAND.name,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: BRAND.name,
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: `${BRAND.name} | 100% Authentic Imported Supplements`,
    description: BRAND.tagline,
    url: SITE_URL,
    siteName: BRAND.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — ${BRAND.slogan}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | 100% Authentic Imported Supplements`,
    description: BRAND.tagline,
    images: ["/og/og-image.png"],
    creator: "@alphagains",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090b0e" },
    { media: "(prefers-color-scheme: light)", color: "#f59e0b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.legalName,
  alternateName: BRAND.name,
  slogan: BRAND.slogan,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: BRAND.contact.email,
  telephone: `+${BRAND.contact.whatsappCountryCode}${BRAND.contact.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Varanasi",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
    streetAddress: BRAND.contact.address,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${BRAND.contact.whatsappCountryCode}${BRAND.contact.whatsappNumber}`,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [BRAND.contact.instagram, BRAND.contact.youtube],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090b0e] text-[#f3f4f6] font-sans antialiased selection:bg-amber-500 selection:text-black flex flex-col justify-between pb-14 lg:pb-0">
        {/* Brand display face — condensed athletic look (graceful fallback if blocked) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Archivo+Black&display=swap"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <CartProvider>
          {/* Top Ticker Marquee */}
          <AnnouncementBar />

          {/* Navigation Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 min-h-[60vh]">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Mobile app-style tab bar (logo centred) */}
          <MobileTabBar />

          {/* Global Interactive Overlays */}
          <CartDrawer />
          <QuickViewModal />
          <AgeVerificationModal />
          <CookieConsent />
          <WelcomePopup />
          <WhatsAppButton />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
