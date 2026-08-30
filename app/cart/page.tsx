"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import ProductVisual from "@/components/ui/ProductVisual";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Tag,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    total,
  } = useCart();

  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode("");
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-[#090b0e] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-400 font-bold">Shopping Cart</span>
        </nav>

        {/* Header */}
        <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-6 sm:p-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Your Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              100% Genuine Imported Supplements with Free Shipping over ₹9,999
            </p>
          </div>

          <Link
            href="/collections/all"
            className="px-6 py-2.5 rounded-xl bg-[#141822] hover:bg-[#1f2638] text-white border border-[#232b3d] font-bold text-xs uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Table Left (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping bar */}
              <div className="p-4 rounded-2xl bg-[#121622] border border-[#1f2638] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-medium flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-400" />
                    {amountNeededForFreeShipping > 0 ? (
                      <>
                        Add <strong className="text-amber-400">₹{amountNeededForFreeShipping.toLocaleString("en-IN")}</strong> more to get FREE Express Air Shipping!
                      </>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> You unlocked FREE Express Air Shipping!
                      </span>
                    )}
                  </span>
                  <span className="text-gray-400 font-bold">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-[#1e2434] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-6 divide-y divide-[#1f2638]">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#141822] border border-[#232b3d] flex items-center justify-center overflow-hidden flex-shrink-0">
                        <ProductVisual title={item.title} className="w-14 h-14 p-1" />
                      </div>
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-bold text-sm text-white hover:text-amber-400 transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {item.flavor && <span>Flavor: {item.flavor}</span>}
                          {item.flavor && item.size && <span> • </span>}
                          {item.size && <span>{item.size}</span>}
                        </div>
                        <div className="text-xs font-bold text-amber-400 mt-1 sm:hidden">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#232a3b] rounded-lg bg-[#141822]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="hidden sm:block text-right">
                        <div className="text-sm font-black text-amber-400">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="text-xs text-gray-500 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                          </div>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Right (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0e121a] border border-[#1f2638] rounded-2xl p-6 space-y-6 shadow-xl">
                <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-[#1f2638]">
                  Order Summary
                </h3>

                {/* Coupon Box */}
                <div className="space-y-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" /> Code &quot;{appliedCoupon}&quot; applied
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-rose-400 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCouponSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError("");
                        }}
                        placeholder="Coupon (e.g. ALPHAFIRST10)"
                        className="flex-1 p-2 bg-[#141822] border border-[#232a3b] rounded-xl text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#1b2230] hover:bg-amber-500 hover:text-black text-gray-200 text-xs font-bold rounded-xl border border-[#283247] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-xs pt-2 border-t border-[#1f2638]">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-400">FREE</strong>
                      ) : (
                        `₹${shippingFee.toLocaleString("en-IN")}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#1f2638]">
                    <span>Total</span>
                    <span className="text-xl text-amber-400">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Authentic &amp; Insured Express Delivery</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#0e121a] border border-[#1f2638] rounded-3xl p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#141822] border border-[#232b3d] flex items-center justify-center text-gray-500 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Your Cart is Currently Empty</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Add your favorite imported proteins, creatine, and performance stacks to begin your transformation.
            </p>
            <Link
              href="/collections/all"
              className="inline-block px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider"
            >
              Start Shopping Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
