import { NextRequest } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { safeErrorResponse, safeSuccessResponse, sanitizeString } from "@/lib/security";

const CouponSchema = z.object({
  code: z.string().min(2).max(30),
});

const VALID_COUPONS: Record<string, { discountPercent: number; description: string }> = {
  ALPHAFIRST10: { discountPercent: 10, description: "10% off for new athletes" },
  SUPPX10: { discountPercent: 10, description: "10% off welcome code" },
  ALPHA10: { discountPercent: 10, description: "10% site-wide discount" },
  BULK20: { discountPercent: 20, description: "20% VIP bulk stack discount" },
  VIP20: { discountPercent: 20, description: "20% Pro athlete discount" },
};

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit coupon attempts: 15 per minute per IP to prevent brute force
    const rateLimit = checkRateLimit(`coupon-check-${ip}`, { limit: 15, windowMs: 60000 });
    if (!rateLimit.allowed) {
      return safeErrorResponse(
        `Too many coupon attempts. Please try again in ${rateLimit.retryAfterSec} seconds.`,
        429,
        { "Retry-After": rateLimit.retryAfterSec.toString() }
      );
    }

    const body = await req.json();
    const validation = CouponSchema.safeParse(body);
    if (!validation.success) {
      return safeErrorResponse("Invalid coupon code format.", 400);
    }

    const cleanCode = sanitizeString(validation.data.code).toUpperCase();
    const coupon = VALID_COUPONS[cleanCode];

    if (!coupon) {
      return safeErrorResponse("Invalid or expired coupon code.", 404);
    }

    return safeSuccessResponse({
      code: cleanCode,
      discountPercent: coupon.discountPercent,
      description: coupon.description,
    });
  } catch {
    return safeErrorResponse("Failed to validate coupon code.", 500);
  }
}
