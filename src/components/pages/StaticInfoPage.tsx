import React from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface StaticInfoPageProps {
  type: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const StaticInfoPage: React.FC<StaticInfoPageProps> = ({ type }) => {
  const { navigateTo } = useShop();

  const content = {
    shipping: {
      title: 'Shipping Policy & Transit Times',
      subtitle: 'Fast, secure tournament fulfillment with temperature-controlled logistics.',
      icon: Truck,
      body: (
        <div className="space-y-6 text-sm text-[#52555D] leading-relaxed">
          <p>
            All TennisPro equipment is dispatched directly from our climate-controlled fulfillment 
            hubs in San Diego, CA and Columbus, OH to maintain string tension integrity and pristine frame condition.
          </p>
          <div className="bg-white p-6 rounded-xl border border-[#E6E4DF] space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#121316]">
              Domestic US Shipping Options
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex justify-between pb-2 border-b border-[#F0EFEB]">
                <div>
                  <div className="font-semibold text-[#121316]">Standard Ground (FedEx / UPS)</div>
                  <div className="text-stone-500">3–5 Business Days</div>
                </div>
                <div className="font-mono font-bold text-[#121316]">FREE over $150 ($12 under)</div>
              </li>
              <li className="flex justify-between pb-2 border-b border-[#F0EFEB]">
                <div>
                  <div className="font-semibold text-[#121316]">Tournament Express Air</div>
                  <div className="text-stone-500">Guaranteed Next Business Day</div>
                </div>
                <div className="font-mono font-bold text-[#121316]">$24.00 Flat Rate</div>
              </li>
            </ul>
          </div>
          <p>
            Custom pre-strung rackets require an additional 24 hours of string lab queue time before shipment.
          </p>
        </div>
      ),
    },
    returns: {
      title: '30-Day On-Court Trial & Returns',
      subtitle: 'Play competitive sets. If your game does not level up, return your equipment.',
      icon: RotateCcw,
      body: (
        <div className="space-y-6 text-sm text-[#52555D] leading-relaxed">
          <p>
            We stand behind our engineering 100%. Unlike standard sports retailers who refuse returns 
            once plastic is peeled from the handle, TennisPro allows you to play with your racket on 
            court for up to 30 days from delivery.
          </p>
          <div className="bg-white p-6 rounded-xl border border-[#E6E4DF] space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#121316]">
              Simple 3-Step Return Process
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-xs">
              <li>Initiate a return request via our Concierge portal or email concierge@tennispro.store.</li>
              <li>Print your prepaid insured FedEx return shipping label.</li>
              <li>Drop off the package at any authorized shipping drop location. Full refund issued within 48 hours of receipt.</li>
            </ol>
          </div>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How TennisPro protects and respects your personal and payment data.',
      icon: ShieldCheck,
      body: (
        <div className="space-y-6 text-sm text-[#52555D] leading-relaxed">
          <p>
            TennisPro adheres strictly to GDPR and California Consumer Privacy Act (CCPA) standards. 
            We never sell, rent, or trade your player profiles, match data, or email addresses to third parties.
          </p>
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-[#121316] uppercase tracking-wider">Payment Processing Security</h4>
            <p>
              All credit card transactions are handled through tokenized 256-bit encrypted gateways. 
              Our servers never retain raw card numbers or security CVV codes.
            </p>
          </div>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Tournament guarantees, manufacturer warranties, and purchase terms.',
      icon: FileText,
      body: (
        <div className="space-y-6 text-sm text-[#52555D] leading-relaxed">
          <p>
            By purchasing through TennisPro, you agree to our standard terms of tournament play 
            and manufacturer frame warranties.
          </p>
          <p className="text-xs">
            All frames are covered against structural manufacturing defects for a period of 24 months 
            from the original purchase date.
          </p>
        </div>
      ),
    },
  };

  const activeContent = content[type];
  const Icon = activeContent.icon;

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="mb-10 pb-8 border-b border-[#E6E4DF]">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-2">
            <Icon className="w-4 h-4" />
            <span>Customer Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display text-[#121316] tracking-tight mb-2">
            {activeContent.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#64676E]">
            {activeContent.subtitle}
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E6E4DF] shadow-xs mb-8">
          {activeContent.body}
        </div>

        <div className="flex justify-between items-center text-xs">
          <button
            onClick={() => navigateTo('/shop')}
            className="text-[#FF5500] hover:underline font-semibold"
          >
            ← Return to Tennis Equipment Catalog
          </button>
          <button
            onClick={() => navigateTo('/contact')}
            className="text-[#121316] hover:text-[#FF5500] font-semibold"
          >
            Have Questions? Contact Concierge
          </button>
        </div>

      </div>
    </div>
  );
};
