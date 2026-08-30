import { z } from "zod";

// Strict validation schemas

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(150),
  phone: z.string().regex(/^[0-9+()-\s]{7,15}$/, "Invalid phone number format").optional().or(z.literal("")),
  subject: z.string().min(2).max(150).optional().or(z.literal("")),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000, "Message is too long"),
});

export const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(150),
});

export const ReviewSchema = z.object({
  productId: z.string().min(1).max(100),
  rating: z.number().int().min(1).max(5),
  author: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Invalid email address").max(150),
  title: z.string().min(2).max(120),
  comment: z.string().min(5, "Review comment must be at least 5 characters").max(1500),
});

export const BatchVerificationSchema = z.object({
  batchCode: z.string().min(3).max(50).regex(/^[A-Za-z0-9-_]+$/, "Batch code contains invalid characters"),
});

export const OrderItemSchema = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  price: z.number().positive(),
  quantity: z.number().int().min(1).max(20),
  flavor: z.string().max(100).optional(),
  size: z.string().max(100).optional(),
  image: z.string().optional(),
});

export const CheckoutSchema = z.object({
  customer: z.object({
    firstName: z.string().min(1, "First name is required").max(60),
    lastName: z.string().min(1, "Last name is required").max(60),
    email: z.string().email("Invalid email address").max(150),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  }),
  shippingAddress: z.object({
    address: z.string().min(5, "Street address is required").max(250),
    apartment: z.string().max(100).optional().or(z.literal("")),
    city: z.string().min(2, "City is required").max(100),
    state: z.string().min(2, "State is required").max(100),
    pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
    country: z.string().min(2).max(60).default("India"),
  }),
  items: z.array(OrderItemSchema).min(1, "Cart must contain at least 1 item").max(50),
  paymentMethod: z.enum(["upi", "card", "netbanking", "cod"]),
  couponCode: z.string().max(30).optional().or(z.literal("")),
  orderNote: z.string().max(500).optional().or(z.literal("")),
});
