'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Flame,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
  Tag,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, COUPONS } from '../lib/data';
import { Product } from '../types/index';
import { ProductCard } from '../components/food/ProductCard';
import { ProductCustomizerModal } from '../components/food/ProductCustomizerModal';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function HomePage() {
  const router = useRouter();
  const { openDrawer } = useCart();
  const { showToast } = useToast();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 6);
  const combos = PRODUCTS.filter((p) => p.categorySlug === 'combos');

  const handleOpenCustomizer = (product: Product) => {
    setSelectedProduct(product);
    setCustomizerOpen(true);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Code ${code} copied!`, 'Paste it in your bag during checkout', 'success');
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-500 uppercase tracking-wider font-extrabold">
                Live Late-Night Kitchen
              </span>
              <span className="text-zinc-600">•</span>
              <span>Delivery in ~25 Mins</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              CRAVE THE <br />
              <span className="bg-gradient-to-r from-red-500 via-[#ff2b36] to-amber-500 bg-clip-text text-transparent">
                EXTRAORDINARY.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Freshly grilled smash patties, hand-stretched stone-baked sourdough pizzas, and fiery crispy chicken. Customized your way, delivered scorching hot.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/menu')}
                className="w-full sm:w-auto shadow-xl shadow-red-600/30 text-base"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/offers')}
                className="w-full sm:w-auto text-base"
              >
                <Percent className="w-5 h-5 text-red-500" />
                <span>View Offers (₹100 OFF)</span>
              </Button>
            </div>

            {/* Floating Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">25m</p>
                <p className="text-[11px] text-zinc-400 uppercase font-semibold">Avg. Delivery</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">4.9/5</p>
                <p className="text-[11px] text-zinc-400 uppercase font-semibold">10K+ Ratings</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-[11px] text-zinc-400 uppercase font-semibold">Fresh Meat</p>
              </div>
            </div>
          </div>

          {/* Right Cinematic Food Visual */}
          <div className="lg:col-span-5 relative flex justify-center z-10">
            <div className="relative w-full max-w-md lg:max-w-none aspect-square rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 group">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
                alt="Berlin Smash Burger"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Floating food badge 1 */}
              <div className="absolute top-6 left-6 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-zinc-700/60 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Berlin Double Smash</p>
                  <p className="text-[10px] text-red-400 font-semibold">#1 Most Ordered</p>
                </div>
              </div>

              {/* Floating food badge 2 */}
              <div className="absolute bottom-6 right-6 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-zinc-700/60 shadow-xl flex items-center gap-2.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-white">4.9 Star Sensation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPULAR CATEGORIES --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-500">
              Handcrafted Menu
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Popular Fast-Food Categories
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <span>View Full Menu</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.slug}`}
              className="group flex flex-col items-center p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-red-500/50 hover:bg-zinc-800/80 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 bg-zinc-950 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-500">
              Crowd Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Berlin Best Sellers
            </h2>
          </div>
          <Link
            href="/menu"
            className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400 transition-colors"
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCustomize={handleOpenCustomizer}
            />
          ))}
        </div>
      </section>

      {/* --- SPECIAL OFFERS SPOTLIGHT BANNER --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/80 via-zinc-900 to-black border border-red-600/30 p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-black uppercase">
              <Tag className="w-3.5 h-3.5" />
              Special Offer
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Get ₹100 OFF on your first Berlin order!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
              Use promo code <strong className="text-white font-black">WELCOME100</strong> at checkout on orders above ₹399. Fresh taste, delivered scorching hot.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleCopyCoupon('WELCOME100')}
                className="px-4 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2"
              >
                <span>Code: WELCOME100</span>
                <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded">COPY</span>
              </button>
              <Link href="/offers">
                <Button variant="ghost" size="md" className="text-xs font-bold text-white">
                  Browse All Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- BERLIN COMBOS SECTION --- */}
      {combos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-500">
                Big Savings
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Berlin Feast Combos
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {combos.map((combo) => (
              <ProductCard
                key={combo.id}
                product={combo}
                onCustomize={handleOpenCustomizer}
              />
            ))}
          </div>
        </section>
      )}

      {/* --- WHY BERLIN? SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-500">
            The Berlin Guarantee
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Why Order From Berlin?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            We don’t do generic lukewarm food. Everything is cooked to order and packed in heat-retaining containers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">25-Min Flash Delivery</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Express delivery fleet equipped with insulated thermal bags to ensure food arrives sizzling hot.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">100% Fresh Ingredients</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Zero frozen patties. Hand-stretched sourdough and artisanal sauces made fresh daily by our kitchen masters.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Deep Meal Customization</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Choose your patty count, cheese burst crusts, extra toppings, and spicy sauces tailored to your exact taste.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Live Driver Tracking</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Watch your driver travel in real-time with continuous GPS simulation and transparent arrival countdowns.
            </p>
          </div>
        </div>
      </section>

      {/* --- REVIEWS WALL --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-500">
            Real Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Loved by 10,000+ Fast-Food Fans
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "The Berlin Double Smash is legitimately on par with high-end gourmet burger joints. The cheese crust and brioche buns arrived crispy, not soggy!"
            </p>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Vikram S.</span>
              <span className="text-zinc-500">Verified Eater</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "Ordered the Pepperoni Feast Pizza with Cheese Burst at 1:30 AM. Arrived piping hot in 22 minutes. Outstanding late night service!"
            </p>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Ananya M.</span>
              <span className="text-zinc-500">Verified Eater</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "The peri peri fries with liquid cheese dip are addictive. Best fast food in town, and the website customization feels super sleek."
            </p>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Rohan K.</span>
              <span className="text-zinc-500">Verified Eater</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL ORDERING CTA --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              READY TO CRUNCH?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Our grills are hot and our drivers are ready. Browse the menu and place your order in under 2 minutes.
            </p>
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/menu')}
                className="shadow-2xl shadow-red-600/40"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Customizer Modal */}
      <ProductCustomizerModal
        product={selectedProduct}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
      />
    </div>
  );
}
