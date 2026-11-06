import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const freeShippingThreshold = 200;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AUDIOME10') {
      setDiscountPercent(0.1);
      setPromoMessage('10% VIP Discount Applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try AUDIOME10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0C] border-l border-[#D6AD65]/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D6AD65]" />
              <h2 className="font-serif-luxury text-lg font-bold text-white tracking-wider">
                YOUR SHOPPING BAG
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress indicator */}
          <div className="bg-[#121216] px-6 py-2.5 border-b border-white/5 text-xs text-zinc-300">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-emerald-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Unlocked: Complimentary Worldwide Express Delivery!
              </p>
            ) : (
              <div>
                <p className="text-zinc-400">
                  Add <span className="text-[#D6AD65] font-semibold">${(freeShippingThreshold - subtotal).toFixed(2)}</span> more for Free Express Shipping
                </p>
                <div className="w-full h-1 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#D6AD65] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#141418] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-base font-bold text-white">Your bag is empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Discover handcrafted acoustic headphones and studio hardware to elevate your listening.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-[#D6AD65] text-black text-xs font-semibold rounded-lg uppercase tracking-wider"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 rounded-xl bg-[#121216] border border-white/5 hover:border-[#D6AD65]/30 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-black/50 border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury text-sm font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="text-zinc-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#D6AD65] uppercase tracking-wider">
                        {item.product.categoryLabel}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 border border-white/10 rounded-lg bg-black px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="text-zinc-400 hover:text-white disabled:opacity-30 p-1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-zinc-400 hover:text-white p-1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="font-mono text-sm font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0E0E12] space-y-4">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. AUDIOME10)"
                    className="w-full bg-[#18181F] text-xs text-white pl-8 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#D6AD65] uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#202028] hover:bg-[#D6AD65] hover:text-black text-xs font-semibold rounded-lg text-zinc-200 transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`text-[11px] ${discountPercent > 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP 10% Discount</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-mono text-white">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-serif-luxury tracking-wide">Total</span>
                  <span className="font-mono text-[#D6AD65]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full gold-button py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group shadow-xl"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6AD65]" />
                <span>256-Bit Encrypted Checkout · 30-Day Money Back Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
