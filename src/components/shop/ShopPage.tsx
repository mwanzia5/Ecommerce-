import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, PerformanceFocus } from '../../types/ecommerce';

export const ShopPage: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory } = useShop();

  // Filter States
  const [performanceFilter, setPerformanceFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Gear' },
    { id: 'rackets', label: 'Rackets' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'bags', label: 'Bags' },
    { id: 'balls', label: 'Balls' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPerformanceFilter('all');
    setMaxPrice(300);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    performanceFilter !== 'all' ||
    maxPrice < 300 ||
    onlyInStock;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Performance Focus Filter
        if (performanceFilter !== 'all' && p.performanceFocus !== performanceFilter) {
          return false;
        }
        // Price Filter
        if (p.price > maxPrice) {
          return false;
        }
        // Stock Filter
        if (onlyInStock && !p.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
        return 0; // default featured order
      });
  }, [products, selectedCategory, performanceFilter, maxPrice, onlyInStock, sortBy]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Shop Header */}
        <div className="pb-10 border-b border-[#E6E4DF] mb-8">
          <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-2">
            Catalog 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-display text-[#121316] tracking-tight mb-3">
            Shop Tennis <span className="italic text-[#FF5500]">Gear</span>
          </h1>
          <p className="text-sm sm:text-base text-[#64676E] max-w-xl">
            Everything you need to play your best game. Tour-grade frames, speed footwear, and matchday essentials.
          </p>

          {/* Clean Segmented Category Tabs (Functional buttons with active indicators) */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#121316] text-white shadow-sm'
                    : 'bg-white text-[#52555D] border border-[#E6E4DF] hover:border-[#121316] hover:text-[#121316]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Result Count, Mobile Filter Trigger, and Sorting Dropdown */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="text-xs text-[#71747C] font-mono">
            Showing <strong className="text-[#121316] tabular-nums">{filteredProducts.length}</strong> products
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E6E4DF] rounded-md text-xs font-semibold text-[#121316]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
              )}
            </button>

            {/* Sorting Dropdown */}
            <div className="relative inline-flex items-center">
              <span className="text-xs text-[#71747C] mr-2 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E6E4DF] text-xs font-semibold text-[#121316] px-3 py-2 rounded-md focus:outline-none focus:border-[#FF5500] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Best Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Layout: Sidebar Filters + 4-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-xl border border-[#E6E4DF] shadow-sm sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EFEB]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#121316]">
                Filters
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FF5500] hover:text-[#E04800]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Performance Type Filter */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#121316] block mb-3">
                Performance Profile
              </label>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Profiles' },
                  { id: 'control', label: 'Control & Feel' },
                  { id: 'power', label: 'Power & Pace' },
                  { id: 'speed', label: 'Speed & Agility' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 text-xs text-[#52555D] cursor-pointer hover:text-[#121316]">
                    <input
                      type="radio"
                      name="performance"
                      checked={performanceFilter === item.id}
                      onChange={() => setPerformanceFilter(item.id)}
                      className="accent-[#FF5500]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#F0EFEB]">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#121316] mb-3">
                <span>Max Price</span>
                <span className="font-mono tabular-nums text-[#FF5500]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FF5500] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#71747C] mt-1">
                <span>$20</span>
                <span>$300</span>
              </div>
            </div>

            {/* In-Stock Filter */}
            <div className="pt-4 border-t border-[#F0EFEB]">
              <label className="flex items-center gap-2.5 text-xs text-[#121316] font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-[#FF5500] rounded"
                />
                <span>In Stock & Ready to Ship</span>
              </label>
            </div>

            {/* Free Shipping Callout */}
            <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] text-xs text-[#52555D]">
              <span className="font-semibold text-[#121316]">Free Standard Delivery</span> on all orders over $150 across the continental US.
            </div>
          </aside>

          {/* Product Grid Area (9 cols desktop = 3 cols within, tablet 3 cols, mobile 2 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-[#E6E4DF] p-8">
                <div className="w-12 h-12 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#121316] mb-2 font-display">
                  No products match your filters
                </h3>
                <p className="text-xs text-[#64676E] max-w-sm mx-auto mb-6">
                  Try adjusting the price range or resetting selected categories to view all equipment.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 bg-[#121316] text-white text-xs font-semibold rounded-md hover:bg-[#FF5500] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E4DF] mb-6">
                <span className="text-sm font-bold uppercase tracking-wider text-[#121316]">
                  Filter Gear
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#121316] mb-3">
                    Performance Profile
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: 'all', label: 'All Profiles' },
                      { id: 'control', label: 'Control & Feel' },
                      { id: 'power', label: 'Power & Pace' },
                      { id: 'speed', label: 'Speed & Agility' },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-2.5 text-xs text-[#52555D]">
                        <input
                          type="radio"
                          name="mobile-performance"
                          checked={performanceFilter === item.id}
                          onChange={() => setPerformanceFilter(item.id)}
                          className="accent-[#FF5500]"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0EFEB]">
                  <div className="flex justify-between text-xs font-semibold text-[#121316] mb-2">
                    <span>Max Price</span>
                    <span className="font-mono text-[#FF5500]">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#FF5500]"
                  />
                </div>

                <div className="pt-4 border-t border-[#F0EFEB]">
                  <label className="flex items-center gap-2.5 text-xs text-[#121316] font-medium">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="accent-[#FF5500]"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6E4DF] flex gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-3 border border-[#E6E4DF] text-xs font-semibold uppercase rounded-md text-[#52555D]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#FF5500] text-white text-xs font-semibold uppercase rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
