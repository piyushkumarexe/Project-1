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

export const metadata: Metadata = {
  title: "Alpha Gains | 100% Authentic Imported Supplements & Performance Nutrition",
  description: "Sasta Nahi, Sabse Accha. Shop 100% authentic whey protein, creatine, pre-workouts, mass gainers, natural peptides and health stacks at Alpha Gains.",
  keywords: "Alpha Gains, whey protein, creatine, pre-workout, bodybuilding supplements, imported supplements India, muscle gainer, lab tested supplements, peptides",
  authors: [{ name: "Alpha Gains Nutrition" }],
  openGraph: {
    title: "Alpha Gains | 100% Authentic Imported Supplements",
    description: "Sasta Nahi, Sabse Accha. Fuel your beast with 100% lab tested and certified imported performance supplements.",
    siteName: "Alpha Gains",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#090b0e",
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
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090b0e] text-[#f3f4f6] font-sans antialiased selection:bg-amber-500 selection:text-black flex flex-col justify-between">
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
        </CartProvider>
      </body>
    </html>
  );
}
