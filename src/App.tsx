import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ProductListing } from './components/products/ProductListing';
import { ProductDetail } from './components/products/ProductDetail';
import { CartModal } from './components/cart/CartModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { WishlistModal } from './components/wishlist/WishlistModal';
import { AuthModal } from './components/auth/AuthModal';
import { GoldCalculatorModal } from './components/home/GoldCalculatorModal';
import { OrderHistory } from './components/orders/OrderHistory';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { OffersView } from './components/pages/OffersView';
import { AboutView } from './components/pages/AboutView';
import { ContactView } from './components/pages/ContactView';
import { AspNetCoreProjectModal } from './components/aspnet/AspNetCoreProjectModal';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, toastMessage } = useStore();

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#dedbd3] flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        {activeView === 'home' && <HeroSection />}
        {activeView === 'shop' && <ProductListing />}
        {activeView === 'orders' && <OrderHistory />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'offers' && <OffersView />}
        {activeView === 'about' && <AboutView />}
        {activeView === 'contact' && <ContactView />}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <ProductDetail />
      <CartModal />
      <CheckoutModal />
      <WishlistModal />
      <AuthModal />
      <GoldCalculatorModal />
      <AspNetCoreProjectModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161824] border border-[#d4af37] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-1 rounded-lg bg-[#d4af37]/20 text-[#d4af37]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
