'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/ui/Button';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    deliveryFee,
    tax,
    totalAmount,
    totalItemCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-white">Your Berlin cart is empty.</h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
          Explore our gourmet smashed burgers, stone-baked pizzas, and crispy chicken wings.
        </p>
        <div className="pt-2">
          <Link href="/menu">
            <Button variant="primary" size="lg">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-red-500">
          Order Review
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight mt-1">
          Your Shopping Cart ({totalItemCount} items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
            <span>Items in your bag</span>
            <button onClick={clearCart} className="text-red-500 hover:underline font-bold">
              Clear Cart
            </button>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white truncate">{item.name}</h3>
                  {item.size && (
                    <p className="text-xs text-zinc-400">
                      Size: <strong className="text-zinc-200">{item.size.name}</strong>
                    </p>
                  )}
                  {item.addons.length > 0 && (
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                      Extras: {item.addons.map((a) => a.name).join(', ')}
                    </p>
                  )}
                  <p className="text-xs font-extrabold text-white mt-1">₹{item.unitPrice} each</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-center">
                {/* Quantity */}
                <div className="flex items-center border border-zinc-700/60 rounded-xl bg-zinc-950 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-xs font-extrabold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-base font-black text-white min-w-[70px] text-right">
                  ₹{item.totalPrice}
                </span>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown & Checkout Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Coupon Box */}
          <div className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Discounts & Offers
            </h4>

            {appliedCoupon ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-300 uppercase">{appliedCoupon.code}</span>
                    <span className="text-[11px] text-emerald-400 block">-₹{discountAmount} SAVED</span>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-zinc-400 hover:text-red-400 underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. WELCOME100)"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 uppercase outline-none focus:border-red-500 font-medium"
                    />
                  </div>
                  <Button variant="secondary" size="md" type="submit">
                    Apply
                  </Button>
                </div>
                {couponError && <p className="text-[11px] text-red-400 pl-1">{couponError}</p>}
              </form>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide">Bill Summary</h3>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Food Item Subtotal</span>
                <span className="text-zinc-200 font-semibold">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5% GST)</span>
                <span className="text-zinc-200 font-semibold">₹{tax}</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-zinc-800">
                <span>To Pay</span>
                <span className="text-xl text-red-500">₹{totalAmount}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/checkout')}
              className="w-full shadow-xl shadow-red-900/30"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
