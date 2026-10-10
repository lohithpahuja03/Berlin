import { db } from '../models/db.js';
import { CONFIG } from '../config/index.js';
import { Driver } from '../types/index.js';

export class DriverService {
  /**
   * Simulate realistic driver GPS progression along route
   */
  static getLiveTracking(orderId: string): {
    driver: Driver | undefined;
    storeLocation: typeof CONFIG.STORE_LOCATION;
    destination: { lat: number; lng: number; address: string };
    progressPercent: number;
    etaMinutes: number;
    status: string;
  } {
    const order = db.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found.');
    }

    const store = CONFIG.STORE_LOCATION;
    const destLat = order.deliveryAddress.latitude || 28.4900;
    const destLng = order.deliveryAddress.longitude || 77.0900;

    const createdAt = new Date(order.createdAt).getTime();
    const now = Date.now();
    const elapsedMinutes = (now - createdAt) / (60 * 1000);

    // Progress calculation based on elapsed time (simulating a 25-minute journey)
    const totalSimulatedMinutes = 25;
    let progressPercent = Math.min(100, Math.floor((elapsedMinutes / totalSimulatedMinutes) * 100));
    if (order.orderStatus === 'CANCELLED') {
      progressPercent = 0;
    } else if (order.orderStatus === 'DELIVERED') {
      progressPercent = 100;
    }

    // Interpolate driver GPS coordinates between store and customer address
    const t = Math.max(0, Math.min(1, progressPercent / 100));
    const currentLat = store.lat + (destLat - store.lat) * t;
    const currentLng = store.lng + (destLng - store.lng) * t;

    let driver = order.driver;
    if (driver) {
      driver = {
        ...driver,
        currentLat,
        currentLng,
      };
      db.updateDriverLocation(driver.id, currentLat, currentLng);
    }

    const etaMinutes = Math.max(2, Math.round(totalSimulatedMinutes - elapsedMinutes));

    return {
      driver,
      storeLocation: store,
      destination: {
        lat: destLat,
        lng: destLng,
        address: `${order.deliveryAddress.houseFlat}, ${order.deliveryAddress.street}, ${order.deliveryAddress.city}`,
      },
      progressPercent,
      etaMinutes: order.orderStatus === 'DELIVERED' ? 0 : etaMinutes,
      status: order.orderStatus,
    };
  }
}
