"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-6 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl bg-[#0e121a]/95 border border-[#232c3f] text-white shadow-2xl backdrop-blur-md max-w-sm animate-in slide-in-from-left duration-200"
        >
          {toast.type === "error" ? (
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          ) : toast.type === "info" ? (
            <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          )}

          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white uppercase tracking-wider">{toast.title}</div>
            <div className="text-xs text-gray-300 truncate">{toast.message}</div>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded text-gray-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
