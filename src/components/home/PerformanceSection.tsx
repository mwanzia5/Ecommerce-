import React from 'react';
import { Activity, Target, Zap, ArrowUpRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const PerformanceSection: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useShop();

  const handlePillarClick = (category: 'rackets' | 'shoes' | 'apparel') => {
    setSelectedCategory(category);
    navigateTo('/shop');
  };

  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-3">
            Core Performance
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#121316] tracking-tight leading-[1.05] mb-4">
            Made for <span className="italic">Every Point.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#64676E]">
            Modern tennis is won in fractional seconds and millimeter margins. 
            We architect our gear around three foundational pillars of elite court performance.
          </p>
        </div>

        {/* 3 Pillars Grid - Minimal, Athletic, No cheesy 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: POWER */}
          <div 
            onClick={() => handlePillarClick('rackets')}
            className="group relative bg-white rounded-xl p-8 sm:p-10 border border-[#E6E4DF] transition-all duration-200 hover:border-[#FF5500]/50 hover:shadow-lg cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono font-medium text-stone-400 group-hover:text-[#FF5500] transition-colors">
                  01 / ATTACK
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] flex items-center justify-center text-[#121316] group-hover:bg-[#FF5500] group-hover:text-white group-hover:border-[#FF5500] transition-colors">
                  <Zap className="w-5 h-5" strokeWidth={1.8} />
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-[#121316] mb-2 font-display">
                POWER
              </h3>
              
              <div className="text-sm font-semibold text-[#FF5500] mb-3">
                More explosive shots.
              </div>

              <p className="text-xs sm:text-sm text-[#64676E] leading-relaxed mb-6">
                Maximized kinetic transfer through braided carbon layup and aerodynamic beam geometry. 
                Generate higher ball speeds on groundstrokes and first serves with less physical strain.
              </p>
            </div>

            <div className="pt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#121316] group-hover:text-[#FF5500] transition-colors">
              <span>Explore Power Series</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Pillar 2: CONTROL */}
          <div 
            onClick={() => handlePillarClick('rackets')}
            className="group relative bg-white rounded-xl p-8 sm:p-10 border border-[#E6E4DF] transition-all duration-200 hover:border-[#FF5500]/50 hover:shadow-lg cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono font-medium text-stone-400 group-hover:text-[#FF5500] transition-colors">
                  02 / PRECISION
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] flex items-center justify-center text-[#121316] group-hover:bg-[#FF5500] group-hover:text-white group-hover:border-[#FF5500] transition-colors">
                  <Target className="w-5 h-5" strokeWidth={1.8} />
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-[#121316] mb-2 font-display">
                CONTROL
              </h3>

              <div className="text-sm font-semibold text-[#FF5500] mb-3">
                More precision.
              </div>

              <p className="text-xs sm:text-sm text-[#64676E] leading-relaxed mb-6">
                Calibrated frame flex and dense string patterns ensure the ball stays on the string bed longer. 
                Paint the lines with unwavering trajectory control and drop-shot touch.
              </p>
            </div>

            <div className="pt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#121316] group-hover:text-[#FF5500] transition-colors">
              <span>Explore Control Series</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Pillar 3: SPEED */}
          <div 
            onClick={() => handlePillarClick('shoes')}
            className="group relative bg-white rounded-xl p-8 sm:p-10 border border-[#E6E4DF] transition-all duration-200 hover:border-[#FF5500]/50 hover:shadow-lg cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono font-medium text-stone-400 group-hover:text-[#FF5500] transition-colors">
                  03 / AGILITY
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] flex items-center justify-center text-[#121316] group-hover:bg-[#FF5500] group-hover:text-white group-hover:border-[#FF5500] transition-colors">
                  <Activity className="w-5 h-5" strokeWidth={1.8} />
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-[#121316] mb-2 font-display">
                SPEED
              </h3>

              <div className="text-sm font-semibold text-[#FF5500] mb-3">
                Faster movement.
              </div>

              <p className="text-xs sm:text-sm text-[#64676E] leading-relaxed mb-6">
                Ultralight responsive chassis and lateral stabilizer guards give you the grip and spring 
                to slide, recover, and sprint to unexpected drop shots with zero ankle drag.
              </p>
            </div>

            <div className="pt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#121316] group-hover:text-[#FF5500] transition-colors">
              <span>Explore Speed Series</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
