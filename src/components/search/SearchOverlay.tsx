import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/ecommerce';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, openProductDetail, navigateTo } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const suggestions = [
    'Pro Carbon 98',
    'Court Pro Shoes',
    'Tour Bag 9',
    'Performance Polo',
    'Overgrips',
  ];

  const results: Product[] = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.performanceFocus.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (product: Product) => {
    setIsSearchOpen(false);
    openProductDetail(product);
  };

  const handleSuggestionClick = (keyword: string) => {
    setQuery(keyword);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md">
      <div className="max-w-4xl mx-auto w-full px-6 pt-8 pb-12 flex-1 flex flex-col">
        
        {/* Top Bar with Input & Close */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E6E4DF]">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <Search className="w-6 h-6 text-[#FF5500] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tennis gear, rackets, shoes, specs..."
              className="w-full text-xl sm:text-2xl font-display text-[#121316] placeholder:text-stone-400 bg-transparent focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
            aria-label="Close search overlay"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Suggestions Bar */}
        {!query && (
          <div className="py-8">
            <div className="text-xs font-mono uppercase tracking-wider text-[#71747C] mb-3">
              Suggested Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-3.5 py-1.5 bg-[#FAF9F6] border border-[#E6E4DF] hover:border-[#FF5500] hover:text-[#FF5500] rounded-full text-xs font-medium text-[#52555D] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto py-6">
          {query.trim() && results.length === 0 ? (
            <div className="text-center py-16 text-stone-500">
              <p className="text-sm">No gear found matching "{query}".</p>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  navigateTo('/shop');
                }}
                className="mt-4 text-xs font-semibold text-[#FF5500] underline"
              >
                Browse all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="p-4 rounded-xl border border-[#E6E4DF] hover:border-[#FF5500] bg-white transition-all cursor-pointer flex gap-3.5 items-center group"
                >
                  <div className="w-16 h-16 rounded-lg bg-[#FAF9F6] p-1 border border-[#E6E4DF] shrink-0 flex items-center justify-center">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-wider block">
                      {product.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-[#121316] truncate group-hover:text-[#FF5500] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="font-mono font-bold text-[#121316]">${product.price}</span>
                      <div className="flex items-center gap-1 text-[11px] text-[#71747C]">
                        <Star className="w-3 h-3 fill-[#FF5500] text-[#FF5500]" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
