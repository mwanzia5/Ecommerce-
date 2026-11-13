import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Check,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    discount,
    total,
    appliedPromo,
    applyPromoCode,
    navigateTo,
    products,
    addToCart,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(
    null
  );

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountAway = Math.max(0, freeShippingThreshold - subtotal);

  // Recommendations: items not in cart
  const cartProductIds = cart.map((i) => i.product.id);
  const upsellProducts = products.filter((p) => !cartProductIds.includes(p.id)).slice(0, 2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#E6E4DF]">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E6E4DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#FF5500]" />
            <h2 className="text-base font-bold font-display text-[#121316]">
              Your Equipment Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF9F6] px-6 py-3 border-b border-[#E6E4DF]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-[#121316]">
              {amountAway === 0
                ? 'You have qualified for Free Expedited Shipping!'
                : `Add $${amountAway} more for Free Shipping`}
            </span>
            <span className="font-mono text-[#FF5500] font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#E6E4DF] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#FF5500] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#121316] font-display mb-1">
                Your bag is empty
              </h3>
              <p className="text-xs text-[#71747C] mb-6">
                Explore our pro carbon frames and court footwear.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('/shop');
                }}
                className="px-5 py-2.5 bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#E04800]"
              >
                Shop Gear Now
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#E6E4DF] shadow-xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#F6F5F1] rounded-lg p-2 shrink-0 flex items-center justify-center border border-[#E6E4DF]">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#121316] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#71747C] font-mono">
                        {item.variant.name}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#E6E4DF] rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-500 hover:text-black cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold font-mono tabular-nums text-[#121316]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-500 hover:text-black cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs font-bold font-mono text-[#121316] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(0)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Upsells: "You may also like" */}
          {cart.length > 0 && upsellProducts.length > 0 && (
            <div className="pt-4 border-t border-[#E6E4DF]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#121316] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>You May Also Like</span>
              </div>
              <div className="space-y-2">
                {upsellProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#E6E4DF] text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={p.primaryImage}
                        alt={p.name}
                        className="w-10 h-10 object-contain rounded bg-[#F6F5F1] p-1 border border-[#E6E4DF]"
                      />
                      <div className="truncate">
                        <div className="font-semibold text-[#121316] truncate">{p.name}</div>
                        <div className="font-mono text-[#71747C]">${p.price}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(p, p.variants[0], 1)}
                      className="px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#FF5500] hover:text-white border border-[#E6E4DF] hover:border-[#FF5500] font-semibold rounded text-[11px] shrink-0 transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E6E4DF] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code (e.g. PRO15)"
                className="flex-1 px-3 py-2 text-xs border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500] uppercase font-mono"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#FAF9F6] border border-[#E6E4DF] hover:bg-stone-100 text-xs font-semibold rounded-md text-[#121316]"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div
                className={`text-xs ${
                  promoMessage.isError ? 'text-red-500' : 'text-emerald-600'
                }`}
              >
                {promoMessage.text}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#52555D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Tour Discount ({appliedPromo})</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#121316] pt-2 border-t border-[#F0EFEB]">
                <span>Total</span>
                <span className="font-mono tabular-nums text-base text-[#121316]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-6 bg-[#FF5500] hover:bg-[#E04800] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
