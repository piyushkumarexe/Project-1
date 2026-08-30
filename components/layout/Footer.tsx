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
    <footer className="bg-neutral-50 border-t border-neutral-200 text-neutral-600 text-xs">
      {/* 4 Pillars Trust Strip */}
      <div className="border-b border-neutral-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">100% Authentic</h4>
              <p className="text-[11px] text-neutral-600">Directly imported &amp; lab verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">Fastest Delivery</h4>
              <p className="text-[11px] text-neutral-600">Same-day dispatch across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">Secure Payments</h4>
              <p className="text-[11px] text-neutral-600">UPI, Cards, NetBanking &amp; COD</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">Trusted Quality</h4>
              <p className="text-[11px] text-neutral-600">Over 10,000+ satisfied athletes</p>
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
            <p className="text-neutral-600 text-xs leading-relaxed max-w-sm">
              Alpha Gains is India&apos;s premier destination for genuine, lab-tested performance nutrition, peptides, protein isolates, and strength supplements. Sasta Nahi, Sabse Accha.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-neutral-700">
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>WhatsApp: +91 7288830003 (10 AM - 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Mail className="w-3.5 h-3.5 text-red-600" />
                <span>support@alphagains.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Customer Services */}
          <div>
            <h4 className="font-black text-neutral-900 uppercase tracking-wider text-xs mb-3 border-b border-neutral-200 pb-2">
              Customer Services
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pages/about-us" className="hover:text-red-600 transition-colors">
                  About Company
                </Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-red-600 transition-colors">
                  Our Shop
                </Link>
              </li>
              <li>
                <Link href="/pages/authenticity" className="hover:text-red-600 transition-colors text-emerald-600 font-semibold">
                  Verify Lab Batch Reports
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-red-600 transition-colors">
                  Help Center &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Policies */}
          <div>
            <h4 className="font-black text-neutral-900 uppercase tracking-wider text-xs mb-3 border-b border-neutral-200 pb-2">
              Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pages/privacy-policy" className="hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/refund-cancellation-policy" className="hover:text-red-600 transition-colors">
                  Refund &amp; Cancellation
                </Link>
              </li>
              <li>
                <Link href="/pages/terms-conditions" className="hover:text-red-600 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/pages/shipping-policy" className="hover:text-red-600 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/track-order" className="hover:text-red-600 transition-colors text-red-600">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-black text-neutral-900 uppercase tracking-wider text-xs mb-3 border-b border-neutral-200 pb-2">
              Let&apos;s Get In Touch
            </h4>
            <p className="text-neutral-600 text-xs mb-3 leading-relaxed">
              Sign up for our newsletter and receive <strong className="text-red-600">10% off</strong> your first order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
            {subscribeStatus === "success" && (
              <p className="text-emerald-600 text-[11px] mt-1.5 font-bold">
                ✓ Subscribed! Use coupon code: <span className="underline">ALPHAFIRST10</span>
              </p>
            )}
            {subscribeStatus && subscribeStatus !== "success" && (
              <p className="text-rose-600 text-[11px] mt-1.5">{subscribeStatus}</p>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} ALPHA GAINS | Designed for Peak Athletic Performance. All Rights Reserved.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-neutral-600 text-[10px] font-bold uppercase mr-1">Payment options:</span>
            {["UPI / QR", "RuPay", "Visa", "Mastercard", "NetBanking", "COD"].map((pay, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-neutral-50 border border-neutral-200 text-[10px] font-bold text-neutral-700"
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
