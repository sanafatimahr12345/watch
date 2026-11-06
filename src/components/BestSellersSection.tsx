import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Heart, Check, Filter, Zap } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface BestSellersSectionProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToCart: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onOpenProductModal,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Filter products by selectedCategory
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'new-arrivals') return product.isNewArrival;
    return product.category === selectedCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <section id="best-sellers" className="py-16 bg-[#070709] border-b border-white/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-[#D6AD65]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D6AD65] font-semibold">
                Audiophile Masterpieces
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Best Sellers
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Hand-tuned acoustic fidelity favored by audio engineers and passionate listeners.
            </p>
          </div>

          {/* Controls: Category Tab Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative inline-flex items-center">
              <Filter className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <select
                aria-label="Sort products by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-[#121215] text-zinc-300 text-xs pl-8 pr-4 py-2 rounded-lg border border-white/10 hover:border-[#D6AD65]/40 focus:outline-none focus:ring-1 focus:ring-[#D6AD65]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const wish = isWishlisted(product.id);
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-[#0D0D10] border border-white/10 hover:border-[#D6AD65]/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-black"
              >
                {/* Product Image Area */}
                <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-[#08080A]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-106"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10] via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#D6AD65] text-black px-2.5 py-0.5 rounded shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {product.isOnSale && product.originalPrice && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-red-950/80 text-red-300 border border-red-500/30 px-2 py-0.5 rounded">
                        Save ${(product.originalPrice - product.price).toFixed(0)}
                      </span>
                    )}
                  </div>

                  {/* Action overlays: Wishlist & Quick View */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => onToggleWishlist(product)}
                      aria-label="Add to wishlist"
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        wish
                          ? 'bg-[#D6AD65] text-black shadow-lg shadow-[#D6AD65]/30'
                          : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wish ? 'fill-black' : ''}`} />
                    </button>

                    <button
                      onClick={() => onOpenProductModal(product)}
                      aria-label="Quick view product details"
                      className="p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    {/* Category Label */}
                    <p className="text-[11px] uppercase tracking-wider text-[#D6AD65] font-semibold">
                      {product.categoryLabel}
                    </p>

                    {/* Product Name */}
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="text-left font-serif-luxury text-lg font-bold text-white hover:text-[#D6AD65] transition-colors line-clamp-1"
                    >
                      {product.name}
                    </button>

                    {/* Star Rating with review count */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <div className="flex items-center text-[#D6AD65]">
                        <Star className="w-3.5 h-3.5 fill-[#D6AD65]" />
                      </div>
                      <span className="font-semibold text-zinc-200">{product.rating.toFixed(1)}</span>
                      <span className="text-zinc-500">({product.reviewCount})</span>
                    </div>

                    {/* Product Description */}
                    <p className="text-xs text-zinc-400 font-normal line-clamp-2 leading-relaxed pt-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action Buttons (Buy Now & Add to Cart) */}
                  <div className="pt-3 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-lg font-bold text-white tracking-tight">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="font-mono text-xs text-zinc-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Free 2-Day Shipping</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* BUY NOW Button: Opens detail modal so user can review specs and proceed to buy */}
                      <button
                        onClick={() => onOpenProductModal(product)}
                        className="flex-1 gold-button py-2.5 px-3 rounded-xl font-bold text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md shadow-[#D6AD65]/15 transition-all"
                        title="View details and buy now"
                      >
                        <Zap className="w-3.5 h-3.5 fill-black" />
                        <span>BUY NOW</span>
                      </button>

                      {/* Quick Add To Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                        className={`p-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center border shrink-0 ${
                          isJustAdded
                            ? 'bg-emerald-500 text-black border-emerald-500 shadow-md shadow-emerald-500/20'
                            : 'bg-[#141418] hover:bg-[#1C1C22] text-[#D6AD65] hover:text-white border-[#D6AD65]/30 hover:border-[#D6AD65]'
                        }`}
                        title="Add to cart"
                      >
                        {isJustAdded ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state if category has no matches */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16 bg-[#0D0D10] rounded-2xl border border-white/5 p-8 max-w-lg mx-auto">
            <p className="text-zinc-400 text-sm">No items found for this category filter.</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-4 px-4 py-2 bg-[#D6AD65] text-black text-xs font-semibold rounded-lg"
            >
              Reset to All Gear
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
