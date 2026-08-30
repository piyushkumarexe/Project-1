"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Star, ShieldCheck, Check, ShoppingBag, Zap, Truck, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductVisual from "@/components/ui/ProductVisual";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  if (!quickViewProduct) return null;

  const prod = quickViewProduct;
  const currentFlavor = selectedFlavor || (prod.flavors && prod.flavors[0]) || "";
  const currentSize = selectedSize || (prod.sizes && prod.sizes[0]) || "";

  const handleAddToCart = () => {
    addToCart(prod, {
      flavor: currentFlavor,
      size: currentSize,
      quantity: quantity,
    });
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(prod, {
      flavor: currentFlavor,
      size: currentSize,
      quantity: quantity,
    });
    setQuickViewProduct(null);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#0d1017] border border-[#242b3d] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-[#1f2430] text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Left */}
          <div className="bg-[#121622] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#1f2430]">
            <div className="w-full max-w-[240px] aspect-square rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
              <ProductVisual
                title={prod.title}
                category={prod.category}
                brand={prod.brand}
                isPeptide={prod.isPeptide}
                className="w-full h-full"
              />
            </div>
            {prod.badge && (
              <span className="mt-3 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                {prod.badge}
              </span>
            )}
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Lab Verified Authentic Batch</span>
            </div>
          </div>

          {/* Details Right */}
          <div className="p-6 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div className="space-y-3">
              <div className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                {prod.brand} • {prod.category}
              </div>
              <h2 className="text-lg font-black text-white leading-tight">
                {prod.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(prod.rating) ? "fill-amber-400 text-amber-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-white">{prod.rating}</span>
                <span className="text-gray-400">({prod.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-black text-amber-400">
                  ₹{prod.salePrice.toLocaleString("en-IN")}
                </span>
                {prod.originalPrice > prod.salePrice && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{prod.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      SAVE {prod.discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-gray-400">Inclusive of all taxes. Free shipping over ₹9,999.</p>

              {/* Flavor Selector */}
              {prod.flavors && prod.flavors.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-bold text-gray-300 mb-1.5">
                    Flavor: <span className="text-amber-400">{currentFlavor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prod.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                          currentFlavor === flavor
                            ? "bg-amber-500 text-black border-amber-500 font-bold"
                            : "bg-[#141822] text-gray-300 border-[#232a3b] hover:border-gray-500"
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {prod.sizes && prod.sizes.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-bold text-gray-300 mb-1.5">
                    Size: <span className="text-amber-400">{currentSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prod.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                          currentSize === size
                            ? "bg-amber-500 text-black border-amber-500 font-bold"
                            : "bg-[#141822] text-gray-300 border-[#232a3b] hover:border-gray-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300">Quantity:</span>
                <div className="flex items-center border border-[#232a3b] rounded-lg bg-[#141822]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-gray-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-2.5 py-1 text-gray-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-5 space-y-2.5 border-t border-[#1f2430] mt-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/10"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy It Now</span>
                </button>
              </div>

              <Link
                href={`/products/${prod.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="w-full text-center block text-xs font-bold text-gray-400 hover:text-amber-400 transition-colors pt-1"
              >
                View Full Product Specifications &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
