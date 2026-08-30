import { NextRequest } from "next/server";
import { ContactSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { safeErrorResponse, safeSuccessResponse, sanitizeString } from "@/lib/security";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

const contactStore: ContactInquiry[] = [];

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: 5 contact messages per 5 minutes per IP to prevent spam
    const rateLimit = checkRateLimit(`contact-${ip}`, { limit: 5, windowMs: 300000 });
    if (!rateLimit.allowed) {
      return safeErrorResponse(
        `Too many contact requests. Please wait ${rateLimit.retryAfterSec} seconds before sending another message.`,
        429,
        { "Retry-After": rateLimit.retryAfterSec.toString() }
      );
    }

    const body = await req.json();
    const validation = ContactSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid contact form submission";
      return safeErrorResponse(errorMsg, 400);
    }

    const cleanData: ContactInquiry = {
      id: `INQ-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      name: sanitizeString(validation.data.name, 100),
      email: sanitizeString(validation.data.email, 150),
      phone: sanitizeString(validation.data.phone || "", 20),
      subject: sanitizeString(validation.data.subject || "General Inquiry", 150),
      message: sanitizeString(validation.data.message, 2000),
      createdAt: new Date().toISOString(),
    };

    contactStore.push(cleanData);

    return safeSuccessResponse({
      inquiryId: cleanData.id,
      message: "Thank you for reaching out! Our athlete support team will respond via WhatsApp/Email within 4 hours.",
    });
  } catch {
    return safeErrorResponse("Unable to submit contact message. Please try again.", 500);
  }
}
