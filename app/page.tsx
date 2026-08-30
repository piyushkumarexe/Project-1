import HeroBanner from "@/components/home/HeroBanner";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import ShopByGoal from "@/components/home/ShopByGoal";
import Bestsellers from "@/components/home/Bestsellers";
import WhyBuySection from "@/components/home/WhyBuySection";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import CategorySpotlight from "@/components/home/CategorySpotlight";
import AuthenticityWidget from "@/components/home/AuthenticityWidget";
import BrandMission from "@/components/home/BrandMission";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Showcase */}
      <HeroBanner />

      {/* 2. Categories 10-Grid */}
      <CategoriesGrid />

      {/* 3. Shop By Goal Combos & Stacks */}
      <ShopByGoal />

      {/* 4. Bestselling Supplements */}
      <Bestsellers />

      {/* 5. Why Buy From Alpha Gains Trust Pillars */}
      <WhyBuySection />

      {/* 6. Middle Marquee Animated Ticker */}
      <MarqueeTicker />

      {/* 7. Category Spotlight: Peptides & Pre-Workouts */}
      <CategorySpotlight />

      {/* 8. Real-time Batch Authenticity Verifier */}
      <AuthenticityWidget />

      {/* 9. Brand Mission & WhatsApp Banner */}
      <BrandMission />
    </div>
  );
}
