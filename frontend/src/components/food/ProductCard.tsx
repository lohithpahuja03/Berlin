'use client';

import React from 'react';
import { Plus, Star, Heart } from 'lucide-react';
import { Product } from '../../types/index';
import { VegBadge, NonVegBadge, BestsellerBadge, NewBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCustomize,
  isFavorite = false,
  onToggleFavorite,
}) => {
  return (
    <div className="group relative flex flex-col rounded-3xl bg-zinc-900/90 border border-zinc-800/80 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/20 transition-all duration-300 overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {product.isVeg ? <VegBadge /> : <NonVegBadge />}
          {product.isBestSeller && <BestsellerBadge />}
          {product.isNew && !product.isBestSeller && <NewBadge />}
        </div>

        {/* Favorite Heart Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
              isFavorite
                ? 'bg-red-600/90 text-white'
                : 'bg-black/50 text-zinc-300 hover:text-white hover:bg-black/80'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        )}

        {/* Rating chip on image */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700/40 text-xs font-bold text-white">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{product.rating}</span>
          <span className="text-zinc-400 text-[10px]">({product.reviewCount})</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex-1">
          <h3 className="text-base font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add Action */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-zinc-800/80">
          <div>
            <span className="text-[10px] text-zinc-500 block font-semibold uppercase">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-white">₹{product.basePrice}</span>
              {product.sizes.length > 0 && (
                <span className="text-[10px] text-zinc-500 font-semibold">+ options</span>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onCustomize(product)}
            className="shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Customize</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
