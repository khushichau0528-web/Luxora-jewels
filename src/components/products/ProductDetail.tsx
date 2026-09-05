import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Award,
  ChevronRight,
  Send,
  Sparkles,
  Zap
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductDetail: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    activeModal, 
    setActiveModal, 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    reviews, 
    addReview, 
    currentUser,
    goldRates
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (activeModal !== 'productDetails' || !selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const isOutOfStock = selectedProduct.stock <= 0;
  const productReviews = reviews.filter(r => r.productId === selectedProduct.id && r.isApproved);
  const currentGoldRate = goldRates.find(r => r.karat === selectedProduct.purity)?.ratePerGram || 79.8;

  const handleAddToCart = () => {
    addToCart(selectedProduct.id, quantity);
  };

  const handleBuyNow = () => {
    const res = addToCart(selectedProduct.id, quantity);
    if (res.success) {
      setActiveModal('checkout');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addReview(selectedProduct.id, reviewRating, reviewComment.trim());
    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-[#11131a] border border-[#3b372b] rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#25231c] bg-[#151722]">
          <div className="flex items-center gap-2 text-xs text-[#999]">
            <span>{selectedProduct.brand}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#d4af37] font-semibold">{selectedProduct.category}</span>
          </div>
          <button
            id="btn-close-product-details"
            onClick={() => {
              setActiveModal(null);
              setSelectedProduct(null);
            }}
            className="text-neutral-400 hover:text-white p-1.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 p-6 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gallery Section */}
            <div className="space-y-4">
              {/* Main Active Image with Zoom Effect */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#08090d] border border-[#26241c] relative group">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => isFavorited ? removeFromWishlist(selectedProduct.id) : addToWishlist(selectedProduct.id)}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow ${
                    isFavorited ? 'bg-[#d4af37] text-black' : 'bg-black/50 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>

                {/* Hallmark Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-[#3b382d] text-xs text-[#d4af37]">
                  <Award className="w-4 h-4" />
                  <span>BIS 916 Hallmarked & Certified</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/20 scale-105' : 'border-[#26241c] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info & Action Section */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.badges.map(b => (
                    <span key={b} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                      {b}
                    </span>
                  ))}
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded ${
                    selectedProduct.stock > 5 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    selectedProduct.stock > 0 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {selectedProduct.stock > 0 ? `${selectedProduct.stock} Available in Vault` : 'Out of Stock'}
                  </span>
                </div>

                <h1 className="font-luxury text-2xl sm:text-3xl text-white font-bold leading-tight">
                  {selectedProduct.name}
                </h1>

                {/* Rating Banner */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(selectedProduct.rating) ? 'fill-current' : 'text-neutral-700'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-white text-sm">{selectedProduct.rating.toFixed(1)} / 5.0</span>
                  <span className="text-[#888]">({selectedProduct.reviewCount} verified collector reviews)</span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#171924] border border-[#2e2a1f] space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-[#d4af37] font-mono">
                      ${selectedProduct.finalPrice.toLocaleString()}
                    </span>
                    {selectedProduct.discountPercentage > 0 && (
                      <span className="text-sm text-neutral-500 line-through font-mono">
                        ${selectedProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {selectedProduct.discountPercentage > 0 && (
                      <span className="text-xs font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800">
                        Save {selectedProduct.discountPercentage}%
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#918f87]">
                    Inclusive of all handcrafted artisan making fees, insurance, and 3% luxury tax.
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#bab8b0] leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Full Specifications Table */}
                <div className="border border-[#26241c] rounded-2xl overflow-hidden text-xs">
                  <div className="bg-[#171923] px-4 py-2 text-[#d4af37] font-semibold border-b border-[#26241c] flex items-center justify-between">
                    <span>Atelier Specifications</span>
                    <span className="text-[10px] text-[#888]">Certified Genuine</span>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-y divide-[#21232c] bg-[#12141c]">
                    <div className="p-3">
                      <span className="text-[#7a7872] block">Precious Metal</span>
                      <span className="font-semibold text-white">{selectedProduct.material}</span>
                    </div>
                    <div className="p-3">
                      <span className="text-[#7a7872] block">Gold Purity</span>
                      <span className="font-semibold text-[#d4af37] font-mono">{selectedProduct.purity}</span>
                    </div>
                    <div className="p-3">
                      <span className="text-[#7a7872] block">Weight</span>
                      <span className="font-semibold text-white font-mono">{selectedProduct.weightGrams} grams</span>
                    </div>
                    <div className="p-3">
                      <span className="text-[#7a7872] block">Stone / Diamond</span>
                      <span className="font-semibold text-white">{selectedProduct.stoneType}</span>
                    </div>
                    <div className="p-3">
                      <span className="text-[#7a7872] block">Dimensions / Size</span>
                      <span className="font-semibold text-white">{selectedProduct.size || 'Standard Fit'}</span>
                    </div>
                    <div className="p-3">
                      <span className="text-[#7a7872] block">Lustre / Colour</span>
                      <span className="font-semibold text-white">{selectedProduct.colour}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity Selector and Actions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider">
                      Quantity
                    </label>
                    <div className="flex items-center border border-[#38352b] rounded-xl bg-[#151722] overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1 || isOutOfStock}
                        className="px-3 py-1.5 text-white hover:bg-white/10 disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 font-mono text-sm font-bold text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                        disabled={quantity >= selectedProduct.stock || isOutOfStock}
                        className="px-3 py-1.5 text-white hover:bg-white/10 disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-[#888]">
                      (Max available: {selectedProduct.stock})
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      id="btn-modal-add-to-cart"
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className={`py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        isOutOfStock
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-[#d4af37] text-black hover:bg-[#c29e2e] shadow-lg active:scale-95'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {isOutOfStock ? 'Sold Out' : 'Add To Cart'}
                    </button>

                    <button
                      id="btn-modal-buy-now"
                      onClick={handleBuyNow}
                      disabled={isOutOfStock}
                      className={`py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        isOutOfStock
                          ? 'border border-neutral-800 text-neutral-600 cursor-not-allowed'
                          : 'border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/15 active:scale-95'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      Instant Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews & Ratings Section */}
          <div className="border-t border-[#23211b] pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-luxury text-xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#d4af37] fill-current" />
                  Collector Reviews & Ratings
                </h3>
                <p className="text-xs text-[#8f8d84]">
                  Only verified collectors who acquire Luxora creations can submit public reviews.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#171924] border border-[#2b281f] px-4 py-2 rounded-xl">
                <span className="text-2xl font-bold text-[#d4af37] font-mono">
                  {selectedProduct.rating.toFixed(1)}
                </span>
                <div className="text-left text-[11px] text-[#999]">
                  <div className="text-white font-medium">Overall Rating</div>
                  <div>Based on {productReviews.length} reviews</div>
                </div>
              </div>
            </div>

            {/* Submit a Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-[#141620] border border-[#2b271d] space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Write a Review as {currentUser?.fullName || 'Collector'}
              </h4>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#ccc]">Your Rating:</span>
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-current' : 'text-neutral-700'}`} />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-[#d4af37]">({reviewRating} / 5 Stars)</span>
              </div>

              <textarea
                placeholder="Share your experience regarding the lustre, craftsmanship, velvet presentation box and delivery..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                className="w-full bg-[#0d0f15] border border-[#2e2b20] text-xs text-white rounded-xl p-3 focus:outline-none focus:border-[#d4af37]"
                required
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#777]">
                  Reviews are authenticated and saved to SQL Server using Entity Framework Core.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d4af37] text-black font-semibold rounded-xl text-xs hover:bg-[#c49e29] transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Review
                </button>
              </div>

              {reviewSubmitted && (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300">
                  Thank you! Your verified rating and review has been added to this masterpiece.
                </div>
              )}
            </form>

            {/* Existing Reviews List */}
            <div className="space-y-3">
              {productReviews.length > 0 ? (
                productReviews.map(rev => (
                  <div key={rev.id} className="p-4 rounded-xl bg-[#12141c] border border-[#23211b] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-xs">{rev.userName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-[11px] text-[#777] font-mono">{rev.reviewDate}</span>
                    </div>

                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-current' : 'text-neutral-700'}`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-[#bbb] leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#777] italic">No approved reviews yet. Be the first to review this piece!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
