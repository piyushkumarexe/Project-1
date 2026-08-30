"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Check, X } from "lucide-react";
import Logo from "./Logo";

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDenied, setIsDenied] = useState(false);

  useEffect(() => {
    try {
      const isVerified = localStorage.getItem("alpha_gains_age_verified");
      if (!isVerified) {
        setIsOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleConfirmAge = () => {
    try {
      localStorage.setItem("alpha_gains_age_verified", "true");
    } catch (e) {
      console.error(e);
    }
    setIsOpen(false);
  };

  const handleDenyAge = () => {
    setIsDenied(true);
  };

  const handleReset = () => {
    setIsDenied(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-md bg-[#0d1017] border border-[#262f44] rounded-2xl shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        <div className="flex justify-center mb-5">
          <Logo size="lg" />
        </div>

        {!isDenied ? (
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-2">
              Confirm your age
            </h2>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Are you 18 years old or older? Alpha Gains provides premium athletic performance nutrition, natural steroids, peptides and hardcore supplements intended strictly for adult athletes.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDenyAge}
                className="py-3 px-4 rounded-xl bg-[#151924] hover:bg-[#1e2434] text-gray-300 font-bold text-xs uppercase tracking-wider border border-[#283144] transition-colors"
              >
                No, I&apos;m not
              </button>
              <button
                type="button"
                onClick={handleConfirmAge}
                className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
              >
                Yes, I am
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <X className="w-7 h-7" />
            </div>

            <h2 className="text-lg font-black text-white uppercase tracking-wider mb-2">
              Come back when you&apos;re older
            </h2>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Sorry, the advanced performance content and supplements in this store are restricted to an adult audience (18+).
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-amber-400 hover:underline font-bold"
            >
              Oops, I entered incorrectly
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
