import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Volume2, Check, Zap } from 'lucide-react';
import { Product } from '../types';
import { playAudiophileChime } from '../utils/audioDemo';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onBuyNow?: (product: Product, quantity: number, color?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [activeImage, setActiveImage] = useState(product.image);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleTestSound = () => {
    setIsPlayingAudio(true);
    playAudiophileChime();
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2200);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 800);
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product, quantity, selectedColor);
    } else {
      onAddToCart(product, quantity, selectedColor);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#0C0C0F] border border-[#D6AD65]/35 rounded-3xl shadow-2xl shadow-black overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white bg-black/60 rounded-full hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-[#08080A] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/50 border border-white/5">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {product.isOnSale && (
                <span className="absolute top-4 left-4 bg-red-950/90 text-red-300 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  Special Offer
                </span>
              )}
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {product.secondaryImage && (
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === product.image ? 'border-[#D6AD65]' : 'border-white/10 opacity-60'
                  }`}
                >
                  <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === product.secondaryImage ? 'border-[#D6AD65]' : 'border-white/10 opacity-60'
                  }`}
                >
                  <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                </button>
              </div>
            )}

            {/* Test Acoustic Sound signature button */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                onClick={handleTestSound}
                className="w-full py-2.5 px-4 rounded-xl bg-[#141418] hover:bg-[#1C1C22] border border-[#D6AD65]/40 text-xs uppercase font-semibold text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all"
              >
                <Volume2 className={`w-4 h-4 text-[#D6AD65] ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                <span>{isPlayingAudio ? 'Playing Lossless Chime...' : 'Test Acoustic Signature'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Details & Purchase */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category & Title */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D6AD65] font-semibold">
                  {product.categoryLabel}
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                  {product.name}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
                  <div className="flex text-[#D6AD65]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-[#D6AD65]' : 'fill-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-white">{product.rating}</span>
                  <span>({product.reviewCount} verified audiophile reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-zinc-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="bg-[#121216] rounded-xl p-3.5 border border-white/5 space-y-2">
                <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#D6AD65]">
                  Acoustic Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {product.specs.driver && (
                    <div>
                      <span className="text-zinc-500">Transducer:</span>{' '}
                      <span className="text-zinc-300 font-medium">{product.specs.driver}</span>
                    </div>
                  )}
                  {product.specs.frequency && (
                    <div>
                      <span className="text-zinc-500">Frequency:</span>{' '}
                      <span className="text-zinc-300 font-medium">{product.specs.frequency}</span>
                    </div>
                  )}
                  {product.specs.battery && (
                    <div>
                      <span className="text-zinc-500">Battery:</span>{' '}
                      <span className="text-zinc-300 font-medium">{product.specs.battery}</span>
                    </div>
                  )}
                  {product.specs.impedance && (
                    <div>
                      <span className="text-zinc-500">Impedance:</span>{' '}
                      <span className="text-zinc-300 font-medium">{product.specs.impedance}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-2">
                    Finishing: <span className="text-[#D6AD65]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                          selectedColor === color.name
                            ? 'border-[#D6AD65] bg-[#D6AD65]/10 text-white'
                            : 'border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Quantity & Action buttons (Buy Now & Add to Cart) */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-white/10 rounded-xl bg-black px-3 py-2.5 shrink-0">
                  <span className="text-[11px] text-zinc-500 uppercase font-semibold mr-3 sm:hidden">Qty</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="text-zinc-400 hover:text-white disabled:opacity-30 px-1 font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm text-white px-3 font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-zinc-400 hover:text-white px-1 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAdd}
                  disabled={justAdded}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                    justAdded
                      ? 'bg-emerald-500 text-black border-emerald-500'
                      : 'bg-[#141418] hover:bg-[#1E1E24] text-white border-white/10 hover:border-[#D6AD65]/50'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D6AD65]" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* BUY NOW Button: Immediately proceeds to checkout */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 gold-button py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D6AD65]/20"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Buy Now (${(product.price * quantity).toFixed(2)})</span>
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-500 pt-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3 h-3 text-[#D6AD65]" />
                  <span>Free Courier</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#D6AD65]" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3 text-[#D6AD65]" />
                  <span>30-Day Return</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
