"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  getProductBySlug,
  PRODUCTS,
  Product,
} from "@/data/products";
import { COMBOS } from "@/data/combos";
import { useCart } from "@/context/CartContext";
import ProductVisual from "@/components/ui/ProductVisual";
import ProductCard from "@/components/product/ProductCard";
import {
  Star,
  ShoppingBag,
  Zap,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Award,
  Sparkles,
  Plus,
  Minus,
  MessageSquare,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Check product or combo
  let product = getProductBySlug(slug);

  // If it's a combo slug, map it
  if (!product) {
    const combo = COMBOS.find((c) => c.slug === slug);
    if (combo) {
      product = {
        id: combo.id,
        slug: combo.slug,
        title: combo.title,
        brand: "Alpha Gains",
        category: combo.category,
        categorySlug: "combos",
        originalPrice: combo.originalPrice,
        salePrice: combo.salePrice,
        discountPercentage: combo.discountPercentage,
        rating: combo.rating,
        reviewsCount: combo.reviewsCount,
        inStock: combo.inStock,
        badge: combo.badge,
        image: combo.image,
        galleryImages: [combo.image],
        shortDescription: combo.description,
        description: combo.description,
        benefits: combo.includedItems,
        supplementFacts: [],
        howToUse: "Take recommended individual dosages before, during, and after workouts as outlined on supplement packaging.",
        tags: ["Combo", "Stack", combo.goal],
        reviews: [],
      };
    }
  }

  if (!product) {
    notFound();
  }

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const router = useRouter();

  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    (product.flavors && product.flavors[0]) || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    (product.sizes && product.sizes[0]) || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "facts" | "usage" | "lab">("desc");

  // Review Form States
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");

  // Frequently Bought Together bundle items (Multivitamin + Omega3)
  const bundleMulti = PRODUCTS.find((p) => p.id === "prod-multi-complete");
  const bundleOmega = PRODUCTS.find((p) => p.id === "prod-omega3");
  const [includeMulti, setIncludeMulti] = useState(true);
  const [includeOmega, setIncludeOmega] = useState(true);

  const isWishlisted = isInWishlist(product.id);

  // Bundle calculations
  const bundleItems = [
    { product: product, included: true, disabled: true },
    ...(bundleMulti && bundleMulti.id !== product.id ? [{ product: bundleMulti, included: includeMulti, setIncluded: setIncludeMulti }] : []),
    ...(bundleOmega && bundleOmega.id !== product.id ? [{ product: bundleOmega, included: includeOmega, setIncluded: setIncludeOmega }] : []),
  ];

  const bundleTotal = bundleItems.reduce(
    (sum, item) => (item.included ? sum + item.product.salePrice : sum),
    0
  );
  const bundleOriginalTotal = bundleItems.reduce(
    (sum, item) => (item.included ? sum + item.product.originalPrice : sum),
    0
  );

  const handleAddBundleToCart = () => {
    bundleItems.forEach((item) => {
      if (item.included) {
        addToCart(item.product);
      }
    });
  };

  const handleAddToCart = () => {
    addToCart(product, {
      flavor: selectedFlavor,
      size: selectedSize,
      quantity,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, {
      flavor: selectedFlavor,
      size: selectedSize,
      quantity,
    });
    router.push("/checkout");
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");
    setReviewSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          rating: reviewRating,
          author: reviewName,
          email: reviewEmail,
          title: reviewTitle,
          comment: reviewComment,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReviewSuccess(true);
        setTimeout(() => {
          setIsReviewModalOpen(false);
          setReviewSuccess(false);
        }, 2500);
      } else {
        setReviewError(data.error || "Submission failed");
      }
    } catch {
      setReviewError("An error occurred. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  // Recently Viewed / Related Products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  // Delivery dates (4 to 7 days from now)
  const deliveryStart = new Date(Date.now() + 4 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const deliveryEnd = new Date(Date.now() + 8 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className="bg-[#090b0e] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/collections/${product.categorySlug}`} className="hover:text-amber-400">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-400 font-bold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Media Gallery (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square bg-gradient-to-b from-[#141924] to-[#0c0f16] border border-[#20283a] rounded-3xl p-6 flex items-center justify-center overflow-hidden shadow-2xl">
              <ProductVisual
                title={product.title}
                category={product.category}
                brand={product.brand}
                isPeptide={product.isPeptide}
                className="w-full h-full"
              />

              {product.discountPercentage > 0 && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg bg-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-lg">
                  -{product.discountPercentage}% OFF
                </div>
              )}

              {product.badge && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-amber-500 text-black font-black text-xs uppercase tracking-wider shadow-md">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Micro badges below image */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-gray-300">
              <div className="p-2 rounded-xl bg-[#10141d] border border-[#1f2638] flex flex-col items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-0.5" />
                <span className="font-bold">100% Authentic</span>
              </div>
              <div className="p-2 rounded-xl bg-[#10141d] border border-[#1f2638] flex flex-col items-center justify-center">
                <FlaskConical className="w-4 h-4 text-amber-400 mb-0.5" />
                <span className="font-bold">Lab Certified</span>
              </div>
              <div className="p-2 rounded-xl bg-[#10141d] border border-[#1f2638] flex flex-col items-center justify-center">
                <Truck className="w-4 h-4 text-sky-400 mb-0.5" />
                <span className="font-bold">Express Air</span>
              </div>
            </div>
          </div>

          {/* Right Product Buy Box (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header / Brand / Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-500 uppercase tracking-widest">
                  {product.brand}
                </span>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full border transition-all ${
                    isWishlisted
                      ? "bg-rose-600 text-white border-rose-500"
                      : "bg-[#141822] text-gray-400 hover:text-rose-400 border-[#232a3b]"
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase">
                {product.title}
              </h1>

              {/* Rating & Social Proof */}
              <div className="flex items-center gap-3 pt-1 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-white text-sm">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} customer reviews)</span>
                <span className="text-gray-600">•</span>
                <span className="text-amber-400 font-semibold">Loved by 600+ athletes</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-2xl bg-[#10141d] border border-[#1f2638] space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-amber-400">
                  ₹{product.salePrice.toLocaleString("en-IN")}
                </span>
                {product.originalPrice > product.salePrice && (
                  <>
                    <span className="text-base text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-black text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
                      SAVE {product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <span>Inclusive of all taxes.</span>
                <span className="text-emerald-400 font-semibold">Free shipping on orders above ₹9,999</span>
              </div>
            </div>

            {/* Flavor Selector */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-300">
                  Flavor: <span className="text-amber-400">{selectedFlavor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      type="button"
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-bold uppercase tracking-wider transition-all ${
                        selectedFlavor === flavor
                          ? "bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20"
                          : "bg-[#141822] text-gray-300 border-[#232a3b] hover:border-gray-500"
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size / Serving Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-300">
                  Size: <span className="text-amber-400">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-bold uppercase tracking-wider transition-all ${
                        selectedSize === size
                          ? "bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20"
                          : "bg-[#141822] text-gray-300 border-[#232a3b] hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="text-xs font-bold text-gray-300 uppercase">Quantity:</div>
                <div className="flex items-center border border-[#232a3b] rounded-xl bg-[#141822]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3 py-2 text-gray-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy It Now</span>
                </button>
              </div>
            </div>

            {/* Delivery & Trust Estimates */}
            <div className="p-4 rounded-2xl bg-[#0e121a] border border-[#1f2638] space-y-3 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>Estimated Delivery:</strong> {deliveryStart} – {deliveryEnd} (Express Courier)
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Batch Authenticity:</strong> {product.batchCode ? `Batch #${product.batchCode} verified` : "Genuine Imported Lot"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <RotateCcw className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>
                  <strong>7 Days Easy Replacement:</strong> If broken seal or damaged on arrival.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FREQUENTLY BOUGHT TOGETHER SECTION */}
        <section className="bg-[#0e121a] border border-[#1f2638] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#1f2638] pb-4">
            <h3 className="text-lg font-black text-white uppercase tracking-wide">
              Frequently Bought Together
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Stack for maximum synergy and save on shipping
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visuals & Checkboxes (8 Cols) */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                {bundleItems.map((item, idx) => (
                  <React.Fragment key={item.product.id}>
                    {idx > 0 && <span className="text-xl font-black text-amber-400">+</span>}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#141822] border border-[#232b3d] max-w-[280px]">
                      <input
                        type="checkbox"
                        checked={item.included}
                        disabled={item.disabled}
                        onChange={(e) => item.setIncluded && item.setIncluded(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 bg-[#1e2434] border-[#2e394e] focus:ring-0 disabled:opacity-50"
                      />
                      <div className="w-12 h-12 rounded-lg bg-[#0c0f16] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <ProductVisual title={item.product.title} className="w-10 h-10 p-1" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{item.product.title}</div>
                        <div className="text-xs text-amber-400 font-bold">
                          ₹{item.product.salePrice.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bundle Price & Add CTA (4 Cols) */}
            <div className="md:col-span-4 p-5 rounded-2xl bg-[#141822] border border-[#242e42] space-y-3">
              <div className="text-xs text-gray-400 font-semibold uppercase">Bundle Total:</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400">
                  ₹{bundleTotal.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ₹{bundleOriginalTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Bundle to Bag</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tabbed Specifications: Description / Supplement Facts / How to Use / Lab Report */}
        <section className="bg-[#0e121a] border border-[#1f2638] rounded-3xl overflow-hidden shadow-xl">
          {/* Tabs Nav */}
          <div className="flex border-b border-[#1f2638] overflow-x-auto bg-[#0b0e14]">
            <button
              type="button"
              onClick={() => setActiveTab("desc")}
              className={`px-6 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "desc"
                  ? "border-amber-400 text-amber-400 bg-[#121622]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Description &amp; Benefits
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("facts")}
              className={`px-6 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "facts"
                  ? "border-amber-400 text-amber-400 bg-[#121622]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Supplement Facts &amp; Dosages
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("usage")}
              className={`px-6 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "usage"
                  ? "border-amber-400 text-amber-400 bg-[#121622]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Directions For Use
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("lab")}
              className={`px-6 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "lab"
                  ? "border-amber-400 text-amber-400 bg-[#121622]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Lab Test Certificate
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === "desc" && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h4 className="text-base font-black text-white uppercase mb-2">Product Overview</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{product.description}</p>
                </div>

                {product.benefits && product.benefits.length > 0 && (
                  <div>
                    <h4 className="text-base font-black text-white uppercase mb-3">Core Performance Benefits</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#141822] border border-[#1f2638]">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-200 leading-normal">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "facts" && (
              <div className="max-w-2xl space-y-4">
                <h4 className="text-base font-black text-white uppercase">Nutritional Profile</h4>
                {product.supplementFacts && product.supplementFacts.length > 0 ? (
                  <div className="border border-[#232b3d] rounded-2xl overflow-hidden divide-y divide-[#1f2638] text-xs">
                    <div className="p-3 bg-[#141824] font-black text-white flex justify-between uppercase">
                      <span>Active Ingredient / Nutrient</span>
                      <span>Amount Per Serving</span>
                    </div>
                    {product.supplementFacts.map((fact, i) => (
                      <div key={i} className="p-3 flex justify-between text-gray-300 hover:bg-[#131722]">
                        <span className="font-semibold text-white">{fact.label}</span>
                        <span className="text-amber-400 font-bold">{fact.amount}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">Nutritional values adhere strictly to international label standards.</p>
                )}
              </div>
            )}

            {activeTab === "usage" && (
              <div className="max-w-3xl space-y-4">
                <h4 className="text-base font-black text-white uppercase">How &amp; When To Consume</h4>
                <div className="p-4 rounded-2xl bg-[#141822] border border-[#232b3d] text-sm text-gray-300 leading-relaxed">
                  {product.howToUse}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Consult with your physician or fitness coach before beginning any intense supplementation cycle.</span>
                </div>
              </div>
            )}

            {activeTab === "lab" && (
              <div className="max-w-2xl space-y-4">
                <h4 className="text-base font-black text-white uppercase">Batch Quality &amp; HPLC Purity Certificate</h4>
                <div className="p-5 rounded-2xl bg-[#141824] border-2 border-emerald-500/30 space-y-3 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-[#232b3d]">
                    <span className="text-gray-300 font-bold">Batch Number:</span>
                    <span className="text-emerald-400 font-mono font-black">{product.batchCode || "AG-WHEY-2026"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Purity Status:</span>
                    <span className="text-emerald-400 font-bold">✓ 99.8% Certified (PASSED)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Heavy Metals Test (Lead, Arsenic, Cadmium):</span>
                    <span className="text-emerald-400 font-bold">✓ PASSED (Below LOD)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Banned Substances &amp; Steroid Screen:</span>
                    <span className="text-emerald-400 font-bold">✓ Clean &amp; WADA Compliant</span>
                  </div>
                </div>
                <Link
                  href="/pages/authenticity"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline"
                >
                  <span>Query Full Eurofins/SGS Certificate on Batch Verification Portal &rarr;</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="bg-[#0e121a] border border-[#1f2638] rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1f2638] gap-4">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Verified Athlete Reviews ({product.reviewsCount})
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-300 font-bold">{product.rating} out of 5</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-[#121622] border border-[#1f2638] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                          ✓ Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <h5 className="text-xs font-bold text-gray-100">{rev.title}</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 text-xs">
                Be the first verified athlete to review this supplement!
              </div>
            )}
          </div>
        </section>

        {/* Recently Viewed / Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="border-b border-[#1f2638] pb-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Recommended Synergistic Supplements
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0d1017] border border-[#262f44] rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-in zoom-in-95 duration-150">
            <h3 className="text-xl font-black text-white uppercase mb-2">Write a Product Review</h3>
            <p className="text-xs text-gray-400 mb-6">{product.title}</p>

            {!reviewSuccess ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating Pick */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1.5 uppercase">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setReviewRating(num)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            num <= reviewRating ? "fill-amber-400 text-amber-400" : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      placeholder="e.g. Aman S."
                      className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={reviewEmail}
                      onChange={(e) => setReviewEmail(e.target.value)}
                      required
                      placeholder="aman@example.com"
                      className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    required
                    placeholder="e.g. Incredible pumps and clean mixability!"
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Detailed Feedback</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    rows={3}
                    placeholder="Share your experience, flavors, workout results..."
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {reviewError && <p className="text-xs text-rose-400">{reviewError}</p>}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider disabled:opacity-50"
                  >
                    {reviewSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white uppercase">Thank you for your feedback!</h4>
                <p className="text-xs text-gray-300">Your review will be verified and published shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
