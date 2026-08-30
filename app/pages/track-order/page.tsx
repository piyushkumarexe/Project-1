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
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-red-600 font-bold">Track Order</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-red-600 uppercase tracking-widest">
            Real-Time Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 uppercase tracking-tight">
            Track Your Shipment
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
            Enter your Alpha Gains Order ID (e.g. AG-2026-88192) to view live courier status and estimated delivery date.
          </p>
        </div>

        {/* Lookup Box */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <label className="text-xs font-bold text-neutral-700 block mb-1">Order ID *</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="e.g. AG-2026-88192"
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 uppercase placeholder-neutral-400 focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-xs font-bold text-neutral-700 block mb-1">Mobile Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="button"
                onClick={() => handleTrack()}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? "..." : "Track"}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-neutral-600">
            <span>Demo tracking:</span>
            <button
              type="button"
              onClick={() => {
                setOrderId("AG-2026-88192");
                handleTrack("AG-2026-88192");
              }}
              className="text-red-600 font-mono underline hover:text-red-500"
            >
              AG-2026-88192
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tracking Details Result */}
        {orderData && (
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
              <div>
                <span className="text-[10px] font-bold text-neutral-600 uppercase">Shipment Status</span>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-neutral-900 uppercase">{orderData.orderId}</h3>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold uppercase">
                    {orderData.orderStatus}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-neutral-600">
                <span>Courier: <strong className="text-neutral-900">{orderData.courierPartner}</strong></span>
                <br />
                <span>AWB: <span className="font-mono text-red-600">{orderData.trackingNumber}</span></span>
              </div>
            </div>

            {/* Timeline */}
            <div className="py-4">
              <h4 className="text-xs font-black text-neutral-900 uppercase mb-6 tracking-wider">
                Shipment Progress
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {steps.map((st, i) => (
                  <div key={i} className="flex flex-col items-start text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          st.done ? "bg-emerald-600 text-white" : "bg-neutral-50 text-neutral-500 border border-neutral-200"
                        }`}
                      >
                        {st.done ? "✓" : i + 1}
                      </div>
                      <span className="text-xs font-bold text-neutral-900 uppercase">{st.title}</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 pl-9">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Summary */}
            <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-600 uppercase font-bold block mb-1">Destination</span>
                <p className="text-neutral-900 font-semibold">
                  {orderData.customerName} • {orderData.city}, {orderData.state} ({orderData.pincode})
                </p>
                <p className="text-emerald-600 font-bold mt-1">Est. Arrival: {orderData.estimatedDelivery}</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-600 uppercase font-bold block mb-1">Order Details</span>
                <p className="text-neutral-700">
                  {orderData.itemCount} Item(s) • Total: <strong className="text-red-600">₹{orderData.total.toLocaleString("en-IN")}</strong>
                </p>
                <p className="text-neutral-600 mt-1">Payment: {orderData.paymentMethod} ({orderData.paymentStatus})</p>
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
    <Suspense fallback={<div className="p-12 text-center text-neutral-600">Loading tracking portal...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
