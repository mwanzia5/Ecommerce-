import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubmitted(true);
    showToast('Welcome to TennisPro! Check your inbox for 15% off.');
  };

  return (
    <section className="py-20 bg-[#FAF9F6] border-t border-[#E6E4DF]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <div className="w-8 h-8 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto mb-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5500]" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-display text-[#121316] tracking-tight mb-3">
          Stay in the <span className="italic text-[#FF5500]">Game.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#64676E] max-w-md mx-auto mb-8 font-normal">
          Get limited edition product drops, string lab insights, and 15% off your first equipment order.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-sm font-medium">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>You're in. Use promo code <strong>PRO15</strong> at checkout for 15% off.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-sm bg-white border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] placeholder:text-stone-400 text-[#121316]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#121316] hover:bg-[#FF5500] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Join TennisPro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="mt-4 text-[11px] text-[#868992]">
          No spam. Unsubscribe at any time. Respecting your court privacy.
        </div>

      </div>
    </section>
  );
};
