import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('racket-consult');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Your message has been dispatched to our tennis concierge team.');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-[#FF5500] uppercase mb-2">
            Player Concierge
          </div>
          <h1 className="text-4xl sm:text-5xl font-display text-[#121316] tracking-tight mb-3">
            Contact <span className="italic text-[#FF5500]">TennisPro</span>
          </h1>
          <p className="text-sm sm:text-base text-[#64676E]">
            Have questions regarding frame swingweight, string tension matching, or our 30-day on-court trial? 
            Our master technicians are on call 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#E6E4DF] shadow-xs">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display text-[#121316] mb-2">
                  Message Transmitted
                </h3>
                <p className="text-xs text-[#71747C] max-w-sm mx-auto mb-6">
                  One of our certified stringing and equipment advisors will respond to {email} within 4 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 border border-[#E6E4DF] text-xs font-semibold rounded-md text-[#121316]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#121316] block mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full px-3.5 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#121316] block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. marcus@tennispro.com"
                      className="w-full px-3.5 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#121316] block mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500] bg-white cursor-pointer"
                  >
                    <option value="racket-consult">Frame Selection & Swingweight Consultation</option>
                    <option value="stringing">Custom String Tension & Hybrid Patterns</option>
                    <option value="demo">30-Day On-Court Demo Inquiries</option>
                    <option value="shipping">Order Tracking & International Logistics</option>
                    <option value="wholesale">Academy & Club Tournament Partnerships</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#121316] block mb-1.5">
                    How can our technicians assist your game?
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide your current racket, play style, and string preferences..."
                    className="w-full px-3.5 py-2.5 border border-[#E6E4DF] rounded-md focus:outline-none focus:border-[#FF5500]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FF5500] hover:bg-[#E04800] text-white font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6E4DF] space-y-6 text-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121316]">
                Global Headquarters
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#121316]">R&D Technical Lab</div>
                  <div className="text-[#64676E] leading-relaxed">
                    1080 Coast Boulevard, Suite 400 <br />
                    La Jolla, California 92037
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#121316]">Direct Concierge</div>
                  <div className="text-[#64676E] font-mono">concierge@tennispro.store</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#121316]">Toll-Free Player Desk</div>
                  <div className="text-[#64676E] font-mono">+1 (800) 555-TENNIS</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#121316]">Concierge Hours</div>
                  <div className="text-[#64676E]">
                    Monday – Sunday: 7:00 AM – 8:00 PM PST
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F6] border border-[#E6E4DF] text-xs text-[#52555D]">
              <span className="font-bold text-[#121316] uppercase tracking-wider block mb-1">
                Same-Day Stringing Service
              </span>
              Orders placed before 2:00 PM PST with custom stringing specifications ship identical business day via expedited air.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
