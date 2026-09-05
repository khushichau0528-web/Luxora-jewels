import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingBag, 
  Tag, 
  Coins, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Plus, 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  Sparkles,
  ExternalLink,
  Search,
  Code
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, Category, Coupon, GoldPurity, OrderStatus } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    categories, 
    orders, 
    coupons, 
    goldRates, 
    updateGoldRate, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    updateOrderStatus,
    addCoupon,
    deleteCoupon,
    setActiveModal,
    setActiveView
  } = useStore();

  const [currentTab, setCurrentTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'coupons' | 'goldRates'>('overview');

  // Product CRUD states
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Necklaces',
    description: '',
    material: 'Gold',
    purity: '22K',
    weightGrams: 15.0,
    originalPrice: 2000,
    discountPercentage: 10,
    finalPrice: 1800,
    stock: 8,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'],
    badges: ['New Arrival'],
    brand: 'Luxora Vault Atelier',
    stoneType: 'Plain Gold',
    rating: 5.0,
    reviewCount: 1,
    size: '18 inches',
    colour: 'Yellow Gold'
  });

  // Category CRUD states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  // Coupon CRUD states
  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState<'Percentage' | 'Fixed'>('Percentage');
  const [couponValue, setCouponValue] = useState(15);
  const [couponMinOrder, setCouponMinOrder] = useState(500);

  // Statistics Calculations
  const totalRevenue = orders.reduce((sum, o) => o.orderStatus !== 'Cancelled' ? sum + o.finalAmount : sum, 0);
  const lowStockProducts = products.filter(p => p.stock <= 4);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0), 0);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrice = productForm.originalPrice! - (productForm.originalPrice! * (productForm.discountPercentage || 0) / 100);
    
    if (productForm.id) {
      updateProduct(productForm.id, { ...productForm, finalPrice } as Product);
    } else {
      addProduct({
        ...productForm,
        id: `PROD-${Date.now()}`,
        finalPrice,
        rating: 5.0,
        reviewCount: 0,
        badges: productForm.badges || ['New Arrival']
      } as Product);
    }
    setIsEditingProduct(false);
    setProductForm({});
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName.trim(), newCategoryDesc.trim());
    setNewCategoryName('');
    setNewCategoryDesc('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    addCoupon({
      code: couponCode.toUpperCase().trim(),
      discountType: couponType,
      discountValue: couponValue,
      minimumOrderAmount: couponMinOrder,
      expiryDate: '2026-12-31',
      isActive: true
    });
    setCouponCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#25231c] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider border border-[#d4af37]/30">
              Admin Management Portal
            </span>
            <span className="text-xs text-[#888]">Role-Based Access Control</span>
          </div>
          <h1 className="font-luxury text-3xl text-white font-bold mt-1">
            Store Command Center
          </h1>
          <p className="text-xs text-[#9d9b91] mt-0.5">
            Manage inventory, stock thresholds, pricing algorithms, coupons and order fulfillment.
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveModal('aspnetCore')}
            className="px-3.5 py-2 rounded-xl bg-[#1a1e2d] border border-sky-500/40 text-sky-400 text-xs font-semibold hover:bg-sky-500/15 transition-colors flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5" />
            C# & SQL Scripts
          </button>
          <button
            onClick={() => setActiveView('shop')}
            className="px-3.5 py-2 rounded-xl bg-[#1a1c27] border border-[#2b281f] text-white text-xs font-semibold hover:border-[#d4af37] transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
            Live Client Store
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#222430] overflow-x-auto gap-1 text-xs">
        {[
          { id: 'overview', label: 'Executive Metrics', icon: LayoutDashboard },
          { id: 'products', label: `Inventory Products (${products.length})`, icon: Package },
          { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
          { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'coupons', label: `Promotional Coupons (${coupons.length})`, icon: Tag },
          { id: 'goldRates', label: 'Gold Bullion Rates (Alg 8)', icon: Coins }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              currentTab === tab.id
                ? 'border-[#d4af37] text-[#d4af37] font-semibold bg-[#d4af37]/5'
                : 'border-transparent text-[#8e8c85] hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {currentTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#13151f] border border-[#26241c] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#999]">
                <span>Gross Realized Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <span className="text-[11px] text-emerald-400 font-medium">Live SQL Transactions</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#13151f] border border-[#26241c] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#999]">
                <span>Total Orders Placed</span>
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">{orders.length}</p>
              <span className="text-[11px] text-[#888]">{totalItemsSold} jewellery pieces ordered</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#13151f] border border-[#26241c] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#999]">
                <span>Active Vault Masterpieces</span>
                <Package className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">{products.length}</p>
              <span className="text-[11px] text-[#888]">Across {categories.length} precious collections</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#13151f] border border-[#26241c] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#999]">
                <span>Low Stock Watchlist</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-amber-400">{lowStockProducts.length}</p>
              <span className="text-[11px] text-amber-400/80">Stock ≤ 4 items (Algorithm 6)</span>
            </div>
          </div>

          {/* Low Stock Alerts (Algorithm 6) */}
          {lowStockProducts.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/50 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                Algorithm 6 Stock Alert: Items Requiring Restock
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {lowStockProducts.map(p => (
                  <div key={p.id} className="p-3 rounded-xl bg-[#141620] border border-[#2a2c38] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 truncate">
                      <img src={p.images[0]} alt="" className="w-9 h-9 rounded object-cover" />
                      <div className="truncate">
                        <p className="font-semibold text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-amber-400">Only {p.stock} units remaining</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        updateProduct(p.id, { ...p, stock: p.stock + 10 });
                      }}
                      className="px-2.5 py-1 bg-[#d4af37] text-black font-bold rounded text-[10px] hover:bg-[#c49f2b] transition-colors whitespace-nowrap"
                    >
                      +10 Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Orders Overview */}
          <div className="p-6 rounded-3xl bg-[#13151f] border border-[#26241c] space-y-4">
            <h3 className="font-luxury text-base font-semibold text-white uppercase tracking-wider">
              Recent Customer Transactions
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#242634] text-[#8e8c85]">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e202c]">
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="text-white hover:bg-white/5">
                      <td className="py-3 font-mono text-[#d4af37]">#{order.id}</td>
                      <td className="py-3">{order.customerName}</td>
                      <td className="py-3 text-[#888]">{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 font-mono font-bold">${order.finalAmount.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          order.orderStatus === 'Delivered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          order.orderStatus === 'Cancelled' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                          'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CRUD */}
      {currentTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-luxury text-lg font-semibold text-white">
              Jewellery Inventory Catalog
            </h3>
            <button
              id="btn-admin-add-product"
              onClick={() => {
                setProductForm({
                  name: '',
                  category: categories[0]?.name || 'Necklaces',
                  description: '',
                  material: 'Gold',
                  purity: '22K',
                  weightGrams: 15.0,
                  originalPrice: 2000,
                  discountPercentage: 10,
                  finalPrice: 1800,
                  stock: 8,
                  images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'],
                  badges: ['New Arrival'],
                  brand: 'Luxora Vault Atelier',
                  stoneType: 'Plain Gold',
                  rating: 5.0,
                  reviewCount: 0,
                  size: 'Standard',
                  colour: 'Yellow Gold'
                });
                setIsEditingProduct(true);
              }}
              className="px-4 py-2 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#c29e29] transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add New Jewellery Creation
            </button>
          </div>

          {/* Product Modal / Inline Form */}
          {isEditingProduct && (
            <form onSubmit={handleSaveProduct} className="p-6 rounded-3xl bg-[#141622] border border-[#d4af37]/40 space-y-4 text-xs animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#282a3a]">
                <h4 className="font-luxury text-base text-white font-bold">
                  {productForm.id ? `Edit Creation: ${productForm.name}` : 'Add New Jewellery Masterpiece'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[#a9a7a0] mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1">Category</label>
                  <select
                    value={productForm.category || 'Necklaces'}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1">Metal</label>
                  <select
                    value={productForm.material || 'Gold'}
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value as any })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1">Purity</label>
                  <select
                    value={productForm.purity || '22K'}
                    onChange={(e) => setProductForm({ ...productForm, purity: e.target.value as any })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="24K">24K</option>
                    <option value="22K">22K</option>
                    <option value="18K">18K</option>
                    <option value="14K">14K</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1">Weight (grams)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={productForm.weightGrams || 10}
                    onChange={(e) => setProductForm({ ...productForm, weightGrams: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    required
                    value={productForm.originalPrice || 1000}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1">Discount (%)</label>
                  <input
                    type="number"
                    value={productForm.discountPercentage || 0}
                    onChange={(e) => setProductForm({ ...productForm, discountPercentage: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[#a9a7a0] mb-1">Vault Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock || 5}
                    onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[#a9a7a0] mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={productForm.images?.[0] || ''}
                    onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[#a9a7a0] mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d4af37] text-black font-bold uppercase tracking-wider rounded-xl hover:bg-[#c29e29]"
                >
                  Save Product to Database
                </button>
              </div>
            </form>
          )}

          {/* Products Table */}
          <div className="p-6 rounded-3xl bg-[#13151f] border border-[#26241c] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#242634] text-[#8e8c85]">
                  <th className="pb-3">Piece</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Spec</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e202c]">
                {products.map(p => (
                  <tr key={p.id} className="text-white hover:bg-white/5">
                    <td className="py-3 flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-neutral-900" />
                      <div>
                        <p className="font-semibold text-white">{p.name}</p>
                        <p className="text-[10px] text-[#777] font-mono">ID: {p.id}</p>
                      </div>
                    </td>
                    <td className="py-3 text-[#d4af37] font-medium">{p.category}</td>
                    <td className="py-3 text-[#aaa]">{p.purity} • {p.weightGrams}g</td>
                    <td className="py-3 font-mono font-bold">
                      ${p.finalPrice.toLocaleString()}
                      {p.discountPercentage > 0 && (
                        <span className="text-[10px] text-rose-400 block line-through font-normal">
                          ${p.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        p.stock <= 4 ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-neutral-800 text-neutral-300'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setProductForm(p);
                            setIsEditingProduct(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#222533] text-sky-400 hover:bg-sky-500/20"
                          title="Edit Product"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg bg-[#222533] text-rose-400 hover:bg-rose-500/20"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CATEGORIES CRUD */}
      {currentTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add Category Form */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#13151f] border border-[#26241c] space-y-4">
            <h3 className="font-luxury text-base font-semibold text-white uppercase tracking-wider">
              Add New Jewellery Category
            </h3>
            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#a9a7a0] mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bridal Chokers"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[#a9a7a0] mb-1">Category Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe hallmark specifications or artisanal craftsmanship..."
                  value={newCategoryDesc}
                  onChange={(e) => setNewCategoryDesc(e.target.value)}
                  className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#d4af37] text-black font-bold uppercase tracking-wider rounded-xl hover:bg-[#c29e29] transition-colors"
              >
                Create Category
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#13151f] border border-[#26241c] space-y-4">
            <h3 className="font-luxury text-base font-semibold text-white uppercase tracking-wider">
              Current Registered Collections ({categories.length})
            </h3>

            <div className="space-y-3">
              {categories.map(c => {
                const count = products.filter(p => p.category === c.name).length;
                return (
                  <div key={c.id} className="p-4 rounded-2xl bg-[#171926] border border-[#242636] flex items-center justify-between gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-white text-sm">{c.name}</h4>
                      <p className="text-[11px] text-[#888]">{c.description}</p>
                      <span className="text-[10px] text-[#d4af37] font-semibold">{count} products assigned</span>
                    </div>

                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="p-2 rounded-lg bg-[#222533] text-rose-400 hover:bg-rose-500/20 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ORDERS MANAGEMENT */}
      {currentTab === 'orders' && (
        <div className="p-6 rounded-3xl bg-[#13151f] border border-[#26241c] space-y-4 text-xs">
          <h3 className="font-luxury text-base font-semibold text-white uppercase tracking-wider">
            All Customer Orders & Status Dispatch
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#242634] text-[#8e8c85]">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Order Status</th>
                  <th className="pb-3">Action: Update Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e202c]">
                {orders.map(order => (
                  <tr key={order.id} className="text-white hover:bg-white/5">
                    <td className="py-3 font-mono font-bold text-[#d4af37]">#{order.id}</td>
                    <td className="py-3">
                      <div>
                        <p className="font-semibold">{order.fullName}</p>
                        <p className="text-[10px] text-[#888]">{order.city}, {order.state}</p>
                      </div>
                    </td>
                    <td className="py-3 font-mono font-bold">${order.finalAmount.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        order.paymentStatus === 'Paid' ? 'bg-emerald-950 text-emerald-400' :
                        order.paymentStatus === 'Refund Pending' ? 'bg-amber-950 text-amber-400' :
                        'bg-neutral-800 text-neutral-300'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-950 text-emerald-300' :
                        order.orderStatus === 'Cancelled' ? 'bg-rose-950 text-rose-300' :
                        'bg-amber-950 text-amber-300'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-[#1c1e2b] border border-[#2d3040] text-[11px] text-white rounded-lg px-2 py-1 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: COUPONS CRUD */}
      {currentTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add Coupon Form */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#13151f] border border-[#26241c] space-y-4">
            <h3 className="font-luxury text-base font-semibold text-white uppercase tracking-wider">
              Add Promotional Coupon (Algorithm 5)
            </h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#a9a7a0] mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ROYAL25"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a9a7a0] mb-1">Discount Type</label>
                  <select
                    value={couponType}
                    onChange={(e) => setCouponType(e.target.value as any)}
                    className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#a9a7a0] mb-1">Value ({couponType === 'Percentage' ? '%' : '$'})</label>
                  <input
                    type="number"
                    required
                    value={couponValue}
                    onChange={(e) => setCouponValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#a9a7a0] mb-1">Minimum Order Amount ($)</label>
                <input
                  type="number"
                  required
                  value={couponMinOrder}
                  onChange={(e) => setCouponMinOrder(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#d4af37] text-black font-bold uppercase tracking-wider rounded-xl hover:bg-[#c29e29] transition-colors"
              >
                Publish Coupon
              </button>
            </form>
          </div>

          {/* Active Coupons List */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#13151f] border border-[#26241c] space-y-4">
            <h3 className="font-luxury text-base font-semibold text-white uppercase tracking-wider">
              Active Store Coupons ({coupons.length})
            </h3>

            <div className="space-y-3">
              {coupons.map(c => (
                <div key={c.id} className="p-4 rounded-2xl bg-[#171926] border border-[#242636] flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-mono font-bold text-white text-sm text-[#d4af37]">{c.code}</span>
                    <p className="text-[#999] mt-0.5">
                      {c.discountType === 'Percentage' ? `${c.discountValue}% Discount` : `$${c.discountValue} Off`} on orders above ${c.minimumOrderAmount}
                    </p>
                    <span className="text-[10px] text-[#666]">Expires {c.expiryDate}</span>
                  </div>

                  <button
                    onClick={() => deleteCoupon(c.id)}
                    className="p-2 rounded-lg bg-[#222533] text-rose-400 hover:bg-rose-500/20 transition-colors"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GOLD RATES MANAGEMENT */}
      {currentTab === 'goldRates' && (
        <div className="p-6 rounded-3xl bg-[#13151f] border border-[#26241c] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-luxury text-lg font-semibold text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#d4af37]" />
                Bullion Market Gold Rates (Algorithm 8)
              </h3>
              <p className="text-xs text-[#8e8c85] mt-1">
                Admin controls prevailing live market rates per gram. Updates dynamically re-calculate customer estimates in real time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {goldRates.map(r => (
              <div key={r.karat} className="p-5 rounded-2xl bg-[#171925] border border-[#272938] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#d4af37]">{r.karat} Gold</span>
                  <span className="text-[10px] text-[#777] font-mono">{r.lastUpdated}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono text-white">${r.ratePerGram.toFixed(2)}</span>
                  <span className="text-xs text-[#888]">/ gram</span>
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] text-[#888] mb-1">Update Rate ($/g):</label>
                  <input
                    type="number"
                    step="0.5"
                    defaultValue={r.ratePerGram}
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      if (val > 0) updateGoldRate(r.karat, val);
                    }}
                    className="w-full bg-[#0d0e14] border border-[#2e3040] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#0e1017] border border-[#272938] text-xs text-[#888] space-y-1">
            <span className="font-semibold text-[#d4af37] block">Academic Pricing Formula Notice:</span>
            <p>
              In accordance with Algorithm 8 requirements, the system calculates jewellery retail costs as:
              <code className="text-white mx-1 font-mono">Retail Price = (Weight × Gold Rate) + Making Charges + Stone Charges + Tax</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
