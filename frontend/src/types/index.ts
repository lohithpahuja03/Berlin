export type Role = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  houseFlat: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  deliveryInstructions?: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  sortOrder: number;
}

export interface ProductSize {
  id: string;
  name: string;
  priceModifier: number;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
  type: 'cheese' | 'patty' | 'sauce' | 'topping' | 'dip' | 'egg' | 'extra';
}

export interface Product {
  id: string;
  categoryId: string;
  categorySlug: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  image: string;
  rating: number;
  reviewCount: number;
  isVeg: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isAvailable: boolean;
  ingredients: string[];
  sizes: ProductSize[];
  addons: ProductAddon[];
}

export interface CartItem {
  id: string; // unique item id based on product + customizations
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  size?: ProductSize;
  addons: ProductAddon[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  firstOrderOnly?: boolean;
  isActive: boolean;
}

export type PaymentMethod = 'COD' | 'PAYTM' | 'GPAY';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type OrderStatus =
  | 'ORDER_PLACED'
  | 'PAYMENT_CONFIRMED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'DRIVER_ASSIGNED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  vehicleNumber: string;
  vehicleType: string;
  rating: number;
  currentLat: number;
  currentLng: number;
  isAvailable: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  size?: ProductSize;
  addons: ProductAddon[];
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  deliveryAddress: Address;
  driver?: Driver;
  createdAt: string;
  cancelExpiresAt: string;
  estimatedDeliveryTime: string;
  timeline: OrderTimelineEvent[];
}
