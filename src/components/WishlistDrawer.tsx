import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0D] border-l border-[#D6AD65]/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#D6AD65] fill-[#D6AD65]" />
              <h2 className="font-serif-luxury text-lg font-bold text-white tracking-wider">
                SAVED WISHLIST
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                ({wishlist.length})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist drawer"
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-24 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#141418] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-base font-bold text-white">Your wishlist is empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Click the heart icon on any audio hardware to save it for your dream sound setup.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-xl bg-[#121216] border border-white/5 hover:border-[#D6AD65]/30 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-black/50 border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif-luxury text-sm font-bold text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="text-zinc-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#D6AD65] uppercase tracking-wider">
                        {product.categoryLabel}
                      </p>
                      <p className="font-mono text-sm font-bold text-white mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onMoveToCart(product);
                        onRemoveFromWishlist(product.id);
                      }}
                      className="mt-3 w-full py-2 px-3 bg-[#D6AD65] hover:bg-[#E5C378] text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-[#0E0E12]">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl border border-white/10 hover:border-[#D6AD65] text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Continue Browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
