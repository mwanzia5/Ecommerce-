import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ASSETS } from '../../data/products';

export const CategoryShowcase: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useShop();

  const handleCategorySelect = (category: 'rackets' | 'apparel' | 'accessories') => {
    setSelectedCategory(category);
    navigateTo('/shop');
  };

  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-3">
              Collections
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#121316] tracking-tight">
              Built for the <span className="italic">Modern Game</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#64676E] max-w-md">
            Every collection is developed with tour-level specifications to empower your 
            tactical instincts from opening serve to match point.
          </p>
        </div>

        {/* Asymmetrical Editorial Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Category 1: Rackets - Large Feature (7 cols) */}
          <div
            onClick={() => handleCategorySelect('rackets')}
            className="lg:col-span-7 group relative bg-[#F2EFE9] rounded-xl overflow-hidden cursor-pointer min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-8 sm:p-12 border border-[#E6E4DF] transition-all duration-300 hover:shadow-xl hover:border-stone-400"
          >
            {/* Background Image with subtle zoom */}
            <div className="absolute inset-0 z-0">
              <img
                src={ASSETS.racketCarbonPro}
                alt="TennisPro Carbon Rackets in studio"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            </div>

            {/* Top Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-widest uppercase text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded">
                Frames & Strings
              </span>
              <span className="text-xs font-mono text-white/70">Series 01</span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 text-white max-w-md">
              <h3 className="text-3xl sm:text-4xl font-display mb-2">
                Rackets
              </h3>
              <p className="text-sm sm:text-base text-stone-200 mb-6 font-light">
                Precision, control and power. High-modulus braided graphite engineered for pinpoint targeting.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5500] group-hover:text-white transition-colors">
                <span>Shop Rackets</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Categories (Apparel & Accessories) - (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Category 2: Apparel */}
            <div
              onClick={() => handleCategorySelect('apparel')}
              className="group relative bg-[#F2EFE9] rounded-xl overflow-hidden cursor-pointer min-h-[240px] sm:min-h-[246px] flex flex-col justify-between p-8 border border-[#E6E4DF] transition-all duration-300 hover:shadow-xl hover:border-stone-400 flex-1"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ASSETS.apparelKit}
                  alt="TennisPro Technical Apparel"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded">
                  Matchday
                </span>
                <span className="text-xs font-mono text-white/70">Series 02</span>
              </div>

              <div className="relative z-10 text-white">
                <h3 className="text-2xl sm:text-3xl font-display mb-1">
                  Apparel
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 mb-4 font-light">
                  Move freely. Stay focused. Laser-cut ventilation and non-chafing microfibers.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF5500] group-hover:text-white transition-colors">
                  <span>Explore Apparel</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Category 3: Accessories */}
            <div
              onClick={() => handleCategorySelect('accessories')}
              className="group relative bg-[#F2EFE9] rounded-xl overflow-hidden cursor-pointer min-h-[240px] sm:min-h-[246px] flex flex-col justify-between p-8 border border-[#E6E4DF] transition-all duration-300 hover:shadow-xl hover:border-stone-400 flex-1"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ASSETS.bagProTour}
                  alt="TennisPro Tour Bags and Accessories"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded">
                  Equipment & Bags
                </span>
                <span className="text-xs font-mono text-white/70">Series 03</span>
              </div>

              <div className="relative z-10 text-white">
                <h3 className="text-2xl sm:text-3xl font-display mb-1">
                  Accessories
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 mb-4 font-light">
                  The details that complete your game. Thermal-lined tour bags, tack overgrips, and kinetic dampeners.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF5500] group-hover:text-white transition-colors">
                  <span>View Accessories</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
