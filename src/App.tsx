/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedBanners } from './components/FeaturedBanners';
import { BestSellersSection } from './components/BestSellersSection';
import { SaleBannerSection } from './components/SaleBannerSection';
import { EditorialSection } from './components/EditorialSection';
import { TrustBenefitsSection } from './components/TrustBenefitsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductModal } from './components/ProductModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ArticleModal } from './components/ArticleModal';
import { Product, CartItem, ProductCategory, EditorialArticle } from './types';
import { PRODUCTS } from './data/mockData';

export default function App() {
  // Products state
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('audiome_cart');
      return saved ? JSON.parse(saved) : [
        // Seed default item for instant showcase
        { product: PRODUCTS[0], quantity: 1, selectedColor: 'Obsidian Black' }
      ];
    } catch {
      return [{ product: PRODUCTS[0], quantity: 1, selectedColor: 'Obsidian Black' }];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('audiome_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1]];
    } catch {
      return [PRODUCTS[1]];
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [activeArticle, setActiveArticle] = useState<EditorialArticle | null>(null);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('audiome_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('audiome_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist:', e);
    }
  }, [wishlist]);

  // Cart actions
  const handleAddToCart = (product: Product, quantity: number = 1, color?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selectedColor: color || next[existingIndex].selectedColor,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: color || product.colors[0]?.name }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Scroll helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category selection with smooth scroll to products
  const handleSelectCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    scrollToSection('best-sellers');
  };

  // Explore product ID from banner or hero
  const handleExploreProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId) || products[0];
    setActiveModalProduct(product);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#D6AD65] selection:text-black">
      {/* 1. Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
        onScrollToSection={scrollToSection}
      />

      <main>
        {/* 1. HERO SECTION */}
        <HeroSection
          onShopNow={() => scrollToSection('best-sellers')}
          onExploreProduct={handleExploreProduct}
        />

        {/* 2. PRODUCT CATEGORIES */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* 3. FEATURED PRODUCT BANNERS */}
        <FeaturedBanners
          onSelectCategory={handleSelectCategory}
          onExploreProduct={handleExploreProduct}
        />

        {/* 4. BEST SELLERS */}
        <BestSellersSection
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onOpenProductModal={(product) => setActiveModalProduct(product)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* 5. PROMOTIONAL SALE BANNER */}
        <SaleBannerSection
          onShopSale={(cat) => {
            if (cat) setSelectedCategory(cat);
            scrollToSection('best-sellers');
          }}
        />

        {/* 6. EDITOR'S PICKS */}
        <EditorialSection
          onOpenArticle={(article) => setActiveArticle(article)}
        />

        {/* 7. TRUST & BENEFITS SECTION */}
        <TrustBenefitsSection />

        {/* 8. NEWSLETTER SECTION */}
        <NewsletterSection />
      </main>

      {/* 9. FOOTER */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onScrollToSection={scrollToSection}
      />

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleClearCart}
      />

      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={(product, quantity, color) => {
          handleAddToCart(product, quantity, color);
          setActiveModalProduct(null);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={(product) => handleAddToCart(product, 1)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(product) => setActiveModalProduct(product)}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </div>
  );
}
