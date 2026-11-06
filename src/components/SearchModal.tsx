import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="relative w-full max-w-2xl bg-[#0D0D11] border border-[#D6AD65]/35 rounded-2xl shadow-2xl shadow-black overflow-hidden">
        
        {/* Search Input Box */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#121216]">
          <Search className="w-5 h-5 text-[#D6AD65] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search headphones, earbuds, speakers, amplifiers, specs..."
            className="w-full bg-transparent text-white text-sm sm:text-base placeholder:text-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>{query ? `Search Results (${results.length})` : 'Popular Recommendations'}</span>
            <span className="text-[11px] text-zinc-500">Press Esc to exit</span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No audio hardware found matching "{query}".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-xl bg-[#141418] hover:bg-[#1A1A22] border border-white/5 hover:border-[#D6AD65]/40 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-black/50 border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D6AD65] font-semibold">
                      {product.categoryLabel}
                    </span>
                    <h4 className="font-serif-luxury text-sm font-bold text-white group-hover:text-[#D6AD65] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                      <Star className="w-3 h-3 text-[#D6AD65] fill-[#D6AD65]" />
                      <span>{product.rating}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="font-mono text-white font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-full text-zinc-500 group-hover:text-[#D6AD65] transition-colors">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
