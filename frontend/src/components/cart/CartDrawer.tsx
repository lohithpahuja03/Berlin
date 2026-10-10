'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export const CartDrawer: React.FC = () => {
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
    isDrawerOpen,
    closeDrawer,
    totalItemCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isDrawerOpen) return null;

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

  const handleCheckoutClick = () => {
    closeDrawer();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col z-10 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Your Berlin Bag ({totalItemCount})
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your cart is feeling lonely.</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mt-1">
                    Add some smashed burgers, crispy chicken, or loaded peri-peri fries!
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    closeDrawer();
                    router.push('/menu');
                  }}
                  className="mt-2"
                >
                  Explore Menu
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                  <span>Selected Items</span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                        {/* Customization Details */}
                        <div className="space-y-0.5 mt-0.5">
                          {item.size && (
                            <span className="text-[11px] text-zinc-400 block">
                              Size: <strong className="text-zinc-200">{item.size.name}</strong>
                            </span>
                          )}
                          {item.addons.length > 0 && (
                            <span className="text-[10px] text-zinc-400 block line-clamp-1">
                              Extras: {item.addons.map((a) => a.name).join(', ')}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-bold text-white mt-1">
                          ₹{item.unitPrice} each
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-500 hover:text-red-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Adjustment & Total */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                      <div className="flex items-center border border-zinc-700/60 rounded-lg bg-zinc-950 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-extrabold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-extrabold text-white">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Free Delivery Banner */}
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                  {subtotal >= 1000 ? (
                    <span className="text-red-300 font-semibold">
                      🎉 You unlocked FREE Delivery!
                    </span>
                  ) : (
                    <span className="text-zinc-300">
                      Add items worth <strong className="text-white">₹{1000 - subtotal}</strong> more for Free Delivery!
                    </span>
                  )}
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <div>
                          <span className="font-bold text-emerald-300 uppercase">
                            {appliedCoupon.code}
                          </span>
                          <span className="text-[11px] text-emerald-400 block">
                            -₹{discountAmount} SAVED
                          </span>
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
                          <Tag className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Enter coupon (e.g. WELCOME100)"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 uppercase outline-none focus:border-red-500"
                          />
                        </div>
                        <Button variant="secondary" size="sm" type="submit">
                          Apply
                        </Button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-400 pl-1">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Pricing Summary & Checkout Button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/90 space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Food Subtotal</span>
                  <span className="text-zinc-200">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Applied</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (5% GST)</span>
                  <span className="text-zinc-200">₹{tax}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount</span>
                  <span className="text-base text-red-500">₹{totalAmount}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleCheckoutClick}
                className="w-full shadow-xl shadow-red-900/30"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
