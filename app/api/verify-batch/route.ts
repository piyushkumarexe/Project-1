import { NextRequest } from "next/server";
import { BatchVerificationSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { safeErrorResponse, safeSuccessResponse, sanitizeString } from "@/lib/security";
import { LAB_REPORTS } from "@/data/labReports";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: 20 batch checks per minute per IP
    const rateLimit = checkRateLimit(`verify-batch-${ip}`, { limit: 20, windowMs: 60000 });
    if (!rateLimit.allowed) {
      return safeErrorResponse(
        `Too many batch verification requests. Please try again in ${rateLimit.retryAfterSec} seconds.`,
        429,
        { "Retry-After": rateLimit.retryAfterSec.toString() }
      );
    }

    const body = await req.json();
    const validation = BatchVerificationSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid batch code format";
      return safeErrorResponse(errorMsg, 400);
    }

    const cleanCode = sanitizeString(validation.data.batchCode).toUpperCase();
    const report = LAB_REPORTS[cleanCode];

    if (!report) {
      return safeErrorResponse(
        `Batch #${cleanCode} was not found in the verified laboratory database. Please double check the code printed on the bottom/side of your tub.`,
        404
      );
    }

    return safeSuccessResponse(report);
  } catch (err) {
    return safeErrorResponse("Unable to verify batch code. Please try again later.", 500);
  }
}
