import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, ShieldCheck, Flame, Dumbbell } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { BRAND } from "@/lib/brand";

/** Branded 404 so a wrong URL still looks like the store. */
export default function NotFound() {
  const links = [
    { href: "/collections/all", label: "All Supplements", icon: Dumbbell },
    { href: "/#shop-by-goal", label: "Combos & Stacks", icon: Flame },
    { href: "/pages/authenticity", label: "Verify A Batch", icon: ShieldCheck },
  ];

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.16),transparent_60%)]" />
      <div className="relative z-10 w-full max-w-xl mx-4">
        <div className="rounded-3xl border border-[#232a3b] bg-[#0d1017]/90 backdrop-blur-md p-8 sm:p-12 text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <Logo size="md" href={null} />
          </div>

          <div className="text-6xl sm:text-7xl font-black text-gradient-gold leading-none">404</div>
          <h1 className="mt-3 text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
            Yeh set miss ho gaya
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            The page you were looking for has been moved, sold out, or never existed.
            Back to the rack with {BRAND.name}.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back To Home</span>
            </Link>
            <Link
              href="/search"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#141822] hover:bg-[#1d2332] border border-[#242c3e] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search Products</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1f2430] grid grid-cols-1 sm:grid-cols-3 gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-300 hover:text-amber-400 py-2 rounded-lg hover:bg-[#141822] transition-colors"
              >
                <l.icon className="w-4 h-4" />
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
