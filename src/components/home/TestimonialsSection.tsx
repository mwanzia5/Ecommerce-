import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/products';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-3">
            Player Validation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#121316] tracking-tight mb-4">
            Trusted on <span className="italic">Court</span>
          </h2>
          <p className="text-sm text-[#64676E]">
            Tested by professionals on the tour and competitive tournament players globally.
          </p>
        </div>

        {/* 3 Testimonials in clean, subtle typography (no giant plastic cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-8 rounded-xl bg-white border border-[#E6E4DF] hover:border-[#FF5500]/40 transition-colors shadow-sm"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-5 text-[#FF5500]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Subtle Quote */}
                <blockquote className="text-sm sm:text-base text-[#2D3139] leading-relaxed font-normal mb-8">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Player Signature & Credentials */}
              <div className="pt-6 border-t border-[#F0EFEB]">
                <div className="font-semibold text-sm text-[#121316]">{t.author}</div>
                <div className="text-xs text-[#FF5500] font-medium mt-0.5">{t.role}</div>
                <div className="text-[11px] text-[#71747C] font-mono mt-0.5">
                  {t.ranking} · {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Trust Bar */}
        <div className="mt-16 pt-10 border-t border-[#E6E4DF] flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-xs text-[#71747C] font-mono uppercase tracking-wider">
          <span>ITF Certified Frames</span>
          <span>·</span>
          <span>ATP Challenger Validated</span>
          <span>·</span>
          <span>100% Recycled Technical Packaging</span>
          <span>·</span>
          <span>30-Day On-Court Trial</span>
        </div>

      </div>
    </section>
  );
};
