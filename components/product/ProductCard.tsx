"use client";

import React from "react";
import Link from "next/link";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductVisual from "@/components/ui/ProductVisual";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    stop(e);
    addToCart(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    stop(e);
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    stop(e);
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col">
      {/* Media */}
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square m-2 rounded-xl overflow-hidden studio-red">
            <ProductVisual
              title={product.title}
              category={product.category}
              brand={product.brand}
              isPeptide={product.isPeptide}
              className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Discount pill — top left, like the reference store */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-red-600 text-white font-semibold text-[12px] shadow">
            -{product.discountPercentage}%
          </div>
        )}

        {product.badge && (
          <div className="absolute top-4 right-4 z-10 px-2 py-1 rounded-full bg-black/80 text-white font-semibold text-[10px] uppercase tracking-wide">
            {product.badge}
          </div>
        )}

        {/* Floating circular actions */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-900 hover:bg-red-600 hover:text-white transition-colors"
            aria-label="Add to cart"
            title="Add to cart"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={handleWishlistClick}
            className={`w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-colors ${
              isWishlisted ? "bg-red-600 text-white" : "bg-white text-neutral-900 hover:bg-red-600 hover:text-white"
            }`}
            aria-label="Wishlist"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-[18px] h-[18px] ${isWishlisted ? "fill-white" : ""}`} strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={handleQuickView}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-900 hover:bg-red-600 hover:text-white transition-colors"
            aria-label="Quick view"
            title="Quick view"
          >
            <Eye className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-2 pb-4 flex-1 flex flex-col justify-between">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-[15px] text-neutral-900 hover:text-red-600 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-baseline gap-2 flex-wrap">
          <span className="text-[16px] font-semibold text-red-600">
            Rs. {product.salePrice.toLocaleString("en-IN")}.00
          </span>
          {product.originalPrice > product.salePrice && (
            <span className="text-[14px] text-neutral-400 line-through">
              Rs. {product.originalPrice.toLocaleString("en-IN")}.00
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
