import React from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    setSelectedProduct, 
    setActiveModal 
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  const handleOpenDetails = () => {
    setSelectedProduct(product);
    setActiveModal('productDetails');
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={handleOpenDetails}
      className="group bg-[#13151e] border border-[#26241c] hover:border-[#d4af37]/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#0c0d12]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Floating Button */}
        <button
          id={`btn-wishlist-${product.id}`}
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorited 
              ? 'bg-[#d4af37] text-black shadow-md' 
              : 'bg-black/40 text-white hover:bg-white hover:text-black'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Badges Ribbon */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badges.map(b => (
            <span
              key={b}
              className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded shadow ${
                b === 'Best Seller'
                  ? 'bg-amber-400 text-black'
                  : b === 'New Arrival'
                  ? 'bg-emerald-500 text-white'
                  : b === 'On Sale'
                  ? 'bg-rose-500 text-white'
                  : 'bg-[#d4af37]/90 text-black'
              }`}
            >
              {b}
            </span>
          ))}
          {isOutOfStock && (
            <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-red-600 text-white shadow">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick View Overlay Bar on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetails();
            }}
            className="flex items-center gap-1 text-xs bg-white/90 hover:bg-white text-black py-1 px-3 rounded-full font-medium transition-colors shadow"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Material Spec */}
          <div className="flex items-center justify-between text-[11px] text-[#918f87] mb-1">
            <span className="uppercase tracking-wider font-medium text-[#d4af37]">{product.category}</span>
            <span>{product.purity !== 'N/A' ? `${product.purity} ${product.material}` : product.material}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-luxury text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Micro Specs */}
          <p className="text-[11px] text-[#7d7b73] mt-1 line-clamp-1">
            {product.weightGrams}g • {product.stoneType}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-white">{product.rating.toFixed(1)}</span>
            <span className="text-[#7d7b73] text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price and Cart Action */}
        <div className="pt-2 border-t border-[#21232c] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#d4af37] font-mono">
                ${product.finalPrice.toLocaleString()}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-[#716f68] line-through font-mono">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="text-[10px] text-rose-400 font-semibold">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Add To Cart Button */}
          <button
            id={`btn-add-cart-${product.id}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isOutOfStock
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-[#d4af37] text-black hover:bg-[#c29e2e] active:scale-95'
            }`}
            title={isOutOfStock ? 'Out of Stock' : 'Add to Shopping Cart'}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
