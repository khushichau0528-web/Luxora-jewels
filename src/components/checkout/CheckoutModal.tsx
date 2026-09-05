import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod, ShippingAddress } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartTax, 
    cartShipping, 
    cartFinalTotal,
    appliedCoupon,
    placeOrder,
    currentUser,
    setActiveView
  } = useStore();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: currentUser?.fullName || 'Lady Eleanora Vance',
    email: currentUser?.email || 'customer@luxora.com',
    phone: currentUser?.phone || '+1 (555) 234-5678',
    address: currentUser?.address || '742 Evergreen Terrace, Penthouse B',
    city: currentUser?.city || 'Beverly Hills',
    state: currentUser?.state || 'California',
    pincode: currentUser?.pincode || '90210',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Credit/Debit Card');
  const [upiId, setUpiId] = useState('luxora@upi');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  if (activeModal !== 'checkout') return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const result = placeOrder(address, paymentMethod);
      setIsProcessing(false);
      if (result.success && result.orderId) {
        setPlacedOrderId(result.orderId);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-[#11131b] border border-[#3b372b] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#25231c] bg-[#161823]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#d4af37]/15 text-[#d4af37]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-luxury text-lg text-white font-bold">
                Luxury Vault Checkout
              </h2>
              <p className="text-xs text-[#9d9b91]">
                Academic Dummy Payment & SQL Server Persistence
              </p>
            </div>
          </div>
          <button
            id="close-checkout-modal-btn"
            onClick={() => {
              setActiveModal(null);
              setPlacedOrderId(null);
            }}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {placedOrderId ? (
            /* Order Success Confirmation */
            <div className="text-center py-12 space-y-6 max-w-md mx-auto animate-in zoom-in-95">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Order Successfully Placed
                </span>
                <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                  Thank You for Your Patronage
                </h3>
                <p className="text-xs text-[#999] mt-2">
                  Your acquisition has been confirmed and vaulted for insured white-glove transit.
                </p>
              </div>

              {/* Order Credentials Card */}
              <div className="p-4 rounded-2xl bg-[#171924] border border-[#2b281f] text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#888]">Order ID:</span>
                  <span className="text-[#d4af37] font-bold">{placedOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888]">Payment Status:</span>
                  <span className="text-emerald-400 font-bold">
                    {paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid (Simulated)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888]">Total Debited:</span>
                  <span className="text-white font-bold">${cartFinalTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888]">Method:</span>
                  <span className="text-white">{paymentMethod}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  id="btn-track-new-order"
                  onClick={() => {
                    setActiveModal(null);
                    setPlacedOrderId(null);
                    setActiveView('orders');
                  }}
                  className="px-6 py-3 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#c29e29] transition-all"
                >
                  Track Order Progress &rarr;
                </button>

                <button
                  onClick={() => {
                    setActiveModal(null);
                    setPlacedOrderId(null);
                    setActiveView('shop');
                  }}
                  className="px-6 py-3 border border-[#3b382d] text-white text-xs uppercase tracking-wider rounded-xl hover:bg-white/5 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Shipping & Payment */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Shipping Address */}
                <div className="space-y-3">
                  <h3 className="font-luxury text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#d4af37]" />
                    Insured Delivery Address
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-[#a9a7a0] mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full bg-[#161824] border border-[#2e2a1f] text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#a9a7a0] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full bg-[#161824] border border-[#2e2a1f] text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#a9a7a0] mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full bg-[#161824] border border-[#2e2a1f] text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[#a9a7a0] mb-1">Street Address / Penthouse / Suite</label>
                      <input
                        type="text"
                        required
                        value={address.address}
                        onChange={(e) => setAddress({ ...address, address: e.target.value })}
                        className="w-full bg-[#161824] border border-[#2e2a1f] text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#a9a7a0] mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full bg-[#161824] border border-[#2e2a1f] text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#a9a7a0] mb-1">State / Province</label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full bg-[#161824] border border-[#2e2a1f] text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#a9a7a0] mb-1">Postal / Pincode</label>
                      <input
                        type="text"
                        required
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full bg-[#161824] border border-[#2e2a1f] text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#a9a7a0] mb-1">Country</label>
                      <input
                        type="text"
                        required
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        className="w-full bg-[#161824] border border-[#2e2a1f] text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Dummy Payment Method Selection */}
                <div className="space-y-3 pt-4 border-t border-[#23211b]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-luxury text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#d4af37]" />
                      Payment Method (Dummy Simulator)
                    </h3>
                    <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 font-mono">
                      Simulated Local
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'Credit/Debit Card', icon: CreditCard, label: 'Card' },
                      { id: 'UPI', icon: Smartphone, label: 'UPI / QR' },
                      { id: 'Net Banking', icon: Building2, label: 'NetBanking' },
                      { id: 'Cash on Delivery', icon: Truck, label: 'COD' }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === method.id
                            ? 'border-[#d4af37] bg-[#d4af37]/15 text-white font-semibold'
                            : 'border-[#29261e] bg-[#141620] text-[#999] hover:text-white'
                        }`}
                      >
                        <method.icon className="w-4 h-4 text-[#d4af37]" />
                        <span>{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Dummy Method Inputs */}
                  {paymentMethod === 'Credit/Debit Card' && (
                    <div className="p-3.5 rounded-xl bg-[#141622] border border-[#2b271d] space-y-2 text-xs">
                      <div>
                        <label className="block text-[#888] mb-1">Card Number (Simulated)</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#0c0d13] border border-[#2b271d] text-white font-mono rounded px-3 py-1.5"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#888] mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-[#0c0d13] border border-[#2b271d] text-white font-mono rounded px-3 py-1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-[#888] mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-[#0c0d13] border border-[#2b271d] text-white font-mono rounded px-3 py-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'UPI' && (
                    <div className="p-3.5 rounded-xl bg-[#141622] border border-[#2b271d] text-xs space-y-1">
                      <label className="block text-[#888]">Virtual Payment Address (VPA / UPI ID)</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-[#0c0d13] border border-[#2b271d] text-white font-mono rounded px-3 py-1.5"
                      />
                    </div>
                  )}

                  {paymentMethod === 'Cash on Delivery' && (
                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800 text-xs text-amber-300">
                      Payment status will be marked as <strong>Pending</strong> until our armored delivery agent verifies recipient identity and takes payment at your address.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Items & Pricing Breakdown */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-[#141622] border border-[#2d2920] space-y-4 text-xs">
                  <h3 className="font-luxury text-sm font-semibold text-white uppercase tracking-wider">
                    Order Items ({cart.reduce((s, i) => s + i.quantity, 0)})
                  </h3>

                  <div className="max-h-52 overflow-y-auto space-y-3 divide-y divide-[#20222c]">
                    {cart.map(item => (
                      <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-neutral-900"
                          />
                          <div>
                            <p className="font-semibold text-white line-clamp-1">{item.product.name}</p>
                            <p className="text-[10px] text-[#777]">Qty: {item.quantity} × ${item.product.finalPrice}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-white">
                          ${(item.quantity * item.product.finalPrice).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-3 border-t border-[#23211b] space-y-2 text-xs">
                    <div className="flex justify-between text-[#999]">
                      <span>Subtotal:</span>
                      <span className="font-mono text-white">${cartSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({appliedCoupon?.code}):</span>
                        <span className="font-mono">-${cartDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#999]">
                      <span>Jewellery Tax (3%):</span>
                      <span className="font-mono text-white">${cartTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>

                    <div className="flex justify-between text-[#999]">
                      <span>Insured Armored Transit:</span>
                      <span className="font-mono text-white">
                        {cartShipping === 0 ? <span className="text-emerald-400">COMPLIMENTARY</span> : `$${cartShipping}`}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-[#2a2820] flex justify-between items-center text-sm font-bold text-white">
                      <span className="text-[#d4af37] font-luxury">Total Payable:</span>
                      <span className="text-xl font-extrabold text-[#d4af37] font-mono">
                        ${cartFinalTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="btn-place-order-submit"
                    type="submit"
                    disabled={isProcessing || cart.length === 0}
                    className="w-full py-4 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#c29e29] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        Authorizing Dummy Transaction...
                      </span>
                    ) : (
                      <span>Confirm & Place Order</span>
                    )}
                  </button>

                  <p className="text-[10px] text-[#716f68] text-center">
                    Simulated local payment system with Entity Framework Core stock management.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
