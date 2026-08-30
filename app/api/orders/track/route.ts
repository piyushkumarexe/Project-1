import { NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { safeErrorResponse, safeSuccessResponse, sanitizeString } from "@/lib/security";
import { ordersDatabase } from "../route";

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: 20 tracking queries per minute per IP
    const rateLimit = checkRateLimit(`track-order-${ip}`, { limit: 20, windowMs: 60000 });
    if (!rateLimit.allowed) {
      return safeErrorResponse(
        `Too many tracking attempts. Please wait ${rateLimit.retryAfterSec} seconds.`,
        429,
        { "Retry-After": rateLimit.retryAfterSec.toString() }
      );
    }

    const { searchParams } = new URL(req.url);
    const orderId = sanitizeString(searchParams.get("orderId") || "").toUpperCase();
    const phone = sanitizeString(searchParams.get("phone") || "").replace(/\D/g, "");

    if (!orderId) {
      return safeErrorResponse("Please provide an Order ID to track.", 400);
    }

    const order = ordersDatabase.get(orderId);

    if (!order) {
      return safeErrorResponse(
        `No order found matching ID "${orderId}". Please check the Order ID received in your confirmation.`,
        404
      );
    }

    // Optional phone number check for IDOR security if phone was provided
    if (phone && !order.customer.phone.includes(phone.slice(-6))) {
      return safeErrorResponse("Order ID and phone number combination does not match.", 403);
    }

    // Return sanitized tracking view without sensitive credit card details
    return safeSuccessResponse({
      orderId: order.orderId,
      customerName: `${order.customer.firstName} ${order.customer.lastName[0] || ""}.`,
      city: order.shippingAddress.city,
      state: order.shippingAddress.state,
      pincode: order.shippingAddress.pincode,
      itemCount: order.items.length,
      items: order.items.map((i) => ({ title: i.title, quantity: i.quantity })),
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod.toUpperCase(),
      orderStatus: order.orderStatus,
      trackingNumber: order.trackingNumber,
      courierPartner: order.courierPartner,
      estimatedDelivery: order.estimatedDelivery,
      createdAt: order.createdAt,
    });
  } catch {
    return safeErrorResponse("Failed to query order status.", 500);
  }
}
