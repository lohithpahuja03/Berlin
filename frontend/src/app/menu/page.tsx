'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  Sparkles,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../../lib/data';
import { Product } from '../../types/index';
import { ProductCard } from '../../components/food/ProductCard';
import { ProductCustomizerModal } from '../../components/food/ProductCustomizerModal';
import { VegBadge, NonVegBadge } from '../../components/ui/Badge';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === 'veg' && !p.isVeg) return false;
      if (dietFilter === 'non-veg' && p.isVeg) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesIng = p.ingredients.some((ing) => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      // Popular (bestseller first then review count)
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewCount - a.reviewCount;
    });
  }, [selectedCategory, dietFilter, searchQuery, sortBy]);

  const handleOpenCustomizer = (product: Product) => {
    setSelectedProduct(product);
    setCustomizerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-red-500">
          Fast-Food Menu
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Craft Burgers, Pizzas & Wings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Every item is customizable with premium cheeses, double patties, and artisanal dips. Select any product to customize your feast.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Category Pills Carousel/Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            All Items ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Secondary Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* In-page search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in menu..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Dietary Toggle */}
            <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl text-xs">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  dietFilter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                  dietFilter === 'veg' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <VegBadge />
                <span>Veg</span>
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                  dietFilter === 'non-veg' ? 'bg-zinc-800 text-red-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <NonVegBadge />
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-red-500"
              >
                <option value="popular">Popularity</option>
                <option value="rating">Rating (Highest)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCustomize={handleOpenCustomizer}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No food matches your filters.</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try resetting your search term or selecting "All Items" to view our complete menu.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setDietFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-red-500 font-bold hover:underline pt-2 block mx-auto"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Customizer Modal */}
      <ProductCustomizerModal
        product={selectedProduct}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
      />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading Berlin Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
