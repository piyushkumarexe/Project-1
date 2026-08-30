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
      <div className="relative w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        <div className="flex justify-center mb-5">
          <Logo size="lg" markOnly />
        </div>

        {!isDenied ? (
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-4">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-black text-neutral-900 uppercase tracking-wider mb-2">
              Confirm your age
            </h2>
            <p className="text-sm text-neutral-700 mb-6 leading-relaxed">
              Are you 18 years old or older? Alpha Gains provides premium athletic performance nutrition, natural steroids, peptides and hardcore supplements intended strictly for adult athletes.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDenyAge}
                className="py-3 px-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-bold text-xs uppercase tracking-wider border border-neutral-200 transition-colors"
              >
                No, I&apos;m not
              </button>
              <button
                type="button"
                onClick={handleConfirmAge}
                className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/20"
              >
                Yes, I am
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
              <X className="w-7 h-7" />
            </div>

            <h2 className="text-lg font-black text-neutral-900 uppercase tracking-wider mb-2">
              Come back when you&apos;re older
            </h2>
            <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
              Sorry, the advanced performance content and supplements in this store are restricted to an adult audience (18+).
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-red-600 hover:underline font-bold"
            >
              Oops, I entered incorrectly
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
