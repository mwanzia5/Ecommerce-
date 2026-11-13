import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openProductDetail } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const isSaved = isInWishlist(product.id);

  const displayImage = isHovered && product.galleryImages[1]
    ? product.galleryImages[1]
    : product.primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    addToCart(product, defaultVariant, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E6E4DF] hover:border-stone-400/80 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Stage (65-75% of visual weight) */}
      <div className="relative aspect-[4/3] bg-[#F6F5F1] overflow-hidden flex items-center justify-center p-6">
        
        {/* Subtle Badge (Clean unboxed text, not a giant pill) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#121316] bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm border border-[#E6E4DF]">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-150 ${
            isSaved
              ? 'bg-red-50 text-red-500 hover:bg-red-100'
              : 'bg-white/80 text-stone-500 hover:text-[#FF5500] hover:bg-white'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className="w-4 h-4 fill-current" strokeWidth={isSaved ? 0 : 2} />
        </button>

        {/* Image with smooth subtle zoom */}
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out select-none"
          loading="lazy"
        />

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-[#121316] hover:bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Metadata & Price */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Performance Type in quiet unboxed text */}
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#71747C] uppercase mb-1.5">
            <span>{product.categoryLabel}</span>
            <span>·</span>
            <span className="text-[#FF5500] capitalize">{product.performanceFocus} Focus</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-semibold text-[#121316] group-hover:text-[#FF5500] transition-colors leading-snug line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-[#71747C] line-clamp-1 mb-3">
            {product.subtitle}
          </p>
        </div>

        {/* Rating & Tabular Price Footer */}
        <div className="pt-3 border-t border-[#F0EFEB] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#2D3139]">
            <Star className="w-3.5 h-3.5 fill-[#FF5500] text-[#FF5500]" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-[#868992]">({product.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-2">
            {product.compareAtPrice && (
              <span className="text-xs line-through text-stone-400 tabular-nums font-mono">
                ${product.compareAtPrice}
              </span>
            )}
            <span className="text-base font-bold text-[#121316] tabular-nums font-mono">
              ${product.price}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
