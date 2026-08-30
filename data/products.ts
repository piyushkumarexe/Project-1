export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ProductVariant {
  flavor?: string;
  size?: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  categorySlug: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  badge?: string;
  image: string;
  hoverImage?: string;
  galleryImages: string[];
  flavors?: string[];
  sizes?: string[];
  variants?: ProductVariant[];
  servings?: string;
  batchCode?: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  supplementFacts: { label: string; amount: string; dailyValue?: string }[];
  howToUse: string;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isPeptide?: boolean;
  tags: string[];
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-creatine-pure",
    slug: "belive-pure-micronized-creatine-monohydrate",
    title: "Alpha Gains Pure Micronized Creatine Monohydrate",
    brand: "Alpha Gains",
    category: "Creatine",
    categorySlug: "creatine",
    originalPrice: 1999,
    salePrice: 999,
    discountPercentage: 50,
    rating: 4.9,
    reviewsCount: 87,
    inStock: true,
    badge: "-50% OFF",
    image: "/images/products/creatine-main.png",
    hoverImage: "/images/products/creatine-orange.png",
    galleryImages: [
      "/images/products/creatine-main.png",
      "/images/products/creatine-orange.png",
      "/images/products/creatine-lemon.png",
      "/images/products/creatine-unflavored.png",
      "/images/products/creatine-nutrition.png",
    ],
    flavors: ["Unflavored", "Orange Kick", "Lemon Kick"],
    sizes: ["310g (84-103 Servings)", "600g (200 Servings)"],
    variants: [
      { flavor: "Unflavored", size: "310g (84-103 Servings)", price: 999, originalPrice: 1999, inStock: true, sku: "AG-CR-UNF-310" },
      { flavor: "Orange Kick", size: "310g (84-103 Servings)", price: 999, originalPrice: 1999, inStock: true, sku: "AG-CR-ORG-310" },
      { flavor: "Lemon Kick", size: "310g (84-103 Servings)", price: 999, originalPrice: 1999, inStock: true, sku: "AG-CR-LEM-310" },
    ],
    servings: "103 servings for unflavoured & 84 servings for flavoured",
    batchCode: "AG-CREAT-8841",
    shortDescription: "Maximize your gym performance with this pharmaceutical-grade Micronised Creatine Monohydrate 200 Mesh.",
    description: "Maximize your gym performance with this pharmaceutical-grade Micronised Creatine Monohydrate. Engineered for peak workout performance, strength, and lean muscle gain, this ultra-pure supplement utilizes high-energy phosphocreatine molecules to significantly increase muscle power output and accelerate anaerobic recovery. By combining the three pillars of quality—patented micronization technology, precise chemical analysis, and a careful selection of raw materials—this formula ensures you get 3g of pure creatine monohydrate per serving to enhance your contractile endurance.",
    benefits: [
      "Increases ATP Resynthesis: Rapidly restores cellular energy to help you push through heavy, high-intensity sets.",
      "Boosts Cellular Hydration: Promotes muscle cell volumization, leading to increased muscle size and a fuller appearance.",
      "Enhances Anaerobic Power: Improves overall strength and power output during explosive lifting and sprint movements.",
      "Ultra-Micronized 200 Mesh: Dissolves instantly in chilled water without gritty residue."
    ],
    supplementFacts: [
      { label: "Micronized Creatine Monohydrate (Mesh 200)", amount: "3000 mg", dailyValue: "†" },
      { label: "Calories", amount: "0 kcal", dailyValue: "0%" },
      { label: "Total Carbohydrates", amount: "0 g", dailyValue: "0%" },
      { label: "Total Sugars", amount: "0 g", dailyValue: "0%" },
      { label: "Sodium", amount: "0 mg", dailyValue: "0%" },
    ],
    howToUse: "Mix one scoop (3.7g for flavored / 3.0g for unflavored) into 250ml of chilled water or your favorite post-workout shake. Consume daily. Drink at least 3-4 liters of water daily.",
    isBestseller: true,
    isFeatured: true,
    tags: ["Creatine", "Strength", "Muscle Building", "Bestseller"],
    reviews: [
      { id: "rev-1", author: "Aman Sharma", rating: 5, date: "2026-08-15", title: "Best creatine in India hands down", comment: "Zero bloating, mixes cleanly and strength gains shot up in 10 days on bench and deadlifts.", verifiedPurchase: true },
      { id: "rev-2", author: "Vikram Malhotra", rating: 5, date: "2026-08-10", title: "Lemon Kick flavor is insane!", comment: "Most creatines taste chalky, but this Lemon Kick is refreshing like fresh nimbu pani. 10/10.", verifiedPurchase: true },
      { id: "rev-3", author: "Rajesh K.", rating: 4, date: "2026-08-01", title: "Lab report verified authentic", comment: "Checked batch code AG-CREAT-8841 on the authenticity verifier and SGS lab report was 99.98% pure.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-sexcharge",
    slug: "belive-sexcharge-the-ultimate-performance-booster",
    title: "Alpha Gains Sexcharge : The Ultimate Performance Booster",
    brand: "Alpha Gains",
    category: "Testosterone & Performance Booster",
    categorySlug: "performance-nutrition",
    originalPrice: 2999,
    salePrice: 1999,
    discountPercentage: 33,
    rating: 4.8,
    reviewsCount: 124,
    inStock: true,
    badge: "-33% OFF",
    image: "/images/products/sexcharge-main.png",
    hoverImage: "/images/products/sexcharge-back.png",
    galleryImages: [
      "/images/products/sexcharge-main.png",
      "/images/products/sexcharge-back.png",
    ],
    sizes: ["60 Capsules (30 Servings)"],
    batchCode: "AG-SEX-7712",
    shortDescription: "Sex Charge For Him Male Libido Enhancer & Vigor Activator 60 Capsules | 30 Servings.",
    description: "Sex Charge For Him Male Libido Enhancer & Performance Activator is engineered with high-potency standardized Tongkat Ali 200:1, Fadogia Agrestis, KSM-66 Ashwagandha, and Purified Shilajit. Designed to elevate free testosterone levels, enhance nitric oxide vasodilation, optimize male hormonal drive, and supercharge workout stamina.",
    benefits: [
      "Optimizes Free & Total Testosterone levels naturally.",
      "Amplifies Nitric Oxide synthesis for intense vascular pumps and performance.",
      "Combats cortisol and mental fatigue for unstoppable gym and lifestyle energy.",
      "100% natural, non-hormonal formula without side effects."
    ],
    supplementFacts: [
      { label: "Tongkat Ali Extract (200:1 Eurycoma Longifolia)", amount: "400 mg", dailyValue: "†" },
      { label: "Fadogia Agrestis (10:1 Extract)", amount: "600 mg", dailyValue: "†" },
      { label: "KSM-66 Ashwagandha (5% Withanolides)", amount: "300 mg", dailyValue: "†" },
      { label: "Purified Shilajit Extract (50% Fulvic Acid)", amount: "250 mg", dailyValue: "†" },
      { label: "Zinc Monomethionine", amount: "15 mg", dailyValue: "136%" },
    ],
    howToUse: "Take 2 capsules daily with water, preferably 30 minutes before workout or with breakfast.",
    isBestseller: true,
    isFeatured: true,
    tags: ["Testosterone", "Vigor", "Stamina", "Performance"],
    reviews: [
      { id: "rev-4", author: "Rohan V.", rating: 5, date: "2026-08-18", title: "Energy levels through the roof", comment: "Within a week my training intensity and overall energy improved noticeably.", verifiedPurchase: true },
      { id: "rev-5", author: "Sameer D.", rating: 5, date: "2026-08-04", title: "Genuine product", comment: "Super potent formula. Highly recommend to everyone training heavy.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-livoguard",
    slug: "belive-livoguard-advanced-liver-support-appetite-increase-formulation",
    title: "Alpha Gains Livoguard (Advanced Liver Support + Appetite Increase Formulation)",
    brand: "Alpha Gains",
    category: "Organ Health",
    categorySlug: "organ-health",
    originalPrice: 2499,
    salePrice: 1499,
    discountPercentage: 40,
    rating: 4.9,
    reviewsCount: 92,
    inStock: true,
    badge: "-40% OFF",
    image: "/images/products/livoguard-main.png",
    hoverImage: "/images/products/livoguard-back.png",
    galleryImages: [
      "/images/products/livoguard-main.png",
      "/images/products/livoguard-back.png",
    ],
    sizes: ["60 Capsules (30 Servings)"],
    batchCode: "AG-LIVO-3304",
    shortDescription: "Your liver works around the clock to detoxify your body, metabolize nutrients, and support overall performance.",
    description: "Your liver works around the clock to detoxify your body, metabolize nutrients, and support anabolic hormone balance. Alpha Gains Livoguard combines 80% Silymarin Milk Thistle, N-Acetyl Cysteine (NAC), TUDCA, and digestive bitter tonics to cleanse hepatic cells, lower liver enzymes (SGOT/SGPT), and naturally trigger voracious appetite for heavy bulking diets.",
    benefits: [
      "Restores healthy SGOT / SGPT liver enzyme levels.",
      "Protects hepatocytes during intense supplementation and metabolic stress.",
      "Stimulates digestive enzymes to increase daily caloric appetite effortlessly.",
      "Contains NAC & TUDCA for maximum cellular bile acid flow and glutathione synthesis."
    ],
    supplementFacts: [
      { label: "Milk Thistle Extract (80% Silymarin)", amount: "500 mg", dailyValue: "†" },
      { label: "N-Acetyl Cysteine (NAC)", amount: "600 mg", dailyValue: "†" },
      { label: "TUDCA (Tauroursodeoxycholic Acid)", amount: "250 mg", dailyValue: "†" },
      { label: "Dandelion Root Extract 4:1", amount: "200 mg", dailyValue: "†" },
      { label: "Artichoke Leaf Extract", amount: "150 mg", dailyValue: "†" }
    ],
    howToUse: "Take 2 capsules daily with meals. Ideal for post-cycle support or heavy protein intake periods.",
    isBestseller: true,
    isFeatured: true,
    tags: ["Liver Support", "Detox", "Organ Health", "Appetite"],
    reviews: [
      { id: "rev-6", author: "Gurpreet S.", rating: 5, date: "2026-08-20", title: "Appetite went up noticeably", comment: "Was struggling to eat 3500 calories, Livoguard solved it in 4 days. Digestion is smooth.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-genesis-peptides",
    slug: "innova-pharma-genesis",
    title: "Innova Pharma Genesis IGF-1 Peptides",
    brand: "Innova Pharma",
    category: "Natural Steroids & Peptides",
    categorySlug: "igf",
    originalPrice: 8499,
    salePrice: 6999,
    discountPercentage: 18,
    rating: 5.0,
    reviewsCount: 110,
    inStock: true,
    badge: "ELITE PEPTIDE",
    image: "/images/products/genesis-peptides.png",
    hoverImage: "/images/products/genesis-peptides-box.png",
    galleryImages: [
      "/images/products/genesis-peptides.png",
      "/images/products/genesis-peptides-box.png",
    ],
    sizes: ["60ml Sublingual Solution (30 Servings)"],
    batchCode: "AG-PEP-9021",
    shortDescription: "The latest and most potent natural legal supplement for athletes! Clinically proven to improve muscle hyperplasia.",
    description: "The latest and most potent natural legal peptide supplement for athletes! Clinically proven to improve muscle cell proliferation (hyperplasia), accelerate tendon and ligament repair, and activate nutrient partitioning directly into muscle tissue rather than fat storage.",
    benefits: [
      "Stimulates satellite muscle cell activation for true muscle fiber multiplication.",
      "Supercharges localized recovery and reduces joint inflammation.",
      "Promotes dry, dense vascular muscle density.",
      "Sublingual liposomal delivery for maximum bioavailability."
    ],
    supplementFacts: [
      { label: "Bioactive IGF-1 Peptide Complex", amount: "50 mcg", dailyValue: "†" },
      { label: "Growth Hormone Secretagogue Peptide", amount: "100 mg", dailyValue: "†" },
      { label: "Liposomal Phospholipids", amount: "250 mg", dailyValue: "†" }
    ],
    howToUse: "Take 1ml under the tongue first thing in the morning. Hold for 60 seconds before swallowing.",
    isBestseller: true,
    isFeatured: true,
    isPeptide: true,
    tags: ["Peptides", "IGF-1", "Hyperplasia", "Elite"],
    reviews: [
      { id: "rev-7", author: "Karan Johar", rating: 5, date: "2026-08-22", title: "Next level muscle fullness", comment: "Unbelievable density and pumps. Legit peptide product.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-preworkout",
    slug: "belive-preworkout-high-focus-intensity",
    title: "Alpha Gains Preworkout High Focus & Intensity",
    brand: "Alpha Gains",
    category: "Pre-Workout",
    categorySlug: "pre-workout",
    originalPrice: 3099,
    salePrice: 2499,
    discountPercentage: 19,
    rating: 4.8,
    reviewsCount: 104,
    inStock: true,
    badge: "-19% OFF",
    image: "/images/products/preworkout-main.png",
    hoverImage: "/images/products/preworkout-cocktail.png",
    galleryImages: [
      "/images/products/preworkout-main.png",
      "/images/products/preworkout-cocktail.png",
    ],
    flavors: ["Orange Kick", "Beach Cocktail", "Blue Raspberry Ice"],
    sizes: ["300g (30 Hardcore Servings)"],
    variants: [
      { flavor: "Orange Kick", size: "300g (30 Servings)", price: 2499, originalPrice: 3099, inStock: true, sku: "AG-PRE-ORG" },
      { flavor: "Beach Cocktail", size: "300g (30 Servings)", price: 2499, originalPrice: 3099, inStock: true, sku: "AG-PRE-BCH" },
      { flavor: "Blue Raspberry Ice", size: "300g (30 Servings)", price: 2499, originalPrice: 3099, inStock: true, sku: "AG-PRE-BLU" },
    ],
    servings: "30 Full Dosed Servings",
    batchCode: "AG-PRE-5510",
    shortDescription: "Experience a high-performance, premium pre-workout formula designed to push your training limits.",
    description: "Experience a high-performance, premium pre-workout formula designed to push your training limits. Engineered with 6,000mg pure L-Citrulline, 3,200mg Beta-Alanine, Alpha-GPC for razor-sharp neuro focus, and a dual-stage caffeine complex for sustained raw power without any crash.",
    benefits: [
      "Skin-Splitting Pumps with 6000mg L-Citrulline & Nitrosigine.",
      "Tingle-Loaded Endurance with 3200mg CarnoSyn Beta-Alanine.",
      "Laser Tunnel Focus with 300mg Alpha-GPC & L-Tyrosine.",
      "Zero Sugar, Zero Crash formula."
    ],
    supplementFacts: [
      { label: "L-Citrulline Pure", amount: "6000 mg", dailyValue: "†" },
      { label: "Beta-Alanine", amount: "3200 mg", dailyValue: "†" },
      { label: "Caffeine Anhydrous + Infinergy", amount: "350 mg", dailyValue: "†" },
      { label: "Alpha-GPC 50%", amount: "300 mg", dailyValue: "†" },
      { label: "L-Tyrosine", amount: "1000 mg", dailyValue: "†" },
      { label: "Huperzine A 1%", amount: "200 mcg", dailyValue: "†" }
    ],
    howToUse: "Mix 1 scoop with 300ml cold water 20-30 minutes before your workout. Assess tolerance with half scoop first.",
    isBestseller: true,
    isFeatured: true,
    tags: ["Pre-Workout", "Energy", "Pumps", "Focus"],
    reviews: [
      { id: "rev-8", author: "Deepak S.", rating: 5, date: "2026-08-16", title: "Pure rocket fuel", comment: "Pumps are unbelievable and zero post-workout crash. Beach Cocktail flavor is super smooth.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-applied-whey",
    slug: "applied-nutrition-critical-whey-made-in-uk",
    title: "Applied Nutrition Critical Whey (Made in UK)",
    brand: "Applied Nutrition",
    category: "Proteins",
    categorySlug: "proteins",
    originalPrice: 12999,
    salePrice: 8099,
    discountPercentage: 37,
    rating: 4.9,
    reviewsCount: 156,
    inStock: true,
    badge: "-37% UK IMPORT",
    image: "/images/products/critical-whey.png",
    hoverImage: "/images/products/critical-whey-choco.png",
    galleryImages: [
      "/images/products/critical-whey.png",
      "/images/products/critical-whey-choco.png",
    ],
    flavors: ["Chocolate Delight", "Vanilla Ice Cream", "Strawberry & Banana"],
    sizes: ["2kg (67 Servings)", "4.5kg (150 Servings)"],
    variants: [
      { flavor: "Chocolate Delight", size: "2kg (67 Servings)", price: 8099, originalPrice: 12999, inStock: true, sku: "AN-CW-CHO-2" },
      { flavor: "Vanilla Ice Cream", size: "2kg (67 Servings)", price: 8099, originalPrice: 12999, inStock: true, sku: "AN-CW-VAN-2" },
    ],
    batchCode: "AG-WHEY-2026",
    shortDescription: "Critical Whey™ Protein has been developed using a unique blend of Whey Protein Concentrate, Whey Isolate & Hydrolyzed Whey.",
    description: "Critical Whey™ Protein has been developed using a unique blend of Whey Protein Concentrate, Whey Protein Isolate & Hydrolysed Whey Protein. Whey Protein Concentrate is produced by Ultra-Filtration Technology containing high levels of Protein and Branched Chain Amino Acids (BCAAs). Whey Protein Isolate is the highest quality of Protein and is produced using Cross-Flow-Micro-Filtration.",
    benefits: [
      "24g Protein per serving with instantized solubility.",
      "4.8g Naturally occurring BCAAs & 4g Glutamine.",
      "Halal Certified & Informed-Sport Tested for athletes.",
      "Ultra-low carbohydrate and fat profile."
    ],
    supplementFacts: [
      { label: "Calories", amount: "110 kcal", dailyValue: "6%" },
      { label: "Protein", amount: "24.0 g", dailyValue: "48%" },
      { label: "Total Fat", amount: "1.5 g", dailyValue: "2%" },
      { label: "Total Carbohydrate", amount: "1.4 g", dailyValue: "1%" },
      { label: "BCAAs", amount: "4.8 g", dailyValue: "†" }
    ],
    howToUse: "Mix 1 scoop (30g) with 200-250ml of cold water or skimmed milk. Consume immediately post-workout or throughout the day.",
    isBestseller: true,
    isFeatured: true,
    tags: ["Whey Protein", "UK Imported", "Isolate Blend", "Fast Recovery"],
    reviews: [
      { id: "rev-9", author: "Nikhil T.", rating: 5, date: "2026-08-14", title: "Genuinely imported batch", comment: "Scanned the security code and verified directly with UK importer. Tastes like milkshake.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-pvl-whey",
    slug: "pvl-100-whey-gold-canada-imported",
    title: "PVL 100% Whey Gold (Canada Imported)",
    brand: "PVL Gold Series",
    category: "Proteins",
    categorySlug: "proteins",
    originalPrice: 8499,
    salePrice: 6499,
    discountPercentage: 23,
    rating: 4.8,
    reviewsCount: 78,
    inStock: true,
    badge: "-23% CANADA",
    image: "/images/products/pvl-whey.png",
    hoverImage: "/images/products/pvl-whey-back.png",
    galleryImages: [
      "/images/products/pvl-whey.png",
      "/images/products/pvl-whey-back.png",
    ],
    flavors: ["Cookie Sandwich Icecream", "Triple Rich Chocolate"],
    sizes: ["2kg (62 Servings)", "2.7kg (6 lbs)"],
    variants: [
      { flavor: "Cookie Sandwich Icecream", size: "2kg (62 Servings)", price: 6499, originalPrice: 8499, inStock: true, sku: "PVL-WG-CK-2" },
      { flavor: "Triple Rich Chocolate", size: "2kg (62 Servings)", price: 6499, originalPrice: 8499, inStock: true, sku: "PVL-WG-TRC-2" },
    ],
    shortDescription: "PVL Gold Series Whey Protein – Advanced Macromolecular Nitrogen Matrix & Premium Amino Acid Retention.",
    description: "PVL Gold Series 100% Whey Gold is a premium protein imported from Canada by GMC Shri Balaji Overseas. PVL 100% Whey Gold delivers 24 grams of clean whey protein fortified with active probiotics (DE111) and digestive enzymes for 100% assimilation.",
    benefits: [
      "24g 100% Whey Protein with Probiotics DE111.",
      "Fortified with Lactase & Protease digestive enzyme complex.",
      "100% Informed Choice Certified, WADA Compliant.",
      "No amino spiking, 100% pure dairy proteins."
    ],
    supplementFacts: [
      { label: "Protein", amount: "24.0 g", dailyValue: "48%" },
      { label: "BCAAs", amount: "5.5 g", dailyValue: "†" },
      { label: "Probiotics (DE111 Bacillus)", amount: "1 Billion CFU", dailyValue: "†" },
      { label: "Total Fat", amount: "1.0 g", dailyValue: "1%" }
    ],
    howToUse: "Add 1 scoop into 200ml cold milk or water. Shake well for 20 seconds.",
    isBestseller: true,
    isFeatured: true,
    tags: ["Canada Imported", "Whey Gold", "Probiotics"],
    reviews: [
      { id: "rev-10", author: "Varun P.", rating: 5, date: "2026-08-11", title: "Best digestion ever", comment: "Zero gas or bloating thanks to the probiotics. Cookie sandwich flavor is incredible.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-weider-ashwagandha",
    slug: "weider-ashwagandha-best-sleep-support",
    title: "Weider Ashwagandha - Best Sleep & Cortisol Support",
    brand: "Weider Nutrition",
    category: "Multi Vitamins & Omega",
    categorySlug: "multi-vitamins-omega",
    originalPrice: 2999,
    salePrice: 2399,
    discountPercentage: 20,
    rating: 4.8,
    reviewsCount: 65,
    inStock: true,
    badge: "-20% GERMANY",
    image: "/images/products/weider-ashwa.png",
    hoverImage: "/images/products/weider-ashwa-back.png",
    galleryImages: [
      "/images/products/weider-ashwa.png",
      "/images/products/weider-ashwa-back.png",
    ],
    sizes: ["60 Capsules"],
    shortDescription: "Ashwagandha Sleep: Capsules with premium KSM-66 plant extract, L-Theanine and Melatonin for deep sleep.",
    description: "Ashwagandha Sleep by Weider Germany is specifically engineered for athletes undergoing heavy training volume. Formulated with KSM-66 standardized Withania Somnifera, L-Theanine, Magnesium, and Melatonin to drastically accelerate nocturnal growth hormone release and lower cortisol.",
    benefits: [
      "Lowers elevated evening cortisol to prevent muscle catabolism.",
      "Promotes deep REM recovery sleep cycles for optimal GH secretion.",
      "Reduces chronic physical and psychological stress.",
      "German pharmaceutical standard manufacturing."
    ],
    supplementFacts: [
      { label: "KSM-66 Ashwagandha Extract", amount: "600 mg", dailyValue: "†" },
      { label: "L-Theanine", amount: "200 mg", dailyValue: "†" },
      { label: "Melatonin", amount: "3 mg", dailyValue: "†" },
      { label: "Magnesium Bisglycinate", amount: "100 mg", dailyValue: "25%" }
    ],
    howToUse: "Take 1-2 capsules 30-45 minutes before sleep with water.",
    isBestseller: true,
    isFeatured: false,
    tags: ["Sleep", "Recovery", "Ashwagandha", "Cortisol"],
    reviews: [
      { id: "rev-11", author: "Harsh V.", rating: 5, date: "2026-08-08", title: "Woke up fully refreshed", comment: "Sleep quality improved from day one. You wake up energized without any grogginess.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-dileucine",
    slug: "unmatched-dileucine-muscle-building-peptide",
    title: "Unmatched Dileucine Muscle Building Peptide",
    brand: "Unmatched Supplements",
    category: "Natural Steroids & Peptides",
    categorySlug: "igf",
    originalPrice: 6999,
    salePrice: 4799,
    discountPercentage: 31,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    badge: "-31% ANABOLIC",
    image: "/images/products/dileucine.png",
    hoverImage: "/images/products/dileucine-back.png",
    galleryImages: [
      "/images/products/dileucine.png",
      "/images/products/dileucine-back.png",
    ],
    sizes: ["120 Capsules (30 Servings)"],
    shortDescription: "Unmatched Dileucine is a groundbreaking amino acid dipeptide for helping you accelerate mTOR protein synthesis.",
    description: "Unmatched Dileucine is a groundbreaking peptide revolutionizing sports nutrition. Featuring Radiplex® Dileucine, which has been shown in clinical trials to spike muscle protein synthesis 60% higher than standard free-form L-Leucine.",
    benefits: [
      "Spikes mTOR pathway 60% more effectively than regular Leucine.",
      "Accelerates muscle hypertrophy between intense training sessions.",
      "Drastically reduces post-workout muscle soreness (DOMS).",
      "100% legal, non-hormonal, WADA approved peptide."
    ],
    supplementFacts: [
      { label: "Radiplex® Dileucine Dipeptide Complex", amount: "2000 mg", dailyValue: "†" },
      { label: "AstraGin® Bioavailability Enhancer", amount: "50 mg", dailyValue: "†" }
    ],
    howToUse: "Take 4 capsules immediately post-workout or prior to bed with protein shake.",
    isBestseller: false,
    isFeatured: true,
    isPeptide: true,
    tags: ["Peptides", "mTOR", "Muscle Building"],
    reviews: [
      { id: "rev-12", author: "Manish R.", rating: 5, date: "2026-08-19", title: "DOMS is completely gone", comment: "Recovery speed is insane. Can hit heavy legs twice a week now without fatigue.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-beta-ecdysterone",
    slug: "weider-beta-ecdysterone-natural-steroid",
    title: "Weider Beta Ecdysterone Natural Plant Steroid",
    brand: "Weider Germany",
    category: "Natural Steroids & Peptides",
    categorySlug: "igf",
    originalPrice: 6999,
    salePrice: 5999,
    discountPercentage: 14,
    rating: 4.8,
    reviewsCount: 73,
    inStock: true,
    badge: "-14% NATURAL ANABOLIC",
    image: "/images/products/ecdysterone.png",
    hoverImage: "/images/products/ecdysterone-back.png",
    galleryImages: [
      "/images/products/ecdysterone.png",
      "/images/products/ecdysterone-back.png",
    ],
    sizes: ["150 Capsules (50 Servings)"],
    shortDescription: "Beta-Ecdysterone - growth stimulator and safe non-hormonal alternative to anabolic steroids.",
    description: "Beta-Ecdysterone by Weider Germany is a natural hormone-like phytoecdysteroid extracted from Cyanotis Vaga. Clinically tested to promote protein synthesis, nitrogen retention, and muscle mass accretion without affecting the hypothalamic-pituitary-gonadal (HPG) axis.",
    benefits: [
      "Naturally upregulates protein synthesis in skeletal muscle fibers.",
      "Zero androgenic side effects, no PCT required.",
      "Contains Gamma-Oryzanol & Yam Root extract for synergism.",
      "Tested & certified by University of Cologne Sports Laboratory."
    ],
    supplementFacts: [
      { label: "Cyanotis Vaga Extract (90% Pure Beta-Ecdysterone)", amount: "1500 mg", dailyValue: "†" },
      { label: "Yam Root Extract (20% Diosgenin)", amount: "750 mg", dailyValue: "†" },
      { label: "Gamma-Oryzanol", amount: "750 mg", dailyValue: "†" },
      { label: "Folic Acid", amount: "600 mcg", dailyValue: "300%" }
    ],
    howToUse: "Take 3 capsules daily with a high-protein meal.",
    isBestseller: false,
    isFeatured: true,
    isPeptide: true,
    tags: ["Ecdysterone", "Peptides", "Natural Steroids"],
    reviews: [
      { id: "rev-13", author: "Abhishek T.", rating: 5, date: "2026-08-06", title: "Pure quality from Germany", comment: "Gained 2.5 kg lean muscle over 6 weeks with zero water retention.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-build-xt",
    slug: "jacked-factory-build-xt-natural-muscle-builder",
    title: "Jacked Factory Build XT Natural Muscle Builder",
    brand: "Jacked Factory",
    category: "Natural Steroids & Peptides",
    categorySlug: "igf",
    originalPrice: 3999,
    salePrice: 2999,
    discountPercentage: 25,
    rating: 4.7,
    reviewsCount: 52,
    inStock: true,
    badge: "-25% USA",
    image: "/images/products/build-xt.png",
    hoverImage: "/images/products/build-xt-back.png",
    galleryImages: [
      "/images/products/build-xt.png",
      "/images/products/build-xt-back.png",
    ],
    sizes: ["60 Veggie Capsules"],
    shortDescription: "Build XT is a clinically-dosed, daily muscle building supplement formulated for serious athletes.",
    description: "Build XT is a cutting-edge daily muscle builder formulated with PeakO2®, ElevATP®, and AstraGin®. Scientifically proven to increase power output, VO2 max, and muscular endurance in trained athletes.",
    benefits: [
      "Increases ATP energy output and training volume.",
      "Enhances oxygen uptake and workout endurance.",
      "Non-hormonal, safe for men and women.",
      "Manufactured in a cGMP certified facility in the USA."
    ],
    supplementFacts: [
      { label: "PeakO2® Mushroom Matrix", amount: "1000 mg", dailyValue: "†" },
      { label: "ElevATP® Ancient Peat & Apple Extract", amount: "150 mg", dailyValue: "†" },
      { label: "AstraGin®", amount: "25 mg", dailyValue: "†" }
    ],
    howToUse: "Take 2 capsules with water 45 minutes prior to workout.",
    isBestseller: false,
    isFeatured: false,
    tags: ["Build XT", "Muscle Builder", "PeakO2"],
    reviews: [
      { id: "rev-14", author: "Prateek J.", rating: 5, date: "2026-08-02", title: "Endurance is unreal", comment: "Can do 5 sets of squats without getting gassed out.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-magnum-primer",
    slug: "magnum-primer-complete-performance-pack",
    title: "Magnum Primer Complete Performance Pack",
    brand: "Magnum Nutraceuticals",
    category: "Multi Vitamins & Omega",
    categorySlug: "multi-vitamins-omega",
    originalPrice: 6999,
    salePrice: 5499,
    discountPercentage: 21,
    rating: 4.9,
    reviewsCount: 89,
    inStock: true,
    badge: "-21% CANADA",
    image: "/images/products/magnum-primer.png",
    hoverImage: "/images/products/magnum-primer-back.png",
    galleryImages: [
      "/images/products/magnum-primer.png",
      "/images/products/magnum-primer-back.png",
    ],
    sizes: ["30 Daily Performance Packs (75 Nutrients)"],
    shortDescription: "Complete All-in-One Performance Multivitamin Pack: Packed with 75 essential nutrients for athletes.",
    description: "Complete All-in-One Performance Multivitamin Pack. Packed with 75 pharmaceutical-grade nutrients across 8 encapsulated pills: Anabolic cell repair, Brain power, Muscle power, Immune defense, Omega fats, and Joint protection.",
    benefits: [
      "75 Active micro-nutrients formulated for hardcore athletes.",
      "Includes brain focus, muscle pump, and digestive enzyme capsules.",
      "100% pharmaceutical grade encapsulation.",
      "Zero compressed tablets that pass through undigested."
    ],
    supplementFacts: [
      { label: "Anabolic Muscle Cell Activators", amount: "800 mg", dailyValue: "†" },
      { label: "Cognitive Focus & Neuro Support", amount: "550 mg", dailyValue: "†" },
      { label: "Joint & Tissue Repair Complex", amount: "1000 mg", dailyValue: "†" },
      { label: "Triple Omega-3 Fatty Acids", amount: "1200 mg", dailyValue: "†" }
    ],
    howToUse: "Take 1 pack daily with breakfast.",
    isBestseller: false,
    isFeatured: true,
    tags: ["Multivitamin", "Packs", "Athletic Health"],
    reviews: [
      { id: "rev-15", author: "Chetan G.", rating: 5, date: "2026-08-17", title: "The gold standard multivitamin", comment: "Nothing compares to Magnum Primer. Feel energetic all 24 hours.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-biotech-iso-whey",
    slug: "biotechusa-iso-whey-zero-90-servings",
    title: "BiotechUSA Iso Whey Zero (90 Servings)",
    brand: "BiotechUSA",
    category: "Proteins",
    categorySlug: "proteins",
    originalPrice: 14999,
    salePrice: 10499,
    discountPercentage: 30,
    rating: 4.9,
    reviewsCount: 140,
    inStock: true,
    badge: "-30% FC BARCELONA PARTNER",
    image: "/images/products/biotech-iso.png",
    hoverImage: "/images/products/biotech-iso-back.png",
    galleryImages: [
      "/images/products/biotech-iso.png",
      "/images/products/biotech-iso-back.png",
    ],
    flavors: ["Cookies & Cream", "Chocolate Hazelnut", "Vanilla Salted Caramel"],
    sizes: ["2.27kg (90 Servings)"],
    variants: [
      { flavor: "Cookies & Cream", size: "2.27kg (90 Servings)", price: 10499, originalPrice: 14999, inStock: true, sku: "BIO-ISO-CK-90" },
      { flavor: "Chocolate Hazelnut", size: "2.27kg (90 Servings)", price: 10499, originalPrice: 14999, inStock: true, sku: "BIO-ISO-CH-90" },
    ],
    shortDescription: "BioTech USA is Official Supplement Partner of FC Barcelona! Pure Native Whey Isolate with zero sugar and zero lactose.",
    description: "BioTech USA is Official Supplement Partner of FC Barcelona! Elevate your gains with the purest, cleanest Native Whey Isolate produced directly from fresh milk after pasteurization with micro- and ultra-filtration at low temperatures. Sugar-free, lactose-free, gluten-free.",
    benefits: [
      "Native Whey Isolate with 88g protein per 100g.",
      "Sugar-Free, Gluten-Free, Lactose-Free, Palm Oil-Free.",
      "Fortified with added L-Glutamine and BCAAs.",
      "Official supplement partner of top international athletes."
    ],
    supplementFacts: [
      { label: "Protein", amount: "22.0 g per 25g scoop", dailyValue: "44%" },
      { label: "Sugar", amount: "0.0 g", dailyValue: "0%" },
      { label: "Fat", amount: "0.3 g", dailyValue: "0%" },
      { label: "BCAAs", amount: "4.9 g", dailyValue: "†" }
    ],
    howToUse: "Mix 1 scoop (25g) with 200ml cold water in a shaker. Drink immediately post workout.",
    isBestseller: true,
    isFeatured: true,
    tags: ["Isolate", "Zero Sugar", "FC Barcelona", "BiotechUSA"],
    reviews: [
      { id: "rev-16", author: "Arjun N.", rating: 5, date: "2026-08-12", title: "Top tier isolate", comment: "Light on stomach, zero sweetness aftertaste, high protein content. Absolute favorite.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-bpi-iso-hd",
    slug: "bpi-iso-hd-isolate-whey-protein-new-lot-69-servings",
    title: "BPI ISO HD Isolate Whey Protein (New Lot 69 Servings)",
    brand: "BPI Sports USA",
    category: "Proteins",
    categorySlug: "proteins",
    originalPrice: 15999,
    salePrice: 7799,
    discountPercentage: 51,
    rating: 4.8,
    reviewsCount: 165,
    inStock: true,
    badge: "-51% BIG SAVINGS",
    image: "/images/products/bpi-iso.png",
    hoverImage: "/images/products/bpi-iso-back.png",
    galleryImages: [
      "/images/products/bpi-iso.png",
      "/images/products/bpi-iso-back.png",
    ],
    flavors: ["Cookies & Cream", "Chocolate Brownie", "Vanilla Frosting"],
    sizes: ["2.2kg (69 Servings)"],
    variants: [
      { flavor: "Cookies & Cream", size: "2.2kg (69 Servings)", price: 7799, originalPrice: 15999, inStock: true, sku: "BPI-ISO-CK-69" },
      { flavor: "Chocolate Brownie", size: "2.2kg (69 Servings)", price: 7799, originalPrice: 15999, inStock: true, sku: "BPI-ISO-BR-69" },
    ],
    shortDescription: "BPI Sports ISO HD – 100% Pure Whey Protein Isolate & Hydrolysate for maximum lean muscle growth and recovery.",
    description: "BPI Sports ISO HD is pure, clean muscle-building fuel. Each scoop delivers 25g of 100% whey protein isolate and hydrolysate with rapid digestion for optimal muscle protein synthesis, muscle growth, and expedited recovery.",
    benefits: [
      "25g 100% Whey Protein Isolate & Hydrolysate.",
      "Third-Party ChromaDex Verified for zero protein spiking.",
      "Rapid absorption for immediate post-workout glycogen replenishment.",
      "Ultra-low carbohydrate and fat content."
    ],
    supplementFacts: [
      { label: "Protein", amount: "25.0 g", dailyValue: "50%" },
      { label: "Total Calories", amount: "120 kcal", dailyValue: "6%" },
      { label: "Total Carbohydrates", amount: "2.0 g", dailyValue: "1%" },
      { label: "BCAAs", amount: "5.0 g", dailyValue: "†" }
    ],
    howToUse: "Mix 1 scoop with 200-250ml water or milk directly after your workout.",
    isBestseller: true,
    isFeatured: true,
    tags: ["BPI Sports", "Isolate", "ChromaDex Verified"],
    reviews: [
      { id: "rev-17", author: "Gaurav K.", rating: 5, date: "2026-08-15", title: "ChromaDex certified genuine", comment: "Great taste, incredible deal at 51% off. Authenticated with scratch code on box.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-tongkat-shilajit",
    slug: "jacked-factory-tongkat-ali-shilajit",
    title: "Jacked Factory Tongkat Ali + Shilajit",
    brand: "Jacked Factory",
    category: "Testosterone & Performance Booster",
    categorySlug: "performance-nutrition",
    originalPrice: 3499,
    salePrice: 2499,
    discountPercentage: 29,
    rating: 4.8,
    reviewsCount: 77,
    inStock: true,
    badge: "TEST & VIGOR",
    image: "/images/products/tongkat-shilajit.png",
    hoverImage: "/images/products/tongkat-shilajit-back.png",
    galleryImages: [
      "/images/products/tongkat-shilajit.png",
      "/images/products/tongkat-shilajit-back.png",
    ],
    sizes: ["60 Capsules (30 Servings)"],
    shortDescription: "This men's wellness formula combines Tongkat Ali, Fadogia Agrestis, and PrimaVie® Shilajit.",
    description: "This men's wellness formula combines LJ100® standardized Tongkat Ali, Fadogia Agrestis, and PrimaVie® Himalayan Purified Shilajit to support natural testosterone production, male vitality, stamina, and cellular mitochondria energy.",
    benefits: [
      "PrimaVie® Himalayan Shilajit with >50% Fulvic Acid.",
      "Supports free testosterone and muscle hardness.",
      "Enhances male drive and workout stamina.",
      "Standardized herbal extracts for consistent bio-potency."
    ],
    supplementFacts: [
      { label: "PrimaVie® Himalayan Shilajit", amount: "500 mg", dailyValue: "†" },
      { label: "Tongkat Ali Extract (100:1)", amount: "400 mg", dailyValue: "†" },
      { label: "Fadogia Agrestis Extract", amount: "600 mg", dailyValue: "†" },
      { label: "BioPerine® Black Pepper Extract", amount: "5 mg", dailyValue: "†" }
    ],
    howToUse: "Take 2 capsules daily with breakfast or lunch.",
    isBestseller: false,
    isFeatured: true,
    tags: ["Tongkat Ali", "Shilajit", "Testosterone", "PrimaVie"],
    reviews: [
      { id: "rev-18", author: "Rajiv M.", rating: 5, date: "2026-08-10", title: "Real Himalayan Shilajit", comment: "Huge difference in stamina and gym drive after 2 weeks of consistent usage.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-lean-xt",
    slug: "jacked-factory-lean-xt-max-advanced-stim-free-fat-burner",
    title: "Jacked Factory Lean XT Max Advanced Stim Free Fat Burner",
    brand: "Jacked Factory",
    category: "Organ Health",
    categorySlug: "organ-health",
    originalPrice: 4499,
    salePrice: 3999,
    discountPercentage: 11,
    rating: 4.7,
    reviewsCount: 61,
    inStock: true,
    badge: "-11% STIM-FREE",
    image: "/images/products/lean-xt.png",
    hoverImage: "/images/products/lean-xt-back.png",
    galleryImages: [
      "/images/products/lean-xt.png",
      "/images/products/lean-xt-back.png",
    ],
    sizes: ["60 Veggie Capsules (30 Servings)"],
    shortDescription: "Lean XT Max is the ultimate stimulant-free fat burner from Jacked Factory's Max Series.",
    description: "Lean XT Max is the ultimate stimulant-free fat burner from Jacked Factory's Max Series. Formulated with InnoSlim®, CapsiMax®, Acetyl-L-Carnitine, and Green Tea EGCG to torch body fat, accelerate resting metabolic rate, and preserve hard-earned muscle without jitters or sleep disruption.",
    benefits: [
      "100% Stimulant-Free fat oxidation formula.",
      "Take day or night without affecting sleep.",
      "Contains InnoSlim® for glucose partitioning and fatty acid release.",
      "Curbs appetite and controls mid-day cravings."
    ],
    supplementFacts: [
      { label: "Acetyl-L-Carnitine HCl", amount: "750 mg", dailyValue: "†" },
      { label: "Green Tea Leaf Extract (98% Polyphenols, 50% EGCG)", amount: "500 mg", dailyValue: "†" },
      { label: "Capsimax® Cayenne Pepper Extract", amount: "100 mg", dailyValue: "†" },
      { label: "InnoSlim® Astragalus & Panax Notoginseng", amount: "250 mg", dailyValue: "†" }
    ],
    howToUse: "Take 2 capsules once or twice daily with meals.",
    isBestseller: false,
    isFeatured: false,
    tags: ["Fat Burner", "Stim Free", "Cutting", "Jacked Factory"],
    reviews: [
      { id: "rev-19", author: "Simran K.", rating: 5, date: "2026-08-05", title: "Zero jitters, great results", comment: "Dropping body fat while sleeping peacefully at night. Exactly what I needed.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-multi-complete",
    slug: "belive-multivitamin-100-rda-complete",
    title: "Alpha Gains Multivitamin 100% RDA Complete",
    brand: "Alpha Gains",
    category: "Multi Vitamins & Omega",
    categorySlug: "multi-vitamins-omega",
    originalPrice: 1299,
    salePrice: 849,
    discountPercentage: 35,
    rating: 4.9,
    reviewsCount: 115,
    inStock: true,
    badge: "-35% DAILY HEALTH",
    image: "/images/products/multivitamin-main.png",
    hoverImage: "/images/products/multivitamin-back.png",
    galleryImages: [
      "/images/products/multivitamin-main.png",
      "/images/products/multivitamin-back.png",
    ],
    sizes: ["60 Tablets (60 Servings)"],
    batchCode: "AG-WHEY-2026",
    shortDescription: "Complete high potency daily multivitamin meeting 100% of Indian ICMR RDA standards.",
    description: "Alpha Gains Multivitamin 100% RDA Complete delivers 32 bio-active vitamins, chelated minerals, botanical antioxidants, and digestive enzymes designed to bridge nutritional gaps, support immunity, and optimize metabolic pathways.",
    benefits: [
      "100% ICMR RDA across all essential vitamins and minerals.",
      "Includes Ginseng, Grape Seed, and Ashwagandha extracts.",
      "Chelated minerals for high cellular absorption.",
      "Immunity, joint, and heart health support."
    ],
    supplementFacts: [
      { label: "Vitamin C", amount: "80 mg", dailyValue: "100%" },
      { label: "Vitamin D3 (Cholecalciferol)", amount: "1000 IU", dailyValue: "125%" },
      { label: "Vitamin B12 (Methylcobalamin)", amount: "2.2 mcg", dailyValue: "100%" },
      { label: "Zinc Bisglycinate", amount: "12 mg", dailyValue: "100%" },
      { label: "Korean Panax Ginseng Extract", amount: "100 mg", dailyValue: "†" }
    ],
    howToUse: "Take 1 tablet daily with breakfast.",
    isBestseller: true,
    isFeatured: false,
    tags: ["Multivitamin", "Immunity", "Daily Health"],
    reviews: [
      { id: "rev-20", author: "Pradeep S.", rating: 5, date: "2026-08-15", title: "No yellow urine smell", comment: "High quality chelated vitamins. Energy levels throughout the day remain consistent.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-omega3",
    slug: "belive-omega-3-3x-strength",
    title: "Alpha Gains Omega 3 3x Strength Triple Action",
    brand: "Alpha Gains",
    category: "Multi Vitamins & Omega",
    categorySlug: "multi-vitamins-omega",
    originalPrice: 1399,
    salePrice: 899,
    discountPercentage: 36,
    rating: 4.8,
    reviewsCount: 102,
    inStock: true,
    badge: "-36% TRIPLE STRENGTH",
    image: "/images/products/omega-main.png",
    hoverImage: "/images/products/omega-back.png",
    galleryImages: [
      "/images/products/omega-main.png",
      "/images/products/omega-back.png",
    ],
    sizes: ["60 Enteric-Coated Softgels"],
    batchCode: "AG-WHEY-2026",
    shortDescription: "Ultra-pure molecularly distilled fish oil delivering 1000mg EPA + DHA per serving with zero fishy burps.",
    description: "Alpha Gains Omega 3 3x Strength is molecularly distilled from wild deep-sea Peruvian anchovies. Standardized to deliver 550mg EPA and 450mg DHA per softgel, protected with an enteric coating that ensures zero fishy aftertaste or acid reflux.",
    benefits: [
      "1000mg High EPA (550mg) + DHA (450mg) per softgel.",
      "Enteric-Coated for zero fishy burps or gastric distress.",
      "Molecularly distilled, mercury and heavy metal free.",
      "Supports joint lubrication, cardiovascular health, and brain focus."
    ],
    supplementFacts: [
      { label: "Fish Oil Concentrate (Peruvian Anchovy)", amount: "1250 mg", dailyValue: "†" },
      { label: "EPA (Eicosapentaenoic Acid)", amount: "550 mg", dailyValue: "†" },
      { label: "DHA (Docosahexaenoic Acid)", amount: "450 mg", dailyValue: "†" },
      { label: "Vitamin E (d-alpha tocopherol)", amount: "10 IU", dailyValue: "33%" }
    ],
    howToUse: "Take 1 softgel twice daily with meals.",
    isBestseller: true,
    isFeatured: false,
    tags: ["Omega 3", "Fish Oil", "EPA DHA", "Joints"],
    reviews: [
      { id: "rev-21", author: "Kunal B.", rating: 5, date: "2026-08-16", title: "Zero fish burps", comment: "The enteric coating really works! No fishy burps at all and joint stiffness in elbows disappeared.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-marine-collagen",
    slug: "hydrolyzed-marine-collagen-peptides",
    title: "Alpha Gains Hydrolyzed Marine Collagen Peptides + Biotin",
    brand: "Alpha Gains",
    category: "Collagen for Skin , Hair & Joint support",
    categorySlug: "skin-nail-hair-joint-support",
    originalPrice: 2799,
    salePrice: 1899,
    discountPercentage: 32,
    rating: 4.9,
    reviewsCount: 74,
    inStock: true,
    badge: "-32% PEPTIDES",
    image: "/images/products/collagen-main.png",
    hoverImage: "/images/products/collagen-back.png",
    galleryImages: [
      "/images/products/collagen-main.png",
      "/images/products/collagen-back.png",
    ],
    flavors: ["Mixed Berry Punch", "Unflavored"],
    sizes: ["250g (30 Servings)"],
    shortDescription: "Type 1 & 3 Marine Collagen Peptides with Hyaluronic Acid, Vitamin C and Biotin.",
    description: "Alpha Gains Hydrolyzed Marine Collagen Peptides utilizes low-molecular-weight 2000 Dalton Type 1 & 3 collagen peptides sourced from deep sea fish. Fortified with Hyaluronic Acid, Glutathione, Vitamin C, and 10,000mcg Biotin for joint cartilage renewal and skin elasticity.",
    benefits: [
      "Low Molecular Weight 2000 Dalton peptides for 95% absorption.",
      "Reduces joint pain and increases cartilage synovial fluid.",
      "10,000mcg Biotin for thicker hair and stronger nails.",
      "Hyaluronic Acid for skin hydration and wrinkle reduction."
    ],
    supplementFacts: [
      { label: "Hydrolyzed Marine Collagen Type 1 & 3", amount: "8000 mg", dailyValue: "†" },
      { label: "Hyaluronic Acid", amount: "100 mg", dailyValue: "†" },
      { label: "Vitamin C (Ascorbic Acid)", amount: "60 mg", dailyValue: "100%" },
      { label: "Biotin (Vitamin B7)", amount: "10000 mcg", dailyValue: "3333%" }
    ],
    howToUse: "Mix 1 scoop (10g) in 200ml room temperature or warm water/juice once daily.",
    isBestseller: false,
    isFeatured: true,
    tags: ["Collagen", "Joints", "Skin", "Hair"],
    reviews: [
      { id: "rev-22", author: "Pooja N.", rating: 5, date: "2026-08-18", title: "Hair fall stopped in 3 weeks", comment: "My skin is glowing and knee pain during squats is gone. Highly recommend!", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-mass-gainer",
    slug: "alpha-gains-anabolic-mass-gainer-3kg",
    title: "Alpha Gains Anabolic Mass Gainer (High Protein 3kg)",
    brand: "Alpha Gains",
    category: "Gainer",
    categorySlug: "gainer",
    originalPrice: 4999,
    salePrice: 3499,
    discountPercentage: 30,
    rating: 4.8,
    reviewsCount: 95,
    inStock: true,
    badge: "-30% ANABOLIC BULK",
    image: "/images/products/gainer-main.png",
    hoverImage: "/images/products/gainer-back.png",
    galleryImages: [
      "/images/products/gainer-main.png",
      "/images/products/gainer-back.png",
    ],
    flavors: ["Chocolate Fudge", "Banana Cream", "Vanilla Cream"],
    sizes: ["3kg Tub (20 Jumbo Servings)"],
    shortDescription: "1250 Calories, 52g Multi-Stage Protein & 250g Complex Clean Carbohydrates per serving.",
    description: "Engineered for hardgainers and athletes who struggle to gain size. Packed with 1250 dense calories, 52g cross-flow protein matrix, 250g oats & maltodextrin complex carbs, 5g creatine monohydrate, and DigeZyme® digestive enzyme blend.",
    benefits: [
      "1250 Calories & 52g Protein per double scoop serving.",
      "Fortified with 5g Micronized Creatine & 3g Glutamine.",
      "DigeZyme® multi-enzyme complex for clean digestion without bloating.",
      "Complex carbohydrate blend from finely ground oats and sweet potato."
    ],
    supplementFacts: [
      { label: "Calories", amount: "1250 kcal", dailyValue: "62%" },
      { label: "Protein", amount: "52.0 g", dailyValue: "104%" },
      { label: "Carbohydrates", amount: "250.0 g", dailyValue: "92%" },
      { label: "Creatine Monohydrate", amount: "5000 mg", dailyValue: "†" },
      { label: "DigeZyme® Enzyme Blend", amount: "100 mg", dailyValue: "†" }
    ],
    howToUse: "Mix 2 scoops with 500ml whole milk or water between meals and after workouts.",
    isBestseller: true,
    isFeatured: true,
    tags: ["Mass Gainer", "Bulking", "Weight Gain", "Calories"],
    reviews: [
      { id: "rev-23", author: "Siddharth J.", rating: 5, date: "2026-08-14", title: "Gained 4kg in 1 month", comment: "Finally put on weight without gaining belly fat. Tastes like rich chocolate milkshake.", verifiedPurchase: true }
    ]
  },
  {
    id: "prod-ultra-eaa",
    slug: "alpha-gains-ultra-eaa-9-essential-amino-acids",
    title: "Alpha Gains Ultra EAA 9 Essential Amino Acids + Electrolytes",
    brand: "Alpha Gains",
    category: "BCAA & EAA",
    categorySlug: "bcaa-eaa",
    originalPrice: 2499,
    salePrice: 1699,
    discountPercentage: 32,
    rating: 4.8,
    reviewsCount: 68,
    inStock: true,
    badge: "-32% INTRA-WORKOUT",
    image: "/images/products/eaa-main.png",
    hoverImage: "/images/products/eaa-back.png",
    galleryImages: [
      "/images/products/eaa-main.png",
      "/images/products/eaa-back.png",
    ],
    flavors: ["Watermelon Lime", "Green Apple", "Mango Madness"],
    sizes: ["390g (30 Servings)"],
    shortDescription: "Full spectrum 8g Essential Amino Acids + Himalayan Pink Salt & Coconut Water Electrolytes.",
    description: "Alpha Gains Ultra EAA delivers all 9 Essential Amino Acids that human bodies cannot synthesize naturally. Formulated with 8g EAAs (including 6g fermented Vegan BCAAs in 2:1:1 ratio), Aquamin® ocean minerals, and raw coconut water powder for uninterrupted workout endurance.",
    benefits: [
      "8g Full Spectrum Essential Amino Acids per serving.",
      "Prevents muscle catabolism during long high-volume training.",
      "Himalayan Pink Salt + Coconut Water for electrolyte replenishment.",
      "Zero Sugar, zero artificial coloring."
    ],
    supplementFacts: [
      { label: "Full Spectrum EAA Complex", amount: "8000 mg", dailyValue: "†" },
      { label: "L-Leucine (Fermented Vegan)", amount: "3000 mg", dailyValue: "†" },
      { label: "L-Isoleucine", amount: "1500 mg", dailyValue: "†" },
      { label: "L-Valine", amount: "1500 mg", dailyValue: "†" },
      { label: "Raw Coconut Water Powder", amount: "500 mg", dailyValue: "†" }
    ],
    howToUse: "Sip 1 scoop mixed in 500-700ml cold water throughout your workout session.",
    isBestseller: false,
    isFeatured: true,
    tags: ["EAA", "BCAA", "Intra Workout", "Hydration"],
    reviews: [
      { id: "rev-24", author: "Mayank K.", rating: 5, date: "2026-08-09", title: "Super refreshing intra workout", comment: "Watermelon flavor is crisp and keeps me hydrated throughout 2-hour heavy sessions.", verifiedPurchase: true }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (!categorySlug || categorySlug === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getBestsellerProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isBestseller);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
