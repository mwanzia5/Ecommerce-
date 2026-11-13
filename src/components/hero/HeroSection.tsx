import React from 'react';
import { ArrowRight, Play, Gem, Truck, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ASSETS } from '../../data/products';

export const HeroSection: React.FC = () => {
  const { navigateTo, setIsVideoModalOpen } = useShop();

  return (
    <section className="relative w-full min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-[#FAF9F6]">
      {/* Background Hero Asset - Exactly matching the uploaded composition */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.heroAthlete}
          alt="TennisPro Airborne Tennis Champion in Motion"
          className="w-full h-full object-cover object-[78%_center] sm:object-right-center select-none"
          loading="eager"
        />
        {/* Very subtle gradient overlay on the far left to keep text ultra-crisp across all screen sizes */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#FAF9F6]/95 via-[#FAF9F6]/60 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-xl xl:max-w-2xl py-6">
          
          {/* 1. Small Frosted Pill Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-6 self-start">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] shrink-0 shadow-[0_0_8px_rgba(255,85,0,0.6)]" />
            <span className="text-xs sm:text-[13px] font-medium text-stone-600 tracking-wide">
              Play Stronger. Go Further.
            </span>
          </div>

          {/* 2. Large Editorial Headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[5.75rem] font-display tracking-tight text-[#141518] leading-[0.94] mb-6">
            <span className="italic block font-normal text-[#141518]">
              Premium
            </span>
            <span className="block font-normal">
              <span className="text-[#FF5500] italic">Tennis</span>{' '}
              <span className="text-[#141518]">Gear</span>
            </span>
          </h1>

          {/* 3. Supporting Copy */}
          <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed max-w-md sm:max-w-lg mb-8">
            High-performance rackets, balls and accessories for every level of the game.
          </p>

          {/* 4. Action Buttons */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 mb-12">
            {/* Primary Orange Button */}
            <button
              onClick={() => navigateTo('/shop')}
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#FF5500] hover:bg-[#E04800] text-white text-sm font-semibold rounded-full shadow-[0_12px_28px_-6px_rgba(255,85,0,0.55)] hover:shadow-[0_16px_34px_-6px_rgba(255,85,0,0.7)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
            </button>

            {/* Secondary Watch Video Button */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="group inline-flex items-center gap-3.5 cursor-pointer py-2"
            >
              <div className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-[0_4px_14px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#141518] group-hover:scale-105 group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-200">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span className="text-sm font-semibold text-stone-800 group-hover:text-[#FF5500] transition-colors">
                Watch Video
              </span>
            </button>
          </div>

          {/* 5. Floating Frosted Credibility Points Bar */}
          <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 px-6 py-4 rounded-2xl bg-white/75 backdrop-blur-md border border-white/85 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            
            {/* Point 1: Premium Quality */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/90 border border-black/5 flex items-center justify-center text-[#141518] shadow-xs shrink-0">
                <Gem className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#141518] leading-tight">Premium Quality</div>
                <div className="text-[11px] text-stone-500 leading-tight">Built to last</div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-stone-300/70" />

            {/* Point 2: Fast Delivery */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/90 border border-black/5 flex items-center justify-center text-[#141518] shadow-xs shrink-0">
                <Truck className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#141518] leading-tight">Fast Delivery</div>
                <div className="text-[11px] text-stone-500 leading-tight">Across the country</div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-stone-300/70" />

            {/* Point 3: Trusted by Pros */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/90 border border-black/5 flex items-center justify-center text-[#141518] shadow-xs shrink-0">
                <ShieldCheck className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#141518] leading-tight">Trusted by Pros</div>
                <div className="text-[11px] text-stone-500 leading-tight">Play with confidence</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
