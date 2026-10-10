'use client';

import React from 'react';
import { Tag, Sparkles, Copy, CheckCircle, Percent, Gift, ArrowRight } from 'lucide-react';
import { COUPONS } from '../../lib/data';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import Link from 'next/link';

export default function OffersPage() {
  const { applyCoupon, appliedCoupon } = useCart();
  const { showToast } = useToast();

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    showToast(`Coupon ${code} applied to your bag!`, 'Savings will reflect at checkout', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black uppercase">
          <Tag className="w-3.5 h-3.5" />
          Exclusive Berlin Deals
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Coupons & Discounts
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Enjoy mouth-watering savings on your favorite fast-food burgers, stone-baked pizzas, and loaded sides.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COUPONS.map((coupon) => {
          const isApplied = appliedCoupon?.code === coupon.code;
          return (
            <div
              key={coupon.id}
              className={`relative p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between gap-6 ${
                isApplied
                  ? 'bg-gradient-to-br from-red-950/40 to-zinc-900 border-red-500 shadow-xl shadow-red-950/30'
                  : 'bg-zinc-900/80 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-black tracking-wider text-red-500 uppercase">
                    {coupon.code}
                  </span>
                  {coupon.firstOrderOnly && (
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      ⭐ 1st Order Only
                    </span>
                  )}
                  {isApplied && (
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ✓ Active in Bag
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white">
                  {coupon.discountType === 'fixed'
                    ? `Flat ₹${coupon.discountValue} OFF`
                    : `${coupon.discountValue}% OFF (Up to ₹${coupon.maxDiscount})`}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {coupon.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="text-[11px] text-zinc-500 font-semibold">
                  Min. Order: <strong className="text-zinc-300">₹{coupon.minOrderValue}</strong>
                </div>

                <Button
                  variant={isApplied ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleCopyAndApply(coupon.code)}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isApplied ? 'Applied' : 'Copy & Apply'}</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ordering Banner */}
      <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-white">Ready to redeem your discount?</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Head over to the menu, customize your order, and apply your coupon code at checkout.
        </p>
        <Link href="/menu">
          <Button variant="primary" size="md">
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
