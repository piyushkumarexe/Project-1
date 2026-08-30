"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Flame,
  CheckCircle2,
} from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { searchProducts } from "@/data/products";
import { CATEGORIES } from "@/data/categories";

export default function Header() {
  const { cart, wishlist, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const searchResults = searchQuery.trim() ? searchProducts(searchQuery).slice(0, 6) : [];

  const popularSearches = [
    "Whey Protein Isolate",
    "Fat loss combo",
    "Lean Muscle Gain Combo",
    "Preworkout",
    "Creatine",
    "Peptides",
    "Livoguard",
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoriesDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const navLink = (href: string, label: string, active?: boolean) => (
    <Link
      href={href}
      className={`text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-red-600 ${
        active ? "text-red-600" : "text-neutral-800"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[70px] gap-2">
          {/* Left: hamburger (mobile) / nav (desktop) */}
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1.5 text-neutral-900 hover:text-red-600 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" strokeWidth={1.75} /> : <Menu className="w-7 h-7" strokeWidth={1.75} />}
            </button>

            <nav className="hidden lg:flex items-center gap-6">
              {navLink("/", "Home", pathname === "/")}

              <div
                className="relative py-6"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-red-600 ${
                    pathname.startsWith("/collections") ? "text-red-600" : "text-neutral-800"
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[560px] bg-white border border-neutral-200 rounded-xl shadow-2xl p-3 grid grid-cols-2 gap-1 z-50">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/collections/${cat.slug}`}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors group/item"
                      >
                        <div>
                          <div className="text-[13px] font-bold text-neutral-900 group-hover/item:text-red-600">
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-neutral-500 truncate max-w-[200px]">{cat.tagline}</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                      </Link>
                    ))}
                    <div className="col-span-2 mt-1 pt-2 border-t border-neutral-200 flex justify-between items-center text-[11px] px-2 pb-1">
                      <Link href="/collections/all" className="text-red-600 font-bold hover:underline">
                        View all products &rarr;
                      </Link>
                      <span className="text-neutral-500">100% genuine lab tested</span>
                    </div>
                  </div>
                )}
              </div>

              {navLink("/collections/all", "Shop All", pathname === "/collections/all")}
              <Link
                href="/#shop-by-goal"
                className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wide text-neutral-800 hover:text-red-600 transition-colors"
              >
                <Flame className="w-4 h-4 text-red-600" />
                <span>Combos</span>
              </Link>
              {navLink("/pages/contact", "Contact", pathname === "/pages/contact")}
            </nav>
          </div>

          {/* Center: logo */}
          <div className="flex justify-center">
            <Logo size="md" />
          </div>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-900 hover:text-red-600 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-6 h-6" strokeWidth={1.75} />
            </button>

            <Link
              href="/pages/wishlist"
              className="relative hidden sm:block text-neutral-900 hover:text-red-600 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6" strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative text-neutral-900 hover:text-red-600 transition-colors"
              aria-label="View cart"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={1.75} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-red-600" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search proteins, creatine, pre-workout, peptides..."
                  className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 text-base focus:outline-none"
                  maxLength={80}
                />
              </form>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {searchQuery.trim() ? (
                <div>
                  <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-3">
                    Products ({searchResults.length})
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-neutral-200">
                      {searchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center justify-between py-3 hover:bg-neutral-50 px-2 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg studio-red flex items-center justify-center text-white font-bold text-[10px]">
                              {prod.category.slice(0, 3).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-neutral-900 group-hover:text-red-600 transition-colors">
                                {prod.title}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {prod.category} •{" "}
                                <span className="text-red-600 font-bold">
                                  Rs. {prod.salePrice.toLocaleString("en-IN")}.00
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-red-600" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral-500 text-sm">
                      No matching supplements found for &quot;{searchQuery}&quot;.
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                    Popular searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="text-xs px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-red-600 hover:text-white text-neutral-700 border border-neutral-200 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-neutral-50 p-3 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% genuine imported supplements
              </span>
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 z-40 bg-white flex flex-col p-6 overflow-y-auto border-t border-neutral-200">
          <div className="space-y-1 text-[15px] font-bold uppercase tracking-wide">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-neutral-900 border-b border-neutral-200">
              Home
            </Link>
            <Link
              href="/collections/all"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 text-neutral-900 border-b border-neutral-200"
            >
              All Supplements
            </Link>
            <Link
              href="/#shop-by-goal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-red-600 border-b border-neutral-200"
            >
              <Flame className="w-5 h-5" />
              <span>Combos &amp; Goal Stacks</span>
            </Link>

            <div className="py-4">
              <div className="text-[11px] text-neutral-500 uppercase tracking-widest mb-2 font-black">Shop by category</div>
              <div className="grid grid-cols-1">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.id}
                    href={`/collections/${c.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-[13px] font-semibold text-neutral-700 hover:text-red-600 py-2.5 border-b border-neutral-100"
                  >
                    <span>{c.name}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/pages/authenticity"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-emerald-700 border-b border-neutral-200"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Verify Lab Report Batch</span>
            </Link>
            <Link
              href="/pages/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 text-neutral-900 border-b border-neutral-200"
            >
              Track Order
            </Link>
            <Link
              href="/pages/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 text-neutral-900 border-b border-neutral-200"
            >
              Wishlist
            </Link>
            <Link
              href="/pages/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 text-neutral-900 border-b border-neutral-200"
            >
              Contact Support
            </Link>
          </div>

          <div className="mt-6 pb-24">
            <a
              href="https://wa.me/917288830003?text=Hi%2C+I+want+to+know+more+about+the+supplements"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Direct Support</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
