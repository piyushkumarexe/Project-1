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
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-red-600 font-bold">Shopping Cart</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
              Your Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h1>
            <p className="text-xs text-neutral-600 mt-1">
              100% Genuine Imported Supplements with Free Shipping over ₹9,999
            </p>
          </div>

          <Link
            href="/collections/all"
            className="px-6 py-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200 font-bold text-xs uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Table Left (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping bar */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-700 font-medium flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-red-600" />
                    {amountNeededForFreeShipping > 0 ? (
                      <>
                        Add <strong className="text-red-600">₹{amountNeededForFreeShipping.toLocaleString("en-IN")}</strong> more to get FREE Express Air Shipping!
                      </>
                    ) : (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> You unlocked FREE Express Air Shipping!
                      </span>
                    )}
                  </span>
                  <span className="text-neutral-600 font-bold">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 divide-y divide-neutral-200">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <ProductVisual title={item.title} className="w-14 h-14 p-1" />
                      </div>
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-bold text-sm text-neutral-900 hover:text-red-600 transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <div className="text-xs text-neutral-600 mt-0.5">
                          {item.flavor && <span>Flavor: {item.flavor}</span>}
                          {item.flavor && item.size && <span> • </span>}
                          {item.size && <span>{item.size}</span>}
                        </div>
                        <div className="text-xs font-bold text-red-600 mt-1 sm:hidden">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Quantity */}
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-neutral-600 hover:text-black"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-neutral-900">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-neutral-600 hover:text-black"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="hidden sm:block text-right">
                        <div className="text-sm font-black text-red-600">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="text-xs text-neutral-500 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                          </div>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-rose-600 p-1 transition-colors"
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
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-6 shadow-xl">
                <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider pb-3 border-b border-neutral-200">
                  Order Summary
                </h3>

                {/* Coupon Box */}
                <div className="space-y-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs">
                      <span className="font-bold text-red-600 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" /> Code &quot;{appliedCoupon}&quot; applied
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-rose-600 font-bold hover:underline"
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
                        className="flex-1 p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 uppercase focus:outline-none focus:border-red-600"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-neutral-50 hover:bg-red-600 hover:text-white text-neutral-800 text-xs font-bold rounded-xl border border-neutral-200 transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-xs pt-2 border-t border-neutral-200">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-neutral-900">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-600">FREE</strong>
                      ) : (
                        `₹${shippingFee.toLocaleString("en-IN")}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-neutral-900 pt-2 border-t border-neutral-200">
                    <span>Total</span>
                    <span className="text-xl text-red-600">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[10px] text-neutral-500 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Authentic &amp; Insured Express Delivery</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-3xl p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-500 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Your Cart is Currently Empty</h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              Add your favorite imported proteins, creatine, and performance stacks to begin your transformation.
            </p>
            <Link
              href="/collections/all"
              className="inline-block px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider"
            >
              Start Shopping Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
