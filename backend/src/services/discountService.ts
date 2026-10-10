import { db } from '../models/db.js';
import { DiscountCalculation } from '../types/index.js';

export class DiscountService {
  /**
   * Validate coupon code against subtotal and customer history
   */
  static evaluateCoupon(
    code: string | undefined,
    subtotal: number,
    userId: string
  ): DiscountCalculation {
    if (!code || !code.trim()) {
      return {
        isValid: false,
        code: '',
        description: '',
        discountAmount: 0,
      };
    }

    const cleanCode = code.toUpperCase().trim();
    const coupon = db.getCoupon(cleanCode);

    if (!coupon || !coupon.isActive) {
      return {
        isValid: false,
        code: cleanCode,
        description: '',
        discountAmount: 0,
        errorMessage: 'Invalid or expired coupon code.',
      };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        isValid: false,
        code: cleanCode,
        description: coupon.description,
        discountAmount: 0,
        errorMessage: `Coupon requires minimum order value of ₹${coupon.minOrderValue}. Add items worth ₹${coupon.minOrderValue - subtotal} more.`,
      };
    }

    if (coupon.firstOrderOnly) {
      const pastOrders = db.getOrdersByUserId(userId);
      if (pastOrders.length > 0) {
        return {
          isValid: false,
          code: cleanCode,
          description: coupon.description,
          discountAmount: 0,
          errorMessage: 'This coupon is valid only on your first Berlin order.',
        };
      }
    }

    let discountAmount = 0;
    if (coupon.discountType === 'fixed') {
      discountAmount = Math.min(coupon.discountValue, subtotal);
    } else if (coupon.discountType === 'percentage') {
      const computed = Math.round((subtotal * coupon.discountValue) / 100);
      discountAmount = coupon.maxDiscount ? Math.min(computed, coupon.maxDiscount) : computed;
    }

    return {
      isValid: true,
      code: coupon.code,
      description: coupon.description,
      discountAmount,
    };
  }
}
