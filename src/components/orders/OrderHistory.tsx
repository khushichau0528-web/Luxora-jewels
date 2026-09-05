import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Clock, 
  CheckCircle, 
  Truck, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';

export const OrderHistory: React.FC = () => {
  const { orders, cancelOrder, updateOrderStatus, currentUser } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0]?.id || null);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of mind / Selected alternate design');

  const filteredOrders = orders.filter(o => {
    if (searchOrderId.trim()) {
      return o.id.toLowerCase().includes(searchOrderId.toLowerCase().trim()) ||
             o.customerName.toLowerCase().includes(searchOrderId.toLowerCase().trim());
    }
    return true;
  });

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || filteredOrders[0];

  const ORDER_STAGES: OrderStatus[] = [
    'Confirmed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const getStageIndex = (status: OrderStatus) => {
    if (status === 'Cancelled') return -1;
    if (status === 'Pending') return 0;
    return ORDER_STAGES.indexOf(status);
  };

  const handleConfirmCancel = () => {
    if (!cancellingOrderId) return;
    cancelOrder(cancellingOrderId, cancelReason);
    setCancellingOrderId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Order Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#25231c] gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Concierge Tracking & Audit
          </span>
          <h1 className="font-luxury text-3xl sm:text-4xl text-white font-bold mt-1">
            Orders & Live Tracking
          </h1>
          <p className="text-xs text-[#9d9b91] mt-1">
            Inspect real-time fulfillment stages from atelier crafting to armored home delivery.
          </p>
        </div>

        {/* Order ID Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8a877e] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Order ID (e.g. LUX-2026)..."
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            className="w-full bg-[#13151f] border border-[#2c2921] rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder:text-[#636159] focus:outline-none focus:border-[#d4af37]"
          />
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl bg-[#12141c] border border-[#29261e] space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#1b1e2a] flex items-center justify-center text-[#d4af37]">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-luxury text-xl font-semibold text-white">No Orders Found</h3>
          <p className="text-xs text-[#8f8d84] max-w-sm mx-auto">
            You haven't placed any jewellery orders yet. Place an order to test live tracking and dummy payment updates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order List (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Order Records ({filteredOrders.length})
            </h3>

            <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
              {filteredOrders.map(order => {
                const isSelected = order.id === selectedOrderId;
                const canCancel = ['Pending', 'Confirmed', 'Processing'].includes(order.orderStatus);

                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                      isSelected
                        ? 'border-[#d4af37] bg-[#1a1c27] shadow-lg'
                        : 'border-[#242630] bg-[#12141c] hover:border-[#383b48]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-[#d4af37]">
                        #{order.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        order.orderStatus === 'Cancelled' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        order.orderStatus === 'Shipped' || order.orderStatus === 'Out for Delivery' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                        'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#9d9b91]">
                      <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                      <span className="font-mono font-bold text-white">
                        ${order.finalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#7a7872] truncate">
                      Items: {order.items.map(i => i.productName).join(', ')}
                    </div>

                    {/* Quick cancellation button if allowed */}
                    {canCancel && (
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCancellingOrderId(order.id);
                          }}
                          className="text-[11px] text-rose-400 hover:underline flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          Cancel Eligible Order
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Order Details & Visual Progress Tracker (Right 7 cols) */}
          {selectedOrder && (
            <div className="lg:col-span-7 space-y-6">
              {/* Visual Order Progress System (Algorithm 7) */}
              <div className="p-6 rounded-3xl bg-[#13151f] border border-[#2e2a1f] space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
                      Algorithm 7 – Visual Fulfillment Progress
                    </span>
                    <h3 className="font-luxury text-xl font-bold text-white mt-0.5">
                      Order #{selectedOrder.id}
                    </h3>
                  </div>

                  {/* Payment Status Pill */}
                  <div className="text-right">
                    <span className="text-[10px] text-[#888] block">Payment Status</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      selectedOrder.paymentStatus === 'Paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      selectedOrder.paymentStatus === 'Refund Pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      selectedOrder.paymentStatus === 'Refunded' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                      'bg-neutral-800 text-neutral-300'
                    }`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Progress Stepper */}
                {selectedOrder.orderStatus === 'Cancelled' ? (
                  <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 flex items-center gap-3 text-rose-300">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <div className="text-xs">
                      <strong>This order was cancelled.</strong>
                      <p className="text-rose-400 mt-0.5">
                        Reason: {selectedOrder.cancellationReason || 'Requested by customer'}. Stock was restored.
                        {selectedOrder.paymentStatus === 'Refund Pending' && ' Refund has been flagged for authorization.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      {/* Step Progress Bar Track */}
                      <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#252835] -z-0" />
                      {/* Active line */}
                      <div
                        className="absolute top-4 left-4 h-0.5 bg-[#d4af37] transition-all duration-500 -z-0"
                        style={{
                          width: `${Math.max(0, (getStageIndex(selectedOrder.orderStatus) / (ORDER_STAGES.length - 1)) * 95)}%`
                        }}
                      />

                      <div className="relative z-10 flex justify-between">
                        {ORDER_STAGES.map((stage, idx) => {
                          const currentIdx = getStageIndex(selectedOrder.orderStatus);
                          const isDone = idx <= currentIdx;
                          const isCurrent = idx === currentIdx;

                          return (
                            <div key={stage} className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  isDone
                                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 scale-105'
                                    : 'bg-[#181a24] text-[#666] border border-[#282a36]'
                                }`}
                              >
                                {isDone ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span
                                className={`text-[10px] mt-2 text-center font-medium max-w-[65px] ${
                                  isCurrent
                                    ? 'text-[#d4af37] font-bold'
                                    : isDone
                                    ? 'text-white'
                                    : 'text-[#666]'
                                }`}
                              >
                                {stage}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Simulated Admin Status Changer for Demo */}
                {currentUser?.role === 'Admin' && (
                  <div className="p-3.5 rounded-xl bg-[#181a24] border border-[#2b271e] text-xs flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[#d4af37] font-semibold">Admin Status Controller:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {(['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'] as OrderStatus[]).map(st => (
                        <button
                          key={st}
                          onClick={() => updateOrderStatus(selectedOrder.id, st)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                            selectedOrder.orderStatus === st
                              ? 'bg-[#d4af37] text-black'
                              : 'bg-[#222533] text-[#bbb] hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items Snapshot Table */}
              <div className="p-6 rounded-3xl bg-[#13151f] border border-[#2e2a1f] space-y-4 text-xs">
                <h4 className="font-luxury text-sm font-semibold text-white uppercase tracking-wider">
                  Vault Items in this Order
                </h4>

                <div className="divide-y divide-[#20222e]">
                  {selectedOrder.items.map(item => (
                    <div key={item.productId} className="py-3 first:pt-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={item.productImage} alt="" className="w-12 h-12 rounded-xl object-cover bg-neutral-900" />
                        <div>
                          <p className="font-semibold text-white text-xs">{item.productName}</p>
                          <p className="text-[11px] text-[#777] font-mono">
                            ${item.price.toLocaleString()} × {item.quantity} units
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-white text-xs">
                        ${item.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Meta */}
                <div className="pt-4 border-t border-[#222430] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#777] block">Delivery Recipient</span>
                    <p className="text-white font-medium">{selectedOrder.fullName}</p>
                    <p className="text-[#999]">{selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} {selectedOrder.pincode}</p>
                    <p className="text-[#999]">{selectedOrder.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#777] block">Payment Summary</span>
                    <p className="text-white font-mono">Method: {selectedOrder.paymentMethod}</p>
                    <p className="text-white font-mono">Payment ID: {selectedOrder.paymentId}</p>
                    <p className="text-[#d4af37] font-mono font-bold text-sm">
                      Total Paid: ${selectedOrder.finalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancellingOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151722] border border-rose-900/60 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-luxury text-lg font-bold text-white">
                Confirm Order Cancellation
              </h3>
            </div>

            <p className="text-xs text-[#bbb]">
              Are you sure you want to cancel order <strong>#{cancellingOrderId}</strong>?
              Upon cancellation, reserved inventory will be returned to stock. If paid, your status will update to <strong>Refund Pending</strong>.
            </p>

            <div>
              <label className="block text-xs text-[#888] mb-1">Reason for cancellation:</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full bg-[#0d0e14] border border-[#2b2d3d] text-xs text-white rounded-lg p-2 focus:outline-none"
              >
                <option>Change of mind / Selected alternate design</option>
                <option>Ordered incorrect ring / wrist size</option>
                <option>Need to update shipping destination</option>
                <option>Other personal reason</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCancellingOrderId(null)}
                className="px-4 py-2 text-xs text-white hover:bg-white/5 rounded-lg"
              >
                Keep Order
              </button>
              <button
                id="btn-confirm-cancel-order"
                onClick={handleConfirmCancel}
                className="px-4 py-2 text-xs bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
