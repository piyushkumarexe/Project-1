"use client";

import React from "react";
import Link from "next/link";
import { Star, Eye, ShoppingBag, Heart, ShieldCheck, Zap } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductVisual from "@/components/ui/ProductVisual";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-[#10141d] border border-[#202738] hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between">
      {/* Top Media Area */}
      <div className="relative aspect-square bg-[#141924] overflow-hidden flex items-center justify-center">
        {/* Visual Component */}
        <Link href={`/products/${product.slug}`} className="w-full h-full block">
          <ProductVisual
            title={product.title}
            category={product.category}
            brand={product.brand}
            isPeptide={product.isPeptide}
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-[11px] uppercase tracking-wider shadow-md">
            -{product.discountPercentage}%
          </div>
        )}

        {/* Custom Pill Badge (e.g. Best Value, FC Barcelona, etc.) */}
        {product.badge && (
          <div className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-amber-500/30 text-amber-300 font-bold text-[10px] uppercase">
            {product.badge}
          </div>
        )}

        {/* Hover Action Buttons Layer */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity z-20">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isWishlisted
                ? "bg-rose-600 text-white border-rose-500"
                : "bg-black/60 hover:bg-[#181e2b] text-gray-300 hover:text-rose-400 border-[#2b354a]"
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-white" : ""}`} />
          </button>

          {/* Quick View Button */}
          <button
            type="button"
            onClick={handleQuickView}
            className="p-2 rounded-full bg-black/60 hover:bg-[#181e2b] text-gray-300 hover:text-amber-400 border border-[#2b354a] backdrop-blur-md transition-all"
            title="Quick view"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hover Quick Add Overlay Bar (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-20">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/30 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{product.flavors && product.flavors.length > 1 ? "Select Options" : "Quick Add"}</span>
          </button>
        </div>
      </div>

      {/* Content Bottom Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Category */}
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span className="text-amber-500">{product.brand}</span>
            <span className="text-gray-500">{product.category}</span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-bold text-sm text-gray-100 hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Short Excerpt */}
          <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Ratings & Price Block */}
        <div className="space-y-2 pt-2 border-t border-[#1a2130]">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-gray-300 text-[11px]">{product.rating}</span>
            <span className="text-gray-500 text-[10px]">({product.reviewsCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-black text-amber-400">
                  ₹{product.salePrice.toLocaleString("en-IN")}
                </span>
                {product.originalPrice > product.salePrice && (
                  <span className="text-xs text-gray-500 line-through font-semibold">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Add to Cart Button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className="sm:hidden p-2 rounded-lg bg-amber-500 text-black font-bold"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
