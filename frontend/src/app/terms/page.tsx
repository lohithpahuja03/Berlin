import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-zinc-300">
      <h1 className="text-3xl font-black text-white">Terms of Service</h1>
      <p className="text-xs text-zinc-400">Last updated: October 2026</p>

      <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
        <p>
          Welcome to Berlin Fast-Food Platform. By using our website and ordering services, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <h2 className="text-base font-bold text-white pt-2">1. Menu & Pricing</h2>
        <p>
          All product prices, ingredient customization modifiers, delivery fees, and taxes are calculated authoritatively by Berlin's server-side pricing engine. Prices are displayed in Indian Rupees (₹).
        </p>
        <h2 className="text-base font-bold text-white pt-2">2. Delivery Service</h2>
        <p>
          Estimated delivery times (typically ~25 minutes) are calculated dynamically and may vary slightly due to peak hours, weather conditions, or local traffic.
        </p>
      </div>
    </div>
  );
}
