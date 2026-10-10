'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import { ToastProvider } from '../../context/ToastContext';
import { AuthProvider } from '../../context/AuthContext';
import { CartProvider } from '../../context/CartContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { SearchModal } from '../search/SearchModal';
import { AuthModal } from '../auth/AuthModal';
import { ProductCustomizerModal } from '../food/ProductCustomizerModal';
import { Product } from '../../types/index';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const handleSelectProductFromSearch = (product: Product) => {
    setCustomizerProduct(product);
    setCustomizerOpen(true);
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 transition-colors duration-300">
              <React.Suspense fallback={<div className="h-20 w-full bg-zinc-950 border-b border-zinc-800" />}>
                <Navbar onOpenSearch={() => setSearchOpen(true)} />
              </React.Suspense>
              <main className="flex-1">{children}</main>
              <Footer />

              {/* Global Overlays & Drawers */}
              <CartDrawer />
              <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                onSelectProduct={handleSelectProductFromSearch}
              />
              <AuthModal />
              <ProductCustomizerModal
                product={customizerProduct}
                isOpen={customizerOpen}
                onClose={() => setCustomizerOpen(false)}
              />
            </div>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
