import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { OrderService } from '../services/orderService.js';
import { PricingService } from '../services/pricingService.js';
import { DiscountService } from '../services/discountService.js';
import { db } from '../models/db.js';

export const previewPricing = (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { items, couponCode } = req.body;
    const userId = req.user?.id || 'guest';

    const pricing = PricingService.validateAndCalculate(items);
    const discount = DiscountService.evaluateCoupon(couponCode, pricing.subtotal, userId);
    const discountAmount = discount.isValid ? discount.discountAmount : 0;
    const totalAmount = Math.max(
      0,
      pricing.subtotal - discountAmount + pricing.deliveryFee + pricing.tax
    );

    res.json({
      success: true,
      breakdown: {
        items: pricing.items,
        subtotal: pricing.subtotal,
        discountAmount,
        couponCode: discount.isValid ? discount.code : undefined,
        deliveryFee: pricing.deliveryFee,
        tax: pricing.tax,
        totalAmount,
        codEligible: totalAmount >= 699 && totalAmount <= 4999,
        codEligibilityMessage:
          totalAmount >= 699 && totalAmount <= 4999
            ? 'Eligible for Cash on Delivery (COD)'
            : totalAmount < 699
            ? 'Cash on Delivery is available only on orders from ₹699'
            : 'Cash on Delivery limit is ₹4,999. Please pay online.',
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message || 'Pricing preview failed.' });
  }
};

export const createOrder = (req: AuthenticatedRequest, res: Response): void => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Please log in to place an order.' });
      return;
    }

    const { items, couponCode, paymentMethod, deliveryAddressId } = req.body;

    if (!items || !items.length) {
      res.status(400).json({ success: false, error: 'Your cart is empty.' });
      return;
    }

    if (!paymentMethod || !['COD', 'PAYTM', 'GPAY'].includes(paymentMethod)) {
      res.status(400).json({ success: false, error: 'Invalid payment method.' });
      return;
    }

    if (!deliveryAddressId) {
      res.status(400).json({ success: false, error: 'Please select a delivery address.' });
      return;
    }

    const order = OrderService.createOrder({
      userId: req.user.id,
      customerName: req.user.name,
      customerPhone: req.body.customerPhone || '9876543210',
      items,
      couponCode,
      paymentMethod,
      deliveryAddressId,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message || 'Failed to place order.' });
  }
};

export const getOrderById = (req: AuthenticatedRequest, res: Response): void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const order = db.getOrderById(id) || db.getOrderByNumber(id);

  if (!order) {
    res.status(404).json({ success: false, error: 'Order not found.' });
    return;
  }

  // Allow order owner or admin (or public tracking if order ID is known)
  res.json({ success: true, order });
};

export const getMyOrders = (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Unauthorized.' });
    return;
  }

  const orders = db.getOrdersByUserId(req.user.id);
  res.json({ success: true, count: orders.length, orders });
};

export const cancelOrder = (req: AuthenticatedRequest, res: Response): void => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized.' });
      return;
    }

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = OrderService.cancelOrder(id, req.user.id);

    res.json({
      success: true,
      message: result.message,
      order: result.order,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message || 'Cancellation failed.' });
  }
};

export const reorder = (req: AuthenticatedRequest, res: Response): void => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized.' });
      return;
    }

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const items = OrderService.getReorderItems(id, req.user.id);

    res.json({
      success: true,
      message: 'Reorder items retrieved successfully.',
      items,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message || 'Reorder failed.' });
  }
};
