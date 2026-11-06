import React, { useState } from 'react';
import { Truck, ShieldCheck, RotateCcw, ArrowRight, Play, Volume2 } from 'lucide-react';
import { playAudiophileChime } from '../utils/audioDemo';
import { IMAGES } from '../assets/images';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreProduct: (productId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onExploreProduct }) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const handleTestSound = () => {
    setIsPlayingSound(true);
    playAudiophileChime();
    setTimeout(() => {
      setIsPlayingSound(false);
    }, 2400);
  };

  return (
    <section className="relative overflow-hidden bg-[#050505] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/5">
      {/* Background radial gold aura effects */}
      <div className="absolute top-1/4 right-1/4 -z-10 w-96 h-96 bg-[#D6AD65]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-8 z-10">
            {/* Brand Kicker with subtle gold line */}
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#D6AD65]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D6AD65] font-semibold">
                Audiophile Engineering
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Be Closer to{' '}
              <span className="gold-gradient-text block mt-1 sm:inline sm:mt-0">
                Every Note
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl text-balance">
              Discover premium audio gear crafted for true sound lovers. Immerse yourself in ultra-high resolution soundstages, handcrafted beryllium drivers, and noise-free acoustic isolation.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="gold-button inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase group shadow-lg shadow-[#D6AD65]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD65]"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Interactive Audio Demo Button */}
              <button
                onClick={handleTestSound}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white bg-[#121214] hover:bg-[#1A1A1E] border border-white/10 hover:border-[#D6AD65]/40 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D6AD65]"
                title="Play harmonic lossless acoustic frequency preview"
              >
                {isPlayingSound ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#D6AD65] animate-pulse" />
                    <span className="text-[#D6AD65]">Acoustics Playing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#D6AD65] fill-[#D6AD65]" />
                    <span>Test Sound Signature</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust Items directly below button: Free Shipping, 2-Year Warranty, 30-Day Returns */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#141416] border border-[#D6AD65]/30 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#D6AD65]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200 tracking-wide">Free Shipping</h4>
                  <p className="text-[11px] text-zinc-500">Express delivery</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#141416] border border-[#D6AD65]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#D6AD65]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200 tracking-wide">2-Year Warranty</h4>
                  <p className="text-[11px] text-zinc-500">Full coverage</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#141416] border border-[#D6AD65]/30 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4 text-[#D6AD65]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200 tracking-wide">30-Day Returns</h4>
                  <p className="text-[11px] text-zinc-500">Risk-free trial</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Luxury Black Headphone Image */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Ambient gold glow pedestal */}
            <div className="absolute inset-0 bg-radial from-[#D6AD65]/15 via-transparent to-transparent rounded-full filter blur-2xl transform scale-90" />
            
            <div className="relative group w-full max-w-lg lg:max-w-none">
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#D6AD65]/20 via-transparent to-[#D6AD65]/10 opacity-70 blur-sm group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0C] border border-[#D6AD65]/25 shadow-2xl shadow-black">
                <img
                  src={IMAGES.hero}
                  alt="AUDIOMÉ Flagship Reference Headphones"
                  className="w-full h-auto object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Showcase Pill / Info */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between p-3.5 rounded-xl bg-[#0F0F12]/90 backdrop-blur-md border border-[#D6AD65]/30">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D6AD65] font-semibold">Flagship Reference</span>
                    <h3 className="text-sm font-semibold text-white">Audiomé A1000 Pro Series</h3>
                    <p className="text-[11px] text-zinc-400">40mm Beryllium Transducers · 45h Battery</p>
                  </div>
                  <button
                    onClick={() => onExploreProduct('audiome-a1000-pro')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#D6AD65] hover:bg-[#E5C378] text-black text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Floating audio specs badges */}
              <div className="hidden sm:flex absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-[#121214] border border-[#D6AD65]/40 text-[11px] font-mono text-[#D6AD65] shadow-lg items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD65]" />
                <span>24-bit / 192kHz LDAC</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
