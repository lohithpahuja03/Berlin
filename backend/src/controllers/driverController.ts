import { Request, Response } from 'express';
import { DriverService } from '../services/driverService.js';
import { db } from '../models/db.js';

export const getOrderTracking = (req: Request, res: Response): void => {
  try {
    const orderId = Array.isArray(req.params.orderId) ? req.params.orderId[0] : req.params.orderId;
    const tracking = DriverService.getLiveTracking(orderId);
    const order = db.getOrderById(orderId) || db.getOrderByNumber(orderId);

    if (!order) {
      res.status(404).json({ success: false, error: 'Order not found.' });
      return;
    }

    res.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
        cancelExpiresAt: order.cancelExpiresAt,
        estimatedDeliveryTime: order.estimatedDeliveryTime,
        timeline: order.timeline,
        items: order.items,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        deliveryAddress: order.deliveryAddress,
      },
      tracking,
    });
  } catch (err: any) {
    res.status(404).json({ success: false, error: err.message || 'Tracking unavailable.' });
  }
};
