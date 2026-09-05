import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactView: React.FC = () => {
  const { showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    boutique: 'New York Flagship',
    date: '',
    inquiryType: 'Private Viewing Appointment',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    showToast('Concierge inquiry received. Our master jeweller will reach out within 2 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Atelier Concierge
        </span>
        <h1 className="font-luxury text-3xl sm:text-4xl text-white font-bold">
          Reserve a Private Viewing
        </h1>
        <p className="text-xs text-[#a9a7a0]">
          Schedule a private salon consultation with our master gemmologists or request bespoke bridal customizations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#13151f] border border-[#2b271d] space-y-6">
          <h3 className="font-luxury text-xl font-semibold text-white">
            Concierge Inquiry & Booking
          </h3>

          {submitted ? (
            <div className="p-8 text-center space-y-4 rounded-2xl bg-[#161824] border border-[#2c2f40]">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-luxury text-lg text-white font-bold">Private Appointment Requested</h4>
              <p className="text-xs text-[#9d9b91]">
                Thank you, {formData.name}. Our senior jewellery advisor has reserved your consultation profile and will contact you at {formData.phone || formData.email} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 bg-[#d4af37] text-black font-semibold text-xs rounded-xl"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a9a7a0] mb-1 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Genevieve"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1 font-medium">Preferred Salon</label>
                  <select
                    value={formData.boutique}
                    onChange={(e) => setFormData({ ...formData, boutique: e.target.value })}
                    className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>New York Flagship (Fifth Ave)</option>
                    <option>Beverly Hills Salon (Rodeo Dr)</option>
                    <option>London Vault (New Bond St)</option>
                    <option>Virtual Video Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#a9a7a0] mb-1 font-medium">Preferred Date & Time</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[#a9a7a0] mb-1 font-medium">Personal Requirements or Notes</label>
                <textarea
                  rows={4}
                  placeholder="Specify particular creations, bridal trousseau requirements, diamond carat preferences, or ring resizing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#c49f2b] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Confirm Appointment Request
              </button>
            </form>
          )}
        </div>

        {/* Boutiques & Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#13151f] border border-[#2b271d] space-y-4 text-xs">
            <h3 className="font-luxury text-lg font-semibold text-white">
              Flagship Salons
            </h3>

            <div className="space-y-4 divide-y divide-[#21232d]">
              <div className="pt-3 first:pt-0 space-y-1">
                <span className="font-bold text-[#d4af37] block">New York Flagship</span>
                <p className="text-[#ccc] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  740 Fifth Avenue, Suite 1800, New York, NY 10019
                </p>
                <p className="text-[#888] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  +1 (212) 555-0199
                </p>
              </div>

              <div className="pt-3 space-y-1">
                <span className="font-bold text-[#d4af37] block">Beverly Hills Salon</span>
                <p className="text-[#ccc] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  250 North Rodeo Drive, Beverly Hills, CA 90210
                </p>
                <p className="text-[#888] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  +1 (310) 555-0144
                </p>
              </div>

              <div className="pt-3 space-y-1">
                <span className="font-bold text-[#d4af37] block">London Atelier</span>
                <p className="text-[#ccc] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  14 New Bond Street, Mayfair, London W1S 3PF
                </p>
                <p className="text-[#888] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  +44 20 7946 0912
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#13151f] border border-[#2b271d] space-y-3 text-xs">
            <h4 className="font-luxury text-base font-semibold text-white">
              Concierge Hours
            </h4>
            <div className="space-y-1 text-[#a9a7a0]">
              <p className="flex items-center justify-between">
                <span>Monday – Friday:</span>
                <span className="font-mono text-white">10:00 AM – 7:00 PM EST</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Saturday (By Appointment):</span>
                <span className="font-mono text-white">11:00 AM – 6:00 PM EST</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Sunday:</span>
                <span className="text-[#888]">Private Salon VIP Only</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
