import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Calculator, 
  Code2, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const { 
    cart, 
    wishlist, 
    currentUser, 
    activeView, 
    setActiveView, 
    setActiveModal, 
    filterState, 
    setFilterState,
    goldRates,
    categories
  } = useStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const current22kRate = goldRates.find(r => r.karat === '22K')?.ratePerGram || 79.8;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('shop');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d10]/95 backdrop-blur-md border-b border-[#2a271f]">
      {/* Top Luxury Ticker Bar */}
      <div className="bg-[#12141a] border-b border-[#1f2129] px-4 py-1.5 text-xs text-[#a09e96] flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-[#d4af37] font-medium">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Live Gold Standard:
          </span>
          <span className="text-[#e2ded5]">22K: <strong className="text-[#d4af37]">${current22kRate.toFixed(2)}/g</strong></span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-[#e2ded5]">24K: <strong className="text-[#d4af37]">${(goldRates.find(r => r.karat === '24K')?.ratePerGram || 86.5).toFixed(2)}/g</strong></span>
          <span className="hidden md:inline text-neutral-600">|</span>
          <span className="hidden md:inline text-emerald-400">Complimentary Insured Shipping & BIS Hallmarked</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-open-gold-calculator"
            onClick={() => setActiveModal('goldCalculator')}
            className="flex items-center gap-1 text-[#d4af37] hover:text-[#f3e5ab] transition-colors py-0.5 px-2 rounded bg-[#d4af37]/10 border border-[#d4af37]/30 hover:border-[#d4af37]/60"
            title="Open Interactive Jewellery Price Calculator (Algorithm 8)"
          >
            <Calculator className="w-3 h-3" />
            <span className="hidden sm:inline">Price Calculator</span>
          </button>

          <button
            id="btn-open-aspnet-solution"
            onClick={() => setActiveModal('aspnetCore')}
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors py-0.5 px-2 rounded bg-sky-500/10 border border-sky-500/30 hover:border-sky-500/60 font-mono text-[11px]"
            title="Explore Full C# ASP.NET Core MVC Code & SQL Setup"
          >
            <Code2 className="w-3 h-3" />
            <span>ASP.NET Core Solution</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => setActiveView('home')} 
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-gradient-to-br from-[#23211b] to-[#121318] shadow-inner group-hover:border-[#d4af37] transition-all">
              <Sparkles className="w-5 h-5 text-[#d4af37] group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-luxury text-xl sm:text-2xl tracking-[0.2em] font-semibold text-[#f5f5f7] group-hover:text-[#d4af37] transition-colors">
                LUXORA
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-[#bda871] uppercase font-sans">
                Fine Jewels & Atelier
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              id="nav-link-home"
              onClick={() => setActiveView('home')}
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#d4af37] ${
                activeView === 'home' ? 'text-[#d4af37] font-semibold border-b border-[#d4af37] pb-1' : 'text-[#c7c5bd]'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-shop"
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: 'All' }));
                setActiveView('shop');
              }}
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#d4af37] ${
                activeView === 'shop' ? 'text-[#d4af37] font-semibold border-b border-[#d4af37] pb-1' : 'text-[#c7c5bd]'
              }`}
            >
              Jewellery
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                id="nav-categories-dropdown-btn"
                onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                onMouseEnter={() => setCatDropdownOpen(true)}
                className={`flex items-center gap-1 text-sm tracking-wider uppercase transition-colors hover:text-[#d4af37] ${
                  activeView === 'categories' ? 'text-[#d4af37] font-semibold' : 'text-[#c7c5bd]'
                }`}
              >
                Categories
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {catDropdownOpen && (
                <div 
                  onMouseLeave={() => setCatDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-72 bg-[#12141b] border border-[#333026] rounded-xl shadow-2xl p-3 grid grid-cols-2 gap-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setFilterState(prev => ({ ...prev, category: cat.name }));
                        setActiveView('shop');
                        setCatDropdownOpen(false);
                      }}
                      className="text-left text-xs text-[#dedbd2] hover:text-[#d4af37] hover:bg-[#1f2026] px-2.5 py-2 rounded-lg transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-[#2a2924] mt-1">
                    <button
                      onClick={() => {
                        setActiveView('categories');
                        setCatDropdownOpen(false);
                      }}
                      className="w-full text-center text-xs text-[#d4af37] hover:underline font-medium"
                    >
                      View All 12 Collections &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-link-offers"
              onClick={() => setActiveView('offers')}
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#d4af37] ${
                activeView === 'offers' ? 'text-[#d4af37] font-semibold border-b border-[#d4af37] pb-1' : 'text-[#c7c5bd]'
              }`}
            >
              Offers
            </button>

            <button
              id="nav-link-about"
              onClick={() => setActiveView('about')}
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#d4af37] ${
                activeView === 'about' ? 'text-[#d4af37] font-semibold border-b border-[#d4af37] pb-1' : 'text-[#c7c5bd]'
              }`}
            >
              About
            </button>

            <button
              id="nav-link-contact"
              onClick={() => setActiveView('contact')}
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#d4af37] ${
                activeView === 'contact' ? 'text-[#d4af37] font-semibold border-b border-[#d4af37] pb-1' : 'text-[#c7c5bd]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Input Button */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    id="nav-search-input"
                    type="text"
                    placeholder="Search gold, diamond rings, brand..."
                    value={filterState.searchQuery}
                    onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
                    autoFocus
                    className="w-48 sm:w-64 bg-[#181a22] text-xs text-white px-3 py-1.5 rounded-l-lg border border-[#3b382d] focus:outline-none focus:border-[#d4af37]"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#d4af37] text-black px-2.5 py-1.5 rounded-r-lg hover:bg-[#b89326] transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSearchOpen(false)}
                    className="text-neutral-400 hover:text-white ml-1.5 text-xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  id="btn-toggle-search"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-[#c7c5bd] hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5"
                  title="Search Jewellery"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              id="btn-nav-wishlist"
              onClick={() => setActiveModal('wishlist')}
              className="relative p-2 text-[#c7c5bd] hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="btn-nav-cart"
              onClick={() => setActiveModal('cart')}
              className="relative p-2 text-[#c7c5bd] hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile / Admin Quick Switcher */}
            <div className="relative group">
              <button
                id="btn-nav-user"
                onClick={() => {
                  if (currentUser) {
                    setActiveModal('profile');
                  } else {
                    setActiveModal('auth');
                  }
                }}
                className={`flex items-center gap-1.5 py-1 px-2.5 rounded-full border text-xs transition-all ${
                  currentUser?.role === 'Admin'
                    ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f1e1a6]'
                    : currentUser
                    ? 'border-neutral-700 bg-neutral-800/80 text-white'
                    : 'border-[#38352b] text-[#c7c5bd] hover:border-[#d4af37]'
                }`}
                title={currentUser ? `${currentUser.fullName} (${currentUser.role})` : 'Sign In / Register'}
              >
                {currentUser?.role === 'Admin' ? (
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
                <span className="hidden sm:inline max-w-[100px] truncate">
                  {currentUser ? currentUser.fullName.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Quick User Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#151720] border border-[#2f2c23] rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                {currentUser ? (
                  <div className="space-y-1 text-xs">
                    <div className="px-3 py-2 border-b border-[#2a2924]">
                      <p className="font-semibold text-white truncate">{currentUser.fullName}</p>
                      <p className="text-[11px] text-[#a09e96] truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] font-semibold">
                        {currentUser.role} Account
                      </span>
                    </div>

                    <button
                      id="dropdown-profile-btn"
                      onClick={() => setActiveModal('profile')}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#20232e] text-[#dedbd2] rounded transition-colors"
                    >
                      My Profile
                    </button>

                    <button
                      id="dropdown-my-orders-btn"
                      onClick={() => setActiveView('orders')}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#20232e] text-[#dedbd2] rounded transition-colors"
                    >
                      My Orders & Tracking
                    </button>

                    <button
                      id="dropdown-my-wishlist-btn"
                      onClick={() => setActiveModal('wishlist')}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#20232e] text-[#dedbd2] rounded transition-colors"
                    >
                      My Wishlist ({wishlist.length})
                    </button>

                    {currentUser.role === 'Admin' && (
                      <button
                        id="dropdown-admin-dashboard-btn"
                        onClick={() => setActiveView('admin')}
                        className="w-full text-left px-3 py-1.5 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] font-semibold rounded transition-colors flex items-center justify-between"
                      >
                        Admin Dashboard &rarr;
                      </button>
                    )}

                    <div className="border-t border-[#2a2924] pt-1">
                      <button
                        id="dropdown-switch-role-btn"
                        onClick={() => {
                          const newRole = currentUser.role === 'Admin' ? 'Customer' : 'Admin';
                          const targetEmail = newRole === 'Admin' ? 'admin@luxora.com' : 'customer@luxora.com';
                          useStore().login(targetEmail, newRole);
                        }}
                        className="w-full text-left px-3 py-1.5 text-[11px] text-amber-400 hover:bg-[#20232e] rounded transition-colors"
                      >
                        Switch to {currentUser.role === 'Admin' ? 'Customer' : 'Admin'} Mode
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 space-y-2 text-xs">
                    <button
                      id="dropdown-signin-btn"
                      onClick={() => setActiveModal('auth')}
                      className="w-full text-center py-2 bg-[#d4af37] text-black font-semibold rounded-lg hover:bg-[#b89326] transition-colors"
                    >
                      Sign In / Register
                    </button>
                    <button
                      id="dropdown-demo-admin-btn"
                      onClick={() => useStore().login('admin@luxora.com', 'Admin')}
                      className="w-full text-center py-1.5 border border-[#3b382d] text-[#e0ddcf] hover:text-[#d4af37] rounded-lg transition-colors text-[11px]"
                    >
                      Quick Demo Admin Login
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#c7c5bd] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12141c] border-b border-[#2a271f] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded bg-[#1c1e28] text-white"
            >
              Home
            </button>
            <button
              onClick={() => { setActiveView('shop'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded bg-[#1c1e28] text-white"
            >
              Jewellery Catalog
            </button>
            <button
              onClick={() => { setActiveView('categories'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded bg-[#1c1e28] text-white"
            >
              12 Categories
            </button>
            <button
              onClick={() => { setActiveView('offers'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded bg-[#1c1e28] text-white"
            >
              Offers & Discounts
            </button>
            <button
              onClick={() => { setActiveView('orders'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded bg-[#1c1e28] text-white"
            >
              Order Tracking
            </button>
            <button
              onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded bg-[#d4af37]/20 text-[#d4af37] font-semibold"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => { setActiveView('about'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded bg-[#1c1e28] text-[#c7c5bd]"
            >
              About Atelier
            </button>
            <button
              onClick={() => { setActiveView('contact'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded bg-[#1c1e28] text-[#c7c5bd]"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
