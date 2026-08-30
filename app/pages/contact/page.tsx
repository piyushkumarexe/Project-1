"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.data.message || "Thank you! We will get back to you shortly.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to submit message.");
      }
    } catch {
      setErrorMsg("A network error occurred. Please try again or message on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "How do I know the supplements are 100% authentic?",
      a: "Every product imported by Alpha Gains includes an official importer hologram, verifiable scratch code, and independent third-party lab testing batch certificate that you can verify in real-time on our Authenticity portal.",
    },
    {
      q: "What are your delivery timelines?",
      a: "We process and dispatch all orders on the same business day if placed before 3 PM IST. Metro deliveries arrive in 2-3 business days, while rest of India arrives within 4-5 business days.",
    },
    {
      q: "Do you offer Cash on Delivery (COD)?",
      a: "Yes! COD is available for all addresses across India up to ₹15,000. For orders above that, we recommend prepaid UPI for express priority flight handling.",
    },
    {
      q: "What is your return & refund policy?",
      a: "If you receive a damaged product or broken seal, we provide a 100% free immediate replacement or full refund within 7 days of delivery.",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-red-600 font-bold">Contact Support</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-red-600 uppercase tracking-widest">
            24/7 Dedicated Athlete Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
            Get In Touch With Alpha Gains
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Have questions about product recommendations, stack dosages, authenticity verification or your current order? Our expert nutritionists are ready to assist.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="https://wa.me/917288830003?text=Hi%20Alpha%20Gains%2C%20I%20need%20support%20with%20my%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white border border-neutral-200 hover:border-emerald-500/50 flex items-center gap-4 transition-all hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-600 uppercase">WhatsApp Support</h4>
              <p className="text-sm font-bold text-neutral-900 group-hover:text-emerald-600">+91 7288830003</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Instant replies 10 AM - 9 PM</span>
            </div>
          </a>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-600 uppercase">Email Inquiries</h4>
              <p className="text-sm font-bold text-neutral-900">support@alphagains.in</p>
              <span className="text-[11px] text-neutral-600">Response within 4 business hours</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-600 uppercase">Operating Hours</h4>
              <p className="text-sm font-bold text-neutral-900">Monday – Saturday</p>
              <span className="text-[11px] text-neutral-600">10:00 AM – 8:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* Contact Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Left (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">
              Send Us A Direct Message
            </h3>

            {successMsg ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-neutral-900 uppercase">Message Sent Successfully!</h4>
                <p className="text-xs text-neutral-700">{successMsg}</p>
                <button
                  type="button"
                  onClick={() => setSuccessMsg("")}
                  className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@example.com"
                      className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Order query, Dosage advice, Lab report"
                      className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need assistance with..."
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600"
                  />
                </div>

                {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQs Right (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-neutral-900 flex justify-between items-center gap-2 hover:text-red-600"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform flex-shrink-0 ${
                        openFaq === i ? "rotate-180 text-red-600" : "text-neutral-500"
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="p-4 pt-0 text-xs text-neutral-700 leading-relaxed border-t border-neutral-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
