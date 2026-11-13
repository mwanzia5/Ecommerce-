import React, { useState } from 'react';
import { User, Package, MapPin, Sliders, ChevronRight, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AccountPage: React.FC = () => {
  const { orders, navigateTo } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'specs'>('orders');
  const [playerLevel, setPlayerLevel] = useState('NTRP 4.5');
  const [preferredSurface, setPreferredSurface] = useState('Clay Court');
  const [dominantHand, setDominantHand] = useState('Right-Handed');
  const [stringTension, setStringTension] = useState('52 lbs (Tour Poly)');

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Profile Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6E4DF] shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center font-display font-bold text-2xl border border-[#FF5500]/20">
              AW
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-[#121316]">
                  Alexander Wright
                </h1>
                <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                  Pro Member
                </span>
              </div>
              <p className="text-xs text-[#71747C]">
                Member since 2024 · San Diego Tennis & Racquet Club
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/shop')}
              className="px-4 py-2 bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#E04800] transition-colors"
            >
              Shop New Gear
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-2 border-b border-[#E6E4DF] mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: `Order History (${orders.length})`, icon: Package },
            { id: 'profile', label: 'Player Profile & Address', icon: User },
            { id: 'specs', label: 'Custom Equipment Setup', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 relative cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#FF5500]'
                    : 'text-[#71747C] hover:text-[#121316]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5500]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-[#E6E4DF]">
                <Package className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#121316] mb-1">No Orders Yet</h3>
                <p className="text-xs text-[#71747C] mb-4">
                  Browse our performance rackets and tournament footwear.
                </p>
                <button
                  onClick={() => navigateTo('/shop')}
                  className="px-4 py-2 bg-[#121316] text-white text-xs font-semibold rounded-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-[#E6E4DF] shadow-xs overflow-hidden"
                >
                  {/* Order Top Bar */}
                  <div className="p-4 sm:p-6 bg-[#FAF9F6] border-b border-[#E6E4DF] flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-[#71747C]">Order Number</div>
                        <div className="font-mono font-bold text-[#121316]">{order.id}</div>
                      </div>
                      <div className="hidden sm:block">
                        <div className="text-[#71747C]">Date Placed</div>
                        <div className="font-medium text-[#121316]">{order.date}</div>
                      </div>
                      <div>
                        <div className="text-[#71747C]">Total</div>
                        <div className="font-mono font-bold text-[#121316]">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold rounded-md">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{order.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Order Item Details */}
                  <div className="p-4 sm:p-6 divide-y divide-[#F0EFEB]">
                    {order.items.map((item, idx) => (
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

                  {/* Tracking Footer */}
                  <div className="px-6 py-3 bg-[#FAF9F6] border-t border-[#E6E4DF] flex items-center justify-between text-xs text-[#71747C]">
                    <span>Tracking: <strong className="font-mono text-[#121316]">{order.trackingNumber}</strong></span>
                    <button
                      onClick={() => navigateTo('/contact')}
                      className="text-[#FF5500] hover:underline font-semibold"
                    >
                      Request Return / Assistance
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Profile & Address */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121316] mb-4">
                Personal Information
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#71747C] block">Full Name</span>
                  <span className="font-semibold text-[#121316]">Alexander Wright</span>
                </div>
                <div>
                  <span className="text-[#71747C] block">Email</span>
                  <span className="font-semibold text-[#121316]">alex.wright@example.com</span>
                </div>
                <div>
                  <span className="text-[#71747C] block">Phone</span>
                  <span className="font-semibold text-[#121316]">+1 (555) 234-5678</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121316] mb-4">
                Default Shipping Address
              </h3>
              <p className="text-xs text-[#52555D] leading-relaxed">
                Alexander Wright <br />
                742 Clay Court Lane <br />
                Indian Wells, CA 92210 <br />
                United States
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Custom Equipment Setup */}
        {activeTab === 'specs' && (
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF] max-w-2xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#121316] mb-2">
              Tuned Player Calibration
            </h3>
            <p className="text-xs text-[#64676E] mb-6">
              Save your court specifications so our concierge can pre-string frames to your custom specs.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#121316] block mb-1">USTA / NTRP Rating</label>
                <input
                  type="text"
                  value={playerLevel}
                  onChange={(e) => setPlayerLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E6E4DF] rounded-md font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-[#121316] block mb-1">Preferred Court Surface</label>
                <input
                  type="text"
                  value={preferredSurface}
                  onChange={(e) => setPreferredSurface(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E6E4DF] rounded-md font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-[#121316] block mb-1">Custom String Tension</label>
                <input
                  type="text"
                  value={stringTension}
                  onChange={(e) => setStringTension(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E6E4DF] rounded-md font-mono"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
