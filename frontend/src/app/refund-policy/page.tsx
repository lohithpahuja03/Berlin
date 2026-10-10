import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-zinc-300">
      <h1 className="text-3xl font-black text-white">Cancellation & Refund Policy</h1>
      <p className="text-xs text-zinc-400">Effective as of October 2026</p>

      <div className="space-y-4 text-sm leading-relaxed">
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-base font-bold text-white mb-2">1. Five-Minute Order Cancellation Window</h2>
          <p className="text-xs text-zinc-300">
            Due to our commitment to lightning-fast fresh food preparation, <strong>orders can only be cancelled within 5 minutes (300 seconds)</strong> from the time of placement.
            Once 5 minutes have elapsed, our kitchen team has already begun grilling and stretching your food, and cancellation is strictly unavailable.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-base font-bold text-white mb-2">2. Cash on Delivery (COD) Rules</h2>
          <p className="text-xs text-zinc-300">
            Cash on Delivery is available for eligible order totals between <strong>₹699 and ₹4,999 inclusive</strong>.
            Orders below ₹699 or above ₹4,999 must be prepaid using supported digital wallets (Paytm, Google Pay).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-base font-bold text-white mb-2">3. Refund Processing</h2>
          <p className="text-xs text-zinc-300">
            For online prepaid orders successfully cancelled within the 5-minute window or in case of verified quality issues, full refunds are issued back to the original source within 3–5 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
