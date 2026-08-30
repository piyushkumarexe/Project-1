"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import {
  Filter,
  SlidersHorizontal,
  ChevronRight,
  LayoutGrid,
  Grid3X3,
  List,
  Check,
  RotateCcw,
} from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const category = CATEGORIES.find((c) => c.slug === slug);
  const isAll = slug === "all";

  // If not found and not "all"
  if (!category && !isAll) {
    notFound();
  }

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(16000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [layoutCols, setLayoutCols] = useState<number>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // All products matching this category
  const baseProducts = useMemo(() => {
    if (isAll) return PRODUCTS;
    return PRODUCTS.filter((p) => p.categorySlug === slug);
  }, [slug, isAll]);

  // Unique brands in this category
  const availableBrands = useMemo(() => {
    return Array.from(new Set(baseProducts.map((p) => p.brand)));
  }, [baseProducts]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    // Filter by Brand
    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    // Filter by Stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Filter by Price
    list = list.filter((p) => p.salePrice <= priceRange);

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortBy === "alpha-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "alpha-desc") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "bestselling") {
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return list;
  }, [baseProducts, selectedBrands, inStockOnly, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setInStockOnly(false);
    setPriceRange(16000);
    setSortBy("featured");
  };

  const title = isAll ? "All Supplements" : category?.name;
  const description = isAll
    ? "Explore our complete catalog of 100% authentic, imported proteins, peptides, pre-workouts, creatine, and performance health stacks."
    : category?.description;

  return (
    <div className="bg-[#090b0e] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/collections/all" className="hover:text-amber-400">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-400 font-bold">{title}</span>
        </nav>

        {/* Collection Header Banner */}
        <div className="bg-gradient-to-r from-[#121622] via-[#161c2b] to-[#0e121a] border border-[#222b3d] rounded-2xl p-6 sm:p-10 mb-8 shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f2638]">
                <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4 text-amber-400" /> Filters
                </span>
                {(selectedBrands.length > 0 || inStockOnly || priceRange < 16000) && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Collections List */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                  Collections
                </h4>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href="/collections/all"
                    className={`block py-1 px-2 rounded-lg transition-colors ${
                      isAll ? "bg-amber-500/10 text-amber-400 font-bold" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    All Products ({PRODUCTS.length})
                  </Link>
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      href={`/collections/${c.slug}`}
                      className={`block py-1 px-2 rounded-lg transition-colors ${
                        c.slug === slug ? "bg-amber-500/10 text-amber-400 font-bold" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="pt-4 border-t border-[#1f2638]">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="font-bold text-gray-300 uppercase">Max Price:</span>
                  <span className="font-bold text-amber-400">₹{priceRange.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="16000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-[#161c28] h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>₹500</span>
                  <span>₹16,000</span>
                </div>
              </div>

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <div className="pt-4 border-t border-[#1f2638]">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                    Brand
                  </h4>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-4 h-4 rounded bg-[#161c28] border-[#252f44] text-amber-500 focus:ring-0 focus:ring-offset-0"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability Filter */}
              <div className="pt-4 border-t border-[#1f2638]">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                  Availability
                </h4>
                <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#161c28] border-[#252f44] text-amber-500 focus:ring-0"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Sorting & Layout */}
            <div className="bg-[#0e121a] border border-[#1f2638] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-3 py-1.5 rounded-lg bg-[#141822] border border-[#232a3b] text-xs font-bold text-gray-200 flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Filters</span>
                </button>

                <span className="text-xs text-gray-400">
                  Showing <strong className="text-white">{filteredProducts.length}</strong> products
                </span>
              </div>

              {/* Sorting & Columns */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-gray-400 hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#141822] border border-[#232a3b] text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="bestselling">Best Selling</option>
                    <option value="alpha-asc">Alphabetically, A-Z</option>
                    <option value="alpha-desc">Alphabetically, Z-A</option>
                    <option value="price-low">Price, low to high</option>
                    <option value="price-high">Price, high to low</option>
                  </select>
                </div>

                {/* Column View Selectors */}
                <div className="hidden sm:flex items-center border border-[#232a3b] rounded-lg overflow-hidden bg-[#141822]">
                  <button
                    type="button"
                    onClick={() => setLayoutCols(2)}
                    className={`p-1.5 text-gray-400 hover:text-white ${layoutCols === 2 ? "bg-amber-500 text-black font-bold" : ""}`}
                    title="2 Columns"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayoutCols(3)}
                    className={`p-1.5 text-gray-400 hover:text-white ${layoutCols === 3 ? "bg-amber-500 text-black font-bold" : ""}`}
                    title="3 Columns"
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayoutCols(4)}
                    className={`p-1.5 text-gray-400 hover:text-white ${layoutCols === 4 ? "bg-amber-500 text-black font-bold" : ""}`}
                    title="4 Columns"
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-5 sm:gap-6 ${
                  layoutCols === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : layoutCols === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                }`}
              >
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-12 text-center">
                <h3 className="text-lg font-bold text-white mb-2">No supplements found</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                  No products matched your active filters. Try adjusting your price range or reset filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
