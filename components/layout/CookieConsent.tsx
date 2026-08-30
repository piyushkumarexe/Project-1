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
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-[#0d1017]/95 border border-[#232b3d] backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
            Cookie Policy
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            This website uses cookies to ensure you get the best browsing experience, secure shopping cart persistence, and personalized recommendations.{" "}
            <Link href="/pages/privacy-policy" className="text-amber-400 underline hover:text-amber-300">
              Learn more
            </Link>
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg bg-[#141822] hover:bg-[#1b212f] text-gray-400 hover:text-white text-xs font-semibold border border-[#232a3b] transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-md"
            >
              Allow cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
