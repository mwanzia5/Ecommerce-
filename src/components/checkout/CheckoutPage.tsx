import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  Lock,
  ChevronLeft,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Order } from '../../types/ecommerce';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shippingFee, discount, total, placeOrder, navigateTo } = useShop();

  const [fullName, setFullName] = useState('Alexander Wright');
  const [email, setEmail] = useState('alex.wright@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [street, setStreet] = useState('742 Clay Court Lane');
  const [city, setCity] = useState('Indian Wells');
  const [state, setState] = useState('CA');
  const [postalCode, setPostalCode] = useState('92210');
  const [country, setCountry] = useState('United States');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('892');

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const order = placeOrder({
      fullName,
      street,
      city,
      state,
      postalCode,
      country,
      email,
      phone,
    });
    setConfirmedOrder(order);
  };

  // If order confirmed, show luxury receipt confirmation
  if (confirmedOrder) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E6E4DF] shadow-md text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5500]">
              Order Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-display text-[#121316] mt-1 mb-2">
              Thank You, {confirmedOrder.shippingAddress.fullName.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-[#71747C] mb-8">
              Order <strong className="text-[#121316] font-mono">{confirmedOrder.id}</strong> has been received and is being prepared in our tournament logistics facility.
            </p>

            {/* Tracking and delivery info */}
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E6E4DF] text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-[#71747C]">Carrier Tracking:</span>
                <span className="font-mono font-semibold text-[#121316]">
                  {confirmedOrder.trackingNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71747C]">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">In 2–3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71747C]">Shipping To:</span>
                <span className="text-right text-[#121316]">
                  {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city},{' '}
                  {confirmedOrder.shippingAddress.state} {confirmedOrder.shippingAddress.postalCode}
                </span>
              </div>
            </div>

            {/* Itemized Receipt */}
            <div className="divide-y divide-[#F0EFEB] text-left mb-8">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-contain bg-[#F6F5F1] p-1 rounded border border-[#E6E4DF]"
                    />
                    <div>
                      <div className="font-semibold text-[#121316]">{item.name}</div>
                      <div className="text-[11px] text-[#71747C] font-mono">
                        {item.variantName} × {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-[#121316]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigateTo('/account')}
                className="flex-1 py-3 px-4 bg-[#121316] hover:bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                View in Account History
              </button>
              <button
                onClick={() => navigateTo('/shop')}
                className="flex-1 py-3 px-4 border border-[#E6E4DF] hover:border-black text-xs font-semibold uppercase tracking-wider rounded-md text-[#121316] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen py-20 text-center">
        <div className="max-w-md mx-auto px-6">
          <h2 className="text-2xl font-display text-[#121316] mb-2">No Items to Checkout</h2>
          <p className="text-xs text-[#71747C] mb-6">
            Your shopping bag is currently empty.
          </p>
          <button
            onClick={() => navigateTo('/shop')}
            className="px-6 py-3 bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
          >
            Browse Tennis Gear
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back button */}
        <button
          onClick={() => navigateTo('/shop')}
          className="inline-flex items-center gap-1.5 text-xs text-[#71747C] hover:text-[#121316] font-mono mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>RETURN TO STORE</span>
        </button>

        <h1 className="text-3xl sm:text-4xl font-display text-[#121316] tracking-tight mb-8">
          Express <span className="italic text-[#FF5500]">Checkout</span>
        </h1>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section 1: Contact Information */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF] shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#F0EFEB] mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316]">
                    1. Contact Information
                  </h2>
                  <span className="text-[11px] text-[#71747C]">Express Guest Checkout</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#121316] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#121316] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Address */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF] shadow-xs">
                <div className="pb-4 border-b border-[#F0EFEB] mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316]">
                    2. Shipping Address
                  </h2>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#121316] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#121316] block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-semibold text-[#121316] block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#121316] block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#121316] block mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Delivery Method */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF] shadow-xs">
                <div className="pb-4 border-b border-[#F0EFEB] mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316]">
                    3. Delivery Method
                  </h2>
                </div>

                <div className="space-y-3 text-xs">
                  <label
                    onClick={() => setDeliveryMethod('standard')}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-[#FF5500] bg-[#FF5500]/5'
                        : 'border-[#E6E4DF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-[#FF5500]" />
                      <div>
                        <div className="font-semibold text-[#121316]">Standard Ground Delivery</div>
                        <div className="text-[11px] text-[#71747C]">3–5 Business Days</div>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#121316]">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('express')}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      deliveryMethod === 'express'
                        ? 'border-[#FF5500] bg-[#FF5500]/5'
                        : 'border-[#E6E4DF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-[#121316]" />
                      <div>
                        <div className="font-semibold text-[#121316]">Tournament Express Air</div>
                        <div className="text-[11px] text-[#71747C]">Guaranteed Next Day Delivery</div>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#121316]">$24.00</span>
                  </label>
                </div>
              </div>

              {/* Section 4: Payment */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF] shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#F0EFEB] mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316]">
                    4. Payment
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>256-Bit Encrypted</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 border rounded-md font-semibold text-center ${
                      paymentMethod === 'card'
                        ? 'border-[#FF5500] bg-[#FF5500]/5 text-[#121316]'
                        : 'border-[#E6E4DF] text-stone-600'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`py-2 px-3 border rounded-md font-semibold text-center ${
                      paymentMethod === 'applepay'
                        ? 'border-[#FF5500] bg-[#FF5500]/5 text-[#121316]'
                        : 'border-[#E6E4DF] text-stone-600'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 border rounded-md font-semibold text-center ${
                      paymentMethod === 'cod'
                        ? 'border-[#FF5500] bg-[#FF5500]/5 text-[#121316]'
                        : 'border-[#E6E4DF] text-stone-600'
                    }`}
                  >
                    Pay On Delivery
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-[#121316] block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-[#121316] block mb-1">Expires</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-[#121316] block mb-1">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2.5 border border-[#E6E4DF] rounded-md font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] text-xs text-[#52555D]">
                    Pay cash or card directly to the courier upon gear receipt at your address.
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF] shadow-sm sticky top-28 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316] pb-3 border-b border-[#F0EFEB]">
                Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-[#F0EFEB] max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F6F5F1] p-1 rounded border border-[#E6E4DF] shrink-0">
                        <img
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-[#121316] truncate max-w-[180px]">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-[#71747C] font-mono">
                          {item.variant.name} × {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#121316]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs text-[#52555D] pt-3 border-t border-[#F0EFEB]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
                  <span className="font-mono tabular-nums">
                    {deliveryMethod === 'express'
                      ? '$24.00'
                      : shippingFee === 0
                      ? 'FREE'
                      : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (Est. 8%)</span>
                  <span className="font-mono tabular-nums">${(subtotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#121316] pt-3 border-t border-[#E6E4DF]">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums text-lg text-[#FF5500]">
                    ${(
                      total + (deliveryMethod === 'express' ? 24 - shippingFee : 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#FF5500] hover:bg-[#E04800] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#71747C]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day Money-Back Guarantee Included</span>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
