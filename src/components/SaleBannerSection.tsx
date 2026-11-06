import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { ProductCategory } from '../types';

interface SaleBannerSectionProps {
  onShopSale: (category?: ProductCategory) => void;
}

export const SaleBannerSection: React.FC<SaleBannerSectionProps> = ({ onShopSale }) => {
  // Limited-time sale countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSaleClick = () => {
    onShopSale('headphones');
    const el = document.getElementById('best-sellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sale-banner" className="relative overflow-hidden bg-[#040405] py-16 lg:py-24 border-y border-[#D6AD65]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-[#D6AD65]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#D6AD65]/30 bg-gradient-to-r from-[#0A0A0D] via-[#0E0E14] to-[#0A0A0D] shadow-2xl shadow-black">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6 z-10">
              {/* Sale Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6AD65]/15 border border-[#D6AD65]/40 text-[#D6AD65] text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Audiophile Event</span>
              </div>

              {/* Exact user requested copy */}
              <div className="space-y-2">
                <h3 className="font-serif-luxury text-xs sm:text-sm tracking-[0.28em] uppercase text-[#D6AD65] font-semibold">
                  IMMERSIVE SOUND
                </h3>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  UNMATCHED QUALITY
                </h2>
                <p className="text-xl sm:text-2xl font-light text-zinc-300 pt-1">
                  Up to <span className="text-[#D6AD65] font-bold">20% Off</span> on Premium Picks
                </p>
              </div>

              <p className="text-sm text-zinc-400 font-normal leading-relaxed max-w-md">
                Experience sound the way the artist mastered it. Limited inventory reserved for our seasonal acoustic appreciation showcase.
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  <Clock className="w-4 h-4 text-[#D6AD65]" />
                  <span>Ends In:</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <div className="bg-[#18181D] border border-white/10 px-2.5 py-1 rounded text-white font-bold">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </div>
                  <span className="text-[#D6AD65]">:</span>
                  <div className="bg-[#18181D] border border-white/10 px-2.5 py-1 rounded text-white font-bold">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </div>
                  <span className="text-[#D6AD65]">:</span>
                  <div className="bg-[#18181D] border border-white/10 px-2.5 py-1 rounded text-[#D6AD65] font-bold">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </div>
                </div>
              </div>

              {/* Golden SHOP THE SALE Button */}
              <div className="pt-2">
                <button
                  onClick={handleSaleClick}
                  className="gold-button inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-[0.1em] uppercase shadow-xl shadow-[#D6AD65]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD65] group"
                >
                  <span>SHOP THE SALE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Large Headphone Image with Golden Sound Wave Effects */}
            <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[380px] overflow-hidden">
              <img
                src="/src/assets/images/sale_banner_headphones_1793957314019.jpg"
                alt="Audiomé Immersive Sound Sale with Golden Wave Effects"
                className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0D] via-transparent to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-transparent lg:hidden block" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
