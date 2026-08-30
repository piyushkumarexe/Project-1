"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, CheckCircle2, Gift } from "lucide-react";
import Logo from "./Logo";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem("alpha_gains_welcome_popup_dismissed");
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleClose = () => {
    try {
      sessionStorage.setItem("alpha_gains_welcome_popup_dismissed", "true");
    } catch (e) {
      console.error(e);
    }
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim()) {
      setErrorMsg("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 hover:text-black shadow border border-neutral-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Gold Banner Banner */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-3 text-center text-neutral-900 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          <Gift className="w-4 h-4" />
          <span>Exclusive New Athlete Offer</span>
        </div>

        <div className="p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>

          {!isSuccess ? (
            <div>
              <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-2">
                Unlock <span className="text-red-600">10% OFF</span> Your First Order
              </h3>
              <p className="text-xs text-neutral-700 max-w-sm mx-auto mb-6">
                Join 10,000+ elite athletes. Subscribe to get our secret VIP coupon code and exclusive access to freshly imported supplement drops.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-red-600"
                  required
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="WhatsApp number (Optional for deal alerts)"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-red-600"
                />

                {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/20 disabled:opacity-60"
                >
                  {isSubmitting ? "Generating Coupon..." : "Get 10% Discount Code"}
                </button>
              </form>

              <p className="text-[10px] text-neutral-500 mt-4">
                By signing up, you agree to our Terms and Privacy Policy. Zero spam, unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div className="py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-neutral-900 uppercase mb-2">
                Coupon Unlocked!
              </h4>
              <p className="text-xs text-neutral-700 mb-4">
                Use this promo code during checkout to claim your 10% instant discount:
              </p>
              <div className="inline-block px-5 py-2.5 rounded-xl bg-neutral-50 border-2 border-dashed border-red-600 text-red-600 font-mono font-black text-lg tracking-widest mb-6">
                ALPHAFIRST10
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider"
                >
                  Start Shopping Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
