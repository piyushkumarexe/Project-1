import Link from "next/link";
import { ShieldCheck, Award, Zap, Users, CheckCircle2, ChevronRight } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function AboutUsPage() {
  return (
    <div className="bg-[#090b0e] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-400 font-bold">About Company</span>
        </nav>

        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <Logo size="lg" />
          </div>
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest italic">
            SASTA NAHI, SABSE ACCHA
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            The Alpha Gains Story
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Founded with a singular mission: to eliminate counterfeit, underdosed, and spiked supplements from the Indian fitness ecosystem by delivering 100% genuine, lab-verified athletic nutrition.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="bg-[#0e121a] border border-[#1f2638] rounded-3xl p-6 sm:p-10 space-y-8 text-sm text-gray-300 leading-relaxed shadow-xl">
          <div className="space-y-3">
            <h2 className="text-xl font-black text-white uppercase">Our Philosophy</h2>
            <p>
              At Alpha Gains, we believe real athletic progress is built through disciplined training, consistent sleep, and unadulterated sports nutrition. In an era where online marketplaces are flooded with cheap replicas and cut powders, we uphold the highest standard of verification.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-black text-white uppercase">Zero Compromise Quality Guarantee</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#141822] border border-[#232b3d] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs uppercase mb-1">Direct Brand Import</h4>
                  <p className="text-xs text-gray-400">Zero third-party middlemen. Imported direct from licensed manufacturers in the UK, Canada, Germany, and USA.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141822] border border-[#232b3d] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs uppercase mb-1">100% HPLC Lab Testing</h4>
                  <p className="text-xs text-gray-400">Every batch undergoes rigorous high-performance liquid chromatography testing for purity and zero amino-spiking.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-black text-white uppercase">Built For Serious Athletes</h2>
            <p>
              Whether you are preparing for a national bodybuilding stage, breaking personal records on powerlifting platforms, or maximizing everyday physical vitality, Alpha Gains fuels your journey with relentless performance.
            </p>
          </div>

          <div className="pt-4 border-t border-[#1f2638] flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="font-bold text-white block">Official Support</span>
              <span className="text-xs text-gray-400">WhatsApp: +91 7288830003 • Email: support@alphagains.in</span>
            </div>
            <Link
              href="/collections/all"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider"
            >
              Shop All Supplements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
