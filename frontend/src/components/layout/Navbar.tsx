'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  Sun,
  Moon,
  User as UserIcon,
  Menu as MenuIcon,
  X,
  Flame,
  Tag,
  Compass,
  LogOut,
  MapPin,
  Clock,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { totalItemCount, subtotal, openDrawer } = useCart();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Offers', href: '/offers', badge: 'DEALS' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full berlin-glass border-b transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#e50914] to-[#ff2b36] flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform duration-200">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-wider text-white flex items-center gap-1.5 font-sans">
                BERLIN
                <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
              </span>
              <span className="text-[10px] tracking-[0.25em] font-extrabold text-zinc-400 uppercase -mt-1">
                FAST FOOD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'text-white bg-zinc-800/80 shadow-inner'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-red-600 text-white animate-bounce">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors flex items-center gap-2 text-sm"
              title="Search food (Ctrl+K)"
            >
              <Search className="w-5 h-5 text-zinc-400 hover:text-white" />
              <span className="hidden lg:inline text-xs text-zinc-400 border border-zinc-700/60 rounded-md px-1.5 py-0.5">
                ⌘K
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-all duration-300"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-400 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              className="relative flex items-center gap-2.5 bg-zinc-800/90 hover:bg-zinc-700/90 text-white px-3.5 py-2 rounded-xl border border-zinc-700/60 shadow-lg hover:shadow-red-900/20 transition-all duration-200 active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-red-500" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#e50914] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-zinc-900 animate-pulse">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline">
                ₹{subtotal.toLocaleString()}
              </span>
            </button>

            {/* Auth / Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-700/60 border border-zinc-700/60 text-white transition-all text-xs font-semibold"
                >
                  <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline max-w-[90px] truncate">{user?.name}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl py-2 z-50 animate-slide-up">
                    <div className="px-4 py-2 border-b border-zinc-800">
                      <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-zinc-400" />
                      My Profile & Addresses
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={openAuthModal}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl md:hidden text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-slide-up">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-zinc-800/60"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            {isAuthenticated ? (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-zinc-300 font-semibold"
              >
                <UserIcon className="w-4 h-4 text-red-500" />
                Profile ({user?.name})
              </Link>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full"
              >
                Sign In / Register
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
