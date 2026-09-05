import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  CartItem, 
  Order, 
  OrderStatus, 
  PaymentMethod, 
  ShippingAddress, 
  Coupon, 
  GoldRate, 
  User, 
  Review, 
  ContactMessage,
  FilterState,
  GoldPurity
} from '../types';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_COUPONS, 
  INITIAL_GOLD_RATES, 
  DEFAULT_USERS, 
  INITIAL_REVIEWS 
} from '../data/mockData';

interface StoreContextType {
  // Products & Categories
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: number, category: Partial<Category>) => void;
  deleteCategory: (id: number) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (productId: number, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => { success: boolean; message: string };
  clearCart: () => void;
  wishlist: number[];
  addToWishlist: (productId: number) => { success: boolean; message: string };
  removeFromWishlist: (productId: number) => void;
  moveToCartFromWishlist: (productId: number) => { success: boolean; message: string };
  isInWishlist: (productId: number) => boolean;

  // Cart Financials (Algorithms 4 & 5)
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartShipping: number;
  cartFinalTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders (Algorithms 6 & 7)
  orders: Order[];
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: PaymentMethod) => { success: boolean; orderId?: string; message: string };
  cancelOrder: (orderId: string, reason?: string) => { success: boolean; message: string };
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Reviews & Ratings
  reviews: Review[];
  addReview: (productId: number, rating: number, comment: string) => { success: boolean; message: string };
  toggleReviewApproval: (reviewId: number) => void;
  deleteReview: (reviewId: number) => void;

  // Gold Pricing (Algorithm 8)
  goldRates: GoldRate[];
  updateGoldRate: (karat: GoldPurity, newRate: number) => void;
  calculateJewelleryPrice: (weightGrams: number, purity: GoldPurity, makingCharges: number, stoneCharges: number) => {
    goldValue: number;
    makingCharges: number;
    stoneCharges: number;
    subtotal: number;
    tax: number;
    finalPrice: number;
  };

  // Coupons Admin
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCouponStatus: (id: number) => void;

  // User & Authentication
  currentUser: User | null;
  users: User[];
  login: (email: string, role?: 'Customer' | 'Admin') => boolean;
  logout: () => void;
  register: (fullName: string, email: string, phone: string, password?: string) => { success: boolean; message: string };
  updateUserProfile: (profile: Partial<User>) => void;
  toggleUserStatus: (userId: number) => void;

  // Contact messages
  contactMessages: ContactMessage[];
  submitContactMessage: (name: string, email: string, phone: string, subject: string, message: string) => void;
  markMessageRead: (id: number) => void;

  // Filter & Search State
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Modals & Navigation Helpers
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activeView: 'home' | 'shop' | 'categories' | 'offers' | 'about' | 'contact' | 'admin' | 'orders' | 'profile';
  setActiveView: (view: 'home' | 'shop' | 'categories' | 'offers' | 'about' | 'contact' | 'admin' | 'orders' | 'profile') => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_FILTER_STATE: FilterState = {
  searchQuery: '',
  category: 'All',
  minPrice: 0,
  maxPrice: 10000,
  material: 'All',
  purity: 'All',
  gender: 'All',
  stoneType: 'All',
  availability: 'all',
  sortBy: 'popular'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence in LocalStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('luxora_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('luxora_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('luxora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('luxora_wishlist');
    return saved ? JSON.parse(saved) : [1, 4];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('luxora_orders');
    if (saved) return JSON.parse(saved);
    // Initial dummy order for demonstration
    return [
      {
        id: 'LUX-2026-9281',
        userId: 1,
        customerName: 'Lady Eleanora Vance',
        customerEmail: 'customer@luxora.com',
        items: [
          {
            productId: 1,
            productName: 'Eternity Solitaire Diamond Ring',
            productImage: INITIAL_PRODUCTS[0].images[0],
            price: 2040,
            quantity: 1,
            total: 2040
          }
        ],
        subtotal: 2040,
        discount: 204,
        tax: 55.08,
        shipping: 0,
        finalAmount: 1891.08,
        couponCode: 'WELCOME10',
        shippingAddress: {
          fullName: 'Lady Eleanora Vance',
          email: 'customer@luxora.com',
          phone: '+1 (555) 234-5678',
          address: '742 Evergreen Terrace, Penthouse B',
          city: 'Beverly Hills',
          state: 'California',
          pincode: '90210',
          country: 'United States'
        },
        orderDate: '2026-02-15T14:22:00Z',
        orderStatus: 'Shipped',
        paymentId: 'PAY-8923AF01',
        paymentMethod: 'Credit/Debit Card',
        paymentStatus: 'Paid'
      }
    ];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('luxora_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [goldRates, setGoldRates] = useState<GoldRate[]>(() => {
    const saved = localStorage.getItem('luxora_gold_rates');
    return saved ? JSON.parse(saved) : INITIAL_GOLD_RATES;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('luxora_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('luxora_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('luxora_current_user');
    return saved ? JSON.parse(saved) : DEFAULT_USERS[0];
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('luxora_contact_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Julian Sterling',
        email: 'julian@sterlingadvisors.com',
        phone: '+1 (555) 345-6789',
        subject: 'Custom Engagement Ring Consultation',
        message: 'I would like to schedule an appointment with your master jeweler regarding a custom 3-carat cushion diamond solitaire.',
        submittedAt: '2026-03-01T10:15:00Z',
        isRead: false
      }
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'categories' | 'offers' | 'about' | 'contact' | 'admin' | 'orders' | 'profile'>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('luxora_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('luxora_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('luxora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('luxora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('luxora_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('luxora_gold_rates', JSON.stringify(goldRates));
  }, [goldRates]);

  useEffect(() => {
    localStorage.setItem('luxora_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('luxora_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('luxora_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('luxora_contact_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  // ================= ALGORITHM 4: Cart Totals Calculation =================
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.finalPrice * item.quantity), 0);
  
  // Algorithm 5: Coupon Discount
  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountType === 'Percentage') {
      cartDiscount = Number(((cartSubtotal * appliedCoupon.discountValue) / 100).toFixed(2));
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  // 3% standard luxury tax on jewellery
  const cartTax = Number(((cartSubtotal - cartDiscount) * 0.03).toFixed(2));
  // Free shipping on orders over $1500, else $50
  const cartShipping = cart.length === 0 ? 0 : (cartSubtotal > 1500 ? 0 : 50);
  const cartFinalTotal = Number(Math.max(0, cartSubtotal - cartDiscount + cartTax + cartShipping).toFixed(2));

  // ================= CART OPERATIONS =================
  const addToCart = (productId: number, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return { success: false, message: 'Product not found.' };

    if (product.stock <= 0) {
      return { success: false, message: 'This piece is currently out of stock.' };
    }

    const existingIndex = cart.findIndex(item => item.product.id === productId);
    const currentQty = existingIndex > -1 ? cart[existingIndex].quantity : 0;
    const targetQty = currentQty + quantity;

    // Algorithm 6: Prevent customers from adding more quantity than available stock
    if (targetQty > product.stock) {
      return { 
        success: false, 
        message: `Stock limit reached: only ${product.stock} items available.` 
      };
    }

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity = targetQty;
      setCart(updated);
    } else {
      setCart([...cart, { product, quantity }]);
    }

    showToast(`Added "${product.name}" to cart.`);
    return { success: true, message: 'Added to cart successfully.' };
  };

  const removeFromCart = (productId: number) => {
    const item = cart.find(c => c.product.id === productId);
    setCart(cart.filter(c => c.product.id !== productId));
    if (item) showToast(`Removed "${item.product.name}" from cart.`);
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return { success: false, message: 'Product not found.' };

    if (quantity <= 0) {
      removeFromCart(productId);
      return { success: true, message: 'Item removed.' };
    }

    if (quantity > product.stock) {
      return { 
        success: false, 
        message: `Cannot exceed available inventory of ${product.stock} pieces.` 
      };
    }

    setCart(cart.map(item => item.product.id === productId ? { ...item, quantity } : item));
    return { success: true, message: 'Quantity updated.' };
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // ================= WISHLIST OPERATIONS =================
  const addToWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      return { success: false, message: 'Item is already in your wishlist.' };
    }
    setWishlist([...wishlist, productId]);
    const p = products.find(prod => prod.id === productId);
    showToast(`Saved "${p?.name || 'piece'}" to your wishlist.`);
    return { success: true, message: 'Added to wishlist.' };
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter(id => id !== productId));
    showToast('Removed from wishlist.');
  };

  const moveToCartFromWishlist = (productId: number) => {
    const result = addToCart(productId, 1);
    if (result.success) {
      removeFromWishlist(productId);
    }
    return result;
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  // ================= COUPON OPERATIONS (Algorithm 5) =================
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (!coupon.isActive) {
      return { success: false, message: 'This coupon is no longer active.' };
    }
    const today = new Date().toISOString().split('T')[0];
    if (coupon.expiryDate < today) {
      return { success: false, message: 'This coupon has expired.' };
    }
    if (cartSubtotal < coupon.minOrderAmount) {
      return { 
        success: false, 
        message: `Minimum order of $${coupon.minOrderAmount} required for this coupon.` 
      };
    }

    setAppliedCoupon(coupon);
    showToast(`Coupon "${coupon.code}" applied successfully!`);
    return { success: true, message: `Coupon applied: ${coupon.discountType === 'Percentage' ? coupon.discountValue + '%' : '$' + coupon.discountValue} OFF!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  // ================= CHECKOUT & ORDERS (Algorithms 6 & 7) =================
  const placeOrder = (shippingAddress: ShippingAddress, paymentMethod: PaymentMethod) => {
    if (cart.length === 0) {
      return { success: false, message: 'Your shopping cart is empty.' };
    }

    // 1. Verify stock availability (Algorithm 6)
    for (const item of cart) {
      const liveProduct = products.find(p => p.id === item.product.id);
      if (!liveProduct || liveProduct.stock < item.quantity) {
        return { 
          success: false, 
          message: `Insufficient stock for "${item.product.name}". Available: ${liveProduct?.stock || 0}` 
        };
      }
    }

    // 2. Generate unique Order ID and Payment ID
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `LUX-${dateStr}-${randomSuffix}`;
    const paymentId = `PAY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const newOrder: Order = {
      id: orderId,
      userId: currentUser?.id || 1,
      customerName: shippingAddress.fullName,
      customerEmail: shippingAddress.email,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.finalPrice,
        quantity: item.quantity,
        total: item.product.finalPrice * item.quantity
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      tax: cartTax,
      shipping: cartShipping,
      finalAmount: cartFinalTotal,
      couponCode: appliedCoupon?.code,
      shippingAddress,
      orderDate: new Date().toISOString(),
      orderStatus: 'Confirmed',
      paymentId,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid'
    };

    // 3. Algorithm 6: Deduct stock from inventory
    const updatedProducts = products.map(prod => {
      const orderedItem = cart.find(c => c.product.id === prod.id);
      if (orderedItem) {
        const newStock = Math.max(0, prod.stock - orderedItem.quantity);
        return { ...prod, stock: newStock };
      }
      return prod;
    });

    setProducts(updatedProducts);
    setOrders([newOrder, ...orders]);
    clearCart();
    showToast(`Order #${orderId} placed successfully!`);
    return { success: true, orderId, message: 'Order placed successfully.' };
  };

  const cancelOrder = (orderId: string, reason = 'Customer requested cancellation') => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found.' };

    // Customers can cancel only if not shipped
    if (['Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].includes(order.orderStatus)) {
      return { 
        success: false, 
        message: `Order cannot be cancelled because it is already ${order.orderStatus.toLowerCase()}.` 
      };
    }

    // Restore stock
    const updatedProducts = products.map(prod => {
      const orderItem = order.items.find(i => i.productId === prod.id);
      if (orderItem) {
        return { ...prod, stock: prod.stock + orderItem.quantity };
      }
      return prod;
    });

    const updatedOrders = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: 'Cancelled' as OrderStatus,
          paymentStatus: o.paymentStatus === 'Paid' ? 'Refund Pending' as const : o.paymentStatus,
          cancellationReason: reason
        };
      }
      return o;
    });

    setProducts(updatedProducts);
    setOrders(updatedOrders);
    showToast(`Order #${orderId} has been cancelled.`);
    return { success: true, message: 'Order cancelled successfully.' };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        let newPaymentStatus = o.paymentStatus;
        if (status === 'Cancelled' && o.paymentStatus === 'Paid') {
          newPaymentStatus = 'Refund Pending';
        } else if (status === 'Delivered' && o.paymentMethod === 'Cash on Delivery') {
          newPaymentStatus = 'Paid';
        }
        return { ...o, orderStatus: status, paymentStatus: newPaymentStatus };
      }
      return o;
    }));
    showToast(`Order #${orderId} status changed to ${status}.`);
  };

  // ================= REVIEWS & RATINGS =================
  const addReview = (productId: number, rating: number, comment: string) => {
    const newReview: Review = {
      id: Date.now(),
      productId,
      userId: currentUser?.id || 1,
      userName: currentUser?.fullName || 'Verified Collector',
      rating,
      comment,
      reviewDate: new Date().toISOString().split('T')[0],
      isApproved: true // Auto-approved or pending admin review
    };

    setReviews([newReview, ...reviews]);

    // Recalculate average rating and count on product
    const productReviews = [...reviews.filter(r => r.productId === productId), newReview];
    const avgRating = Number((productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1));

    setProducts(products.map(p => p.id === productId ? {
      ...p,
      rating: avgRating,
      reviewCount: productReviews.length
    } : p));

    showToast('Your review and rating have been submitted.');
    return { success: true, message: 'Review submitted.' };
  };

  const toggleReviewApproval = (reviewId: number) => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, isApproved: !r.isApproved } : r));
    showToast('Review status updated.');
  };

  const deleteReview = (reviewId: number) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
    showToast('Review removed.');
  };

  // ================= ALGORITHM 8: Jewellery Price Calculation =================
  const calculateJewelleryPrice = (
    weightGrams: number, 
    purity: GoldPurity, 
    makingCharges: number, 
    stoneCharges: number
  ) => {
    const rateObj = goldRates.find(r => r.karat === purity);
    const ratePerGram = rateObj ? rateObj.ratePerGram : 75.0;

    // 1. Gold Weight × Gold Rate = Gold Value
    const goldValue = Number((weightGrams * ratePerGram).toFixed(2));
    
    // 2. Gold Value + Making Charges + Stone Charges = Product Cost
    const subtotal = Number((goldValue + makingCharges + stoneCharges).toFixed(2));
    
    // 3. Product Cost + Tax = Final Price (3% luxury jewellery tax)
    const tax = Number((subtotal * 0.03).toFixed(2));
    const finalPrice = Number((subtotal + tax).toFixed(2));

    return {
      goldValue,
      makingCharges,
      stoneCharges,
      subtotal,
      tax,
      finalPrice
    };
  };

  const updateGoldRate = (karat: GoldPurity, newRate: number) => {
    setGoldRates(goldRates.map(r => r.karat === karat ? {
      ...r,
      ratePerGram: newRate,
      lastUpdated: new Date().toISOString().split('T')[0]
    } : r));
    showToast(`${karat} Gold rate updated to $${newRate}/gram.`);
  };

  // ================= ADMIN PRODUCT & CATEGORY CRUD =================
  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const id = Math.max(...products.map(p => p.id), 0) + 1;
    const item: Product = {
      ...newProd,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([item, ...products]);
    showToast(`Product "${item.name}" added successfully.`);
  };

  const updateProduct = (id: number, updated: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Product deleted.');
  };

  const addCategory = (newCat: Omit<Category, 'id'>) => {
    const id = Math.max(...categories.map(c => c.id), 0) + 1;
    setCategories([...categories, { ...newCat, id, itemCount: 0 }]);
    showToast(`Category "${newCat.name}" created.`);
  };

  const updateCategory = (id: number, updated: Partial<Category>) => {
    setCategories(categories.map(c => c.id === id ? { ...c, ...updated } : c));
    showToast('Category updated.');
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
    showToast('Category deleted.');
  };

  const addCoupon = (newC: Omit<Coupon, 'id'>) => {
    const id = Math.max(...coupons.map(c => c.id), 0) + 1;
    setCoupons([...coupons, { ...newC, id }]);
    showToast(`Coupon "${newC.code}" created.`);
  };

  const toggleCouponStatus = (id: number) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
    showToast('Coupon status toggled.');
  };

  // ================= USER & AUTH =================
  const login = (email: string, role?: 'Customer' | 'Admin') => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      if (!user.isActive) {
        showToast('Your account has been deactivated. Please contact support.');
        return false;
      }
      setCurrentUser(user);
      showToast(`Welcome back, ${user.fullName}!`);
      return true;
    }
    // Auto-create/demo login
    const newUser: User = {
      id: Date.now(),
      fullName: email.split('@')[0],
      email,
      phone: '+1 (555) 000-0000',
      role: role || (email.includes('admin') ? 'Admin' : 'Customer'),
      isActive: true,
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    showToast(`Welcome, ${newUser.fullName}!`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.');
  };

  const register = (fullName: string, email: string, phone: string) => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: Date.now(),
      fullName,
      email,
      phone,
      role: 'Customer',
      isActive: true,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    showToast(`Welcome to Luxora Jewels, ${fullName}!`);
    return { success: true, message: 'Account created successfully.' };
  };

  const updateUserProfile = (profile: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...profile };
    setCurrentUser(updated);
    setUsers(users.map(u => u.id === currentUser.id ? updated : u));
    showToast('Profile updated successfully.');
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
    showToast('Customer account status updated.');
  };

  // ================= CONTACT MESSAGES =================
  const submitContactMessage = (name: string, email: string, phone: string, subject: string, message: string) => {
    const newMsg: ContactMessage = {
      id: Date.now(),
      name,
      email,
      phone,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      isRead: false
    };
    setContactMessages([newMsg, ...contactMessages]);
    showToast('Your message has been sent to our concierge.');
  };

  const markMessageRead = (id: number) => {
    setContactMessages(contactMessages.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  // ================= ALGORITHMS 1, 2, 3: Search, Filter, Sort =================
  const resetFilters = () => setFilterState(DEFAULT_FILTER_STATE);

  const filteredProducts = products.filter(product => {
    // Status check
    if (product.status !== 'Active') return false;

    // Algorithm 1: Search (Name, Category, Material, Brand, Stone)
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchMaterial = product.material.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchStone = product.stoneType.toLowerCase().includes(q);

      if (!matchName && !matchCategory && !matchMaterial && !matchBrand && !matchStone) {
        return false;
      }
    }

    // Algorithm 2: Multi-Faceted Filters
    if (filterState.category !== 'All' && product.category !== filterState.category) {
      return false;
    }
    if (filterState.material !== 'All' && product.material !== filterState.material) {
      return false;
    }
    if (filterState.purity !== 'All' && product.purity !== filterState.purity) {
      return false;
    }
    if (filterState.gender !== 'All' && product.gender !== filterState.gender) {
      return false;
    }
    if (filterState.stoneType !== 'All' && !product.stoneType.toLowerCase().includes(filterState.stoneType.toLowerCase())) {
      return false;
    }
    if (filterState.minPrice > 0 && product.finalPrice < filterState.minPrice) {
      return false;
    }
    if (filterState.maxPrice < 10000 && product.finalPrice > filterState.maxPrice) {
      return false;
    }
    if (filterState.availability === 'inStock' && product.stock <= 0) {
      return false;
    }
    if (filterState.availability === 'outOfStock' && product.stock > 0) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    // Algorithm 3: Sorting
    switch (filterState.sortBy) {
      case 'priceAsc':
        return a.finalPrice - b.finalPrice;
      case 'priceDesc':
        return b.finalPrice - a.finalPrice;
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      moveToCartFromWishlist,
      isInWishlist,
      cartSubtotal,
      cartDiscount,
      cartTax,
      cartShipping,
      cartFinalTotal,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      orders,
      placeOrder,
      cancelOrder,
      updateOrderStatus,
      reviews,
      addReview,
      toggleReviewApproval,
      deleteReview,
      goldRates,
      updateGoldRate,
      calculateJewelleryPrice,
      coupons,
      addCoupon,
      toggleCouponStatus,
      currentUser,
      users,
      login,
      logout,
      register,
      updateUserProfile,
      toggleUserStatus,
      contactMessages,
      submitContactMessage,
      markMessageRead,
      filterState,
      setFilterState,
      resetFilters,
      filteredProducts,
      activeModal,
      setActiveModal,
      selectedProduct,
      setSelectedProduct,
      activeView,
      setActiveView,
      toastMessage,
      showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
