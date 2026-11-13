import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FAQPage: React.FC = () => {
  const { navigateTo } = useShop();

  const [activeCategory, setActiveCategory] = useState<'rackets' | 'shoes' | 'orders' | 'warranty'>('rackets');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = {
    rackets: [
      {
        q: 'What makes the Pro Carbon 98 different from generic high-end frames?',
        a: 'The Pro Carbon 98 combines a thin 21.5mm flat beam with 40T braided carbon fiber and a tuned 62 RA flex profile. While most modern power rackets have stiff 68-71 RA ratings that vibrate harsh shock into the arm, our frame flexes slightly upon ball pocketing to give you surgical depth control without sacrificing swing speed.',
      },
      {
        q: 'What string tension and gauge do you recommend?',
        a: 'For aggressive baseliners using polyester strings like TennisPro Tour Poly 1.25mm, we recommend stringing between 50 and 54 lbs (22.5 to 24.5 kg). If playing with natural gut or multifilament strings, 54 to 58 lbs produces optimal power return.',
      },
      {
        q: 'How do I choose the correct grip size?',
        a: 'Measure from the middle crease of your hand to the tip of your ring finger with a ruler in inches: 4 1/8" (Size 1), 4 1/4" (Size 2), 4 3/8" (Size 3), 4 1/2" (Size 4). When holding the racket with an eastern forehand grip, there should be about one pinky finger width of space between your fingertips and palm.',
      },
    ],
    shoes: [
      {
        q: 'Can the Court Pro shoes be worn on both clay and hard courts?',
        a: 'Yes. The Court Pro features a hybrid herringbone rubber compound with modified pivot pods. It bites cleanly into loose red clay for controlled slides while offering exceptional durability on abrasive acrylic hard courts.',
      },
      {
        q: 'What is your 6-month outsole durability guarantee?',
        a: 'If you wear through the rubber outsole to the midsole within 6 months of purchase, we will replace your shoes completely free of charge. No questions asked.',
      },
    ],
    orders: [
      {
        q: 'How fast is standard and express shipping?',
        a: 'Orders over $150 receive free standard shipping (3-5 business days). Tournament Express Air guarantees next-business-day delivery anywhere in the continental United States for $24.',
      },
      {
        q: 'How does the 30-Day On-Court Trial work?',
        a: 'Play actual matches on court with your new TennisPro gear. If it does not enhance your game, contact our concierge within 30 days for a prepaid return label and 100% refund.',
      },
    ],
    warranty: [
      {
        q: 'What is covered under the 2-Year Frame Warranty?',
        a: 'We cover structural hairline defects, internal graphite delamination, and throat cracks caused by normal play. Impact damage from hitting court fences or intentional abuse is not covered.',
      },
    ],
  };

  const currentFaqs = faqs[activeCategory];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-2">
            Knowledge Base
          </div>
          <h1 className="text-4xl sm:text-5xl font-display text-[#121316] tracking-tight mb-3">
            Frequently Asked <span className="italic text-[#FF5500]">Questions</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64676E]">
            Everything you need to know about TennisPro frame dynamics, stringing calibrations, and our guarantee.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'rackets', label: 'Rackets & Frames' },
            { id: 'shoes', label: 'Footwear & Sizing' },
            { id: 'orders', label: 'Shipping & Trial' },
            { id: 'warranty', label: 'Warranty & Care' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#121316] text-white'
                  : 'bg-white border border-[#E6E4DF] text-[#52555D] hover:text-[#121316]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3 mb-16">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E6E4DF] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#121316]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#FF5500]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#52555D] leading-relaxed border-t border-[#F0EFEB]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-8 rounded-2xl bg-white border border-[#E6E4DF] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#FF5500]/10 text-[#FF5500]">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#121316]">Still have questions?</h3>
              <p className="text-xs text-[#71747C]">
                Speak directly with an equipment specialist about your custom specifications.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('/contact')}
            className="px-5 py-2.5 bg-[#FF5500] hover:bg-[#E04800] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shrink-0"
          >
            Contact Specialist
          </button>
        </div>

      </div>
    </div>
  );
};
