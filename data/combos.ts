export interface Combo {
  id: string;
  slug: string;
  title: string;
  category: string;
  goal: "Muscle Gain" | "Fat Loss" | "Performance" | "Peptides" | "Bulking";
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  inStock: boolean;
  includedItems: string[];
  description: string;
  servings?: string;
}

export const COMBOS: Combo[] = [
  {
    id: "combo-complete-power",
    slug: "belive-complete-power-combo-ultimate-performance-wellness-stack",
    title: "Alpha Gains Complete Power Combo | Ultimate Performance & Wellness Stack",
    category: "Combos & Stacks",
    goal: "Performance",
    originalPrice: 10999,
    salePrice: 7249,
    discountPercentage: 34,
    image: "/images/combos/power-combo.png",
    rating: 4.9,
    reviewsCount: 142,
    badge: "Best Value Stack",
    inStock: true,
    includedItems: [
      "Alpha Gains 100% Whey Gold (2kg)",
      "Pure Micronized Creatine (300g)",
      "High Focus Pre-Workout (30 Servings)",
      "100% RDA Multivitamin (60 Tabs)",
      "Triple Strength Omega-3 (60 Softgels)"
    ],
    description: "The complete 360-degree athlete stack designed for lean muscle gain, raw strength, relentless endurance, and foundational cellular health."
  },
  {
    id: "combo-aggressive-muscle-gain",
    slug: "lean-muscle-gain-stack-anabol-hardcore-sex-charge-performance-combo",
    title: "Aggressive Muscle Gain Combo | Anabol Hardcore + Sex Charge Performance Combo",
    category: "Combos & Stacks",
    goal: "Muscle Gain",
    originalPrice: 6999,
    salePrice: 5199,
    discountPercentage: 25,
    image: "/images/combos/aggressive-muscle.png",
    rating: 4.8,
    reviewsCount: 98,
    badge: "Most Popular",
    inStock: true,
    includedItems: [
      "Anabol Hardcore Anabolic Activator (60 Caps)",
      "Alpha Gains Sexcharge Libido & Test Booster (60 Caps)"
    ],
    description: "Synergistic dual-action anabolic & testosterone stack to maximize protein synthesis, workout aggression, and vascularity."
  },
  {
    id: "combo-gain-supreme",
    slug: "gain-supreme",
    title: "Gain Supreme Combo - Laxo Bulk + Sexcharge",
    category: "Combos & Stacks",
    goal: "Muscle Gain",
    originalPrice: 6999,
    salePrice: 4999,
    discountPercentage: 28,
    image: "/images/combos/gain-supreme.png",
    rating: 4.7,
    reviewsCount: 84,
    badge: "Top Rated",
    inStock: true,
    includedItems: [
      "Laxo Bulk 100mg 5a-Hydroxy Laxogenin (60 Caps)",
      "Alpha Gains Sexcharge Performance Booster (60 Caps)"
    ],
    description: "Non-hormonal plant-derived anabolic peptide combo that promotes rapid protein synthesis without suppressing natural hormones."
  },
  {
    id: "combo-natural-peptides",
    slug: "natural-bodybuilding-peptides-genesis-1-omega-3-multivitamin",
    title: "Natural Bodybuilding Peptides | Genesis-1 + Omega-3 + Multivitamin",
    category: "Combos & Stacks",
    goal: "Peptides",
    originalPrice: 11999,
    salePrice: 8699,
    discountPercentage: 27,
    image: "/images/combos/peptides-combo.png",
    rating: 5.0,
    reviewsCount: 65,
    badge: "Elite Stack",
    inStock: true,
    includedItems: [
      "Innova Pharma Genesis IGF-1 Peptides (60ml Oral Liquid)",
      "Alpha Gains Triple Strength Omega-3",
      "Alpha Gains 100% RDA Multivitamin"
    ],
    description: "Clinically proven bio-active peptide complex supported with essential fatty acids and cellular co-factors for extreme muscle fiber hypertrophy."
  },
  {
    id: "combo-fat-loss",
    slug: "ultimate-fat-loss-combo-burnx-hyde-thermo-omega-3-multivitamin",
    title: "Ultimate Fat Loss Combo | BurnX + Hyde Thermo + Omega-3 + Multivitamin",
    category: "Combos & Stacks",
    goal: "Fat Loss",
    originalPrice: 8999,
    salePrice: 6499,
    discountPercentage: 27,
    image: "/images/combos/fat-loss.png",
    rating: 4.8,
    reviewsCount: 116,
    badge: "Cutting Stack",
    inStock: true,
    includedItems: [
      "BurnX Advanced Thermogenic (90 Caps)",
      "Hyde Thermo Pre-Workout Fat Burner",
      "Alpha Gains Omega-3 1000mg",
      "Alpha Gains Complete Multivitamin"
    ],
    description: "Incinerate stubborn body fat while preserving lean muscle mass. Boosts thermogenesis, metabolic rate, and curb cravings."
  },
  {
    id: "combo-performance-booster",
    slug: "ultimate-performance-booster-stack-pre-workout-creatine-testrol-omega-3-multivitamin",
    title: "Ultimate Performance Booster Stack | Pre-Workout + Creatine + Testrol + Omega-3 + Multivitamin",
    category: "Combos & Stacks",
    goal: "Performance",
    originalPrice: 11999,
    salePrice: 7699,
    discountPercentage: 35,
    image: "/images/combos/perf-stack.png",
    rating: 4.9,
    reviewsCount: 173,
    badge: "Heavy Lifter Stack",
    inStock: true,
    includedItems: [
      "Alpha Gains Preworkout High Focus (30 Servings)",
      "Pure Micronized Creatine 200 Mesh (300g)",
      "Testrol Gold Testosterone Booster",
      "Triple Strength Omega-3",
      "100% RDA Multivitamin"
    ],
    description: "5-in-1 complete competitive power stack engineered for PRs, explosive stamina, hormonal balance, and deep muscular recovery."
  },
  {
    id: "combo-shredded",
    slug: "shredded-combo-fat-burner-high-stim-pre-workout-stack",
    title: "Shredded Combo | Fat Burner + High Stim Pre-Workout Stack",
    category: "Combos & Stacks",
    goal: "Fat Loss",
    originalPrice: 8999,
    salePrice: 6599,
    discountPercentage: 26,
    image: "/images/combos/shredded-combo.png",
    rating: 4.7,
    reviewsCount: 79,
    badge: "High Stim",
    inStock: true,
    includedItems: [
      "Lean XT Max Stim-Free Fat Burner",
      "Alpha Gains High Stim Pre-Workout (400mg Caffeine + Citrulline)"
    ],
    description: "The definitive 24/7 cutting stack. High intensity training energy combined with round-the-clock stimulant-free lipolysis."
  },
  {
    id: "combo-aggressive-bulk",
    slug: "aggressive-bulk-combo-protein-creatine-omega-3-multivitamin-stack",
    title: "Aggressive Bulk Combo | Mass Gainer + Creatine + Omega-3 + Multivitamin Stack",
    category: "Combos & Stacks",
    goal: "Bulking",
    originalPrice: 10999,
    salePrice: 8249,
    discountPercentage: 25,
    image: "/images/combos/bulk-stack.png",
    rating: 4.9,
    reviewsCount: 130,
    badge: "Mass Builder",
    inStock: true,
    includedItems: [
      "Alpha Gains Anabolic Mass Gainer 3kg",
      "Pure Micronized Creatine 300g",
      "Alpha Gains Triple Strength Omega-3",
      "Alpha Gains 100% RDA Multivitamin"
    ],
    description: "Pack on thick, dense quality muscle mass fast with clean calories, anabolic micronutrients, and high-purity creatine."
  }
];
