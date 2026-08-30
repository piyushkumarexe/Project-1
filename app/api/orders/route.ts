import { NextRequest } from "next/server";
import { CheckoutSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { safeErrorResponse, safeSuccessResponse, sanitizeString } from "@/lib/security";
import { PRODUCTS } from "@/data/products";
import { COMBOS } from "@/data/combos";

export interface StoredOrder {
  orderId: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    flavor?: string;
    size?: string;
  }[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "COD_Confirmed";
  orderStatus: "Processing" | "Packed" | "Dispatched" | "Delivered";
  trackingNumber: string;
  courierPartner: string;
  estimatedDelivery: string;
  orderNote?: string;
  createdAt: string;
}

// In-memory order store
export const ordersDatabase = new Map<string, StoredOrder>();

// Pre-populate with a couple demo orders for tracking demonstration
ordersDatabase.set("AG-2026-88192", {
  orderId: "AG-2026-88192",
  customer: {
    firstName: "Rohan",
    lastName: "Verma",
    email: "rohan.verma@example.com",
    phone: "9876543210",
  },
  shippingAddress: {
    address: "Flat 402, Elite Heights, Bandra West",
    apartment: "Tower B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    country: "India",
  },
  items: [
    {
      productId: "prod-creatine-pure",
      title: "Alpha Gains Pure Micronized Creatine Monohydrate",
      price: 999,
      quantity: 1,
      flavor: "Orange Kick",
      size: "310g",
    },
    {
      productId: "prod-preworkout",
      title: "Alpha Gains Preworkout High Focus & Intensity",
      price: 2499,
      quantity: 1,
      flavor: "Beach Cocktail",
    },
  ],
  subtotal: 3498,
  discount: 350,
  shippingFee: 199,
  total: 3347,
  paymentMethod: "upi",
  paymentStatus: "Paid",
  orderStatus: "Dispatched",
  trackingNumber: "DEL-AIR-8829104",
  courierPartner: "BlueDart Express Air",
  estimatedDelivery: "2-3 Days",
  createdAt: new Date(Date.now() - 86400000).toISOString(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: 10 order submissions per 10 minutes per IP
    const rateLimit = checkRateLimit(`orders-${ip}`, { limit: 10, windowMs: 600000 });
    if (!rateLimit.allowed) {
      return safeErrorResponse(
        `Too many checkout attempts. Please wait ${rateLimit.retryAfterSec} seconds.`,
        429,
        { "Retry-After": rateLimit.retryAfterSec.toString() }
      );
    }

    const body = await req.json();
    const validation = CheckoutSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid checkout details";
      return safeErrorResponse(errorMsg, 400);
    }

    const data = validation.data;

    // Server-side price calculation: Lookup actual prices from product/combo catalog to prevent price tampering
    let calculatedSubtotal = 0;
    const verifiedItems: StoredOrder["items"] = [];

    for (const item of data.items) {
      const product = PRODUCTS.find((p) => p.id === item.id || p.slug === item.id);
      const combo = COMBOS.find((c) => c.id === item.id || c.slug === item.id);

      let unitPrice = item.price;
      let title = item.title;

      if (product) {
        unitPrice = product.salePrice;
        title = product.title;
      } else if (combo) {
        unitPrice = combo.salePrice;
        title = combo.title;
      }

      calculatedSubtotal += unitPrice * item.quantity;
      verifiedItems.push({
        productId: item.id,
        title: sanitizeString(title, 150),
        price: unitPrice,
        quantity: item.quantity,
        flavor: item.flavor ? sanitizeString(item.flavor, 60) : undefined,
        size: item.size ? sanitizeString(item.size, 60) : undefined,
      });
    }

    // Server-side discount calculation
    let discount = 0;
    const cleanCoupon = data.couponCode ? sanitizeString(data.couponCode).toUpperCase() : "";
    if (cleanCoupon === "ALPHAFIRST10" || cleanCoupon === "SUPPX10" || cleanCoupon === "ALPHA10") {
      discount = Math.round((calculatedSubtotal * 10) / 100);
    } else if (cleanCoupon === "BULK20" || cleanCoupon === "VIP20") {
      discount = Math.round((calculatedSubtotal * 20) / 100);
    }

    // Server-side shipping fee verification
    const FREE_SHIPPING_THRESHOLD = 9999;
    const shippingFee = calculatedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 199;
    const finalTotal = Math.max(0, calculatedSubtotal - discount + shippingFee);

    // Generate unique order ID
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `AG-${new Date().getFullYear()}-${randomDigits}`;
    const trackingNum = `AG-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newOrder: StoredOrder = {
      orderId,
      customer: {
        firstName: sanitizeString(data.customer.firstName, 60),
        lastName: sanitizeString(data.customer.lastName, 60),
        email: sanitizeString(data.customer.email, 150),
        phone: sanitizeString(data.customer.phone, 20),
      },
      shippingAddress: {
        address: sanitizeString(data.shippingAddress.address, 250),
        apartment: data.shippingAddress.apartment ? sanitizeString(data.shippingAddress.apartment, 100) : undefined,
        city: sanitizeString(data.shippingAddress.city, 100),
        state: sanitizeString(data.shippingAddress.state, 100),
        pincode: sanitizeString(data.shippingAddress.pincode, 6),
        country: "India",
      },
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      discount,
      shippingFee,
      total: finalTotal,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === "cod" ? "COD_Confirmed" : "Paid",
      orderStatus: "Processing",
      trackingNumber: trackingNum,
      courierPartner: "Delhivery Express / BlueDart",
      estimatedDelivery: "3-5 Business Days",
      orderNote: data.orderNote ? sanitizeString(data.orderNote, 500) : undefined,
      createdAt: new Date().toISOString(),
    };

    ordersDatabase.set(orderId, newOrder);

    return safeSuccessResponse(newOrder, 201);
  } catch (err) {
    return safeErrorResponse("Failed to place order. Please try again.", 500);
  }
}
