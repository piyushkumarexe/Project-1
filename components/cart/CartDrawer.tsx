"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  FileText,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { LogoMark } from "@/components/layout/Logo";
import { BRAND } from "@/lib/brand";
import ProductVisual from "@/components/ui/ProductVisual";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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
    orderNote,
    setOrderNote,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [showNoteBox, setShowNoteBox] = useState(false);
  const router = useRouter();

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d1017] border-l border-[#1f2430] flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#1f2430] flex items-center justify-between bg-[#090b0e]">
            <div className="flex items-center gap-2.5">
              <LogoMark size={26} glow={false} />
              <div>
                <h2 className="text-base font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                </h2>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">
                  {BRAND.slogan}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#181e2b] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-3.5 bg-[#121622] border-b border-[#1f2430]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-300 font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                {amountNeededForFreeShipping > 0 ? (
                  <>
                    Add <strong className="text-amber-400">₹{amountNeededForFreeShipping.toLocaleString("en-IN")}</strong> for FREE Shipping
                  </>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> You unlocked FREE Express Shipping!
                  </span>
                )}
              </span>
              <span className="font-bold text-gray-400 text-[11px]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#1e2433] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-[#141824] border border-[#232b3d] flex items-center justify-center text-gray-500 mb-4">
                  <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Your cart is currently empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mb-6">
                  Browse our catalog of 100% lab-tested supplements to power up your training.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/collections/all");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg"
                >
                  Explore Best Sellers
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#1f2430]">
                {cart.map((item) => (
                  <div key={item.id} className="py-3.5 flex gap-3.5 items-start group">
                    {/* Item Visual Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-[#141822] border border-[#232b3d] overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <ProductVisual title={item.title} className="w-14 h-14 p-1" />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold text-gray-100 hover:text-amber-400 transition-colors line-clamp-2"
                      >
                        {item.title}
                      </Link>

                      {(item.flavor || item.size) && (
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          {item.flavor && <span>Flavor: {item.flavor}</span>}
                          {item.flavor && item.size && <span> • </span>}
                          {item.size && <span>{item.size}</span>}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#232a3b] rounded-md bg-[#090b0e]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xs font-bold text-amber-400">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-[10px] text-gray-500 line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                            </div>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-rose-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-[#1f2430] bg-[#090b0e] space-y-3">
              {/* Promo Coupon Form */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> {appliedCoupon} applied (-₹{discount.toLocaleString("en-IN")})
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
                  <form onSubmit={handleCouponSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError("");
                        }}
                        placeholder="Discount code (e.g. ALPHA10)"
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#141822] border border-[#232a3b] rounded-lg text-white placeholder-gray-500 uppercase focus:outline-none focus:border-amber-500"
                        maxLength={20}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#1e2433] hover:bg-amber-500 hover:text-black text-gray-200 text-xs font-bold rounded-lg border border-[#2e374d] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
              </div>

              {/* Order Note Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowNoteBox(!showNoteBox)}
                  className="text-xs text-gray-400 hover:text-amber-400 flex items-center gap-1 font-medium"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{orderNote ? "Edit order note" : "Add order note for seller"}</span>
                </button>
                {showNoteBox && (
                  <textarea
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value.slice(0, 300))}
                    placeholder="Special delivery instructions or order notes..."
                    rows={2}
                    className="w-full mt-2 p-2 text-xs bg-[#141822] border border-[#232a3b] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                )}
              </div>

              {/* Totals Summary */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#1f2430]">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-400">FREE</strong>
                    ) : (
                      `₹${shippingFee.toLocaleString("en-IN")}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-1 border-t border-[#1f2430]">
                  <span>Total</span>
                  <span className="text-amber-400">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[10px] text-gray-500 text-center">
                  Taxes and shipping calculated at checkout.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-bit Encrypted Secure Checkout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
