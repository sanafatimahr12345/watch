import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROMO_CARDS } from '../data/mockData';
import { ProductCategory } from '../types';

interface FeaturedBannersProps {
  onSelectCategory: (category: ProductCategory) => void;
  onExploreProduct: (productId: string) => void;
}

export const FeaturedBanners: React.FC<FeaturedBannersProps> = ({
  onSelectCategory,
  onExploreProduct,
}) => {
  const handleBannerAction = (category: string) => {
    onSelectCategory(category as ProductCategory);
    const element = document.getElementById('best-sellers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#050505] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#D6AD65]"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6AD65] font-semibold">
              Curated Collections
            </span>
            <span className="w-6 h-px bg-[#D6AD65]"></span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Designed for Pure Fidelity
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Acoustic precision matched with timeless industrial luxury.
          </p>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_PROMO_CARDS.map((card) => (
            <div
              key={card.id}
              className="group relative rounded-2xl overflow-hidden bg-[#0D0D10] border border-white/10 hover:border-[#D6AD65]/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              {/* Product Photography Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10] via-black/30 to-transparent" />
                
                {/* Category tag */}
                <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-[0.2em] text-[#D6AD65] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#D6AD65]/30">
                  {card.title}
                </span>
              </div>

              {/* Text Content */}
              <div className="p-6 relative z-10 space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#D6AD65] transition-colors">
                    {card.tagline}
                  </h3>
                  <p className="text-sm text-zinc-400 font-light mt-1">
                    {card.subtagline}
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleBannerAction(card.category)}
                  className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-[#141418] hover:bg-[#D6AD65] text-zinc-200 hover:text-black border border-[#D6AD65]/30 hover:border-[#D6AD65] text-xs uppercase tracking-wider font-semibold transition-all duration-300 group/btn"
                >
                  <span>{card.cta}</span>
                  <ArrowRight className="w-4 h-4 text-[#D6AD65] group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
