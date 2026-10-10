import { db } from '../models/db.js';
import { CONFIG } from '../config/index.js';
import { OrderItem } from '../types/index.js';

export interface RawOrderItemInput {
  productId: string;
  sizeId?: string;
  addonIds?: string[];
  quantity: number;
}

export interface ValidatedPricingBreakdown {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  estimatedTotalBeforeDiscount: number;
}

export class PricingService {
  /**
   * Authoritatively validate items and recalculate unit prices and subtotals.
   * Client-submitted prices are NEVER trusted.
   */
  static validateAndCalculate(rawItems: RawOrderItemInput[]): ValidatedPricingBreakdown {
    if (!rawItems || rawItems.length === 0) {
      throw new Error('Order must contain at least one item.');
    }

    const validatedItems: OrderItem[] = [];
    let subtotal = 0;

    for (const itemInput of rawItems) {
      const product = db.getProductById(itemInput.productId);
      if (!product) {
        throw new Error(`Product not found: ${itemInput.productId}`);
      }
      if (!product.isAvailable) {
        throw new Error(`Product "${product.name}" is currently unavailable.`);
      }

      const qty = Math.max(1, Math.min(20, Math.floor(itemInput.quantity || 1)));

      // Validate size
      let selectedSize = undefined;
      let sizePriceModifier = 0;
      if (itemInput.sizeId) {
        selectedSize = product.sizes.find((s) => s.id === itemInput.sizeId);
        if (!selectedSize) {
          throw new Error(`Invalid size for product "${product.name}".`);
        }
        sizePriceModifier = selectedSize.priceModifier;
      }

      // Validate addons
      const selectedAddons = [];
      let addonsPriceTotal = 0;
      if (itemInput.addonIds && Array.isArray(itemInput.addonIds)) {
        for (const addonId of itemInput.addonIds) {
          const addon = product.addons.find((a) => a.id === addonId);
          if (addon) {
            selectedAddons.push(addon);
            addonsPriceTotal += addon.price;
          }
        }
      }

      const unitPrice = product.basePrice + sizePriceModifier + addonsPriceTotal;
      const totalPrice = unitPrice * qty;
      subtotal += totalPrice;

      validatedItems.push({
        productId: product.id,
        name: product.name,
        image: product.image,
        quantity: qty,
        size: selectedSize,
        addons: selectedAddons,
        unitPrice,
        totalPrice,
      });
    }

    const deliveryFee =
      subtotal >= CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : CONFIG.DEFAULT_DELIVERY_FEE;
    const tax = Math.round(subtotal * CONFIG.TAX_RATE);
    const estimatedTotalBeforeDiscount = subtotal + deliveryFee + tax;

    return {
      items: validatedItems,
      subtotal,
      deliveryFee,
      tax,
      estimatedTotalBeforeDiscount,
    };
  }
}
