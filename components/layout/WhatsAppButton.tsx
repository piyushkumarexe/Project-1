"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, ShieldCheck } from "lucide-react";
import { LogoMark } from "./Logo";
import { BRAND, waLink } from "@/lib/brand";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Hi Alpha Gains, I want to inquire about supplement availability and lab reports.");

  const handleSend = () => {
    window.open(waLink(message), "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-[4.5rem] lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#0d1017] border border-[#242d40] rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#0b0e14] flex items-center justify-center border border-white/25">
                  <LogoMark size={22} glow={false} />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-300 border-2 border-emerald-600 rounded-full" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase">{BRAND.name} Support</h4>
                <p className="text-[10px] text-emerald-100">{BRAND.contact.whatsappDisplay} · {BRAND.contact.hours}</p>
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
          <div className="p-4 bg-[#121622] space-y-3">
            <div className="bg-[#1a202e] p-3 rounded-xl rounded-tl-none border border-[#283247] text-xs text-gray-200 shadow-sm">
              <p className="font-semibold text-amber-400 mb-1">Welcome to Alpha Gains!</p>
              <p className="text-gray-300">
                How can we help you today? Ask about product dosages, authenticity checks, stacks, or order delivery.
              </p>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 300))}
              rows={2}
              className="w-full p-2.5 rounded-xl bg-[#0d1017] border border-[#283247] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />

            <button
              type="button"
              onClick={handleSend}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating CTA Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">
          WhatsApp Support
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300" />
        </span>
      </button>
    </div>
  );
}
