import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const WishlistModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    wishlist, 
    products, 
    removeFromWishlist, 
    moveToCartFromWishlist,
    setActiveView
  } = useStore();

  if (activeModal !== 'wishlist') return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-[#12141c] border border-[#3b372b] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#25231c] bg-[#161823]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-950/60 text-rose-400 border border-rose-900/60">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-luxury text-lg text-white font-bold">
                My Jewellery Wishlist
              </h2>
              <p className="text-xs text-[#9d9b91]">
                {wishlist.length} saved masterpiece{wishlist.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          <button
            id="close-wishlist-modal-btn"
            onClick={() => setActiveModal(null)}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {wishlistProducts.length > 0 ? (
            <div className="space-y-3 divide-y divide-[#21232c]">
              {wishlistProducts.map(product => (
                <div 
                  key={product.id}
                  className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-neutral-900 border border-[#2b281f]"
                    />
                    <div>
                      <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                        {product.category} • {product.purity}
                      </span>
                      <h4 className="font-luxury text-sm font-semibold text-white">
                        {product.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#d4af37]">
                        ${product.finalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      id={`btn-move-cart-${product.id}`}
                      onClick={() => moveToCartFromWishlist(product.id)}
                      disabled={product.stock <= 0}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        product.stock <= 0
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-[#d4af37] text-black hover:bg-[#c29e29]'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{product.stock <= 0 ? 'Out of Stock' : 'Move to Cart'}</span>
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#1b1e2a] flex items-center justify-center text-rose-400">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-luxury text-xl font-semibold text-white">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#8f8d84] max-w-sm mx-auto">
                Save your favourite solitaires, temple necklaces and gold chains to review or acquire later.
              </p>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setActiveView('shop');
                }}
                className="px-6 py-2.5 bg-[#d4af37] text-black font-bold text-xs rounded-xl hover:bg-[#c29e29] transition-colors"
              >
                Explore Jewellery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
