'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Flame, ShoppingBag, Sparkles } from 'lucide-react';
import { Product, ProductSize, ProductAddon, CartItem } from '../../types/index';
import { VegBadge, NonVegBadge, BestsellerBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

export interface ProductCustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow?: () => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  product,
  isOpen,
  onClose,
  onBuyNow,
}) => {
  const { addItem, openDrawer } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(undefined);
  const [selectedAddons, setSelectedAddons] = useState<ProductAddon[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Reset selections whenever a new product opens
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes.length > 0 ? product.sizes[0] : undefined);
      setSelectedAddons([]);
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const toggleAddon = (addon: ProductAddon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Dynamic price calculations
  const sizePrice = selectedSize ? selectedSize.priceModifier : 0;
  const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = product.basePrice + sizePrice + addonsPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    // Unique ID for this configuration so identical customizations stack
    const addonKey = selectedAddons
      .map((a) => a.id)
      .sort()
      .join('-');
    const cartItemId = `${product.id}-${selectedSize?.id || 'standard'}-${addonKey}`;

    const cartItem: CartItem = {
      id: cartItemId,
      productId: product.id,
      name: product.name,
      image: product.image,
      basePrice: product.basePrice,
      size: selectedSize,
      addons: selectedAddons,
      quantity,
      unitPrice,
      totalPrice,
    };

    addItem(cartItem);
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openDrawer();
    if (onBuyNow) onBuyNow();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slide-up my-auto max-h-[92vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-56 sm:h-64 w-full shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-zinc-300 hover:text-white backdrop-blur hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {product.isVeg ? <VegBadge /> : <NonVegBadge />}
                {product.isBestSeller && <BestsellerBadge />}
                <span className="text-[11px] font-bold text-zinc-300 bg-black/60 backdrop-blur px-2 py-0.5 rounded-full border border-zinc-700/50">
                  ⭐ {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {product.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block font-semibold uppercase">Base Price</span>
              <span className="text-lg font-black text-white">₹{product.basePrice}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          {/* Ingredients */}
          {product.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Ingredients & Toppings
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-300"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Select Size <span className="text-red-500">*</span>
                </h4>
                <span className="text-[11px] text-zinc-500">Choose one</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize?.id === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-red-950/40 border-red-500 text-white shadow-md shadow-red-950/40'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{size.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-red-500" />}
                      </div>
                      <span className="text-[11px] text-zinc-400 mt-1">
                        {size.priceModifier > 0 ? `+₹${size.priceModifier}` : 'Standard'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons & Extra Ingredients */}
          {product.addons.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Custom Add-ons & Extras
                </h4>
                <span className="text-[11px] text-zinc-500">Optional</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isChecked
                          ? 'bg-red-950/30 border-red-500/70 text-white'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-red-600 border-red-600 text-white'
                              : 'border-zinc-700 bg-zinc-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-semibold">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-zinc-400">+₹{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing Breakdown Card */}
          <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Base Price</span>
              <span>₹{product.basePrice}</span>
            </div>
            {sizePrice > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Size Modifier ({selectedSize?.name})</span>
                <span>+₹{sizePrice}</span>
              </div>
            )}
            {addonsPrice > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Add-ons ({selectedAddons.length})</span>
                <span>+₹{addonsPrice}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-300 font-bold pt-1 border-t border-zinc-800">
              <span>Unit Price</span>
              <span>₹{unitPrice}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-950/90 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-extrabold text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right sm:hidden">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Total</span>
              <span className="text-lg font-black text-white">₹{totalPrice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial"
            >
              <ShoppingBag className="w-4 h-4 text-red-500" />
              Add to Cart • ₹{totalPrice}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleBuyNow}
              className="flex-1 sm:flex-initial"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
