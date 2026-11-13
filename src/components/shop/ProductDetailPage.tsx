import React, { useState } from 'react';
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Check,
  MessageSquarePlus,
} from 'lucide-react';
import { Product, ProductVariant } from '../../types/ecommerce';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    reviews,
    addReview,
    products,
  } = useShop();

  const [activeImage, setActiveImage] = useState<string>(product.primaryImage);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'tech' | 'reviews' | 'faq'>('specs');

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerLevel, setReviewerLevel] = useState('NTRP 4.0 Club Player');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const isSaved = isInWishlist(product.id);
  const productReviews = reviews[product.id] || [];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewTitle || !reviewComment) return;

    addReview(product.id, {
      author: reviewerName,
      playerLevel: reviewerLevel,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      verifiedPurchase: true,
    });

    setReviewModalOpen(false);
    setReviewTitle('');
    setReviewComment('');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 3);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#71747C] mb-8">
          <button onClick={() => navigateTo('/')} className="hover:text-[#121316]">
            HOME
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('/shop')} className="hover:text-[#121316]">
            SHOP
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo('/shop')}
            className="hover:text-[#121316] uppercase"
          >
            {product.categoryLabel}
          </button>
          <span>/</span>
          <span className="text-[#121316] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Section: Split Grid (Sticky Gallery Left, Sticky Purchase Module Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16">
          
          {/* LEFT: Multi-Angle Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnail selector */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 bg-white p-1 transition-all ${
                    activeImage === img
                      ? 'border-[#FF5500] shadow-sm'
                      : 'border-[#E6E4DF] hover:border-stone-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom & Badge */}
            <div className="flex-1 relative rounded-2xl bg-[#F6F5F1] border border-[#E6E4DF] aspect-[4/3] flex items-center justify-center p-8 overflow-hidden group">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#121316] bg-white/95 px-3 py-1.5 rounded shadow-sm border border-[#E6E4DF]">
                    {product.badge}
                  </span>
                </div>
              )}

              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out select-none"
              />
            </div>
          </div>

          {/* RIGHT: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Category & Performance */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#71747C] uppercase mb-2">
              <span>{product.categoryLabel}</span>
              <span>·</span>
              <span className="text-[#FF5500] font-semibold">{product.performanceFocus} Focus</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-display text-[#121316] tracking-tight leading-tight mb-2">
              {product.name}
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-[#64676E] mb-4">
              {product.subtitle}
            </p>

            {/* Rating and Reviews Counter */}
            <div className="flex items-center gap-3 pb-5 border-b border-[#E6E4DF] mb-6">
              <div className="flex items-center gap-1 text-[#FF5500]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#121316]">{product.rating}</span>
              <span className="text-stone-300">·</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-xs text-[#71747C] hover:text-[#121316] underline"
              >
                {productReviews.length + product.reviewCount} Verified Reviews
              </button>
            </div>

            {/* Price Module */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold font-mono text-[#121316] tabular-nums">
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-base line-through text-stone-400 font-mono tabular-nums">
                  ${product.compareAtPrice}
                </span>
              )}
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-medium">
                In Stock & Ready to Dispatch
              </span>
            </div>

            {/* Short Product Description */}
            <p className="text-sm text-[#52555D] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Variant Selector (Grip size, Shoe size, Apparel size, or Color) */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#121316] mb-2.5">
                <span>
                  Select {product.variantType === 'grip' ? 'Grip Size' : product.variantType === 'size' ? 'Size' : 'Option'}:
                </span>
                <span className="text-[#FF5500] font-mono">{selectedVariant.name}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    disabled={!v.inStock}
                    onClick={() => setSelectedVariant(v)}
                    className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-all cursor-pointer ${
                      selectedVariant.id === v.id
                        ? 'border-[#FF5500] bg-[#FF5500]/5 text-[#121316] shadow-sm'
                        : v.inStock
                        ? 'border-[#E6E4DF] bg-white text-[#52555D] hover:border-[#121316]'
                        : 'border-[#E6E4DF] bg-stone-100 text-stone-400 line-through cursor-not-allowed'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector and Primary Add to Cart Action */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#E6E4DF] rounded-md bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-stone-600 hover:text-black cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold font-mono tabular-nums text-[#121316]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-stone-600 hover:text-black cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Orange Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#FF5500] hover:bg-[#E04800] text-white text-sm font-semibold tracking-wide rounded-md shadow-[0_8px_20px_-4px_rgba(255,85,0,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · ${(product.price * quantity).toFixed(0)}</span>
                </button>
              </div>

              {/* Secondary Add to Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full py-3 px-4 border rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isSaved
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-[#E6E4DF] bg-white text-[#121316] hover:border-[#121316]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Trust and Delivery Info */}
            <div className="p-4 rounded-xl bg-white border border-[#E6E4DF] space-y-3 text-xs text-[#52555D]">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Free 2-day delivery on orders over $150</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>30-Day On-Court Play Guarantee — full return if not satisfied</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Official 2-Year Manufacturer Frame Warranty</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Sections: Description, Specifications, Technology, Reviews, FAQ */}
        <div className="border-t border-[#E6E4DF] pt-12">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-[#E6E4DF] mb-8 overflow-x-auto no-scrollbar">
            {[
              { id: 'specs', label: 'Specifications & Features' },
              { id: 'tech', label: 'Engineering & Story' },
              { id: 'reviews', label: `Reviews (${productReviews.length + product.reviewCount})` },
              { id: 'faq', label: 'Gear FAQ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors relative cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#FF5500]'
                    : 'text-[#71747C] hover:text-[#121316]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5500]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Specifications & Features */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF]">
                <h3 className="text-base font-bold text-[#121316] mb-4 uppercase tracking-wider text-xs">
                  Technical Specifications
                </h3>
                <dl className="divide-y divide-[#F0EFEB]">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="py-2.5 flex items-center justify-between text-xs">
                      <dt className="text-[#71747C] font-medium">{key}</dt>
                      <dd className="text-[#121316] font-semibold font-mono text-right">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF]">
                <h3 className="text-base font-bold text-[#121316] mb-4 uppercase tracking-wider text-xs">
                  Key Performance Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#52555D]">
                      <div className="p-1 rounded bg-[#FF5500]/10 text-[#FF5500] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Technology & Story */}
          {activeTab === 'tech' && (
            <div className="bg-white p-8 sm:p-12 rounded-xl border border-[#E6E4DF] max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-display text-[#121316]">
                The Engineering Behind {product.name}
              </h3>
              <p className="text-sm sm:text-base text-[#52555D] leading-relaxed">
                {product.story}
              </p>
              <div className="p-6 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] text-xs text-[#71747C] space-y-2">
                <div className="font-semibold text-[#121316] uppercase tracking-wider">
                  Tour Testing Standards
                </div>
                <p>
                  Every iteration of this product underwent dynamic load stress testing at 140 km/h 
                  impacts to guarantee consistent flex retention through an entire tournament season.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6E4DF]">
                <div>
                  <h3 className="text-xl font-display text-[#121316]">Player Reviews</h3>
                  <div className="flex items-center gap-2 text-xs text-[#71747C] mt-1">
                    <span className="font-bold text-[#121316] text-sm">{product.rating} out of 5</span>
                    <span>·</span>
                    <span>Based on verified tournament & club play</span>
                  </div>
                </div>

                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#121316] hover:bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors self-start cursor-pointer"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Write a Review</span>
                </button>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 bg-white rounded-xl border border-[#E6E4DF] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-[#FF5500]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-current' : 'text-stone-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-mono text-[#868992]">{rev.date}</span>
                      </div>

                      <h4 className="text-sm font-bold text-[#121316] mb-1.5">{rev.title}</h4>
                      <p className="text-xs sm:text-sm text-[#52555D] leading-relaxed mb-4">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#121316]">{rev.author}</span>
                      <span className="text-[11px] text-[#FF5500] font-mono">{rev.playerLevel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: 'What string tension do you recommend for this racket?',
                  a: 'We recommend 50–54 lbs (22.5–24.5 kg) for poly strings like TennisPro Tour Poly, or 54–58 lbs for synthetic gut and multifilament strings to maximize the natural flex of the graphite matrix.',
                },
                {
                  q: 'How do I choose the correct grip size?',
                  a: 'Measure from the middle crease of your palm to the tip of your ring finger. Size 2 (4 1/4") and Size 3 (4 3/8") fit roughly 80% of adult players.',
                },
                {
                  q: 'Can I demo the gear before keeping it?',
                  a: 'Yes. TennisPro offers a 30-Day On-Court Guarantee. Play competitive matches with your equipment, and if it does not fit your game, return it for a full refund.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="p-5 bg-white rounded-xl border border-[#E6E4DF]">
                  <div className="text-sm font-bold text-[#121316] mb-2">{faq.q}</div>
                  <div className="text-xs sm:text-sm text-[#64676E] leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Related Gear Collection */}
        {relatedProducts.length > 0 && (
          <div className="pt-20 border-t border-[#E6E4DF] mt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-1">
                  Complete Your Kit
                </div>
                <h3 className="text-2xl sm:text-3xl font-display text-[#121316]">
                  Pairs Well With This Gear
                </h3>
              </div>
              <button
                onClick={() => navigateTo('/shop')}
                className="text-xs font-semibold uppercase tracking-wider text-[#121316] hover:text-[#FF5500] transition-colors"
              >
                View Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-[#E6E4DF]">
            <h3 className="text-lg font-bold font-display text-[#121316] mb-1">
              Submit Player Review
            </h3>
            <p className="text-xs text-[#71747C] mb-4">
              Share your on-court feedback on the {product.name}.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#121316] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. David Vance"
                  className="w-full px-3 py-2 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#121316] block mb-1">Player Level / Style</label>
                <input
                  type="text"
                  value={reviewerLevel}
                  onChange={(e) => setReviewerLevel(e.target.value)}
                  placeholder="e.g. NTRP 4.5 Aggressive Baseliner"
                  className="w-full px-3 py-2 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#121316] block mb-1">Star Rating</label>
                <div className="flex gap-2 text-[#FF5500]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= reviewRating ? 'fill-current' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#121316] block mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Pinpoint targeting and unbelievable ball feel"
                  className="w-full px-3 py-2 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#121316] block mb-1">Detailed Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How does the equipment feel on contact? Stability on returns? Maneuverability?"
                  className="w-full px-3 py-2 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 border border-[#E6E4DF] rounded-md text-stone-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF5500] text-white font-semibold rounded-md hover:bg-[#E04800]"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
