'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, ShoppingBag, User, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { totalItemCount, openDrawer } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Menu', href: '/menu', icon: UtensilsCrossed },
    { label: 'Offers', href: '/offers', icon: Tag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/90 px-2 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all ${
              isActive ? 'text-red-500' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Cart Trigger */}
      <button
        onClick={openDrawer}
        className="flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-red-500" />
          {totalItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-zinc-900">
              {totalItemCount}
            </span>
          )}
        </div>
        <span>Bag</span>
      </button>

      {/* Profile Trigger */}
      {isAuthenticated ? (
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all ${
            pathname === '/profile' ? 'text-red-500' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      ) : (
        <button
          onClick={openAuthModal}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white"
        >
          <User className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      )}
    </nav>
  );
};
