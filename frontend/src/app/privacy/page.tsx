import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-zinc-300">
      <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
      <p className="text-xs text-zinc-400">Last updated: October 2026</p>

      <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
        <p>
          At Berlin, we value your privacy. We collect customer names, contact numbers, email addresses, and delivery addresses strictly for processing food orders and providing real-time delivery tracking.
        </p>
        <h2 className="text-base font-bold text-white pt-2">1. Driver Location Data</h2>
        <p>
          Driver coordinates and delivery location data are shared securely only during active order fulfillment to show your food delivery progress.
        </p>
        <h2 className="text-base font-bold text-white pt-2">2. Data Security</h2>
        <p>
          Passwords are salted and securely hashed using bcrypt encryption. We do not store plain-text payment credentials.
        </p>
      </div>
    </div>
  );
}
