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
  ShieldCheck,
  PhoneCall,
  Flame,
  Dumbbell,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { searchProducts, PRODUCTS } from "@/data/products";
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

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoriesDropdownOpen(false);
  }, [pathname]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090b0e]/95 backdrop-blur-md border-b border-[#1f2430] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#181e2b] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold tracking-wide uppercase">
            <Link
              href="/"
              className={`transition-colors hover:text-amber-400 ${
                pathname === "/" ? "text-amber-400 border-b-2 border-amber-400 pb-1" : "text-gray-200"
              }`}
            >
              Home
            </Link>

            {/* Categories Mega Dropdown */}
            <div
              className="relative group py-5"
              onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
              onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 transition-colors group-hover:text-amber-400 ${
                  pathname.startsWith("/collections") ? "text-amber-400" : "text-gray-200"
                }`}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              {isCategoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-[580px] bg-[#0d1017] border border-[#232b3d] rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/collections/${cat.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#181e2b] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#141824] border border-[#232b3d] flex items-center justify-center text-amber-400 group-hover/item:border-amber-500/50 group-hover/item:text-amber-300">
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-100 group-hover/item:text-amber-400">
                          {cat.name}
                        </div>
                        <div className="text-[11px] text-gray-400 lowercase first-letter:uppercase truncate max-w-[180px]">
                          {cat.tagline}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 mt-1 border-t border-[#1f2430] flex justify-between items-center text-xs">
                    <Link
                      href="/collections/all"
                      className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>View All Products &rarr;</span>
                    </Link>
                    <span className="text-gray-500">100% Genuine Lab Tested</span>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/collections/all"
              className={`transition-colors hover:text-amber-400 ${
                pathname === "/collections/all" ? "text-amber-400" : "text-gray-200"
              }`}
            >
              Shop All
            </Link>

            <Link
              href="/#shop-by-goal"
              className="text-gray-200 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Combos &amp; Stacks</span>
            </Link>

            <Link
              href="/pages/authenticity"
              className="text-gray-200 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verify Batch</span>
            </Link>

            <Link
              href="/pages/contact"
              className={`transition-colors hover:text-amber-400 ${
                pathname === "/pages/contact" ? "text-amber-400" : "text-gray-200"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Icons Right */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full bg-[#141822] text-gray-300 hover:text-white hover:bg-[#1e2433] border border-[#222838] transition-all flex items-center gap-2 text-xs"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline text-gray-400">Search products...</span>
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/pages/wishlist"
              className="relative p-2.5 rounded-full bg-[#141822] text-gray-300 hover:text-white hover:bg-[#1e2433] border border-[#222838] transition-all"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon & Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black border border-amber-500/30 transition-all flex items-center gap-2 group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider text-white group-hover:text-black">
                Bag
              </span>
              {totalCartItems > 0 && (
                <span className="bg-amber-500 text-black text-[11px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Live Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0d1017] border border-[#252e42] rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Input Bar */}
            <div className="p-4 border-b border-[#1f2430] flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-400" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search proteins, creatine, pre-workout, peptides..."
                  className="w-full bg-transparent text-white placeholder-gray-500 text-base focus:outline-none"
                  maxLength={80}
                />
              </form>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#181e2b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results / Popular tags */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {searchQuery.trim() ? (
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Products ({searchResults.length})
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-[#1f2430]">
                      {searchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center justify-between py-3 hover:bg-[#141824] px-2 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-[#161b26] border border-[#232b3d] flex items-center justify-center text-amber-400 font-bold text-xs">
                              {prod.category.slice(0, 3).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-100 group-hover:text-amber-400 transition-colors">
                                {prod.title}
                              </div>
                              <div className="text-xs text-gray-400">
                                {prod.category} • <span className="text-amber-400 font-bold">₹{prod.salePrice.toLocaleString("en-IN")}</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-gray-500 group-hover:text-amber-400">&rarr;</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No matching supplements found for &quot;{searchQuery}&quot;.
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                        }}
                        className="text-xs px-3 py-1.5 rounded-full bg-[#161b24] hover:bg-amber-500/20 hover:text-amber-300 text-gray-300 border border-[#232a3b] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#090b0e] p-3 border-t border-[#1f2430] flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Genuine Imported Supplements
              </span>
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-28 z-40 bg-black/90 backdrop-blur-lg flex flex-col p-6 overflow-y-auto animate-in slide-in-from-left duration-200">
          <div className="space-y-4 text-base font-bold uppercase tracking-wider">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-100 hover:text-amber-400 border-b border-[#1f2430]"
            >
              Home
            </Link>
            <Link
              href="/collections/all"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-100 hover:text-amber-400 border-b border-[#1f2430]"
            >
              All Supplements
            </Link>
            <Link
              href="/#shop-by-goal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-amber-400 hover:text-amber-300 border-b border-[#1f2430] flex items-center gap-2"
            >
              <Flame className="w-5 h-5 text-orange-500" />
              <span>Combos &amp; Goal Stacks</span>
            </Link>

            {/* Mobile Categories list */}
            <div className="py-2">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-black">
                Shop By Category
              </div>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {CATEGORIES.slice(0, 6).map((c) => (
                  <Link
                    key={c.id}
                    href={`/collections/${c.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold text-gray-300 hover:text-amber-400 py-1"
                  >
                    • {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/pages/authenticity"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-emerald-400 hover:text-emerald-300 border-b border-[#1f2430] flex items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Verify Lab Report Batch</span>
            </Link>

            <Link
              href="/pages/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-100 hover:text-amber-400 border-b border-[#1f2430]"
            >
              Track Order
            </Link>

            <Link
              href="/pages/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-100 hover:text-amber-400 border-b border-[#1f2430]"
            >
              Contact Support
            </Link>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1f2430] space-y-3">
            <a
              href="https://wa.me/917288830003?text=Hi%2C+I+want+to+know+more+about+the+supplements"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg"
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
