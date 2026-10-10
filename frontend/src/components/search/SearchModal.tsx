'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../lib/data';
import { Product } from '../../types/index';
import { VegBadge, NonVegBadge } from '../ui/Badge';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const quickPills = [
    'Smash Burger',
    'Cheese Burst',
    'Pepperoni',
    'Peri Peri Fries',
    'Hot Wings',
    'Lava Cake',
    'Cold Brew',
  ];

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }, [query]);

  const matchingCategories = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slide-up">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-zinc-800 bg-zinc-950/70">
          <Search className="w-5 h-5 text-red-500 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for burgers, stone-baked pizzas, fries, wings..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base outline-none font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-zinc-300 p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Quick Search Suggestions */}
        {!query && (
          <div className="p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Popular Fast-Food Cravings:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => setQuery(pill)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/80 hover:bg-red-600 hover:text-white text-zinc-300 border border-zinc-700/60 transition-all duration-200"
                >
                  {pill}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/80">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Explore Categories
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setQuery(cat.name)}
                    className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 text-left hover:border-red-500/50 transition-all group"
                  >
                    <p className="text-xs font-bold text-white group-hover:text-red-500 transition-colors">
                      {cat.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                      {cat.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {/* Matching Categories */}
            {matchingCategories.length > 0 && (
              <div className="mb-4">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Matching Categories
                </span>
                <div className="flex flex-wrap gap-2">
                  {matchingCategories.map((cat) => (
                    <span
                      key={cat.id}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-red-950/60 border border-red-800/60 text-red-400"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Products */}
            {results.length > 0 ? (
              <div className="space-y-3">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Food Items ({results.length})
                </span>
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/70 hover:border-red-500/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {product.isVeg ? <VegBadge /> : <NonVegBadge />}
                          <h4 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors truncate">
                            {product.name}
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-400 truncate mt-0.5">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-extrabold text-white">
                            ₹{product.basePrice}
                          </span>
                          <span className="text-[11px] text-zinc-500">
                            ⭐ {product.rating} ({product.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="shrink-0 p-2 rounded-xl bg-zinc-800 group-hover:bg-red-600 text-zinc-300 group-hover:text-white transition-all ml-3">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">We couldn't find "{query}"</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try searching for classic items like "burger", "pizza", "fries", "tenders", or "combos".
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
