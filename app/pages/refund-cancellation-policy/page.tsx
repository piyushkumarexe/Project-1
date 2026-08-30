import Link from "next/link";
import { ChevronRight, RotateCcw, CheckCircle2 } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-red-600 font-bold">Refund &amp; Cancellation Policy</span>
        </nav>

        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-neutral-700 leading-relaxed shadow-xl">
          <div className="border-b border-neutral-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="text-xs text-neutral-600 mt-1">Hassle-Free 7-Day Replacement &amp; Refund Guarantee</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">1. 7-Day Replacement Guarantee</h2>
            <p>
              At Alpha Gains, your satisfaction and safety are paramount. If you receive any supplement with a damaged seal, leakage, broken container, or incorrect variant, you are eligible for an immediate, 100% free replacement within 7 days of delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">2. Refund Eligibility &amp; Process</h2>
            <p>
              To process a refund or replacement:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li>Send a clear photo/video of the outer box and product batch seal to WhatsApp +91 7288830003 or support@alphagains.in.</li>
              <li>Our team approves the replacement within 4 business hours.</li>
              <li>A reverse pickup is scheduled at zero cost to you.</li>
              <li>Once inspected, refunds are credited back to your original payment method within 3-5 business days.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 uppercase">3. Order Cancellation</h2>
            <p>
              Orders can be cancelled before they are dispatched from our central warehouse. To cancel an order, please message our support team on WhatsApp immediately with your Order ID.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
