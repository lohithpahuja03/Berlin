import { Router } from 'express';
import { requireAuth, optionalAuth } from '../middleware/authMiddleware.js';
import * as authController from '../controllers/authController.js';
import * as productController from '../controllers/productController.js';
import * as couponController from '../controllers/couponController.js';
import * as orderController from '../controllers/orderController.js';
import * as addressController from '../controllers/addressController.js';
import * as driverController from '../controllers/driverController.js';

const router = Router();

// --- Auth Routes ---
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', requireAuth, authController.getProfile);

// --- Product & Catalog Routes ---
router.get('/categories', productController.getCategories);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

// --- Coupon Routes ---
router.post('/coupons/validate', optionalAuth, couponController.validateCoupon);
router.get('/coupons', couponController.getAvailableCoupons);

// --- Order Routes ---
router.post('/orders/preview', optionalAuth, orderController.previewPricing);
router.post('/orders', requireAuth, orderController.createOrder);
router.get('/orders/my-orders', requireAuth, orderController.getMyOrders);
router.get('/orders/:id', optionalAuth, orderController.getOrderById);
router.post('/orders/:id/cancel', requireAuth, orderController.cancelOrder);
router.get('/orders/:id/reorder', requireAuth, orderController.reorder);

// --- Tracking Routes ---
router.get('/tracking/:orderId', driverController.getOrderTracking);

// --- Address Routes ---
router.get('/addresses', requireAuth, addressController.getAddresses);
router.post('/addresses', requireAuth, addressController.addAddress);
router.put('/addresses/:id', requireAuth, addressController.updateAddress);
router.delete('/addresses/:id', requireAuth, addressController.deleteAddress);

export default router;
