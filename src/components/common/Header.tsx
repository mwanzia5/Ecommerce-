import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCategory } from '../../types/ecommerce';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    navigateTo,
    activeRoute,
    setSelectedCategory,
  } = useShop();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [gearDropdownOpen, setGearDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: string, category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    navigateTo(route);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setGearDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-black/5 shadow-sm py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo (Orange Ball with curved seams + TennisPro) */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus-visible:outline-none shrink-0"
            aria-label="TennisPro Home"
          >
            {/* Custom SVG Tennis Ball with dynamic curved swoosh seams */}
            <div className="relative w-9 h-9 rounded-full bg-[#FF5500] flex items-center justify-center shadow-[0_4px_12px_rgba(255,85,0,0.35)] overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
                <circle cx="18" cy="18" r="18" fill="#FF5500" />
                {/* Tennis ball curved white seams */}
                <path
                  d="M 5,9 C 13,10 18,17 18,27 C 18,31 16,34 15,36"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d="M 31,27 C 23,26 18,19 18,9 C 18,5 20,2 21,0"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </svg>
            </div>
            
            <span className="text-2xl font-bold tracking-tight text-[#141518] font-sans">
              Tennis<span className="text-[#FF5500]">Pro</span>
            </span>
          </button>

          {/* Center: Frosted Pill Navigation Bar */}
          <nav className="hidden lg:flex items-center bg-white/75 backdrop-blur-md px-6 py-2 rounded-full border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-sm font-medium text-stone-700 gap-7">
            {/* Home with active orange underline */}
            <button
              onClick={() => handleNavClick('/')}
              className={`relative py-1 transition-colors hover:text-[#141518] cursor-pointer ${
                activeRoute === '/' ? 'text-[#141518] font-semibold' : 'text-stone-600'
              }`}
            >
              <span>Home</span>
              {activeRoute === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5500] rounded-full" />
              )}
            </button>

            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                onMouseEnter={() => setShopDropdownOpen(true)}
                className="flex items-center gap-1 py-1 hover:text-[#141518] transition-colors cursor-pointer text-stone-600"
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {shopDropdownOpen && (
                <div
                  onMouseLeave={() => setShopDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-xl border border-black/5 flex flex-col gap-1 text-xs"
                >
                  <button
                    onClick={() => handleNavClick('/shop', 'all')}
                    className="px-3 py-2 text-left rounded-lg hover:bg-stone-100 text-stone-800 font-medium"
                  >
                    All Equipment
                  </button>
                  <button
                    onClick={() => handleNavClick('/shop', 'rackets')}
                    className="px-3 py-2 text-left rounded-lg hover:bg-stone-100 text-stone-800"
                  >
                    Tennis Rackets
                  </button>
                  <button
                    onClick={() => handleNavClick('/shop', 'shoes')}
                    className="px-3 py-2 text-left rounded-lg hover:bg-stone-100 text-stone-800"
                  >
                    Court Shoes
                  </button>
                  <button
                    onClick={() => handleNavClick('/shop', 'apparel')}
                    className="px-3 py-2 text-left rounded-lg hover:bg-stone-100 text-stone-800"
                  >
                    Performance Apparel
                  </button>
                </div>
              )}
            </div>

            {/* Gear Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGearDropdownOpen(!gearDropdownOpen)}
                onMouseEnter={() => setGearDropdownOpen(true)}
                className="flex items-center gap-1 py-1 hover:text-[#141518] transition-colors cursor-pointer text-stone-600"
              >
                <span>Gear</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {gearDropdownOpen && (
                <div
                  onMouseLeave={() => setGearDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-xl border border-black/5 flex flex-col gap-1 text-xs"
                >
                  <button
                    onClick={() => handleNavClick('/shop', 'bags')}
                    className="px-3 py-2 text-left rounded-lg hover:bg-stone-100 text-stone-800"
                  >
                    Tour Bags & Packs
                  </button>
                  <button
                    onClick={() => handleNavClick('/shop', 'balls')}
                    className="px-3 py-2 text-left rounded-lg hover:bg-stone-100 text-stone-800"
                  >
                    Championship Balls
                  </button>
                  <button
                    onClick={() => handleNavClick('/shop', 'accessories')}
                    className="px-3 py-2 text-left rounded-lg hover:bg-stone-100 text-stone-800"
                  >
                    Grips & Dampeners
                  </button>
                </div>
              )}
            </div>

            {/* About */}
            <button
              onClick={() => handleNavClick('/about')}
              className={`py-1 transition-colors hover:text-[#141518] cursor-pointer ${
                activeRoute === '/about' ? 'text-[#141518] font-semibold' : 'text-stone-600'
              }`}
            >
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('/contact')}
              className={`py-1 transition-colors hover:text-[#141518] cursor-pointer ${
                activeRoute === '/contact' ? 'text-[#141518] font-semibold' : 'text-stone-600'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right: Circular Frosted Glass Search & Cart Icons */}
          <div className="flex items-center gap-3">
            {/* Search Icon Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center text-stone-700 hover:text-[#FF5500] hover:bg-white transition-all cursor-pointer"
              aria-label="Search equipment"
            >
              <Search className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Shopping Bag / Cart Icon Button with Floating Orange Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center text-stone-700 hover:text-[#FF5500] hover:bg-white transition-all cursor-pointer group"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-105 transition-transform" strokeWidth={2} />
              
              {/* Orange circular badge on top-right */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5500] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-sm border border-white">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center text-stone-700 hover:text-[#FF5500]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 border-l border-stone-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FF5500] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border border-white/60" />
                  </div>
                  <span className="text-xl font-bold text-stone-900 font-sans">
                    Tennis<span className="text-[#FF5500]">Pro</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4 text-base font-medium text-stone-800">
                <button
                  onClick={() => handleNavClick('/')}
                  className="text-left py-2 hover:text-[#FF5500] flex items-center justify-between"
                >
                  <span>Home</span>
                </button>
                <button
                  onClick={() => handleNavClick('/shop', 'all')}
                  className="text-left py-2 hover:text-[#FF5500]"
                >
                  Shop All Gear
                </button>
                <button
                  onClick={() => handleNavClick('/shop', 'rackets')}
                  className="text-left py-1.5 pl-3 text-sm text-stone-600 hover:text-[#FF5500]"
                >
                  Tennis Rackets
                </button>
                <button
                  onClick={() => handleNavClick('/shop', 'shoes')}
                  className="text-left py-1.5 pl-3 text-sm text-stone-600 hover:text-[#FF5500]"
                >
                  Court Footwear
                </button>
                <button
                  onClick={() => handleNavClick('/shop', 'apparel')}
                  className="text-left py-1.5 pl-3 text-sm text-stone-600 hover:text-[#FF5500]"
                >
                  Apparel
                </button>
                <button
                  onClick={() => handleNavClick('/shop', 'bags')}
                  className="text-left py-1.5 pl-3 text-sm text-stone-600 hover:text-[#FF5500]"
                >
                  Tour Bags
                </button>
                <button
                  onClick={() => handleNavClick('/about')}
                  className="text-left py-2 hover:text-[#FF5500]"
                >
                  About TennisPro
                </button>
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="text-left py-2 hover:text-[#FF5500]"
                >
                  Contact
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-100">
              <button
                onClick={() => handleNavClick('/shop')}
                className="w-full py-3 bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm"
              >
                Shop Collection →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
