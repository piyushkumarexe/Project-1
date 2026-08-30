import AuthenticityWidget from "@/components/home/AuthenticityWidget";
import Link from "next/link";
import { ShieldCheck, Award, FileCheck2, FlaskConical, ChevronRight } from "lucide-react";

export default function AuthenticityPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-red-600 font-bold">Authenticity &amp; Lab Reports</span>
        </nav>

        {/* Hero */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Genuine Transparency Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
            Verified Laboratory Reports
          </h1>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            At Alpha Gains, we eliminate the guesswork. Every batch imported undergoes independent HPLC chromatography and microbial screening at ISO/IEC 17025 accredited testing laboratories.
          </p>
        </div>

        {/* Widget */}
        <AuthenticityWidget />

        {/* 3 Steps to Verify */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto font-black text-lg">
              1
            </div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase">Locate Batch Code</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Find the stamped laser batch code and expiry date located on the bottom or side label of your supplement tub.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto font-black text-lg">
              2
            </div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase">Enter In Portal</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Type the exact code in the search bar above to query our live laboratory test database.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto font-black text-lg">
              3
            </div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase">Review Certificate</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Examine the verified protein purity percentage, heavy metal screen, and official lab accreditation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
