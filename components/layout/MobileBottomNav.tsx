"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function MobileBottomNav() {
  const { cart, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const itemClass = (active: boolean) =>
    `flex-1 flex items-center justify-center h-full relative transition-colors ${
      active ? "text-red-600" : "text-neutral-900"
    }`;

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-[58px] bg-white border-t border-neutral-200 flex items-stretch">
      <Link href="/" className={itemClass(pathname === "/")} aria-label="Home">
        <Home className="w-6 h-6" strokeWidth={1.6} />
      </Link>

      <span className="w-px my-2 bg-neutral-200" />

      <Link
        href="/collections/all"
        className={itemClass(pathname.startsWith("/collections"))}
        aria-label="Collections"
      >
        <LayoutGrid className="w-6 h-6" strokeWidth={1.6} />
      </Link>

      <span className="w-px my-2 bg-neutral-200" />

      <button type="button" onClick={() => setIsCartOpen(true)} className={itemClass(false)} aria-label="Cart">
        <ShoppingBag className="w-6 h-6" strokeWidth={1.6} />
        <span className="absolute top-2 ml-9 bg-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
          {totalCartItems}
        </span>
      </button>

      <span className="w-px my-2 bg-neutral-200" />

      <button
        type="button"
        onClick={() => router.push("/search")}
        className={itemClass(pathname === "/search")}
        aria-label="Search"
      >
        <Search className="w-6 h-6" strokeWidth={1.6} />
      </button>
    </nav>
  );
}
