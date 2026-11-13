import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCategory } from '../../types/ecommerce';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useShop();

  const handleShopLink = (category: ProductCategory) => {
    setSelectedCategory(category);
    navigateTo('/shop');
  };

  return (
    <footer className="bg-[#121316] text-[#A0A3AB] pt-20 pb-12 border-t border-[#1C1D21]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main 4-Column Grid + Brand Column */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column (Cols 1-4) */}
          <div className="col-span-2 md:col-span-4 pr-0 md:pr-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#FF5500] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-white/60" />
              </div>
              <span className="text-2xl font-bold font-display text-white tracking-tight">
                Tennis<span className="text-[#FF5500]">Pro</span>
              </span>
            </div>

            <p className="text-sm text-[#8E929C] leading-relaxed mb-6 max-w-sm">
              Engineered for speed, control, and confidence on every point. 
              Equipping competitive tennis players worldwide with tournament-level hardware.
            </p>

            <div className="text-xs font-mono text-[#71747C]">
              DESIGNED IN SAN DIEGO & MONACO
            </div>
          </div>

          {/* Column 1: Shop (Cols 5-6) */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleShopLink('rackets')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Rackets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopLink('balls')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Balls
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopLink('shoes')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopLink('apparel')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopLink('accessories')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopLink('all')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Help (Cols 7-8) */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/shipping')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/returns')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/faq')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/faq')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Size Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (Cols 9-10) */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-[#FF5500] transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow (Cols 11-12) */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
              Follow
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5500] transition-colors block"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5500] transition-colors block"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5500] transition-colors block"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5500] transition-colors block"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71747C] gap-4">
          <div>
            © 2026 TennisPro Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('/privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('/terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigateTo('/privacy')}
              className="hover:text-white transition-colors"
            >
              Cookie Preferences
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
