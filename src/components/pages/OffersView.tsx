import React from 'react';
import { Tag, Copy, Check, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OffersView: React.FC = () => {
  const { coupons, applyCoupon, setActiveModal, showToast } = useStore();

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    showToast(`Coupon ${code} copied & applied to your shopping bag!`);
    setActiveModal('cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Algorithm 5 • Discount & Offers Engine
        </span>
        <h1 className="font-luxury text-3xl sm:text-4xl text-white font-bold">
          Exclusive Atelier Invitations & Privileges
        </h1>
        <p className="text-xs text-[#a9a7a0]">
          Apply promotional codes at checkout for instant order discounts on certified jewellery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map(coupon => (
          <div
            key={coupon.id}
            className="p-6 rounded-3xl bg-[#13151f] border border-[#302c21] hover:border-[#d4af37] transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold font-mono text-[#d4af37]">
                  {coupon.discountType === 'Percentage' ? `${coupon.discountValue}% OFF` : `$${coupon.discountValue} OFF`}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  Active
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#777] uppercase tracking-wider block">Promo Code:</span>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-[#3d3a2d] font-mono text-base font-bold text-white mt-1">
                  <Tag className="w-4 h-4 text-[#d4af37]" />
                  <span>{coupon.code}</span>
                </div>
              </div>

              <p className="text-xs text-[#9d9b91]">
                Valid on all certified gold and diamond orders exceeding a minimum value of <strong>${coupon.minimumOrderAmount}</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-[#23211b] flex items-center justify-between">
              <span className="text-[10px] text-[#777] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Expires {coupon.expiryDate}
              </span>

              <button
                id={`btn-apply-${coupon.code}`}
                onClick={() => handleCopyAndApply(coupon.code)}
                className="px-4 py-2 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#c29e29] transition-all flex items-center gap-1.5"
              >
                <span>Apply Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
