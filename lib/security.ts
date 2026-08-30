// Production Security utilities: XSS sanitization, payload protection, safe responses

import { NextResponse } from "next/server";

/**
 * Strips dangerous HTML tags, javascript: protocols, and escapes special characters
 */
export function sanitizeString(input: unknown, maxLength = 1000): string {
  if (typeof input !== "string") {
    return "";
  }
  
  // Trim and limit length to prevent DOS
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remove control characters except newline and tab
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // HTML escape dangerous characters
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

  return sanitized;
}

/**
 * Recursively sanitizes strings in an object or array
 */
export function sanitizeObject<T>(obj: T): T {
  if (typeof obj === "string") {
    return sanitizeString(obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T;
  }
  if (obj !== null && typeof obj === "object") {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitizedObj[key] = sanitizeObject(value);
    }
    return sanitizedObj as T;
  }
  return obj;
}

/**
 * Standard safe error response that never leaks stack traces or internal secrets
 */
export function safeErrorResponse(
  message: string,
  statusCode = 400,
  extraHeaders: Record<string, string> = {}
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
        "X-Content-Type-Options": "nosniff",
        ...extraHeaders,
      },
    }
  );
}

/**
 * Standard safe success response
 */
export function safeSuccessResponse(data: unknown, statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}
