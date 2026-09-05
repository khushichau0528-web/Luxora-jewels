export type MaterialType = 'Gold' | 'Diamond' | 'Platinum' | 'Silver' | 'Rose Gold' | 'White Gold';

export type GoldPurity = '24K' | '22K' | '18K' | '14K' | 'N/A';

export type GenderType = 'Women' | 'Men' | 'Unisex' | 'Kids';

export type ProductBadge = 'New Arrival' | 'Featured' | 'Best Seller' | 'Trending' | 'On Sale';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  originalPrice: number;
  discountPercentage: number;
  finalPrice: number;
  material: MaterialType;
  purity: GoldPurity;
  weightGrams: number;
  size?: string;
  colour: string;
  stoneType: string;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badges: ProductBadge[];
  gender: GenderType;
  makingCharges: number;
  stoneCharges: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  productId: number;
  addedAt: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Refund Pending';

export type PaymentMethod = 'Cash on Delivery' | 'UPI' | 'Credit/Debit Card' | 'Net Banking';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  userId: number;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  finalAmount: number;
  couponCode?: string;
  shippingAddress: ShippingAddress;
  orderDate: string;
  orderStatus: OrderStatus;
  paymentId: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  cancellationReason?: string;
}

export type UserRole = 'Customer' | 'Admin';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  registeredAt: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  reviewDate: string;
  isApproved: boolean;
}

export interface Coupon {
  id: number;
  code: string;
  discountType: 'Percentage' | 'Fixed';
  discountValue: number;
  minOrderAmount: number;
  expiryDate: string;
  isActive: boolean;
}

export interface GoldRate {
  karat: GoldPurity;
  ratePerGram: number; // in USD or currency units
  lastUpdated: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  material: string;
  purity: string;
  gender: string;
  stoneType: string;
  availability: 'all' | 'inStock' | 'outOfStock';
  sortBy: 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc' | 'newest' | 'rating' | 'popular';
}
