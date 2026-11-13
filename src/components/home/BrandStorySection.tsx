import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ASSETS } from '../../data/products';

export const BrandStorySection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-[#E6E4DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Magazine Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Manifesto (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase">
                Brand Manifesto
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight text-[#121316] leading-[1.02] mb-6">
              Made for the way <br />
              <span className="italic text-[#FF5500]">you play.</span>
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-[#52555D] leading-relaxed mb-8">
              <p>
                Tennis was not built for shortcuts. It is an honest, unforgiving sport where 
                isolated decisions dictate outcomes in tenths of a second.
              </p>
              <p>
                At TennisPro, we design equipment without compromise. Every graphite filament, 
                every laser-cut vent, and every herringbone tread profile exists to elevate your 
                instincts. We test alongside tour professionals and dedicated club competitors across 
                scorching clay in Valencia and fast indoor hardcourts in Stockholm.
              </p>
              <p className="font-medium text-[#121316]">
                We believe that when your equipment moves with effortless synergy, your mind stays 
                free to conquer the next point.
              </p>
            </div>

            {/* Editorial Quote */}
            <div className="p-6 rounded-xl bg-[#FAF9F6] border-l-2 border-[#FF5500] mb-8">
              <p className="italic text-[#121316] font-display text-lg mb-2">
                "When you step on court with gear you trust unconditionally, the court feels twice as wide."
              </p>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#71747C]">
                Julian Rossi — Founder & Head of R&D
              </div>
            </div>

            <div>
              <button
                onClick={() => navigateTo('/about')}
                className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-[#121316] hover:text-[#FF5500] transition-colors cursor-pointer"
              >
                <span className="border-b border-[#121316] group-hover:border-[#FF5500] pb-0.5 transition-colors">
                  Our Story
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* Right Column: Editorial Lifestyle Photograph (Cols 7-12) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] border border-[#E6E4DF] shadow-md group">
              <img
                src={ASSETS.lifestyleEditorial}
                alt="Tennis player stepping onto red clay court at Court Central"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle Magazine Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-light flex items-center justify-between">
                <span>Court Central · Morning Training Session</span>
                <span className="font-mono text-white/80">Paris, France</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
