import React from 'react';
import { Award, ShieldCheck, Headphones, HeartHandshake } from 'lucide-react';

export const TrustBenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: 'Premium Quality',
      description: 'Crafted to perfection.',
      icon: <Award className="w-6 h-6 text-[#D6AD65]" />,
    },
    {
      title: 'Secure Payments',
      description: '100% safe & secure.',
      icon: <ShieldCheck className="w-6 h-6 text-[#D6AD65]" />,
    },
    {
      title: 'Expert Support',
      description: 'Here to help anytime.',
      icon: <Headphones className="w-6 h-6 text-[#D6AD65]" />,
    },
    {
      title: 'Trusted by Audiophiles',
      description: 'Loved worldwide.',
      icon: <HeartHandshake className="w-6 h-6 text-[#D6AD65]" />,
    },
  ];

  return (
    <section className="py-14 bg-[#08080B] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#0D0D11] border border-white/5 hover:border-[#D6AD65]/30 transition-all duration-300 group"
            >
              {/* Elegant golden circular icon frame */}
              <div className="w-13 h-13 rounded-2xl bg-[#141418] border border-[#D6AD65]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#D6AD65] transition-all duration-300 shadow-lg shadow-black/50">
                {item.icon}
              </div>

              <div>
                <h3 className="font-serif-luxury text-sm font-bold text-white group-hover:text-[#D6AD65] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
