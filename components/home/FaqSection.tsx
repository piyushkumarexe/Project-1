"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, MessageCircle, ShieldCheck } from "lucide-react";
import { BRAND, waLink } from "@/lib/brand";

const FAQS = [
  {
    q: "Are all supplements at Alpha Gains 100% genuine?",
    a: "Yes. Every tub is directly imported, carries a tamper-proof QR batch sticker, and is cross-verified against the manufacturer's code before dispatch. You can also run the batch code through our Verify Batch page to pull the HPLC / SGS lab report for that exact lot.",
  },
  {
    q: "How do I check my batch code?",
    a: "Open Verify Batch, type the code printed on the foil (for example AG-WHEY-2026, AG-CREAT-8841, AG-PRE-5510 or AG-PEP-9021) and you will get protein purity, heavy-metal clearance and lab date for that batch instantly.",
  },
  {
    q: "How long does delivery take and is it free?",
    a: `We dispatch the same day for orders placed before 6 PM IST. Metro delivery is 2-4 working days. Shipping is free on all prepaid orders above ₹${BRAND.contact.freeShipThreshold.toLocaleString("en-IN")}, and ₹99 flat below that.`,
  },
  {
    q: "Which combos should I pick for my goal?",
    a: "Bulking → Mass Gainer + Creatine + Multivitamin. Cutting → Whey Isolate + Fat Burner + High-Stim Pre-Workout. Strength → Creatine + Pre-Workout + Omega-3. Every goal stack is bundled at up to 35% off versus buying bottles separately.",
  },
  {
    q: "Do you offer COD, and can I return an opened tub?",
    a: "COD is available on most pin codes (₹79 handling). Unopened products can be exchanged within 7 days. Opened tubs are covered only by our authenticity guarantee — if a batch fails verification we refund 100%, no questions asked.",
  },
  {
    q: "Are peptides and natural anabolics safe for a first-time user?",
    a: "They are legal, non-controlled and drug-test friendly, but they are meant for adult athletes training consistently. Start at the label dose, keep a 4-week cycle log, and message our coach on WhatsApp before stacking them with anything hormonal.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-14 sm:py-16 bg-[#090b0e] border-b border-[#1f2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="sticky top-28">
            <div className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-400 mb-1">
              Before You Buy
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              FAQ &amp; Support
            </h2>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Straight answers on authenticity, shipping, stacking and returns. Still stuck?
              Our team replies on WhatsApp in minutes, not days.
            </p>

            <div className="mt-5 space-y-3">
              <a
                href={waLink("Hi Alpha Gains, I have a question before ordering.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask On WhatsApp</span>
              </a>
              <Link
                href="/pages/authenticity"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#141822] hover:bg-[#1d2332] border border-[#242c3e] text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verify A Batch Code</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-2.5">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`rounded-xl border transition-colors ${
                  isOpen ? "border-amber-500/45 bg-[#0e121b]" : "border-[#202738] bg-[#0b0e14]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 text-left p-4 sm:p-5 group"
                >
                  <span
                    className={`text-sm font-black uppercase tracking-wide transition-colors ${
                      isOpen ? "text-amber-400" : "text-gray-100 group-hover:text-amber-300"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-amber-500 border-amber-500 text-black rotate-45"
                        : "border-[#2b354a] text-amber-400"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden px-4 sm:px-5 pb-4 sm:pb-5 text-[13px] text-gray-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
