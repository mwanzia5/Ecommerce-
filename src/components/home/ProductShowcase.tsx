import React from 'react';
import { ArrowRight, Check, Zap, Crosshair, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ASSETS, PRODUCTS } from '../../data/products';

export const ProductShowcase: React.FC = () => {
  const { openProductDetail, navigateTo } = useShop();
  const showcaseProduct = PRODUCTS[0]; // TennisPro Pro Carbon 98

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-[#E6E4DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Dramatic Racket Studio Photography Showcase (Cols 1-7) */}
          <div className="lg:col-span-7 order-2 lg:order-1 relative">
            <div className="relative rounded-2xl bg-[#F6F5F1] p-6 sm:p-12 overflow-hidden border border-[#E6E4DF] shadow-sm group">
              
              {/* Subtle architectural background grid */}
              <div 
                className="absolute inset-0 bg-[linear-gradient(to_right,#E6E4DF_1px,transparent_1px),linear-gradient(to_bottom,#E6E4DF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" 
              />
              
              {/* Subtle orange aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 aspect-[4/3] flex items-center justify-center">
                <img
                  src={ASSETS.racketCarbonPro}
                  alt="TennisPro Pro Carbon 98 on stone plinth in studio"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Technical Spec Callout Overlays */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded border border-[#E6E4DF] shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
                <span className="text-xs font-semibold text-[#121316]">High-Modulus 40T Carbon</span>
              </div>

              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded border border-[#E6E4DF] shadow-sm flex items-center gap-2">
                <span className="text-xs font-mono text-[#64676E]">Weight: <strong className="text-[#121316]">305g</strong></span>
                <span className="text-stone-300">·</span>
                <span className="text-xs font-mono text-[#64676E]">Head: <strong className="text-[#121316]">98 in²</strong></span>
              </div>
            </div>
          </div>

          {/* Text and Innovation Story (Cols 8-12) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase">
                Engineering Spotlight
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display tracking-tight text-[#121316] leading-[1.05] mb-6">
              Precision <span className="italic text-[#FF5500]">Meets</span> Power.
            </h2>

            <p className="text-lg text-[#121316] font-medium mb-3">
              Engineered for the next point.
            </p>

            <p className="text-sm sm:text-base text-[#64676E] leading-relaxed mb-8">
              Every millimeter of the Pro Carbon 98 frame is calibrated to eliminate frame torsional 
              twist while preserving plush, arm-friendly dwell time. When you swing fast, the frame 
              flexes with surgical predictability, sending the ball dipping inside the baseline line with biting top spin.
            </p>

            {/* 3 Technical Highlights */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded bg-[#FF5500]/10 text-[#FF5500] shrink-0 mt-0.5">
                  <Crosshair className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#121316]">AeroBeam 21.5mm Profile</div>
                  <div className="text-xs text-[#71747C]">Cuts wind resistance for rapid racket head speed through contact.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded bg-[#FF5500]/10 text-[#FF5500] shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#121316]">Kinetic Gel Handle Channels</div>
                  <div className="text-xs text-[#71747C]">Filters 38% of arm-straining micro-vibrations before they reach your elbow.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded bg-[#FF5500]/10 text-[#FF5500] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#121316]">Opti-Density String Bed</div>
                  <div className="text-xs text-[#71747C]">Denser string spacing in the sweetspot for surgical control on break points.</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => openProductDetail(showcaseProduct)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#FF5500] hover:bg-[#E04800] text-white text-sm font-semibold rounded-md transition-colors shadow-sm cursor-pointer"
              >
                <span>Explore Rackets</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => navigateTo('/shop')}
                className="text-xs font-semibold uppercase tracking-wider text-[#121316] hover:text-[#FF5500] py-3 px-4 transition-colors"
              >
                View Specifications
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
