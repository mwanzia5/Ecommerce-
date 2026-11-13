import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../../data/products';

export const SocialFeedSection: React.FC = () => {
  const posts = [
    {
      img: ASSETS.heroAthlete,
      caption: 'Full extension on clay. The Pro Carbon 98 handling 120mph returns.',
      tag: '#TennisProTour',
    },
    {
      img: ASSETS.racketCarbonPro,
      caption: 'Inside our carbon composite string lab. 62 RA flex calibration.',
      tag: '#PrecisionLab',
    },
    {
      img: ASSETS.lifestyleEditorial,
      caption: 'Quiet morning sessions before the tournament crowds fill the stands.',
      tag: '#CourtCentral',
    },
    {
      img: ASSETS.shoesCourtPro,
      caption: 'Herringbone outsole grip tuned for zero-skid hardcourt reversals.',
      tag: '#CourtProSpeed',
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-2">
              <Instagram className="w-4 h-4" />
              <span>@tennispro</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display text-[#121316] tracking-tight">
              Follow the <span className="italic">Game</span>
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#121316] hover:text-[#FF5500] transition-colors"
          >
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4-Item Editorial Photography Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#FAF9F6] border border-[#E6E4DF] cursor-pointer"
            >
              <img
                src={post.img}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                <span className="text-[11px] font-mono text-[#FF5500] mb-1">{post.tag}</span>
                <p className="text-xs font-light line-clamp-2 text-stone-200">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
