import { v4 as uuidv4 } from 'uuid';
import { db } from '../models/db.js';
import { CONFIG } from '../config/index.js';
import { PricingService, RawOrderItemInput } from './pricingService.js';
import { DiscountService } from './discountService.js';
import {
  Order,
  PaymentMethod,
  PaymentStatus,
  OrderStatus,
  OrderTimelineEvent,
  Address,
} from '../types/index.js';

export interface CreateOrderParams {
  userId: string;
  customerName: string;
  customerPhone: string;
  items: RawOrderItemInput[];
  couponCode?: string;
  paymentMethod: PaymentMethod;
  deliveryAddressId: string;
}

export class OrderService {
  /**
   * Authoritative order placement with business rule verification:
   * - Server recalculates item pricing
   * - Evaluates coupon eligibility
   * - Strictly enforces COD rules (₹699 to ₹4,999)
   * - Generates order number BER-2026-XXXXX
   * - Assigns driver and sets 5-minute cancellation window
   */
  static createOrder(params: CreateOrderParams): Order {
    const {
      userId,
      customerName,
      customerPhone,
      items: rawItems,
      couponCode,
      paymentMethod,
      deliveryAddressId,
    } = params;

    // 1. Verify address
    const address = db.getAddressById(deliveryAddressId);
    if (!address) {
      throw new Error('Please select a valid delivery address.');
    }

    // 2. Authoritative pricing calculation
    const pricing = PricingService.validateAndCalculate(rawItems);

    // 3. Discount evaluation
    const discount = DiscountService.evaluateCoupon(couponCode, pricing.subtotal, userId);
    const discountAmount = discount.isValid ? discount.discountAmount : 0;

    // 4. Final total calculation
    const totalAmount = Math.max(
      0,
      pricing.subtotal - discountAmount + pricing.deliveryFee + pricing.tax
    );

    // 5. ENFORCE CASH ON DELIVERY (COD) RULES
    if (paymentMethod === 'COD') {
      if (totalAmount < CONFIG.COD_MIN_AMOUNT) {
        throw new Error(
          `Cash on Delivery is available only for orders between ₹${CONFIG.COD_MIN_AMOUNT} and ₹${CONFIG.COD_MAX_AMOUNT}. Your current total is ₹${totalAmount}. Please select an online payment method or add more items.`
        );
      }
      if (totalAmount > CONFIG.COD_MAX_AMOUNT) {
        throw new Error(
          `Cash on Delivery is available only for orders between ₹${CONFIG.COD_MIN_AMOUNT} and ₹${CONFIG.COD_MAX_AMOUNT}. Your current total of ₹${totalAmount} exceeds the maximum limit for COD. Please pay using Paytm or Google Pay.`
        );
      }
    }

    // 6. Payment status
    const paymentStatus: PaymentStatus = paymentMethod === 'COD' ? 'PENDING' : 'PAID';

    // 7. Generate unique order ID and number
    const id = uuidv4();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `BER-2026-${randomDigits}`;

    // 8. Cancellation expiry: Current server time + 5 minutes
    const now = new Date();
    const cancelExpiresAt = new Date(
      now.getTime() + CONFIG.CANCELLATION_WINDOW_SECONDS * 1000
    ).toISOString();

    // 9. Assign driver
    const driver = db.getRandomAvailableDriver();

    // 10. Estimated delivery time (approx 25-30 minutes)
    const etaDate = new Date(now.getTime() + 28 * 60 * 1000);
    const estimatedDeliveryTime = etaDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // 11. Build timeline
    const timeline: OrderTimelineEvent[] = [
      {
        status: 'ORDER_PLACED',
        label: 'Order Placed',
        description: `Order received with ${pricing.items.length} item(s)`,
        timestamp: now.toISOString(),
        completed: true,
      },
      {
        status: 'PAYMENT_CONFIRMED',
        label: 'Payment Verified',
        description:
          paymentMethod === 'COD'
            ? 'Cash on Delivery verified'
            : 'Payment captured securely',
        timestamp: now.toISOString(),
        completed: true,
      },
      {
        status: 'PREPARING',
        label: 'Preparing in Kitchen',
        description: 'Chefs are firing up your hot meal',
        timestamp: new Date(now.getTime() + 2 * 60 * 1000).toISOString(),
        completed: true,
      },
      {
        status: 'DRIVER_ASSIGNED',
        label: 'Driver Assigned',
        description: driver ? `${driver.name} is picking up your order` : 'Driver assigned',
        timestamp: new Date(now.getTime() + 5 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        status: 'OUT_FOR_DELIVERY',
        label: 'Out for Delivery',
        description: 'On the way to your delivery address',
        timestamp: new Date(now.getTime() + 12 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        status: 'DELIVERED',
        label: 'Delivered',
        description: 'Enjoy your hot Berlin meal!',
        timestamp: etaDate.toISOString(),
        completed: false,
      },
    ];

    const order: Order = {
      id,
      orderNumber,
      userId,
      customerName,
      customerPhone,
      items: pricing.items,
      subtotal: pricing.subtotal,
      discountAmount,
      couponCode: discount.isValid ? discount.code : undefined,
      deliveryFee: pricing.deliveryFee,
      tax: pricing.tax,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderStatus: 'PREPARING',
      deliveryAddress: address,
      driver,
      createdAt: now.toISOString(),
      cancelExpiresAt,
      estimatedDeliveryTime,
      timeline,
    };

    return db.createOrder(order);
  }

  /**
   * STRICT 5-MINUTE SERVER-SIDE ORDER CANCELLATION
   */
  static cancelOrder(orderId: string, userId: string): { order: Order; message: string } {
    const order = db.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found.');
    }

    if (order.userId !== userId) {
      throw new Error('You are not authorized to cancel this order.');
    }

    if (order.orderStatus === 'CANCELLED') {
      throw new Error('This order is already cancelled.');
    }

    if (order.orderStatus === 'DELIVERED') {
      throw new Error('Completed orders cannot be cancelled.');
    }

    // Check server timestamp against cancellation window
    const now = new Date();
    const expiry = new Date(order.cancelExpiresAt);

    if (now.getTime() > expiry.getTime()) {
      throw new Error(
        'Cancellation window closed. Orders can only be cancelled within 5 minutes of placing them.'
      );
    }

    // Perform cancellation
    const updated = db.updateOrderStatus(
      order.id,
      'CANCELLED',
      'Cancelled by customer within 5-minute eligibility window'
    );

    if (!updated) {
      throw new Error('Failed to update order status.');
    }

    return {
      order: updated,
      message: 'Order has been successfully cancelled.',
    };
  }

  /**
   * Reorder items from previous order
   */
  static getReorderItems(orderId: string, userId: string): RawOrderItemInput[] {
    const order = db.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found.');
    }
    if (order.userId !== userId) {
      throw new Error('Unauthorized.');
    }

    return order.items.map((item) => ({
      productId: item.productId,
      sizeId: item.size?.id,
      addonIds: item.addons.map((a) => a.id),
      quantity: item.quantity,
    }));
  }
}
