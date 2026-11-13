import React from 'react';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../shop/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist, navigateTo } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p, p.variants[0], 1);
    });
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E6E4DF] mb-8 gap-4">
          <div>
            <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-1">
              Saved Gear
            </div>
            <h1 className="text-3xl sm:text-4xl font-display text-[#121316] tracking-tight">
              Your Player <span className="italic text-[#FF5500]">Wishlist</span>
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="px-5 py-2.5 bg-[#FF5500] hover:bg-[#E04800] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 self-start cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add All to Bag</span>
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#E6E4DF] p-8 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-[#121316] mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-[#64676E] mb-6">
              Save your favorite rackets, court shoes, and technical gear to track availability or purchase later.
            </p>
            <button
              onClick={() => navigateTo('/shop')}
              className="px-6 py-3 bg-[#121316] hover:bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
            >
              Explore Equipment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
