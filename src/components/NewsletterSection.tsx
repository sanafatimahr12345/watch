import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden">
      {/* Background golden glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D6AD65]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-[#0F0F13] to-[#0A0A0C] border border-[#D6AD65]/35 p-8 sm:p-14 text-center shadow-2xl shadow-black relative overflow-hidden">
          
          {/* Subtle acoustic line accent */}
          <div className="w-16 h-1 bg-[#D6AD65] mx-auto mb-6 rounded-full" />

          {/* Heading */}
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            STAY IN TUNE
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-400 font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Be the first to know about new arrivals, exclusive offers, and audio tips.
          </p>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-[#141418] border border-emerald-500/40 text-center space-y-3 animate-in fade-in duration-300 max-w-md mx-auto">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-white">
                Welcome to the Circle
              </h3>
              <p className="text-xs text-zinc-300">
                You're now subscribed! Enjoy 10% off your next order with code:
              </p>
              <div className="inline-block px-4 py-2 bg-black border border-[#D6AD65] rounded-lg font-mono text-sm font-bold text-[#D6AD65] tracking-widest">
                AUDIOME10
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#121216] text-white text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-xl border border-white/10 hover:border-[#D6AD65]/40 focus:border-[#D6AD65] focus:outline-none focus:ring-1 focus:ring-[#D6AD65] placeholder:text-zinc-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="gold-button px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold shrink-0 inline-flex items-center justify-center gap-2 group shadow-lg shadow-[#D6AD65]/20"
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400 font-medium text-left px-2 animate-in fade-in">
                  {error}
                </p>
              )}

              <p className="text-[11px] text-zinc-500 pt-2">
                We respect your privacy. No spam. Unsubscribe anytime.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
