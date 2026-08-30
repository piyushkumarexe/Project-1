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
  ChevronDown,
  Columns2,
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
  const [layoutCols, setLayoutCols] = useState<number>(2);
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
    <div className="bg-white min-h-screen">
      {/* Red page band with breadcrumb + title */}
      <div className="page-band text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/90">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-white/60">/</span>
            <span className="font-medium">{title}</span>
          </nav>
          <h1 className="mt-4 text-4xl sm:text-6xl font-black uppercase tracking-tight">{title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="hidden sm:block text-sm text-neutral-600 max-w-3xl leading-relaxed mb-8">{description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <span className="text-xs font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4 text-red-600" /> Filters
                </span>
                {(selectedBrands.length > 0 || inStockOnly || priceRange < 16000) && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[11px] text-red-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Collections List */}
              <div>
                <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
                  Collections
                </h4>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href="/collections/all"
                    className={`block py-1 px-2 rounded-lg transition-colors ${
                      isAll ? "bg-red-50 text-red-600 font-bold" : "text-neutral-600 hover:text-black"
                    }`}
                  >
                    All Products ({PRODUCTS.length})
                  </Link>
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      href={`/collections/${c.slug}`}
                      className={`block py-1 px-2 rounded-lg transition-colors ${
                        c.slug === slug ? "bg-red-50 text-red-600 font-bold" : "text-neutral-600 hover:text-black"
                      }`}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="font-bold text-neutral-700 uppercase">Max Price:</span>
                  <span className="font-bold text-red-600">₹{priceRange.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="16000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-red-600 bg-neutral-50 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>₹500</span>
                  <span>₹16,000</span>
                </div>
              </div>

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <div className="pt-4 border-t border-neutral-200">
                  <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
                    Brand
                  </h4>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer hover:text-black"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-4 h-4 rounded bg-neutral-50 border-neutral-200 text-red-600 focus:ring-0 focus:ring-offset-0"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability Filter */}
              <div className="pt-4 border-t border-neutral-200">
                <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
                  Availability
                </h4>
                <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer hover:text-black">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded bg-neutral-50 border-neutral-200 text-red-600 focus:ring-0"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Toolbar: Filter · Sort · Layout */}
            <div className="flex items-center justify-between gap-3 border-b border-neutral-200 pb-4">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-[17px] text-neutral-900"
              >
                <span>Filter</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <span className="hidden lg:inline text-sm text-neutral-600">
                Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> products
              </span>

              <div className="relative flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent text-[16px] sm:text-sm text-neutral-900 pr-6 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="alpha-asc">Alphabetically, A-Z</option>
                  <option value="alpha-desc">Alphabetically, Z-A</option>
                  <option value="price-low">Price, low to high</option>
                  <option value="price-high">Price, high to low</option>
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-900 -ml-5 pointer-events-none" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLayoutCols(1)}
                  className={`w-12 h-11 rounded-lg flex items-center justify-center transition-colors ${
                    layoutCols === 1 ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900"
                  }`}
                  title="1 column"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutCols(2)}
                  className={`w-12 h-11 rounded-lg flex items-center justify-center transition-colors ${
                    layoutCols === 2 ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900"
                  }`}
                  title="2 columns"
                >
                  <Columns2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutCols(3)}
                  className={`hidden lg:flex w-12 h-11 rounded-lg items-center justify-center transition-colors ${
                    layoutCols === 3 ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900"
                  }`}
                  title="3 columns"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-4 sm:gap-6 ${
                  layoutCols === 1
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                    : layoutCols === 3
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">No supplements found</h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-6">
                  No products matched your active filters. Try adjusting your price range or reset filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider"
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
