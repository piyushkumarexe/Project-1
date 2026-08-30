import Link from "next/link";
import { ChevronRight, Truck, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#090b0e] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-400 font-bold">Shipping &amp; Delivery Policy</span>
        </nav>

        <div className="bg-[#0e121a] border border-[#1f2638] rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-gray-300 leading-relaxed shadow-xl">
          <div className="border-b border-[#1f2638] pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Shipping &amp; Delivery Policy
            </h1>
            <p className="text-xs text-gray-400 mt-1">Fast, Safe &amp; Insured Express Delivery Across India</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#141822] border border-[#232a3b] text-center space-y-2">
              <Truck className="w-6 h-6 text-amber-400 mx-auto" />
              <h4 className="font-bold text-white text-xs uppercase">Same-Day Dispatch</h4>
              <p className="text-[11px] text-gray-400">Orders before 3 PM dispatched same day</p>
            </div>
            <div className="p-4 rounded-xl bg-[#141822] border border-[#232a3b] text-center space-y-2">
              <Clock className="w-6 h-6 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-xs uppercase">2-4 Days Delivery</h4>
              <p className="text-[11px] text-gray-400">BlueDart &amp; Delhivery Express Air</p>
            </div>
            <div className="p-4 rounded-xl bg-[#141822] border border-[#232a3b] text-center space-y-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400 mx-auto" />
              <h4 className="font-bold text-white text-xs uppercase">100% Insured Transit</h4>
              <p className="text-[11px] text-gray-400">Tamper-evident protective packaging</p>
            </div>
          </div>

          <section className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-white uppercase">1. Free Shipping Threshold</h2>
            <p>
              We provide <strong className="text-emerald-400">FREE EXPRESS AIR SHIPPING</strong> on all orders above <strong>₹9,999</strong>. For orders below ₹9,999, a flat insured courier fee of ₹199 applies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase">2. Courier Partners &amp; Tracking</h2>
            <p>
              We partner with India&apos;s leading premium courier logistics: BlueDart, Delhivery Air, DTDC, and Shadowfax. As soon as your parcel is scanned at dispatch, you will receive an automated tracking link via SMS &amp; WhatsApp.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
