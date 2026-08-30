export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  description: string;
  tagline: string;
  itemCount: number;
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: "proteins",
    name: "Proteins",
    slug: "proteins",
    iconName: "Dumbbell",
    image: "/images/categories/proteins.png",
    description: "Premium 100% Imported Whey Isolate, Whey Blend & Hydrolyzed Proteins for ultra-fast muscle recovery.",
    tagline: "Build Lean Muscle",
    itemCount: 12,
    featured: true,
  },
  {
    id: "gainer",
    name: "Gainer",
    slug: "gainer",
    iconName: "Flame",
    image: "/images/categories/gainer.png",
    description: "High-calorie anabolic mass gainers packed with complex carbs, clean protein, and digestive enzymes.",
    tagline: "Mass & Size Explosion",
    itemCount: 8,
    featured: true,
  },
  {
    id: "performance-nutrition",
    name: "Testosterone & Performance Booster",
    slug: "performance-nutrition",
    iconName: "Zap",
    image: "/images/categories/testosterone.png",
    description: "Natural herbal & peptide testosterone boosters, Tongkat Ali, Fadogia, and vigor optimizers.",
    tagline: "Unleash Alpha Drive",
    itemCount: 9,
    featured: true,
  },
  {
    id: "pre-workout",
    name: "Pre-Workout",
    slug: "pre-workout",
    iconName: "Activity",
    image: "/images/categories/pre-workout.png",
    description: "High-stimulant and pump formulas designed for laser focus, explosive energy, and skin-splitting pumps.",
    tagline: "Insane Energy & Focus",
    itemCount: 10,
    featured: true,
  },
  {
    id: "creatine",
    name: "Creatine",
    slug: "creatine",
    iconName: "ShieldCheck",
    image: "/images/categories/creatine.png",
    description: "Ultra-pure micronized 200 Mesh Creatine Monohydrate & HCl for ATP replenishment and raw strength.",
    tagline: "Pure Power & Strength",
    itemCount: 6,
    featured: true,
  },
  {
    id: "igf",
    name: "Natural Steroids & Peptides",
    slug: "igf",
    iconName: "Award",
    image: "/images/categories/peptides.png",
    description: "Legal, 100% safe bio-active peptides, IGF-1, Beta-Ecdysterone, and Laxogenin anabolic agents.",
    tagline: "Next-Gen Muscle Matrix",
    itemCount: 7,
    featured: true,
  },
  {
    id: "organ-health",
    name: "Organ Health",
    slug: "organ-health",
    iconName: "HeartPulse",
    image: "/images/categories/organ-health.png",
    description: "Advanced liver detox, kidney filtration support, cardiovascular protection, and appetite enhancement.",
    tagline: "Vital Organs & Detox",
    itemCount: 5,
    featured: true,
  },
  {
    id: "bcaa-eaa",
    name: "BCAA & EAA",
    slug: "bcaa-eaa",
    iconName: "Sparkles",
    image: "/images/categories/bcaa-eaa.png",
    description: "Full spectrum Essential Amino Acids & BCAAs with electrolytes for intra-workout endurance and anti-catabolism.",
    tagline: "Intra-Workout Hydration",
    itemCount: 6,
    featured: false,
  },
  {
    id: "multi-vitamins-omega",
    name: "Multi Vitamins & Omega",
    slug: "multi-vitamins-omega",
    iconName: "ShieldPlus",
    image: "/images/categories/multivitamins.png",
    description: "100% RDA daily multivitamins, triple-strength Omega-3 Fish Oil (EPA/DHA), and vital micro-nutrients.",
    tagline: "Immunity & Joint Health",
    itemCount: 8,
    featured: false,
  },
  {
    id: "skin-nail-hair-joint-support",
    name: "Collagen for Skin , Hair & Joint support",
    slug: "skin-nail-hair-joint-support",
    iconName: "Droplets",
    image: "/images/categories/collagen.png",
    description: "Type 1 & 3 Hydrolyzed Collagen Peptides with Hyaluronic Acid & Biotin for youthful joints, hair, and glowing skin.",
    tagline: "Joints, Skin & Hair",
    itemCount: 4,
    featured: false,
  },
];
