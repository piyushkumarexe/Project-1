"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Flame, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

/**
 * App-style bottom tab bar for phones — Suppx/Shopify stores lose navigation
 * below the fold; this keeps Shop, Combos, Saved and the Bag one tap away.
 */
export default function MobileTabBar() {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen } = useCart();

  const bagCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const tabs = [
    { label: "Home", href: "/", icon: Home, match: (p: string) => p === "/" },
    {
      label: "Shop",
      href: "/collections/all",
      icon: LayoutGrid,
      match: (p: string) => p.startsWith("/collections") || p.startsWith("/products") || p === "/search",
    },
    { label: "Combos", href: "/#shop-by-goal", icon: Flame, match: () => false },
    {
      label: "Saved",
      href: "/pages/wishlist",
      icon: Heart,
      match: (p: string) => p.startsWith("/pages/wishlist"),
    },
  ];

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-[#0b0e14]/95 backdrop-blur-lg border-t border-[#1f2430]"
    >
      <div className="grid grid-cols-5 items-stretch h-full">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-col items-center justify-center gap-0.5 text-[9px] font-bold uppercase tracking-wide transition-colors ${
                active ? "text-amber-400" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <span
                className={`absolute top-0 inset-x-3 h-[2px] rounded-b-full bg-amber-500 transition-opacity duration-200 ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {tab.label === "Saved" && wishlist.length > 0 && (
                <span className="absolute top-1.5 right-[20%] bg-rose-600 text-white text-[9px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          );
        })}

        {/* Bag — the gold call-to-action cell */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open cart"
          className="relative flex flex-col items-center justify-center gap-0.5 text-[9px] font-black uppercase tracking-wide bg-gradient-to-t from-amber-600 to-amber-500 text-black"
        >
          <span className="relative">
            <ShoppingBag className="w-5 h-5" />
            {bagCount > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-black text-amber-400 text-[9px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                {bagCount}
              </span>
            )}
          </span>
          <span>Bag</span>
        </button>
      </div>
    </nav>
  );
}
