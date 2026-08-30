"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, Check, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("alpha_gains_cookie_consent");
      if (!consent) {
        setIsVisible(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("alpha_gains_cookie_consent", "accepted");
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("alpha_gains_cookie_consent", "declined");
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-[70px] lg:bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-white/95 border border-neutral-200 backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-red-50 text-red-600 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
            Cookie Policy
          </h4>
          <p className="text-xs text-neutral-700 leading-relaxed">
            This website uses cookies to ensure you get the best browsing experience, secure shopping cart persistence, and personalized recommendations.{" "}
            <Link href="/pages/privacy-policy" className="text-red-600 underline hover:text-red-500">
              Learn more
            </Link>
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-50 text-neutral-600 hover:text-black text-xs font-semibold border border-neutral-200 transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md"
            >
              Allow cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
