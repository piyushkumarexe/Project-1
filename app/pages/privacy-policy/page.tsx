import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-red-600 font-bold">Privacy Policy</span>
        </nav>

        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-neutral-700 leading-relaxed shadow-xl">
          <div className="border-b border-neutral-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-neutral-600 mt-1">Last Updated: August 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">1. Introduction</h2>
            <p>
              Alpha Gains (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy and personal data. This Privacy Policy outlines our practices regarding collection, usage, and safeguarding of your information when you visit our website or purchase our athletic supplements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">2. Information We Collect</h2>
            <p>
              When you interact with our store or make a purchase, we collect necessary transactional data including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li>Full Name, shipping address, and PIN code.</li>
              <li>Email address and mobile / WhatsApp phone number for order tracking alerts.</li>
              <li>Encrypted transaction identifiers (we never store raw card details).</li>
              <li>Device cookies to preserve your cart items and session preferences.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">3. Data Security &amp; Encryption</h2>
            <p>
              We implement industry standard 256-bit SSL encryption, strict rate limiting, server-side payload validation, and least-privilege security controls. We never sell, rent, or trade your personal information to third-party marketing companies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">4. Contact Us</h2>
            <p>
              For privacy-related inquiries or data deletion requests, contact our Data Protection Officer at: <strong>privacy@alphagains.in</strong> or WhatsApp +91 7288830003.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
