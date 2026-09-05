import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  AlertCircle,
  Sparkles,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartFinalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (activeModal !== 'cart') return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-[#12141c] border border-[#3b372b] rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Cart Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#25231c] bg-[#161823]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#d4af37]/15 text-[#d4af37]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-luxury text-lg text-white font-bold flex items-center gap-2">
                Shopping Cart
                <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37]">
                  Algorithm 4
                </span>
              </h2>
              <p className="text-xs text-[#9d9b91]">
                {cart.length} unique creation{cart.length === 1 ? '' : 's'} in your vault
              </p>
            </div>
          </div>
          <button
            id="close-cart-modal-btn"
            onClick={() => setActiveModal(null)}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {cart.length > 0 ? (
            <>
              {/* Items List */}
              <div className="space-y-4 divide-y divide-[#21232c]">
                {cart.map((item) => {
                  const itemTotal = item.product.finalPrice * item.quantity;
                  const isMaxStock = item.quantity >= item.product.stock;

                  return (
                    <div 
                      key={item.product.id}
                      className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover bg-neutral-900 border border-[#2e2b20]"
                        />
                        <div>
                          <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                            {item.product.category} • {item.product.purity}
                          </span>
                          <h4 className="font-luxury text-sm font-semibold text-white">
                            {item.product.name}
                          </h4>
                          <span className="text-xs text-[#999] font-mono">
                            ${item.product.finalPrice.toLocaleString()} each
                          </span>
                        </div>
                      </div>

                      {/* Quantity Selector & Item Total */}
                      <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                        {/* Quantity controls with Stock prevention (Algorithm 6) */}
                        <div className="flex flex-col items-center">
                          <div className="flex items-center border border-[#363328] rounded-xl bg-[#171924] overflow-hidden">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-white hover:bg-white/10"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-mono text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              disabled={isMaxStock}
                              className="px-2.5 py-1 text-white hover:bg-white/10 disabled:opacity-30"
                              title={isMaxStock ? 'Maximum available inventory reached' : 'Increase quantity'}
                            >
                              +
                            </button>
                          </div>
                          {isMaxStock && (
                            <span className="text-[9px] text-amber-400 mt-0.5">
                              Vault limit ({item.product.stock})
                            </span>
                          )}
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-white font-mono block">
                            ${itemTotal.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#777]">
                            ({item.quantity} × ${item.product.finalPrice})
                          </span>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-500 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-950/30 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Shopping Cart
                </button>
              </div>

              {/* Coupon System (Algorithm 5) */}
              <div className="p-4 rounded-2xl bg-[#161824] border border-[#2b281f] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
                    Promotional Coupon Code (Algorithm 5)
                  </span>
                  <span className="text-[10px] text-[#888]">
                    Available: <strong className="text-[#d4af37]">WELCOME10</strong> (10% off), <strong className="text-[#d4af37]">LUXE20</strong>
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#d4af37]/15 border border-[#d4af37]/40 p-3 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-[#f3e3a8]">
                      <Check className="w-4 h-4 text-[#d4af37]" />
                      <span>
                        Coupon <strong>{appliedCoupon.code}</strong> Applied:
                        {appliedCoupon.discountType === 'Percentage' ? ` ${appliedCoupon.discountValue}% Discount` : ` $${appliedCoupon.discountValue} Off`}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-400 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code (e.g. WELCOME10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-[#0f1118] border border-[#2f2b20] text-xs text-white uppercase rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#d4af37] text-black font-bold text-xs rounded-xl hover:bg-[#c29e29] transition-colors"
                    >
                      Apply Coupon
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {couponError}
                  </p>
                )}
              </div>

              {/* Algorithm 4 Financial Calculations Table */}
              <div className="p-5 rounded-2xl bg-[#0e1017] border border-[#2b271d] space-y-2.5 text-xs">
                <div className="flex justify-between text-[#a9a79f]">
                  <span>1. Cart Subtotal (Sum of Item Totals):</span>
                  <span className="font-mono font-medium text-white">${cartSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>2. Applicable Discount ({appliedCoupon?.code}):</span>
                    <span className="font-mono font-medium">-${cartDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#a9a79f]">
                  <span>3. Luxury Jewellery Tax (3%):</span>
                  <span className="font-mono font-medium text-white">${cartTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between text-[#a9a79f]">
                  <span>4. Armored Insured Shipping:</span>
                  <span className="font-mono font-medium text-white">
                    {cartShipping === 0 ? <span className="text-emerald-400">COMPLIMENTARY</span> : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#23211b] flex justify-between items-center text-sm font-bold text-white">
                  <div>
                    <span className="text-[#d4af37] font-luxury text-base">Final Total Amount:</span>
                    <span className="text-[10px] text-[#777] block font-sans font-normal">
                      Subtotal + Tax + Shipping - Discount
                    </span>
                  </div>
                  <span className="text-xl font-extrabold text-[#d4af37] font-mono">
                    ${cartFinalTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#1b1e2a] flex items-center justify-center text-[#d4af37]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-luxury text-xl font-semibold text-white">Your Jewellery Bag is Empty</h3>
              <p className="text-xs text-[#8f8d84] max-w-sm mx-auto">
                Explore our hallmarked 22K gold necklaces, diamond solitaires, and royal bracelets to begin your collection.
              </p>
              <button
                onClick={() => {
                  setActiveModal(null);
                  useStore().setActiveView('shop');
                }}
                className="px-6 py-2.5 bg-[#d4af37] text-black font-bold text-xs rounded-xl hover:bg-[#c29e29] transition-colors"
              >
                Browse Jewellery Catalog
              </button>
            </div>
          )}
        </div>

        {/* Cart Footer / Checkout Action */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#25231c] bg-[#151722] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#999]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Armored tamper-evident packaging & certificate</span>
            </div>

            <button
              id="btn-proceed-to-checkout"
              onClick={() => setActiveModal('checkout')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#c29e29] shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
