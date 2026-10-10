'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Coupon } from '../types/index';
import { COUPONS } from '../lib/data';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { showToast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('berlin_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('berlin_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch {
      // Ignored
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('berlin_cart', JSON.stringify(items));
    } catch {
      // Ignored
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      // Check if item with same configuration already exists
      const existingIndex = prev.findIndex((i) => i.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + newItem.quantity;
        updated[existingIndex].quantity = newQty;
        updated[existingIndex].totalPrice = updated[existingIndex].unitPrice * newQty;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`Added ${newItem.name} to cart!`, 'View in your cart drawer', 'success');
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: qty, totalPrice: item.unitPrice * qty }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed', undefined, 'info');
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('berlin_cart');
    localStorage.removeItem('berlin_coupon');
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'fixed') {
      discountAmount = Math.min(appliedCoupon.discountValue, subtotal);
    } else {
      const pct = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      discountAmount = appliedCoupon.maxDiscount ? Math.min(pct, appliedCoupon.maxDiscount) : pct;
    }
  } else if (appliedCoupon && subtotal < appliedCoupon.minOrderValue) {
    // Subtotal dropped below min order value
    setAppliedCoupon(null);
    localStorage.removeItem('berlin_coupon');
  }

  const deliveryFee = items.length === 0 ? 0 : subtotal >= 1000 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.toUpperCase().trim();
    const coupon = COUPONS.find((c) => c.code === cleanCode);

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Add items worth ₹${coupon.minOrderValue - subtotal} more to apply this coupon.`,
      };
    }

    setAppliedCoupon(coupon);
    localStorage.setItem('berlin_coupon', JSON.stringify(coupon));
    showToast('Coupon Applied!', coupon.description, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('berlin_coupon');
    showToast('Coupon removed', undefined, 'info');
  };

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        subtotal,
        deliveryFee,
        tax,
        totalAmount,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
