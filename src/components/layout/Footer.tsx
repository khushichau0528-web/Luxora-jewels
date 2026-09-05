import React, { useState } from 'react';
import { Sparkles, Shield, Award, Truck, RefreshCw, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveView, setFilterState, categories, setActiveModal, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast('Thank you for subscribing to Luxora Jewels exclusive invitations.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#08090c] border-t border-[#1f2026] text-[#a9a7a0] pt-16 pb-12">
      {/* Hallmark & Trust Guarantees */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#1c1e27]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#14161f] text-[#d4af37] border border-[#2b2921]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">100% Certified Jewellery</h4>
              <p className="text-xs text-[#8f8d85] mt-1">IGI, GIA & BIS Hallmarked gold and natural certified diamonds.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#14161f] text-[#d4af37] border border-[#2b2921]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Insured Global Transit</h4>
              <p className="text-xs text-[#8f8d85] mt-1">Free armored tamper-proof shipping on orders above $1,500.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#14161f] text-[#d4af37] border border-[#2b2921]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Lifetime Exchange</h4>
              <p className="text-xs text-[#8f8d85] mt-1">Guaranteed buyback & exchange at prevailing live gold market rates.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#14161f] text-[#d4af37] border border-[#2b2921]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Secure Dummy Payments</h4>
              <p className="text-xs text-[#8f8d85] mt-1">Simulated academic payment engine supporting COD, UPI & Cards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-[#15161f]">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="font-luxury text-xl font-bold tracking-[0.2em] text-white">
              LUXORA JEWELS
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[#9e9c94] max-w-sm">
            Handcrafting timeless royal heirlooms, solitaires, and 22K bridal ornaments since 1988. Each creation blends ancient royal filigree art with contemporary precision.
          </p>
          <div className="pt-2 text-xs space-y-2">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              740 Fifth Avenue, Suite 1800, New York, NY 10019
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              +1 (800) 589-6721 (24/7 Concierge)
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
              concierge@luxorajewels.com
            </p>
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-3 text-xs">
          <h4 className="text-white font-semibold uppercase tracking-widest text-xs">Collections</h4>
          <ul className="space-y-2">
            {categories.slice(0, 6).map(c => (
              <li key={c.id}>
                <button
                  onClick={() => {
                    setFilterState(prev => ({ ...prev, category: c.name }));
                    setActiveView('shop');
                  }}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3 text-xs">
          <h4 className="text-white font-semibold uppercase tracking-widest text-xs">Atelier Services</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveView('orders')} className="hover:text-[#d4af37] transition-colors">
                Track Live Order
              </button>
            </li>
            <li>
              <button onClick={() => setActiveModal('goldCalculator')} className="hover:text-[#d4af37] transition-colors">
                Gold Price Calculator
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('offers')} className="hover:text-[#d4af37] transition-colors">
                Special Offers & Coupons
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('about')} className="hover:text-[#d4af37] transition-colors">
                About Our Craftsmanship
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('contact')} className="hover:text-[#d4af37] transition-colors">
                Book Private Viewing
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('admin')} className="text-[#d4af37] hover:underline font-medium">
                Admin Management Portal
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter & Tech Stack */}
        <div className="space-y-4 text-xs">
          <h4 className="text-white font-semibold uppercase tracking-widest text-xs">Private Salon</h4>
          <p className="text-[#8e8c85]">
            Receive private preview invitations and confidential bespoke jewellery catalogs.
          </p>
          <form onSubmit={handleNewsletter} className="flex">
            <input
              type="email"
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full bg-[#14161f] border border-[#2e2c24] rounded-l-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#d4af37]"
            />
            <button
              type="submit"
              className="bg-[#d4af37] text-black px-3 py-2 rounded-r-lg hover:bg-[#c29c27] transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="p-2.5 rounded-lg bg-[#12141c] border border-[#26241e] text-[11px] space-y-1">
            <span className="text-[#d4af37] font-semibold block">Architecture Architecture:</span>
            <p className="text-[#888]">ASP.NET Core MVC • C# • Entity Framework Core • SQL Server • LINQ</p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-[#181921] flex flex-col sm:flex-row items-center justify-between text-xs text-[#716f68] gap-4">
        <p>&copy; 2026 LUXORA JEWELS Inc. All rights reserved. Registered Trademark.</p>
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveModal('aspnetCore')} className="text-sky-400 hover:underline">
            View Solution Source & SQL Scripts
          </button>
          <span>•</span>
          <span>BIS Hallmarked Gold 916</span>
          <span>•</span>
          <span>Conflict-Free Diamonds</span>
        </div>
      </div>
    </footer>
  );
};
