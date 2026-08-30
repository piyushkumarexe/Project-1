import { NextRequest } from "next/server";
import { ReviewSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { safeErrorResponse, safeSuccessResponse, sanitizeString } from "@/lib/security";

interface StoredReview {
  id: string;
  productId: string;
  rating: number;
  author: string;
  email: string;
  title: string;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

const reviewsStore: StoredReview[] = [];

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: 3 reviews per 5 minutes per IP
    const rateLimit = checkRateLimit(`reviews-${ip}`, { limit: 3, windowMs: 300000 });
    if (!rateLimit.allowed) {
      return safeErrorResponse(
        `Rate limit exceeded. Please wait ${rateLimit.retryAfterSec} seconds before submitting another review.`,
        429,
        { "Retry-After": rateLimit.retryAfterSec.toString() }
      );
    }

    const body = await req.json();
    const validation = ReviewSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid review data";
      return safeErrorResponse(errorMsg, 400);
    }

    const newReview: StoredReview = {
      id: `REV-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      productId: sanitizeString(validation.data.productId, 100),
      rating: validation.data.rating,
      author: sanitizeString(validation.data.author, 80),
      email: sanitizeString(validation.data.email, 150),
      title: sanitizeString(validation.data.title, 120),
      comment: sanitizeString(validation.data.comment, 1500),
      createdAt: new Date().toISOString(),
      verifiedPurchase: true,
    };

    reviewsStore.push(newReview);

    return safeSuccessResponse({
      reviewId: newReview.id,
      message: "Thank you! Your verified review has been submitted and will appear on the store shortly.",
    });
  } catch {
    return safeErrorResponse("Unable to submit review. Please try again.", 500);
  }
}
