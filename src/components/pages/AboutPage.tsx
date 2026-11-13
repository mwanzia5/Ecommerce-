import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Leaf, Award } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ASSETS } from '../../data/products';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-3">
            Our Purpose
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-[#121316] tracking-tight leading-[1.02] mb-6">
            Engineered for <br />
            <span className="italic text-[#FF5500]">Pure Performance.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#52555D] leading-relaxed">
            TennisPro was founded on a singular conviction: competitive tennis gear should 
            not be bloated with cosmetic gimmicks. Every gram and every fiber must serve the player's victory.
          </p>
        </div>

        {/* Hero Editorial Photography */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-16 border border-[#E6E4DF] shadow-md">
          <img
            src={ASSETS.lifestyleEditorial}
            alt="TennisPro Tour Heritage Court"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 text-white text-xs font-mono">
            EST. 2022 · RESEARCH FACILITY: SAN DIEGO, CA · EUROPEAN TOUR OFFICE: MONACO
          </div>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-display text-[#121316] mb-4">
              The Evolution of Modern Ball Striking
            </h2>
            <div className="w-12 h-0.5 bg-[#FF5500] mb-6" />
            <p className="text-xs font-mono text-[#71747C] uppercase tracking-wider">
              "We didn't set out to make another tennis racket. We set out to build the racket that stays steady when your heart is racing at 30-40."
            </p>
          </div>

          <div className="md:col-span-7 space-y-5 text-sm sm:text-base text-[#52555D] leading-relaxed">
            <p>
              In recent decades, tennis has transformed into an explosive physical chess match. 
              Rally ball speeds exceed 80 mph consistently, requiring players to react in fractions 
              of a second while sliding on clay or sprinting across hard courts.
            </p>
            <p>
              Traditional equipment forced players into a compromise: choosing between stiff, 
              arm-jarring power frames or flexible, low-powered heritage rackets that lack 
              modern topspin bite.
            </p>
            <p>
              TennisPro engineered a proprietary braided graphite matrix that bridges both worlds: 
              a 62 RA flex profile that pockets the ball for surgical direction control, combined with 
              an aerodynamic beam profile that cuts through the air with blistering acceleration.
            </p>
          </div>
        </div>

        {/* 4 Brand Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-white p-6 rounded-xl border border-[#E6E4DF] shadow-xs">
            <Award className="w-6 h-6 text-[#FF5500] mb-3" />
            <h3 className="font-bold text-sm text-[#121316] mb-1">Tour Precision</h3>
            <p className="text-xs text-[#64676E] leading-relaxed">
              Every frame is weight-matched to within ±1.5g variance across batches.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E6E4DF] shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[#FF5500] mb-3" />
            <h3 className="font-bold text-sm text-[#121316] mb-1">Arm Health</h3>
            <p className="text-xs text-[#64676E] leading-relaxed">
              Kinetic dampeners filter high-frequency impact shocks that cause tennis elbow.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E6E4DF] shadow-xs">
            <Leaf className="w-6 h-6 text-[#FF5500] mb-3" />
            <h3 className="font-bold text-sm text-[#121316] mb-1">Sustainable Craft</h3>
            <p className="text-xs text-[#64676E] leading-relaxed">
              Recycled technical fibers and plastic-free recyclable racket packaging.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E6E4DF] shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-[#FF5500] mb-3" />
            <h3 className="font-bold text-sm text-[#121316] mb-1">On-Court Guarantee</h3>
            <p className="text-xs text-[#64676E] leading-relaxed">
              30 days to play competitive matches. If you aren't winning, return it.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#121316] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-display mb-2">Ready to Elevate Your Matchplay?</h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Discover our complete collection of frames, shoes, and tournament apparel.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/shop')}
            className="px-6 py-3.5 bg-[#FF5500] hover:bg-[#E04800] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore The Store</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
