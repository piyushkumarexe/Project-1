"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { Heart, ShoppingBag, ChevronRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#090b0e] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-400 font-bold">My Wishlist</span>
        </nav>

        {/* Header */}
        <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-6 sm:p-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> Saved Supplements
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              My Wishlist ({wishlistedProducts.length})
            </h1>
          </div>

          <Link
            href="/collections/all"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase"
          >
            Explore More
          </Link>
        </div>

        {/* Grid or Empty */}
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-[#0e121a] border border-[#1f2638] rounded-3xl p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Your wishlist is empty</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Click the heart icon on any supplement or combo stack to save it for your next cycle.
            </p>
            <Link
              href="/collections/all"
              className="inline-block px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all"
            >
              Start Exploring Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
