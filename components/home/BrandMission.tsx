"use client";

import React from "react";
import { MessageCircle, ShieldCheck, Truck, Lock, CheckCircle2 } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function BrandMission() {
  return (
    <section className="py-20 bg-[#06080b] border-b border-[#1f2430] relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Built For Those Who Refuse To Settle
        </h2>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          At <strong className="text-amber-400 font-bold">ALPHA GAINS</strong>, we believe real progress is built through discipline, consistency, and the right nutrition. Our premium range of supplements is formulated to support strength, recovery, endurance, and overall performance—helping you push beyond limits every single day. Whether you&apos;re chasing your first milestone or your next personal best, Alpha Gains is here to fuel every step of your journey with uncompromising quality and results you can trust.
        </p>

        {/* 4 Trust Badges Horizontal */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-[#0e121a] border border-[#1f2638] flex flex-col items-center justify-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase">100% Genuine Products</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0e121a] border border-[#1f2638] flex flex-col items-center justify-center space-y-2">
            <Truck className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase">Fast Shipping</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0e121a] border border-[#1f2638] flex flex-col items-center justify-center space-y-2">
            <Lock className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase">Secure Payments</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0e121a] border border-[#1f2638] flex flex-col items-center justify-center space-y-2">
            <CheckCircle2 className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase">Trusted Quality</span>
          </div>
        </div>

        {/* WhatsApp Direct CTA */}
        <div className="pt-6">
          <a
            href="https://wa.me/917288830003?text=Hi%20Alpha%20Gains%2C%20I%20want%20to%20know%20more%20about%20the%20supplements"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-600/20 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>Chat on WhatsApp: +91 7288830003</span>
          </a>
        </div>
      </div>
    </section>
  );
}
