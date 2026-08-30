"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchProducts, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { Search, ChevronRight } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    return searchProducts(query);
  }, [query]);

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-red-600 font-bold">Search Catalog</span>
        </nav>

        {/* Search Bar Header */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
            Search Supplements
          </h1>
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-neutral-600 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search proteins, creatine, pre-workout, peptides, stacks..."
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-red-600"
            />
          </div>
          <p className="text-xs text-neutral-600">
            Found <strong className="text-red-600">{results.length}</strong> matching products
            {query.trim() && (
              <span>
                {" "}
                for &quot;<strong className="text-neutral-900">{query}</strong>&quot;
              </span>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center space-y-4">
            <h3 className="text-lg font-bold text-neutral-900">No products found</h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              We couldn&apos;t find any supplements matching your search. Try searching for &quot;Creatine&quot;, &quot;Whey&quot;, or &quot;Preworkout&quot;.
            </p>
            <Link
              href="/collections/all"
              className="inline-block px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-600">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
