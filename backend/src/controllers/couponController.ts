import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { DiscountService } from '../services/discountService.js';
import { db } from '../models/db.js';

export const validateCoupon = (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { code, subtotal } = req.body;
    const userId = req.user?.id || 'guest';

    if (!code || typeof subtotal !== 'number') {
      res.status(400).json({ success: false, error: 'Code and subtotal are required.' });
      return;
    }

    const result = DiscountService.evaluateCoupon(code, subtotal, userId);
    if (!result.isValid) {
      res.status(400).json({ success: false, error: result.errorMessage || 'Invalid coupon.' });
      return;
    }

    res.json({
      success: true,
      coupon: {
        code: result.code,
        description: result.description,
        discountAmount: result.discountAmount,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Coupon evaluation failed.' });
  }
};

export const getAvailableCoupons = (_req: AuthenticatedRequest, res: Response): void => {
  res.json({
    success: true,
    coupons: db.getAllCoupons(),
  });
};
