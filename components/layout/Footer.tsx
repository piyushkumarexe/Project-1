"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Send,
  Mail,
  Phone,
  MapPin,
  Lock,
} from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<string>("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribing(true);
    setSubscribeStatus("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribeStatus("success");
        setEmail("");
      } else {
        setSubscribeStatus(data.error || "Subscription failed.");
      }
    } catch {
      setSubscribeStatus("An error occurred. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#07090c] border-t border-[#1a202c] text-gray-400 text-xs">
      {/* 4 Pillars Trust Strip */}
      <div className="border-b border-[#161c27] py-8 bg-[#0b0e14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">100% Authentic</h4>
              <p className="text-[11px] text-gray-400">Directly imported &amp; lab verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Fastest Delivery</h4>
              <p className="text-[11px] text-gray-400">Same-day dispatch across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Secure Payments</h4>
              <p className="text-[11px] text-gray-400">UPI, Cards, NetBanking &amp; COD</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Trusted Quality</h4>
              <p className="text-[11px] text-gray-400">Over 10,000+ satisfied athletes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Alpha Gains is India&apos;s premier destination for genuine, lab-tested performance nutrition, peptides, protein isolates, and strength supplements. Sasta Nahi, Sabse Accha.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>WhatsApp: +91 7288830003 (10 AM - 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>support@alphagains.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Customer Services */}
          <div>
            <h4 className="font-black text-white uppercase tracking-wider text-xs mb-3 border-b border-[#1f2430] pb-2">
              Customer Services
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pages/about-us" className="hover:text-amber-400 transition-colors">
                  About Company
                </Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-amber-400 transition-colors">
                  Our Shop
                </Link>
              </li>
              <li>
                <Link href="/pages/authenticity" className="hover:text-amber-400 transition-colors text-emerald-400 font-semibold">
                  Verify Lab Batch Reports
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-amber-400 transition-colors">
                  Help Center &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Policies */}
          <div>
            <h4 className="font-black text-white uppercase tracking-wider text-xs mb-3 border-b border-[#1f2430] pb-2">
              Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pages/privacy-policy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/refund-cancellation-policy" className="hover:text-amber-400 transition-colors">
                  Refund &amp; Cancellation
                </Link>
              </li>
              <li>
                <Link href="/pages/terms-conditions" className="hover:text-amber-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/pages/shipping-policy" className="hover:text-amber-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/track-order" className="hover:text-amber-400 transition-colors text-amber-400">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-black text-white uppercase tracking-wider text-xs mb-3 border-b border-[#1f2430] pb-2">
              Let&apos;s Get In Touch
            </h4>
            <p className="text-gray-400 text-xs mb-3 leading-relaxed">
              Sign up for our newsletter and receive <strong className="text-amber-400">10% off</strong> your first order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-xs bg-[#121622] border border-[#232a3b] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
            {subscribeStatus === "success" && (
              <p className="text-emerald-400 text-[11px] mt-1.5 font-bold">
                ✓ Subscribed! Use coupon code: <span className="underline">ALPHAFIRST10</span>
              </p>
            )}
            {subscribeStatus && subscribeStatus !== "success" && (
              <p className="text-rose-400 text-[11px] mt-1.5">{subscribeStatus}</p>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-[#161c27] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} ALPHA GAINS | Designed for Peak Athletic Performance. All Rights Reserved.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-400 text-[10px] font-bold uppercase mr-1">Payment options:</span>
            {["UPI / QR", "RuPay", "Visa", "Mastercard", "NetBanking", "COD"].map((pay, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-[#121622] border border-[#1f2638] text-[10px] font-bold text-gray-300"
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
