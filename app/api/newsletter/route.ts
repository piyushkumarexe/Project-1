import { NextRequest } from "next/server";
import { NewsletterSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { safeErrorResponse, safeSuccessResponse, sanitizeString } from "@/lib/security";

const subscribersStore = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: 5 newsletter signups per minute per IP
    const rateLimit = checkRateLimit(`newsletter-${ip}`, { limit: 5, windowMs: 60000 });
    if (!rateLimit.allowed) {
      return safeErrorResponse(
        `Too many requests. Please wait ${rateLimit.retryAfterSec} seconds before subscribing again.`,
        429,
        { "Retry-After": rateLimit.retryAfterSec.toString() }
      );
    }

    const body = await req.json();
    const validation = NewsletterSchema.safeParse(body);
    if (!validation.success) {
      return safeErrorResponse("Please enter a valid email address.", 400);
    }

    const cleanEmail = sanitizeString(validation.data.email).toLowerCase();
    subscribersStore.add(cleanEmail);

    return safeSuccessResponse({
      message: "Successfully subscribed to Alpha Gains VIP athlete club!",
      couponCode: "ALPHAFIRST10",
      discount: "10% OFF",
    });
  } catch {
    return safeErrorResponse("Failed to process subscription.", 500);
  }
}
