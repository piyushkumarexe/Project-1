import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/cart/QuickViewModal";
import AgeVerificationModal from "@/components/layout/AgeVerificationModal";
import CookieConsent from "@/components/layout/CookieConsent";
import WelcomePopup from "@/components/layout/WelcomePopup";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Toast from "@/components/ui/Toast";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "Alpha Gains | 100% Authentic Imported Supplements & Performance Nutrition",
  description: "Sasta Nahi, Sabse Accha. Shop 100% authentic whey protein, creatine, pre-workouts, mass gainers, natural peptides and health stacks at Alpha Gains.",
  keywords: "Alpha Gains, whey protein, creatine, pre-workout, bodybuilding supplements, imported supplements India, muscle gainer, lab tested supplements, peptides",
  authors: [{ name: "Alpha Gains Nutrition" }],
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: "Alpha Gains | 100% Authentic Imported Supplements",
    description: "Sasta Nahi, Sabse Accha. Fuel your beast with 100% lab tested and certified imported performance supplements.",
    siteName: "Alpha Gains",
    images: [{ url: "/images/logo-512.png", width: 512, height: 512, alt: "Alpha Gains Supplements Store" }],
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-red-600 selection:text-white flex flex-col justify-between pb-[58px] lg:pb-0">
        <CartProvider>
          {/* Top Ticker Marquee */}
          <AnnouncementBar />

          {/* Navigation Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 min-h-[60vh]">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Global Interactive Overlays */}
          <CartDrawer />
          <QuickViewModal />
          <AgeVerificationModal />
          <CookieConsent />
          <WelcomePopup />
          <WhatsAppButton />
          <Toast />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
