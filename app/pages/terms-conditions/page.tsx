import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-red-600 font-bold">Terms &amp; Conditions</span>
        </nav>

        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-neutral-700 leading-relaxed shadow-xl">
          <div className="border-b border-neutral-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-neutral-600 mt-1">Effective Date: August 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">1. Age Requirement</h2>
            <p>
              By accessing Alpha Gains and purchasing supplements, you verify that you are at least 18 years of age and legally competent to enter into binding agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">2. Product Usage &amp; Disclaimer</h2>
            <p>
              The dietary supplements, proteins, peptides, and fitness products on Alpha Gains are intended strictly as nutritional aids for healthy adult athletes. Products are not intended to diagnose, treat, cure, or prevent any medical condition. Always consult your healthcare professional or coach prior to beginning any rigorous supplementation regimen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">3. Pricing &amp; Authenticity</h2>
            <p>
              All prices listed on the store are in Indian Rupees (₹ INR) and inclusive of all statutory taxes. We reserve the right to correct any typographical pricing errors.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
