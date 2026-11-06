import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { EditorialArticle } from '../types';
import { EDITORIAL_ARTICLES } from '../data/mockData';

interface EditorialSectionProps {
  onOpenArticle: (article: EditorialArticle) => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onOpenArticle }) => {
  return (
    <section id="editor-picks" className="py-16 bg-[#050505] border-b border-white/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-[#D6AD65]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D6AD65] font-semibold">
                Acoustic Journals
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Editor's Picks
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            Deep dives, soundstage acoustics, and hardware curation from our mastering lab.
          </p>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDITORIAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group rounded-2xl bg-[#0D0D10] border border-white/10 hover:border-[#D6AD65]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              {/* Article Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/80">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-106"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10] via-transparent to-transparent opacity-80" />
                
                {/* Clean Unboxed Metadata as mandated by Frontend Design Constitution */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 flex items-center gap-2 text-[11px] font-mono text-[#D6AD65]">
                  <span>{article.category}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#D6AD65] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => onOpenArticle(article)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#D6AD65] group-hover:text-white transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
