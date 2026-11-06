import React from 'react';
import { Volume2, Shield, Award } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onScrollToSection }) => {
  return (
    <footer className="bg-[#040406] border-t border-white/10 text-zinc-400 text-xs">
      {/* Upper Brand & Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#D6AD65]/40 flex items-center justify-center bg-[#121214]">
                <Volume2 className="w-4 h-4 text-[#D6AD65]" />
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-white">
                AUDIOMÉ
              </span>
            </div>

            <p className="text-zinc-400 text-sm max-w-sm font-light leading-relaxed">
              Be Closer to Every Note. Masterpiece acoustics, reference-grade beryllium drivers, and handcrafted chassis designed for purists of pure sound.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#D6AD65]">
              <span className="flex items-center gap-1.5 border border-[#D6AD65]/30 px-3 py-1 rounded-full bg-[#121215]">
                <Award className="w-3.5 h-3.5" />
                Hi-Res Audio Certified
              </span>
              <span className="flex items-center gap-1.5 border border-[#D6AD65]/30 px-3 py-1 rounded-full bg-[#121215]">
                <Shield className="w-3.5 h-3.5" />
                2-Year Global Warranty
              </span>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-white text-sm font-bold uppercase tracking-wider">
              Acoustic Gear
            </h4>
            <ul className="space-y-2">
              {['headphones', 'earbuds', 'speakers', 'microphones', 'amplifiers'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat as ProductCategory);
                      onScrollToSection('best-sellers');
                    }}
                    className="hover:text-[#D6AD65] transition-colors capitalize text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Technology & Heritage */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-white text-sm font-bold uppercase tracking-wider">
              Sound Science
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onScrollToSection('editor-picks')}
                  className="hover:text-[#D6AD65] transition-colors text-left"
                >
                  Beryllium Transducers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('editor-picks')}
                  className="hover:text-[#D6AD65] transition-colors text-left"
                >
                  Hybrid ANC Arrays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('editor-picks')}
                  className="hover:text-[#D6AD65] transition-colors text-left"
                >
                  Acoustic Staging Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('editor-picks')}
                  className="hover:text-[#D6AD65] transition-colors text-left"
                >
                  Vacuum Tube Purity
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Concierge */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-white text-sm font-bold uppercase tracking-wider">
              Concierge
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Track Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Warranty Registration
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Authorized Dealers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Acoustic Consultation
                </span>
              </li>
              <li>
                <span className="text-[#D6AD65] font-mono text-[11px]">
                  concierge@audiome-sound.com
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 bg-[#020203]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-[11px]">
            &copy; {new Date().getFullYear()} AUDIOMÉ Sound Laboratories Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-zinc-500">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Precision</span>
            <span className="hover:text-zinc-400 cursor-pointer">Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
