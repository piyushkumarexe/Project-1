"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  QrCode,
  Tag,
  ArrowRight,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductVisual from "@/components/ui/ProductVisual";
import confetti from "canvas-confetti";
import Logo from "@/components/layout/Logo";

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    total,
    clearCart,
    orderNote,
    setOrderNote,
  } = useCart();

  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "cod">("upi");
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const indianStates = [
    "Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab",
    "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCodeInput("");
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) errors.email = "Valid email address is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = "10-digit mobile number is required";
    if (!formData.address.trim() || formData.address.length < 5) errors.address = "Complete street address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) errors.pincode = "Enter a valid 6-digit PIN code";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Please add supplements before checkout.");
      router.push("/collections/all");
      return;
    }

    if (!validateForm()) {
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: "India",
        },
        items: cart.map((item) => ({
          id: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          flavor: item.flavor,
          size: item.size,
        })),
        paymentMethod,
        couponCode: appliedCoupon || "",
        orderNote: orderNote || "",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfirmedOrder(data.data);
        clearCart();
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#fbbf24", "#10b981", "#ffffff"],
        });
      } else {
        alert(data.error || "Failed to process order. Please verify your details.");
      }
    } catch {
      alert("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyOrderId = () => {
    if (confirmedOrder?.orderId) {
      navigator.clipboard.writeText(confirmedOrder.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  // If Order Confirmed View
  if (confirmedOrder) {
    return (
      <div className="bg-[#090b0e] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#0d1017] border border-[#232b3d] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-200 text-center">
          <div className="flex justify-center">
            <Logo size="md" href={null} showTagline={false} />
          </div>

          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 ring-gold-hover">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
              Order Confirmed &amp; Dispatched for Packing
            </span>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight mt-1">
              Thank You, {confirmedOrder.customer.firstName}!
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              We received your order. A confirmation SMS &amp; Email has been sent to {confirmedOrder.customer.email}.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-[#121622] border border-[#1f2638] rounded-2xl p-6 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1f2638] gap-2">
              <div>
                <span className="text-[11px] text-gray-400 uppercase font-bold">Order ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-mono font-black text-amber-400">
                    {confirmedOrder.orderId}
                  </span>
                  <button
                    type="button"
                    onClick={copyOrderId}
                    className="p-1 text-gray-400 hover:text-white"
                    title="Copy Order ID"
                  >
                    {copiedOrderId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[11px] text-gray-400 uppercase font-bold">Status</span>
                <div className="text-xs font-bold text-emerald-400 uppercase">
                  {confirmedOrder.orderStatus} • {confirmedOrder.paymentStatus}
                </div>
              </div>
            </div>

            {/* Delivery address & Courier info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="font-bold text-gray-300 uppercase mb-1">Shipping To</h5>
                <p className="text-gray-400">
                  {confirmedOrder.customer.firstName} {confirmedOrder.customer.lastName}
                  <br />
                  {confirmedOrder.shippingAddress.address}
                  {confirmedOrder.shippingAddress.apartment && `, ${confirmedOrder.shippingAddress.apartment}`}
                  <br />
                  {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}
                  <br />
                  Phone: {confirmedOrder.customer.phone}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-gray-300 uppercase mb-1">Logistics &amp; Courier</h5>
                <p className="text-gray-400">
                  Partner: <strong className="text-white">{confirmedOrder.courierPartner}</strong>
                  <br />
                  Tracking: <span className="font-mono text-amber-400">{confirmedOrder.trackingNumber}</span>
                  <br />
                  Estimated Delivery: <strong className="text-emerald-400">{confirmedOrder.estimatedDelivery}</strong>
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="pt-4 border-t border-[#1f2638] space-y-2">
              <h5 className="font-bold text-gray-300 uppercase text-xs">Ordered Supplements ({confirmedOrder.items.length})</h5>
              <div className="divide-y divide-[#1f2638]">
                {confirmedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="py-2 flex justify-between text-xs">
                    <span className="text-gray-300">
                      {item.title} <span className="text-gray-500">x{item.quantity}</span>
                    </span>
                    <span className="text-amber-400 font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Paid */}
            <div className="pt-4 border-t border-[#1f2638] flex justify-between items-center text-sm font-black">
              <span className="text-white uppercase">Total Paid</span>
              <span className="text-xl text-amber-400">₹{confirmedOrder.total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/pages/track-order?orderId=${confirmedOrder.orderId}&phone=${confirmedOrder.customer.phone}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all"
            >
              Track Live Shipment
            </Link>

            <Link
              href="/collections/all"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#141822] hover:bg-[#1f2638] text-white border border-[#232b3d] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Form View
  return (
    <div className="bg-[#090b0e] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1f2430] mb-8">
          <Logo size="md" />
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Checkout Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Contact */}
            <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-bold">1</span>
                Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="athlete@example.com"
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.email && <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.phone && <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.phone}</p>}
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-bold">2</span>
                Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.firstName && <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.firstName}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.lastName && <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House / Flat No., Building, Street Area"
                  className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
                {formErrors.address && <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.city && <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.city}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400001"
                    maxLength={6}
                    className="w-full p-2.5 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.pincode && <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-bold">3</span>
                Payment Method
              </h3>

              <div className="space-y-3">
                {/* UPI / QR */}
                <label className={`block p-4 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === "upi" ? "bg-amber-500/10 border-amber-500" : "bg-[#141822] border-[#232a3b]"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">UPI / QR Code / Google Pay / PhonePe / Paytm</span>
                        <span className="text-[11px] text-gray-400">Instant verification with zero extra gateway fee</span>
                      </div>
                    </div>
                    <QrCode className="w-5 h-5 text-amber-400" />
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mt-4 pt-3 border-t border-[#1f2638] flex items-center gap-4">
                      <div className="w-20 h-20 bg-white p-1.5 rounded-lg flex items-center justify-center shadow-inner">
                        {/* Simulated QR Code SVG */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect width="100" height="100" fill="white" />
                          <path d="M10 10h30v30h-30z M20 20h10v10h-10z M60 10h30v30h-30z M70 20h10v10h-10z M10 60h30v30h-30z M20 70h10v10h-10z M50 50h10v10h-10z M70 70h20v20h-20z M50 70h10v20h-10z M70 50h20v10h-20z" fill="black" />
                        </svg>
                      </div>
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-amber-400 uppercase">Scan with Any UPI App</span>
                        <p className="text-gray-400 text-[11px]">GPay, PhonePe, Paytm, CRED, BHIM</p>
                        <span className="text-[10px] text-emerald-400 font-bold">✓ 100% Secure Instant Settlement</span>
                      </div>
                    </div>
                  )}
                </label>

                {/* Cards */}
                <label className={`block p-4 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === "card" ? "bg-amber-500/10 border-amber-500" : "bg-[#141822] border-[#232a3b]"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">Credit / Debit Card</span>
                        <span className="text-[11px] text-gray-400">Visa, MasterCard, RuPay (3D Secure OTP)</span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-amber-400" />
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`block p-4 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === "cod" ? "bg-amber-500/10 border-amber-500" : "bg-[#141822] border-[#232a3b]"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-gray-400">Pay cash upon delivery at your doorstep</span>
                      </div>
                    </div>
                    <Truck className="w-5 h-5 text-emerald-400" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-6 space-y-6 sticky top-24 shadow-xl">
              <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-[#1f2638] flex items-center justify-between">
                <span>Order Summary ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span className="text-xs text-amber-400 font-bold">100% Authentic</span>
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#1f2638] max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#141822] border border-[#232b3d] flex items-center justify-center overflow-hidden flex-shrink-0">
                      <ProductVisual title={item.title} className="w-10 h-10 p-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{item.title}</div>
                      <div className="text-[11px] text-gray-400">
                        Qty: {item.quantity} {item.flavor && `• ${item.flavor}`}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-amber-400">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code input */}
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Code &quot;{appliedCoupon}&quot; (-₹{discount.toLocaleString("en-IN")})
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-rose-400 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => {
                        setCouponCodeInput(e.target.value);
                        setCouponError("");
                      }}
                      placeholder="Coupon (e.g. ALPHAFIRST10)"
                      className="flex-1 p-2 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-3.5 py-2 bg-[#1b2230] hover:bg-amber-500 hover:text-black text-gray-200 text-xs font-bold rounded-xl border border-[#283247] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs pt-3 border-t border-[#1f2638]">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Express Insured Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-400">FREE (Orders &gt; ₹9,999)</strong>
                    ) : (
                      `₹${shippingFee.toLocaleString("en-IN")}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#1f2638]">
                  <span>Total Amount</span>
                  <span className="text-2xl text-amber-400">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50 active:scale-[0.98]"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? "Securing Order..." : `Place Order (₹${total.toLocaleString("en-IN")})`}</span>
              </button>

              <div className="text-[10px] text-gray-500 text-center space-y-1">
                <p>By placing order you agree to Alpha Gains Terms and Shipping Policies.</p>
                <p className="text-emerald-400 font-semibold">100% Money-Back Authenticity Guarantee</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
