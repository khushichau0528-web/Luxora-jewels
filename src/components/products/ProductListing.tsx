import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  RotateCcw, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductListing: React.FC = () => {
  const { 
    filteredProducts, 
    filterState, 
    setFilterState, 
    resetFilters, 
    categories 
  } = useStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const materials = ['All', 'Gold', 'Diamond', 'Platinum', 'Silver'];
  const purities = ['All', '24K', '22K', '18K', '14K'];
  const genders = ['All', 'Women', 'Men', 'Kids', 'Unisex'];
  const stones = ['All', 'Plain Gold', 'Diamond', 'Emerald', 'Ruby', 'Pearl', 'Onyx'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#25231c] gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Jewellery Catalog
          </span>
          <h1 className="font-luxury text-3xl sm:text-4xl text-white font-bold mt-1">
            {filterState.category !== 'All' ? filterState.category : 'All Creations'}
          </h1>
          <p className="text-xs text-[#9c9990] mt-1">
            Displaying {filteredProducts.length} certified fine jewellery masterpieces
          </p>
        </div>

        {/* Dynamic Search & Sort Controls (Algorithms 1 & 3) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Algorithm 1 Search */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-[#8a877e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="shop-search-input"
              type="text"
              placeholder="Search ring, 22K, solitaire..."
              value={filterState.searchQuery}
              onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full bg-[#13151e] border border-[#2c2921] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-[#636159] focus:outline-none focus:border-[#d4af37]"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Algorithm 3 Sorting Dropdown */}
          <div className="flex items-center gap-2 bg-[#13151e] border border-[#2c2921] rounded-xl px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#d4af37]" />
            <select
              id="shop-sort-select"
              value={filterState.sortBy}
              onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-[#12141c]">Most Popular</option>
              <option value="newest" className="bg-[#12141c]">Newest Arrivals</option>
              <option value="priceAsc" className="bg-[#12141c]">Price: Low to High</option>
              <option value="priceDesc" className="bg-[#12141c]">Price: High to Low</option>
              <option value="nameAsc" className="bg-[#12141c]">Name: A to Z</option>
              <option value="nameDesc" className="bg-[#12141c]">Name: Z to A</option>
              <option value="rating" className="bg-[#12141c]">Highest Rated</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            id="mobile-filters-toggle-btn"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#13151e] border border-[#2c2921] rounded-xl text-xs text-[#dedbd2]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside className={`
          ${mobileFiltersOpen ? 'fixed inset-0 z-50 bg-black/90 p-6 overflow-y-auto block' : 'hidden lg:block'}
          space-y-6 lg:static
        `}>
          <div className="flex items-center justify-between pb-4 border-b border-[#25231c]">
            <h3 className="font-luxury text-base font-semibold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#d4af37]" />
              Filter Jewellery
              <span className="text-[10px] uppercase font-sans tracking-wider px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37]">
                Algorithm 2
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="text-xs text-[#a3a096] hover:text-[#d4af37] flex items-center gap-1"
                title="Reset All Filters"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
              {mobileFiltersOpen && (
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-lg text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">
              Categories
            </label>
            <div className="flex flex-col gap-1 text-xs">
              <button
                onClick={() => setFilterState(prev => ({ ...prev, category: 'All' }))}
                className={`text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  filterState.category === 'All'
                    ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold'
                    : 'text-[#a9a79f] hover:bg-[#181a24] hover:text-white'
                }`}
              >
                <span>All Collections</span>
                {filterState.category === 'All' && <Check className="w-3.5 h-3.5" />}
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilterState(prev => ({ ...prev, category: cat.name }))}
                  className={`text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    filterState.category === cat.name
                      ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold'
                      : 'text-[#a9a79f] hover:bg-[#181a24] hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  {filterState.category === cat.name && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price Range Filter */}
          <div className="space-y-2 pt-4 border-t border-[#23211b]">
            <div className="flex justify-between text-xs text-white">
              <span className="font-semibold uppercase tracking-wider">Price Range</span>
              <span className="font-mono text-[#d4af37]">${filterState.minPrice} - ${filterState.maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="250"
              value={filterState.maxPrice}
              onChange={(e) => setFilterState(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#787670] font-mono">
              <span>$0</span>
              <span>$5,000</span>
              <span>$10,000+</span>
            </div>
          </div>

          {/* 3. Material Filter */}
          <div className="space-y-2 pt-4 border-t border-[#23211b]">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">
              Precious Metal
            </label>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {materials.map(mat => (
                <button
                  key={mat}
                  onClick={() => setFilterState(prev => ({ ...prev, material: mat }))}
                  className={`px-2 py-1.5 rounded text-left transition-colors text-xs ${
                    filterState.material === mat
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'bg-[#14161f] text-[#a9a79f] hover:text-white'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Gold Purity Filter */}
          <div className="space-y-2 pt-4 border-t border-[#23211b]">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">
              Gold Purity
            </label>
            <div className="grid grid-cols-3 gap-1 text-xs">
              {purities.map(p => (
                <button
                  key={p}
                  onClick={() => setFilterState(prev => ({ ...prev, purity: p }))}
                  className={`px-2 py-1.5 rounded text-center transition-colors text-xs font-mono ${
                    filterState.purity === p
                      ? 'bg-[#d4af37] text-black font-bold'
                      : 'bg-[#14161f] text-[#a9a79f] hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Stone Type Filter */}
          <div className="space-y-2 pt-4 border-t border-[#23211b]">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">
              Gemstone / Stone
            </label>
            <div className="flex flex-wrap gap-1 text-xs">
              {stones.map(s => (
                <button
                  key={s}
                  onClick={() => setFilterState(prev => ({ ...prev, stoneType: s }))}
                  className={`px-2 py-1 rounded-full text-xs transition-colors ${
                    filterState.stoneType === s
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'bg-[#14161f] text-[#a9a79f] hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Gender Filter */}
          <div className="space-y-2 pt-4 border-t border-[#23211b]">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">
              Audience / Gender
            </label>
            <div className="flex flex-wrap gap-1 text-xs">
              {genders.map(g => (
                <button
                  key={g}
                  onClick={() => setFilterState(prev => ({ ...prev, gender: g }))}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                    filterState.gender === g
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'bg-[#14161f] text-[#a9a79f] hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* 7. Availability Filter */}
          <div className="space-y-2 pt-4 border-t border-[#23211b]">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">
              Stock Availability
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', label: 'All Pieces' },
                { id: 'inStock', label: 'In Stock Only' },
                { id: 'outOfStock', label: 'Out of Stock' }
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-2 text-[#a9a79f] cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    checked={filterState.availability === opt.id}
                    onChange={() => setFilterState(prev => ({ ...prev, availability: opt.id as any }))}
                    className="accent-[#d4af37]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {mobileFiltersOpen && (
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 bg-[#d4af37] text-black font-bold rounded-xl text-xs uppercase tracking-wider"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          )}
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 p-8 rounded-2xl bg-[#12141c] border border-[#29261e] space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#1b1e2a] flex items-center justify-center text-[#d4af37]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-luxury text-xl font-semibold text-white">No Matching Creations Found</h3>
              <p className="text-xs text-[#9d9b92] max-w-md mx-auto">
                We could not find any jewellery matching your active filters or search terms. Try loosening your price limit, changing categories, or clearing search.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49e2a] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
