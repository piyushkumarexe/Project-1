"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  quantity: number;
  flavor?: string;
  size?: string;
  image: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: "success" | "info" | "error";
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isAgeVerified: boolean;
  setIsAgeVerified: (verified: boolean) => void;
  addToCart: (product: Product, options?: { flavor?: string; size?: string; quantity?: number; price?: number }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  subtotal: number;
  discount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string; discountPercent?: number };
  removeCoupon: () => void;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  total: number;
  orderNote: string;
  setOrderNote: (note: string) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 9999;
const STANDARD_SHIPPING_FEE = 199;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAgeVerified, setIsAgeVerified] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [orderNote, setOrderNote] = useState<string>("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem("alpha_gains_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("alpha_gains_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedAge = localStorage.getItem("alpha_gains_age_verified");
      if (savedAge === "true") {
        setIsAgeVerified(true);
      } else if (savedAge === "false") {
        setIsAgeVerified(false);
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
  }, []);

  // Save Cart
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("alpha_gains_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cart, isMounted]);

  // Save Wishlist
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("alpha_gains_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [wishlist, isMounted]);

  const addToast = (title: string, message: string, type: "success" | "info" | "error" = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    options: { flavor?: string; size?: string; quantity?: number; price?: number } = {}
  ) => {
    const flavor = options.flavor || (product.flavors && product.flavors[0]) || undefined;
    const size = options.size || (product.sizes && product.sizes[0]) || undefined;
    const quantity = options.quantity || 1;
    const price = options.price || product.salePrice;
    
    // Unique cart item identifier based on product + flavor + size
    const cartItemId = `${product.id}-${flavor || "default"}-${size || "default"}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity = Math.min(20, updated[existingIndex].quantity + quantity);
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            productId: product.id,
            slug: product.slug,
            title: product.title,
            brand: product.brand,
            price: price,
            originalPrice: product.originalPrice,
            quantity: quantity,
            flavor: flavor,
            size: size,
            image: product.image,
          },
        ];
      }
    });

    addToast("Added to Cart", `${product.title} has been added to your shopping bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast("Removed", "Item removed from your cart", "info");
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: Math.min(20, quantity) } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast("Wishlist", "Item removed from your wishlist", "info");
        return prev.filter((id) => id !== productId);
      } else {
        addToast("Wishlist", "Item saved to your wishlist!");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "ALPHAFIRST10" || cleanCode === "SUPPX10" || cleanCode === "ALPHA10") {
      setAppliedCoupon(cleanCode);
      setCouponDiscountPercent(10);
      addToast("Coupon Applied!", "10% Discount applied to your order!");
      return { success: true, message: "10% discount applied successfully!", discountPercent: 10 };
    }
    if (cleanCode === "BULK20" || cleanCode === "VIP20") {
      setAppliedCoupon(cleanCode);
      setCouponDiscountPercent(20);
      addToast("Coupon Applied!", "20% Elite Bulk Discount applied!");
      return { success: true, message: "20% bulk discount applied successfully!", discountPercent: 20 };
    }
    addToast("Invalid Code", "Please enter a valid coupon code.", "error");
    return { success: false, message: "Invalid coupon code" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscountPercent(0);
    addToast("Coupon Removed", "Discount code removed", "info");
  };

  const discount = Math.round((subtotal * couponDiscountPercent) / 100);
  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const total = Math.max(0, subtotal - discount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isAgeVerified,
        setIsAgeVerified,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
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
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
