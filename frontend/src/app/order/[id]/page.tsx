'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Flame,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  XCircle,
  Truck,
  Shield,
  Star,
} from 'lucide-react';
import { Order, OrderStatus } from '../../../types/index';
import { Button } from '../../../components/ui/Button';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';

function OrderTrackingContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();

  const orderId = (Array.isArray(params?.id) ? params.id[0] : params?.id) || '';

  const [order, setOrder] = useState<Order | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(300);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [driverProgress, setDriverProgress] = useState<number>(25);

  useEffect(() => {
    // Fetch order from backend or localStorage
    const loadOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);
        const data = await res.json();
        if (res.ok && data.success && data.order) {
          setOrder(data.order);
          return;
        }
      } catch {
        // Fallback to localStorage
      }

      try {
        const history: Order[] = JSON.parse(localStorage.getItem('berlin_orders_history') || '[]');
        const found = history.find((o) => o.id === orderId || o.orderNumber === orderId);
        if (found) {
          setOrder(found);
        } else if (history.length > 0) {
          setOrder(history[0]);
        }
      } catch {
        // Ignored
      }
    };

    loadOrder();
  }, [orderId]);

  // 5-Minute Cancellation Countdown Timer
  useEffect(() => {
    if (!order) return;

    const calculateRemaining = () => {
      const expiry = new Date(order.cancelExpiresAt).getTime();
      const now = Date.now();
      const diffSecs = Math.max(0, Math.floor((expiry - now) / 1000));
      setSecondsRemaining(diffSecs);
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);
    return () => clearInterval(interval);
  }, [order]);

  // Live driver animation step
  useEffect(() => {
    if (!order || order.orderStatus === 'CANCELLED') return;
    const interval = setInterval(() => {
      setDriverProgress((prev) => (prev < 90 ? prev + 3 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, [order]);

  const handleCancelOrder = async () => {
    if (!order) return;

    if (secondsRemaining <= 0) {
      showToast('Window Closed', 'Orders can only be cancelled within 5 minutes of placement.', 'error');
      return;
    }

    setIsCancelling(true);

    try {
      const res = await fetch(`http://localhost:5000/api/orders/${order.id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('berlin_auth_token') || ''}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success && data.order) {
        setOrder(data.order);
      } else {
        // Local update
        const updated: Order = {
          ...order,
          orderStatus: 'CANCELLED',
          timeline: [
            ...order.timeline,
            {
              status: 'CANCELLED',
              label: 'Order Cancelled',
              description: 'Cancelled within 5-minute customer window',
              timestamp: new Date().toISOString(),
              completed: true,
            },
          ],
        };
        setOrder(updated);

        // Update history
        try {
          const history: Order[] = JSON.parse(localStorage.getItem('berlin_orders_history') || '[]');
          const newHistory = history.map((o) => (o.id === order.id ? updated : o));
          localStorage.setItem('berlin_orders_history', JSON.stringify(newHistory));
        } catch {
          // Ignored
        }
      }

      showToast('Order Cancelled', 'Your order was successfully cancelled.', 'info');
    } catch {
      showToast('Error', 'Failed to cancel order.', 'error');
    } finally {
      setIsCancelling(false);
    }
  };

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <Clock className="w-12 h-12 text-zinc-600 mx-auto animate-spin" />
        <h2 className="text-xl font-bold text-white">Loading Order Tracker...</h2>
      </div>
    );
  }

  const isCancelled = order.orderStatus === 'CANCELLED';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-red-500 tracking-wider">
              Live Order Tracker
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 font-semibold">{order.orderNumber}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {isCancelled ? 'Order Cancelled' : 'Cooking & Heading Your Way'}
          </h1>

          <p className="text-xs text-zinc-400 mt-1">
            Estimated Arrival: <strong className="text-white">{order.estimatedDeliveryTime}</strong> (~25 Mins)
          </p>
        </div>

        {/* 5-Minute Cancellation Window Section */}
        {!isCancelled && (
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center sm:text-right space-y-1.5 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              5-Minute Cancellation Window
            </span>
            {secondsRemaining > 0 ? (
              <div>
                <p className="text-xs font-extrabold text-red-500">
                  Cancel available for {formatCountdown(secondsRemaining)}
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  isLoading={isCancelling}
                  onClick={handleCancelOrder}
                  className="mt-2 w-full text-xs"
                >
                  Cancel Order
                </Button>
              </div>
            ) : (
              <p className="text-xs text-zinc-500 font-semibold">
                Cancellation window closed
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Map & Driver Card */}
        <div className="lg:col-span-7 space-y-6">
          {/* Animated Route Map Visualizer */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 overflow-hidden relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-500" />
                Live Route Progression
              </span>
              <span className="text-xs font-extrabold text-white">
                {isCancelled ? 'Halted' : `${driverProgress}% of Route`}
              </span>
            </div>

            {/* Simulated GPS Visualizer Canvas */}
            <div className="relative h-44 rounded-2xl bg-zinc-950 border border-zinc-800/80 p-4 flex flex-col justify-between overflow-hidden">
              {/* Route line */}
              <div className="absolute top-1/2 left-8 right-8 h-1.5 bg-zinc-800 -translate-y-1/2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-[#ff2b36] transition-all duration-1000 rounded-full"
                  style={{ width: `${isCancelled ? 0 : driverProgress}%` }}
                />
              </div>

              {/* Start: Restaurant Flagship */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-red-600/40">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Berlin Kitchen</p>
                    <p className="text-[10px] text-zinc-500">Alexanderplatz 7</p>
                  </div>
                </div>

                {/* Destination: Customer */}
                <div className="flex items-center gap-2 text-right">
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Your Destination</p>
                    <p className="text-[10px] text-zinc-500">{order.deliveryAddress.city}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-emerald-600/40">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Driver Marker */}
              {!isCancelled && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 z-20 flex flex-col items-center"
                  style={{ left: `calc(32px + (100% - 64px) * ${driverProgress / 100})` }}
                >
                  <div className="p-2 rounded-xl bg-zinc-900 border border-red-500 text-red-500 shadow-xl shadow-red-950 animate-bounce">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black bg-red-600 text-white px-1.5 py-0.5 rounded-full mt-1">
                    Driver
                  </span>
                </div>
              )}

              <div className="text-[11px] text-zinc-400 text-center relative z-10 pt-2">
                Insulated thermal delivery fleet • Real-time coordinate simulation
              </div>
            </div>

            {/* Assigned Driver Card */}
            {order.driver && !isCancelled && (
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={order.driver.avatar}
                    alt={order.driver.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-zinc-700"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{order.driver.name}</h4>
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {order.driver.rating}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      {order.driver.vehicleType} • <strong className="text-zinc-200">{order.driver.vehicleNumber}</strong>
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${order.driver.phone}`}
                  className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2 text-xs font-bold transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Call Driver</span>
                </a>
              </div>
            )}
          </div>

          {/* Timeline Milestones */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-base font-bold text-white">Order Status Milestones</h3>

            <div className="space-y-4">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{step.label}</h5>
                    <p className="text-[11px] text-zinc-400">{step.description}</p>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Details & Address */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-5">
            <h3 className="text-base font-bold text-white tracking-wide">Ordered Items</h3>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-zinc-200 truncate">{item.name}</p>
                      {item.size && (
                        <p className="text-[10px] text-zinc-400">Size: {item.size.name}</p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-white shrink-0">
                    {item.quantity}x • ₹{item.totalPrice}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Savings</span>
                  <span>-₹{order.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5%)</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                <span>Total Amount</span>
                <span className="text-red-500">₹{order.totalAmount}</span>
              </div>
            </div>

            {/* Delivery address snapshot */}
            <div className="pt-3 border-t border-zinc-800 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">
                Delivering To
              </span>
              <p className="font-semibold text-white">{order.deliveryAddress.name}</p>
              <p className="text-zinc-400">
                {order.deliveryAddress.houseFlat}, {order.deliveryAddress.street}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
              </p>
              <p className="text-zinc-500">Payment: {order.paymentMethod} ({order.paymentStatus})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading Order Tracker...</div>}>
      <OrderTrackingContent />
    </React.Suspense>
  );
}
