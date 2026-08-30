"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Truck,
  Search,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";
  const initialPhone = searchParams.get("phone") || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialOrderId) {
      handleTrack(initialOrderId, initialPhone);
    }
  }, [initialOrderId, initialPhone]);

  const handleTrack = async (idToTrack?: string, phoneToTrack?: string) => {
    const id = (idToTrack || orderId).trim().toUpperCase();
    const ph = (phoneToTrack || phone).trim();

    if (!id) {
      setErrorMsg("Please enter your Order ID.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setOrderData(null);

    try {
      const url = `/api/orders/track?orderId=${encodeURIComponent(id)}${ph ? `&phone=${encodeURIComponent(ph)}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.success) {
        setOrderData(data.data);
      } else {
        setErrorMsg(data.error || "Order not found. Please check the Order ID.");
      }
    } catch {
      setErrorMsg("Failed to query order tracking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Order Placed", desc: "Payment verified & order confirmed", done: true },
    { title: "Quality Check & Packed", desc: "Seals verified and bubble wrapped", done: true },
    { title: "Dispatched with Courier", desc: "Handed over to BlueDart / Delhivery", done: orderData?.orderStatus !== "Processing" },
    { title: "Out for Delivery", desc: "Delivery executive reaching your doorstep", done: orderData?.orderStatus === "Delivered" },
  ];

  return (
    <div className="bg-[#090b0e] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-400 font-bold">Track Order</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest">
            Real-Time Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Track Your Shipment
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Enter your Alpha Gains Order ID (e.g. AG-2026-88192) to view live courier status and estimated delivery date.
          </p>
        </div>

        {/* Lookup Box */}
        <div className="bg-[#0e121a] border border-[#1f2638] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <label className="text-xs font-bold text-gray-300 block mb-1">Order ID *</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="e.g. AG-2026-88192"
                className="w-full p-3 bg-[#141822] border border-[#232a3b] rounded-xl text-xs font-mono text-white uppercase placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-xs font-bold text-gray-300 block mb-1">Mobile Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full p-3 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="button"
                onClick={() => handleTrack()}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? "..." : "Track"}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <span>Demo tracking:</span>
            <button
              type="button"
              onClick={() => {
                setOrderId("AG-2026-88192");
                handleTrack("AG-2026-88192");
              }}
              className="text-amber-400 font-mono underline hover:text-amber-300"
            >
              AG-2026-88192
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tracking Details Result */}
        {orderData && (
          <div className="bg-[#0e121a] border border-[#1f2638] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1f2638] gap-2">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Shipment Status</span>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white uppercase">{orderData.orderId}</h3>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                    {orderData.orderStatus}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-gray-400">
                <span>Courier: <strong className="text-white">{orderData.courierPartner}</strong></span>
                <br />
                <span>AWB: <span className="font-mono text-amber-400">{orderData.trackingNumber}</span></span>
              </div>
            </div>

            {/* Timeline */}
            <div className="py-4">
              <h4 className="text-xs font-black text-white uppercase mb-6 tracking-wider">
                Shipment Progress
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {steps.map((st, i) => (
                  <div key={i} className="flex flex-col items-start text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          st.done ? "bg-emerald-500 text-black" : "bg-[#181e2b] text-gray-500 border border-[#263045]"
                        }`}
                      >
                        {st.done ? "✓" : i + 1}
                      </div>
                      <span className="text-xs font-bold text-white uppercase">{st.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 pl-9">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Summary */}
            <div className="pt-4 border-t border-[#1f2638] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#141822] border border-[#20283a]">
                <span className="text-gray-400 uppercase font-bold block mb-1">Destination</span>
                <p className="text-white font-semibold">
                  {orderData.customerName} • {orderData.city}, {orderData.state} ({orderData.pincode})
                </p>
                <p className="text-emerald-400 font-bold mt-1">Est. Arrival: {orderData.estimatedDelivery}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#141822] border border-[#20283a]">
                <span className="text-gray-400 uppercase font-bold block mb-1">Order Details</span>
                <p className="text-gray-300">
                  {orderData.itemCount} Item(s) • Total: <strong className="text-amber-400">₹{orderData.total.toLocaleString("en-IN")}</strong>
                </p>
                <p className="text-gray-400 mt-1">Payment: {orderData.paymentMethod} ({orderData.paymentStatus})</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-400">Loading tracking portal...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
