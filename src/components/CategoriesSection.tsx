import React from 'react';
import {
  Headphones,
  Disc,
  Volume2,
  Mic,
  Sliders,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ProductCategory } from '../types';
import { CATEGORIES } from '../data/mockData';

interface CategoriesSectionProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-6 h-6" />;
      case 'Disc':
        return <Disc className="w-6 h-6" />;
      case 'Volume2':
        return <Volume2 className="w-6 h-6" />;
      case 'Mic':
        return <Mic className="w-6 h-6" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Headphones className="w-6 h-6" />;
    }
  };

  return (
    <section id="categories" className="py-12 bg-[#08080A] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-[#D6AD65]"></span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#D6AD65] font-semibold">
                Explore The Lineup
              </span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Product Categories
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#D6AD65] text-black border-[#D6AD65]'
                  : 'bg-[#121214] text-zinc-400 border-white/10 hover:text-white hover:border-[#D6AD65]/40'
              }`}
            >
              All Gear
            </button>
          </div>
        </div>

        {/* Horizontal Category Carousel / List with circular line icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD65] ${
                  isSelected
                    ? 'bg-[#141418] border-[#D6AD65] shadow-lg shadow-[#D6AD65]/10 scale-[1.02]'
                    : 'bg-[#0E0E10] border-white/5 hover:border-[#D6AD65]/40 hover:bg-[#121215]'
                }`}
              >
                {/* Circular Line Icon Container */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 mb-3 border ${
                    isSelected
                      ? 'bg-[#D6AD65] text-black border-[#D6AD65] shadow-md shadow-[#D6AD65]/30'
                      : 'bg-[#141416] text-[#D6AD65] border-[#D6AD65]/30 group-hover:border-[#D6AD65] group-hover:scale-110 group-hover:bg-[#1A1A1E]'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                </div>

                {/* Category Label */}
                <span
                  className={`text-xs uppercase tracking-wider font-semibold text-center transition-colors ${
                    isSelected
                      ? 'text-[#D6AD65]'
                      : 'text-zinc-300 group-hover:text-white'
                  }`}
                >
                  {cat.label}
                </span>

                <span className="text-[10px] text-zinc-500 mt-1">
                  {cat.id === 'new-arrivals' ? 'Fresh Drops' : 'Explore'}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
