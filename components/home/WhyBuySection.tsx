"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  FlaskConical,
  Truck,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

export default function WhyBuySection() {
  const trustPoints = [
    { title: "100% Authentic & Genuine Imported Supplements", desc: "Sourced directly from certified overseas brand manufacturers." },
    { title: "Trust of over 10,000+ Verified Clients", desc: "Serving bodybuilders, powerlifters, MMA fighters & gym-goers across India." },
    { title: "Used by Pro Athletes in All Competitive Fields", desc: "Trusted by National level physique athletes and CrossFit champions." },
    { title: "All Supplements are Third-Party Lab Tested", desc: "Every batch verified for protein purity, zero spiking, and heavy metal clearance." },
    { title: "Fastest Same-Day Dispatch & Delivery", desc: "Insured express delivery with live WhatsApp tracking." },
  ];

  const featureCards = [
    { title: "Lab Tested", desc: "100% HPLC & SGS certified purity", icon: FlaskConical, color: "text-red-600" },
    { title: "Premium Ingredients", desc: "Zero cheap fillers or banned stimulants", icon: Sparkles, color: "text-cyan-600" },
    { title: "Fast Delivery", desc: "2-4 days express door delivery", icon: Truck, color: "text-emerald-600" },
    { title: "Trusted Quality", desc: "Zero counterfeit guarantee", icon: ShieldCheck, color: "text-rose-600" },
  ];

  return (
    <section className="py-20 bg-white border-b border-neutral-200 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Why Points */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
              <span>ALPHA GAINS GUARANTEE</span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-black text-red-600 uppercase tracking-widest italic">
                SASTA NAHI, SABSE ACCHA
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
                Why Buy From Alpha Gains
              </h2>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              In an industry plagued by fake and diluted supplements, Alpha Gains stands as the uncompromising bastion of pure authenticity, uncompromised dosages, and clinical lab verification.
            </p>

            {/* List */}
            <div className="space-y-3 pt-2">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-neutral-900 block">{point.title}</span>
                    <span className="text-xs text-neutral-600">{point.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/collections/all"
                className="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-red-600/20"
              >
                <span>Shop Supplements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/917288830003?text=Hi%20Alpha%20Gains%2C%20I%20want%20to%20know%20more%20about%20your%20supplements"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-neutral-50 hover:bg-neutral-50 text-neutral-900 border border-neutral-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Contact Now</span>
              </a>
            </div>
          </div>

          {/* Right 4 Feature Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {featureCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-3 shadow-lg hover:border-red-200 transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center ${card.color} shadow-inner`}>
                  <card.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wide">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
