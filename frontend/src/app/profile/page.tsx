'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User as UserIcon,
  MapPin,
  Clock,
  Plus,
  Trash2,
  CheckCircle,
  LogOut,
  Shield,
  Phone,
  Mail,
  Home,
  Building,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Address, Order } from '../../types/index';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'addresses' | 'orders' | 'settings'>('addresses');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  // Address form
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrHouse, setAddrHouse] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrArea, setAddrArea] = useState('');
  const [addrCity, setAddrCity] = useState('Gurugram');
  const [addrState, setAddrState] = useState('Haryana');
  const [addrPincode, setAddrPincode] = useState('122002');
  const [addrInstructions, setAddrInstructions] = useState('');
  const [addrIsDefault, setAddrIsDefault] = useState(false);

  // Load addresses and past orders
  useEffect(() => {
    if (!isAuthenticated) return;

    // Load from localStorage or mock seed
    try {
      const savedAddresses = localStorage.getItem('berlin_saved_addresses');
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      } else {
        const defaultAddr: Address = {
          id: 'addr-default-1',
          userId: user?.id || 'usr-demo-01',
          name: user?.name || 'Max Keller',
          phone: user?.phone || '+91 98765 01234',
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
        setAddresses([defaultAddr]);
        localStorage.setItem('berlin_saved_addresses', JSON.stringify([defaultAddr]));
      }

      const savedOrders = localStorage.getItem('berlin_orders_history');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch {
      // Ignored
    }
  }, [isAuthenticated, user]);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      userId: user?.id || 'guest',
      name: addrName || user?.name || 'Customer',
      phone: addrPhone || user?.phone || '+91 98765 43210',
      houseFlat: addrHouse,
      street: addrStreet,
      area: addrArea,
      city: addrCity,
      state: addrState,
      pincode: addrPincode,
      deliveryInstructions: addrInstructions,
      isDefault: addresses.length === 0 ? true : addrIsDefault,
      latitude: 28.4800 + Math.random() * 0.02,
      longitude: 77.0800 + Math.random() * 0.02,
    };

    let updated = [...addresses];
    if (newAddr.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }
    updated.push(newAddr);

    setAddresses(updated);
    localStorage.setItem('berlin_saved_addresses', JSON.stringify(updated));
    setAddressModalOpen(false);
    showToast('Address Saved!', 'Saved to your address book', 'success');

    // Reset fields
    setAddrHouse('');
    setAddrStreet('');
    setAddrArea('');
    setAddrInstructions('');
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('berlin_saved_addresses', JSON.stringify(updated));
    showToast('Address removed', undefined, 'info');
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    localStorage.setItem('berlin_saved_addresses', JSON.stringify(updated));
    showToast('Default address updated', undefined, 'success');
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addItem({
        id: `${item.productId}-${item.size?.id || 'std'}-${Date.now()}`,
        productId: item.productId,
        name: item.name,
        image: item.image,
        basePrice: item.unitPrice,
        size: item.size,
        addons: item.addons,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      });
    });
    openDrawer();
    showToast('Items added to cart!', 'Ready for fast reordering', 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Sign In to View Profile</h2>
        <p className="text-xs text-zinc-400">
          Please log in to manage your saved delivery addresses and view order history.
        </p>
        <Button variant="primary" size="lg" onClick={openAuthModal} className="w-full">
          Sign In / Register
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#e50914] to-[#ff2b36] flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-red-600/30">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{user?.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600/20 text-red-400 border border-red-500/30 uppercase">
                Gold Member
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-2">
              <span>{user?.email}</span>
              <span>•</span>
              <span>{user?.phone || '+91 98765 01234'}</span>
            </p>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={logout} className="text-red-400 hover:text-red-300">
          <LogOut className="w-4 h-4 mr-1.5" />
          Sign Out
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'addresses'
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4 text-red-500" />
          Saved Addresses ({addresses.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 text-red-500" />
          Order History ({orders.length})
        </button>
      </div>

      {/* Tab: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Your Delivery Addresses</h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setAddressModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add New Address
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between gap-4 transition-all ${
                  addr.isDefault
                    ? 'bg-zinc-900 border-red-500/60 shadow-lg shadow-red-950/20'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Home className="w-4 h-4 text-zinc-400" />
                      {addr.name}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {addr.houseFlat}, {addr.street}, {addr.area ? `${addr.area}, ` : ''}{addr.city}, {addr.state} - {addr.pincode}
                  </p>

                  {addr.deliveryInstructions && (
                    <p className="text-[11px] text-zinc-400 italic">
                      Note: "{addr.deliveryInstructions}"
                    </p>
                  )}

                  <p className="text-xs text-zinc-500">Phone: {addr.phone}</p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  {!addr.isDefault ? (
                    <button
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      className="text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Default Address
                    </span>
                  )}

                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Order History */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Previous Orders</h3>

          {orders.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
              <Clock className="w-8 h-8 text-zinc-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No orders yet.</h4>
              <p className="text-xs text-zinc-400">
                You haven't placed an order yet. Browse our menu to satisfy your craving!
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push('/menu')}
                className="mt-2"
              >
                Start Ordering
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-white">
                        {order.orderNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.orderStatus === 'DELIVERED'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : order.orderStatus === 'CANCELLED'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {order.orderStatus.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400">
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>

                    <p className="text-[11px] text-zinc-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} • Total: ₹{order.totalAmount} ({order.paymentMethod})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleReorder(order)}
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      Reorder
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/order/${order.id}`)}
                    >
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Address Modal */}
      <Modal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        title="Add Delivery Address"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={addrName}
                onChange={(e) => setAddrName(e.target.value)}
                placeholder={user?.name || 'Max Keller'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={addrPhone}
                onChange={(e) => setAddrPhone(e.target.value)}
                placeholder="+91 98765 01234"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              Flat / House / Building
            </label>
            <input
              type="text"
              required
              value={addrHouse}
              onChange={(e) => setAddrHouse(e.target.value)}
              placeholder="Flat 402, Skyline Towers"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              Street / Area
            </label>
            <input
              type="text"
              required
              value={addrStreet}
              onChange={(e) => setAddrStreet(e.target.value)}
              placeholder="DLF Cyber City Road, Sector 29"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={addrCity}
                onChange={(e) => setAddrCity(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                State
              </label>
              <input
                type="text"
                required
                value={addrState}
                onChange={(e) => setAddrState(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                PIN Code
              </label>
              <input
                type="text"
                required
                value={addrPincode}
                onChange={(e) => setAddrPincode(e.target.value)}
                placeholder="122002"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              Delivery Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={addrInstructions}
              onChange={(e) => setAddrInstructions(e.target.value)}
              placeholder="e.g. Ring the bell twice, leave with concierge"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isDefault"
              checked={addrIsDefault}
              onChange={(e) => setAddrIsDefault(e.target.checked)}
              className="rounded bg-zinc-950 border-zinc-800 text-red-600 focus:ring-0"
            />
            <label htmlFor="isDefault" className="text-xs text-zinc-300 cursor-pointer">
              Set as default delivery address
            </label>
          </div>

          <Button variant="primary" size="lg" type="submit" className="w-full mt-2">
            Save Address
          </Button>
        </form>
      </Modal>
    </div>
  );
}
