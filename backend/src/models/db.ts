import bcrypt from 'bcryptjs';
import {
  User,
  Address,
  Category,
  Product,
  Coupon,
  Driver,
  Order,
  OrderStatus,
} from '../types/index.js';
import {
  SEED_CATEGORIES,
  SEED_PRODUCTS,
  SEED_DRIVERS,
  SEED_COUPONS,
} from '../data/seedData.js';

class BerlinDatabase {
  private users: Map<string, User> = new Map();
  private addresses: Map<string, Address> = new Map();
  private categories: Map<string, Category> = new Map();
  private products: Map<string, Product> = new Map();
  private coupons: Map<string, Coupon> = new Map();
  private drivers: Map<string, Driver> = new Map();
  private orders: Map<string, Order> = new Map();

  constructor() {
    this.seed();
  }

  private seed() {
    // Seed categories
    for (const cat of SEED_CATEGORIES) {
      this.categories.set(cat.id, cat);
    }

    // Seed products
    for (const prod of SEED_PRODUCTS) {
      this.products.set(prod.id, prod);
    }

    // Seed coupons
    for (const coup of SEED_COUPONS) {
      this.coupons.set(coup.code.toUpperCase(), coup);
    }

    // Seed drivers
    for (const driver of SEED_DRIVERS) {
      this.drivers.set(driver.id, { ...driver });
    }

    // Seed a demo user: demo@berlin.food / Berlin123!
    const demoPasswordHash = bcrypt.hashSync('Berlin123!', 10);
    const demoUser: User = {
      id: 'usr-demo-01',
      name: 'Max Keller',
      email: 'demo@berlin.food',
      phone: '+91 98765 01234',
      passwordHash: demoPasswordHash,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    this.users.set(demoUser.id, demoUser);

    // Seed a default address for demo user
    const demoAddress: Address = {
      id: 'addr-demo-01',
      userId: demoUser.id,
      name: 'Max Keller',
      phone: '+91 98765 01234',
      houseFlat: 'Penthouse 402, Skyline Towers',
      street: 'DLF Cyber City Road, Phase 2',
      area: 'Cyber City',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      deliveryInstructions: 'Ring the bell twice, leave with concierge if unavailable.',
      isDefault: true,
      latitude: 28.4900,
      longitude: 77.0900,
    };
    this.addresses.set(demoAddress.id, demoAddress);
  }

  // --- Users ---
  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    const cleanEmail = email.toLowerCase().trim();
    for (const user of this.users.values()) {
      if (user.email.toLowerCase() === cleanEmail) {
        return user;
      }
    }
    return undefined;
  }

  createUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  // --- Addresses ---
  getAddressesByUserId(userId: string): Address[] {
    const results: Address[] = [];
    for (const addr of this.addresses.values()) {
      if (addr.userId === userId) {
        results.push(addr);
      }
    }
    return results;
  }

  getAddressById(id: string): Address | undefined {
    return this.addresses.get(id);
  }

  createAddress(address: Address): Address {
    if (address.isDefault) {
      // Unset other defaults for this user
      for (const addr of this.addresses.values()) {
        if (addr.userId === address.userId) {
          addr.isDefault = false;
        }
      }
    }
    this.addresses.set(address.id, address);
    return address;
  }

  updateAddress(id: string, updates: Partial<Address>): Address | undefined {
    const existing = this.addresses.get(id);
    if (!existing) return undefined;

    if (updates.isDefault) {
      for (const addr of this.addresses.values()) {
        if (addr.userId === existing.userId) {
          addr.isDefault = false;
        }
      }
    }

    const updated = { ...existing, ...updates };
    this.addresses.set(id, updated);
    return updated;
  }

  deleteAddress(id: string, userId: string): boolean {
    const addr = this.addresses.get(id);
    if (!addr || addr.userId !== userId) return false;
    return this.addresses.delete(id);
  }

  // --- Catalog ---
  getCategories(): Category[] {
    return Array.from(this.categories.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  getCategoryBySlug(slug: string): Category | undefined {
    for (const cat of this.categories.values()) {
      if (cat.slug.toLowerCase() === slug.toLowerCase()) {
        return cat;
      }
    }
    return undefined;
  }

  getProducts(): Product[] {
    return Array.from(this.products.values());
  }

  getProductById(id: string): Product | undefined {
    return this.products.get(id);
  }

  getProductsByCategory(categorySlug: string): Product[] {
    return this.getProducts().filter(
      (p) => p.categorySlug.toLowerCase() === categorySlug.toLowerCase()
    );
  }

  searchProducts(query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getProducts();

    return this.getProducts().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }

  // --- Coupons ---
  getCoupon(code: string): Coupon | undefined {
    return this.coupons.get(code.toUpperCase().trim());
  }

  getAllCoupons(): Coupon[] {
    return Array.from(this.coupons.values()).filter((c) => c.isActive);
  }

  // --- Drivers ---
  getDrivers(): Driver[] {
    return Array.from(this.drivers.values());
  }

  getDriverById(id: string): Driver | undefined {
    return this.drivers.get(id);
  }

  getRandomAvailableDriver(): Driver | undefined {
    const available = Array.from(this.drivers.values()).filter((d) => d.isAvailable);
    if (available.length === 0) return Array.from(this.drivers.values())[0];
    return available[Math.floor(Math.random() * available.length)];
  }

  updateDriverLocation(driverId: string, lat: number, lng: number): Driver | undefined {
    const driver = this.drivers.get(driverId);
    if (!driver) return undefined;
    driver.currentLat = lat;
    driver.currentLng = lng;
    return driver;
  }

  // --- Orders ---
  createOrder(order: Order): Order {
    this.orders.set(order.id, order);
    return order;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.get(id);
  }

  getOrderByNumber(orderNumber: string): Order | undefined {
    for (const o of this.orders.values()) {
      if (o.orderNumber.toUpperCase() === orderNumber.toUpperCase()) {
        return o;
      }
    }
    return undefined;
  }

  getOrdersByUserId(userId: string): Order[] {
    const list: Order[] = [];
    for (const order of this.orders.values()) {
      if (order.userId === userId) {
        list.push(order);
      }
    }
    return list.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  updateOrderStatus(orderId: string, status: OrderStatus, note?: string): Order | undefined {
    const order = this.orders.get(orderId);
    if (!order) return undefined;

    order.orderStatus = status;
    order.timeline.push({
      status,
      label: status.replace(/_/g, ' '),
      description: note || `Order status updated to ${status}`,
      timestamp: new Date().toISOString(),
      completed: true,
    });

    return order;
  }
}

export const db = new BerlinDatabase();
