import HeroBanner from "@/components/home/HeroBanner";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import ShopByGoal from "@/components/home/ShopByGoal";
import Bestsellers from "@/components/home/Bestsellers";
import SocialProof from "@/components/home/SocialProof";
import WhyBuySection from "@/components/home/WhyBuySection";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import CategorySpotlight from "@/components/home/CategorySpotlight";
import AuthenticityWidget from "@/components/home/AuthenticityWidget";
import FaqSection from "@/components/home/FaqSection";
import BrandMission from "@/components/home/BrandMission";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Full-bleed hero slider — banner, slogan + CTAs */}
      <HeroBanner />

      {/* 2. Categories 10-grid with product render art */}
      <CategoriesGrid />

      {/* 3. Shop By Goal combos & stacks */}
      <ShopByGoal />

      {/* 4. Bestselling supplements with category filters */}
      <Bestsellers />

      {/* 5. Verified athlete reviews + service pillars */}
      <SocialProof />

      {/* 6. Why buy from Alpha Gains trust pillars */}
      <WhyBuySection />

      {/* 7. Middle marquee animated ticker */}
      <MarqueeTicker />

      {/* 8. Category spotlight: peptides & pre-workouts */}
      <CategorySpotlight />

      {/* 9. Real-time batch authenticity verifier */}
      <AuthenticityWidget />

      {/* 10. FAQ + WhatsApp support */}
      <FaqSection />

      {/* 11. Brand mission & WhatsApp banner */}
      <BrandMission />
    </div>
  );
}
