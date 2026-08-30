"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, ShieldCheck, ArrowUp } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Hi Alpha Gains, I want to inquire about supplement availability and lab reports.");

  const phoneNumber = "917288830003";

  const handleSend = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-[70px] lg:bottom-6 right-4 lg:right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-neutral-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                  <Image src="/images/logo-mark.png" alt="Alpha Gains" width={36} height={36} className="object-cover" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-300 border-2 border-emerald-600 rounded-full" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase">Alpha Gains Support</h4>
                <p className="text-[10px] text-emerald-100">Typically replies instantly</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-black/20 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-neutral-50 space-y-3">
            <div className="bg-neutral-50 p-3 rounded-xl rounded-tl-none border border-neutral-200 text-xs text-neutral-800 shadow-sm">
              <p className="font-semibold text-red-600 mb-1">Welcome to Alpha Gains!</p>
              <p className="text-neutral-700">
                How can we help you today? Ask about product dosages, authenticity checks, stacks, or order delivery.
              </p>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 300))}
              rows={2}
              className="w-full p-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500"
            />

            <button
              type="button"
              onClick={handleSend}
              className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1fbe5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating round CTA + back to top, matching the reference store */}
      <div className="flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1fbe5a] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        </button>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-11 h-11 rounded-full bg-neutral-900 hover:bg-red-600 text-white shadow-xl flex items-center justify-center transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
