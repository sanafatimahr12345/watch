import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Volume2 } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', id: 'best-sellers' },
    { label: 'Categories', id: 'categories' },
    { label: 'Best Sellers', id: 'best-sellers' },
    { label: 'Sale', id: 'sale-banner' },
    { label: 'Editorial', id: 'editor-picks' },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <aside aria-label="Announcement" className="bg-[#0A0A0B] border-b border-white/5 py-2 px-4 text-center text-xs tracking-wider text-[#A1A1AA]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD65]"></span>
          <span className="text-[#D6AD65] font-medium">COMPLIMENTARY WORLDWIDE COURIER</span>
          <span className="hidden sm:inline text-zinc-500">·</span>
          <span className="hidden sm:inline">2-YEAR AUDIOPHILE WARRANTY ON ALL GEAR</span>
        </div>
      </aside>

      {/* Main Header adhering to Top Bar Contract: 3 zones separated by gap-8 */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#D6AD65]/15 py-3.5 shadow-2xl shadow-black/80'
            : 'bg-[#050505]/80 backdrop-blur-sm border-b border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onSelectCategory('all');
              }}
              className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD65] rounded"
            >
              <div className="w-8 h-8 rounded-full border border-[#D6AD65]/40 flex items-center justify-center bg-[#121214] group-hover:border-[#D6AD65] transition-colors">
                <Volume2 className="w-4 h-4 text-[#D6AD65]" />
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-white group-hover:text-[#D6AD65] transition-colors whitespace-nowrap shrink-0">
                AUDIOMÉ
              </span>
            </button>

            {/* Zone 2: 4–5 concise single-line text navigation links */}
            <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-zinc-300">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => onScrollToSection(link.id)}
                  className="hover:text-[#D6AD65] transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D6AD65] whitespace-nowrap shrink-0 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D6AD65] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Zone 3: Interactive Affordances (Search, Wishlist, Cart) */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search audio products"
                className="p-2 text-zinc-300 hover:text-[#D6AD65] hover:bg-white/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD65]"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="relative p-2 text-zinc-300 hover:text-[#D6AD65] hover:bg-white/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD65]"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D6AD65] text-black font-bold text-[10px] rounded-full flex items-center justify-center font-mono">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                aria-label={`Shopping bag with ${cartCount} items`}
                className="relative flex items-center gap-2 px-3 py-1.5 bg-[#141416] hover:bg-[#1E1E22] border border-[#D6AD65]/30 hover:border-[#D6AD65] rounded-full text-zinc-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD65]"
              >
                <ShoppingBag className="w-4 h-4 text-[#D6AD65]" />
                <span className="text-xs font-semibold tracking-wider font-mono text-[#D6AD65]">
                  {cartCount}
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#D6AD65]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0C] border-b border-[#D6AD65]/20 px-6 py-6 mt-3 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3 text-sm tracking-wider uppercase">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    onScrollToSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-zinc-300 hover:text-[#D6AD65] py-2 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-[#D6AD65]"
              >
                <Search className="w-4 h-4 text-[#D6AD65]" />
                <span>Quick Search</span>
              </button>
              <button
                onClick={() => {
                  onOpenWishlist();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-[#D6AD65]"
              >
                <Heart className="w-4 h-4 text-[#D6AD65]" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
