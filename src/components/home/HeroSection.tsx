import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Truck, 
  Coins, 
  Star, 
  Tag, 
  Heart,
  Eye
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../products/ProductCard';

export const HeroSection: React.FC = () => {
  const { 
    categories, 
    products, 
    goldRates, 
    setActiveView, 
    setFilterState, 
    setActiveModal 
  } = useStore();

  const featuredProducts = products.filter(p => p.badges.includes('Best Seller') || p.badges.includes('Featured')).slice(0, 4);
  const newArrivals = products.filter(p => p.badges.includes('New Arrival')).slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0e1017] via-[#0b0c11] to-[#07080b] border-b border-[#23211b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181a24] border border-[#d4af37]/30 text-xs text-[#d4af37]">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-widest text-[11px]">
                Royal Atelier Masterpieces • 2026 Collection
              </span>
            </div>

            <h1 className="font-luxury text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Timeless Elegance, <br />
              <span className="text-gold-gradient font-serif italic">Forged in Royal Gold.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#a9a7a0] max-w-xl leading-relaxed mx-auto lg:mx-0">
              Immerse yourself in certified 22K hallmarked gold necklaces, solitaires, and antique filigree bangles. Each creation comes with GIA/BIS authenticity certificates.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="btn-hero-explore-collection"
                onClick={() => {
                  setFilterState(prev => ({ ...prev, category: 'All' }));
                  setActiveView('shop');
                }}
                className="px-8 py-4 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#c49f2b] shadow-xl hover:shadow-[#d4af37]/20 transition-all flex items-center gap-2 group active:scale-95"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-hero-calc-gold"
                onClick={() => setActiveModal('goldCalculator')}
                className="px-6 py-4 rounded-xl border border-[#3b382c] hover:border-[#d4af37] text-white hover:text-[#d4af37] text-xs font-semibold uppercase tracking-wider bg-[#131520] transition-colors flex items-center gap-2"
              >
                <Coins className="w-4 h-4 text-[#d4af37]" />
                <span>Live Gold Calculator (Alg 8)</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-[#1e202b] grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <span className="text-2xl font-bold font-mono text-[#d4af37]">100%</span>
                <p className="text-[11px] text-[#7d7b73] uppercase tracking-wider mt-0.5">BIS Hallmarked</p>
              </div>
              <div>
                <span className="text-2xl font-bold font-mono text-[#d4af37]">4.9 / 5</span>
                <p className="text-[11px] text-[#7d7b73] uppercase tracking-wider mt-0.5">Collector Rating</p>
              </div>
              <div>
                <span className="text-2xl font-bold font-mono text-[#d4af37]">24/7</span>
                <p className="text-[11px] text-[#7d7b73] uppercase tracking-wider mt-0.5">Concierge Care</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#3b382d] shadow-2xl bg-[#12141c] group">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                alt="Imperial Royal Emerald and 22K Gold Choker"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Live Price Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-[#3b372a] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider block">
                    Featured Masterpiece
                  </span>
                  <h4 className="font-luxury text-sm font-bold text-white">
                    Imperial Maharani Emerald Choker
                  </h4>
                  <span className="font-mono text-[#d4af37] font-bold text-base mt-0.5 block">
                    $4,250 <span className="text-neutral-500 line-through text-xs">$4,800</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    const feat = products.find(p => p.id === 'PROD-001');
                    if (feat) {
                      useStore().setSelectedProduct(feat);
                      setActiveModal('productDetails');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#c29e29] transition-all"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Ribbon (Browse by Category) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#23211b] pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Curated Collections
            </span>
            <h2 className="font-luxury text-2xl sm:text-3xl text-white font-bold mt-1">
              Browse by Jewellery Category
            </h2>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Cards Carousel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: cat.name }));
                setActiveView('shop');
              }}
              className="group bg-[#12141c] border border-[#26241c] hover:border-[#d4af37] rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3 border border-[#2b281f] group-hover:scale-110 transition-transform">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-luxury text-xs font-bold text-white group-hover:text-[#d4af37] transition-colors">
                {cat.name}
              </h4>
              <p className="text-[10px] text-[#777] mt-1">
                Explore &rarr;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Algorithm 5 Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#171926] via-[#1f1d18] to-[#171926] border border-[#3b3628] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-bold flex items-center justify-center md:justify-start gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Special Invitation • Promotional Coupon
            </span>
            <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white">
              Enjoy 10% Off Your First Royal Acquisition
            </h3>
            <p className="text-xs text-[#a9a7a0]">
              Use code <strong className="text-[#d4af37] font-mono">WELCOME10</strong> at checkout on orders above $500. Automatic discount application enabled.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                useStore().applyCoupon('WELCOME10');
                setActiveModal('cart');
              }}
              className="px-6 py-3 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#c29e29] transition-all whitespace-nowrap shadow"
            >
              Claim Code: WELCOME10
            </button>
          </div>
        </div>
      </section>

      {/* Featured Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#23211b] pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Most Coveted
            </span>
            <h2 className="font-luxury text-2xl sm:text-3xl text-white font-bold mt-1">
              Atelier Best Sellers
            </h2>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Browse Full Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#23211b] pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Fresh From The Vault
            </span>
            <h2 className="font-luxury text-2xl sm:text-3xl text-white font-bold mt-1">
              New Arrivals & Bridal Sets
            </h2>
          </div>
          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, sortBy: 'newest' }));
              setActiveView('shop');
            }}
            className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
