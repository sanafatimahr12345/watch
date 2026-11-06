import React from 'react';
import { X, Clock, User, Share2, BookOpen } from 'lucide-react';
import { EditorialArticle } from '../types';

interface ArticleModalProps {
  article: EditorialArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#0D0D11] border border-[#D6AD65]/35 rounded-3xl shadow-2xl shadow-black overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close article modal"
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white bg-black/70 rounded-full hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-black">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D6AD65] bg-black/80 px-3 py-1 rounded border border-[#D6AD65]/30">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-3">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
              {article.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 border-b border-white/10 pb-4">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <User className="w-3.5 h-3.5 text-[#D6AD65]" />
                {article.author}
              </span>
              <span>·</span>
              <span>{article.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                {article.readTime}
              </span>
            </div>
          </div>

          <p className="text-base text-zinc-300 font-medium italic border-l-2 border-[#D6AD65] pl-4">
            "{article.excerpt}"
          </p>

          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-light">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-500">AUDIOMÉ Acoustic Research Publications</span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#D6AD65] text-black text-xs font-semibold rounded-lg uppercase tracking-wider hover:bg-[#E5C378] transition-colors"
            >
              Close Journal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
