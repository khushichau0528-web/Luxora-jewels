import { Category, Product, Coupon, GoldRate, User, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Rings',
    description: 'Solitaire, halo, eternity bands and statement luxury rings crafted in gold and platinum.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  },
  {
    id: 2,
    name: 'Earrings',
    description: 'Diamond studs, delicate drop earrings, chandeliers and gold hoops designed for brilliance.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    itemCount: 6
  },
  {
    id: 3,
    name: 'Necklaces',
    description: 'Heritage chokers, diamond tennis necklaces and handcrafted regal statement collars.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    itemCount: 5
  },
  {
    id: 4,
    name: 'Bracelets',
    description: 'Tennis bracelets, charm cuffs and delicate linked gold chains for effortless charm.',
    image: 'https://images.unsplash.com/photo-1611591475883-2005934ca7b9?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 5,
    name: 'Bangles',
    description: 'Traditional handcrafted 22K gold kadas and diamond-encrusted eternity bangles.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  },
  {
    id: 6,
    name: 'Pendants',
    description: 'Intricate spiritual emblems, floral motifs and solitaire diamond floating charms.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 7,
    name: 'Chains',
    description: 'Classic Cuban links, Figaro, rope and sleek wheat chains in pure 22K and 18K gold.',
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 8,
    name: 'Nose Pins',
    description: 'Delicate floral studs, screw back diamond pins and timeless traditional nose rings.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  },
  {
    id: 9,
    name: 'Anklets',
    description: 'Gleaming gold and sterling silver payals embellished with subtle melodic charms.',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  },
  {
    id: 10,
    name: 'Bridal Jewellery',
    description: 'Opulent wedding sets including bridal necklaces, maang tikka, jhumkas and armlets.',
    image: 'https://images.unsplash.com/photo-1543290954-526cb6870ae8?auto=format&fit=crop&w=800&q=80',
    itemCount: 5
  },
  {
    id: 11,
    name: "Men's Jewellery",
    description: 'Bold signet rings, heavy curb chains, bracelets and masculine diamond cufflinks.',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 12,
    name: 'Kids Jewellery',
    description: 'Lightweight hypoallergenic gold nazariya bracelets, cute animal studs and soft chains.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Eternity Solitaire Diamond Ring',
    description: 'A breathtaking 1.5-carat round brilliant solitaire set in a handcrafted 18K white gold micro-pavé band. Each facet is cut to maximize celestial fire and scintillation.',
    category: 'Rings',
    originalPrice: 2400,
    discountPercentage: 15,
    finalPrice: 2040,
    material: 'Diamond',
    purity: '18K',
    weightGrams: 4.8,
    size: '7 (Adjustable)',
    colour: 'White Gold & F-VVS1 Diamond',
    stoneType: 'Natural Diamond',
    brand: 'Luxora Atelier',
    stock: 9,
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Best Seller', 'Featured'],
    gender: 'Women',
    makingCharges: 180,
    stoneCharges: 950,
    status: 'Active',
    createdAt: '2026-01-15'
  },
  {
    id: 2,
    name: 'Imperial Heritage 22K Gold Necklace',
    description: 'A regal temple-inspired necklace woven in solid 22K yellow gold with antique filigree work and suspended dangling gold droplets. Designed for prestigious wedding ceremonies.',
    category: 'Necklaces',
    originalPrice: 4800,
    discountPercentage: 10,
    finalPrice: 4320,
    material: 'Gold',
    purity: '22K',
    weightGrams: 32.5,
    size: '16-18 inches (Extendable)',
    colour: 'Rich Imperial Yellow Gold',
    stoneType: 'Uncut Polki & Emerald accent',
    brand: 'Luxora Heritage',
    stock: 4,
    rating: 5.0,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543290954-526cb6870ae8?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['New Arrival', 'Featured'],
    gender: 'Women',
    makingCharges: 420,
    stoneCharges: 350,
    status: 'Active',
    createdAt: '2026-02-01'
  },
  {
    id: 3,
    name: 'Celestial Diamond Drop Earrings',
    description: 'Chandelier style cascading diamond drops with pear-cut focal gems surrounded by brilliant halo clusters. Finished in pure 18K rose gold with secure push-back closures.',
    category: 'Earrings',
    originalPrice: 1850,
    discountPercentage: 20,
    finalPrice: 1480,
    material: 'Diamond',
    purity: '18K',
    weightGrams: 6.2,
    size: '1.4 inches length',
    colour: 'Rose Gold',
    stoneType: 'VVS Diamond Clusters',
    brand: 'Luxora Atelier',
    stock: 12,
    rating: 4.8,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Trending', 'On Sale'],
    gender: 'Women',
    makingCharges: 160,
    stoneCharges: 700,
    status: 'Active',
    createdAt: '2026-02-10'
  },
  {
    id: 4,
    name: 'Royal Bridal Maharani Set',
    description: 'Magnificent complete bridal celebration set comprising a layered grand choker, matching jhumka earrings, intricate maang tikka, and regal cocktail ring in 22K antique gold.',
    category: 'Bridal Jewellery',
    originalPrice: 8500,
    discountPercentage: 12,
    finalPrice: 7480,
    material: 'Gold',
    purity: '22K',
    weightGrams: 68.0,
    size: 'Complete Bridal Suite',
    colour: 'Antique Gold & Ruby accents',
    stoneType: 'Natural Burmese Rubies & Pearls',
    brand: 'Luxora Heritage',
    stock: 2,
    rating: 5.0,
    reviewCount: 14,
    images: [
      'https://images.unsplash.com/photo-1543290954-526cb6870ae8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Featured', 'Best Seller'],
    gender: 'Women',
    makingCharges: 850,
    stoneCharges: 920,
    status: 'Active',
    createdAt: '2026-01-05'
  },
  {
    id: 5,
    name: 'Diamond Tennis Bracelet in Platinum',
    description: 'An unbroken line of 55 bezel-set lab-certified brilliant diamonds totaling 4.5 carats in solid 950 Platinum. Features a double safety box clasp for ultimate security.',
    category: 'Bracelets',
    originalPrice: 3200,
    discountPercentage: 10,
    finalPrice: 2880,
    material: 'Platinum',
    purity: 'N/A',
    weightGrams: 14.2,
    size: '7 inches',
    colour: 'Lustrous Platinum White',
    stoneType: 'Natural VS1 Diamonds',
    brand: 'Luxora Atelier',
    stock: 6,
    rating: 4.9,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1611591475883-2005934ca7b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Best Seller'],
    gender: 'Women',
    makingCharges: 250,
    stoneCharges: 1400,
    status: 'Active',
    createdAt: '2026-02-14'
  },
  {
    id: 6,
    name: 'Sovereign 22K Solid Gold Bangles (Pair)',
    description: 'A pair of classic, substantial 22-karat gold bangles adorned with hand-carved floral lattice motifs and polished beaded trims. Durable for daily grace or festive panache.',
    category: 'Bangles',
    originalPrice: 3600,
    discountPercentage: 8,
    finalPrice: 3312,
    material: 'Gold',
    purity: '22K',
    weightGrams: 28.0,
    size: '2.6 inches (Standard)',
    colour: 'Deep Golden Lustre',
    stoneType: 'Plain Gold',
    brand: 'Luxora Heritage',
    stock: 5,
    rating: 4.7,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475883-2005934ca7b9?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Trending'],
    gender: 'Women',
    makingCharges: 320,
    stoneCharges: 0,
    status: 'Active',
    createdAt: '2026-02-18'
  },
  {
    id: 7,
    name: 'Lotus Blossom Diamond & Emerald Pendant',
    description: 'An openwork blooming lotus pendant centering a pear-cut Zambian emerald framed by three graduated tiers of sparkling brilliant diamonds on 18K yellow gold.',
    category: 'Pendants',
    originalPrice: 1450,
    discountPercentage: 15,
    finalPrice: 1232,
    material: 'Gold',
    purity: '18K',
    weightGrams: 5.4,
    size: '1.1 inches diameter',
    colour: 'Warm Gold & Emerald Green',
    stoneType: 'Emerald & Natural Diamond',
    brand: 'Luxora Atelier',
    stock: 10,
    rating: 4.8,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['On Sale', 'New Arrival'],
    gender: 'Women',
    makingCharges: 140,
    stoneCharges: 520,
    status: 'Active',
    createdAt: '2026-02-22'
  },
  {
    id: 8,
    name: 'Gentleman’s Signet Ring in 18K Gold',
    description: 'A bold, heavy cushion-faced men signet ring in polished 18K yellow gold with brushed side contours and a subtle bezel-set black onyx gemstone in the center.',
    category: "Men's Jewellery",
    originalPrice: 1650,
    discountPercentage: 10,
    finalPrice: 1485,
    material: 'Gold',
    purity: '18K',
    weightGrams: 11.5,
    size: '10.5 US',
    colour: 'Satin & High Polish Gold',
    stoneType: 'Natural Black Onyx',
    brand: 'Luxora Men',
    stock: 7,
    rating: 4.9,
    reviewCount: 23,
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Best Seller'],
    gender: 'Men',
    makingCharges: 175,
    stoneCharges: 120,
    status: 'Active',
    createdAt: '2026-01-28'
  },
  {
    id: 9,
    name: 'Heavy Miami Cuban Link Gold Chain',
    description: 'Thick, precision-interlocked 22K gold flat curb links with high-polish mirror finish and a dual-latch reinforced safety clasp. Exudes timeless prestige.',
    category: 'Chains',
    originalPrice: 4200,
    discountPercentage: 5,
    finalPrice: 3990,
    material: 'Gold',
    purity: '22K',
    weightGrams: 35.0,
    size: '22 inches / 6mm width',
    colour: 'Deep Pure Gold',
    stoneType: 'Plain Gold',
    brand: 'Luxora Men',
    stock: 3,
    rating: 5.0,
    reviewCount: 45,
    images: [
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Trending', 'Featured'],
    gender: 'Men',
    makingCharges: 390,
    stoneCharges: 0,
    status: 'Active',
    createdAt: '2026-02-05'
  },
  {
    id: 10,
    name: 'Diamond Floral Stud Nose Pin',
    description: 'A delicate seven-stone floral diamond blossom handcrafted in 18K yellow gold with a smooth screw back designed for maximum comfort and zero snagging.',
    category: 'Nose Pins',
    originalPrice: 350,
    discountPercentage: 15,
    finalPrice: 297,
    material: 'Diamond',
    purity: '18K',
    weightGrams: 0.85,
    size: '3.5 mm blossom',
    colour: 'Yellow Gold & Clear Sparkle',
    stoneType: 'Natural Brilliant Diamond',
    brand: 'Luxora Atelier',
    stock: 15,
    rating: 4.8,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['On Sale'],
    gender: 'Women',
    makingCharges: 45,
    stoneCharges: 160,
    status: 'Active',
    createdAt: '2026-02-12'
  },
  {
    id: 11,
    name: 'Filigree Bell Charms Gold Payal (Pair)',
    description: 'Graceful pair of 22K hallmarked gold ankle chains adorned with delicate hand-strung tiny jingling ghungroo bells that chime with rhythmic elegance.',
    category: 'Anklets',
    originalPrice: 1950,
    discountPercentage: 10,
    finalPrice: 1755,
    material: 'Gold',
    purity: '22K',
    weightGrams: 15.2,
    size: '10.5 inches',
    colour: 'Gleaming Gold',
    stoneType: 'Plain Gold & Enamel accents',
    brand: 'Luxora Heritage',
    stock: 8,
    rating: 4.7,
    reviewCount: 11,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['New Arrival'],
    gender: 'Women',
    makingCharges: 180,
    stoneCharges: 0,
    status: 'Active',
    createdAt: '2026-02-25'
  },
  {
    id: 12,
    name: 'Little Prince Gold Nazariya Bracelet',
    description: 'Protective infant bracelet featuring alternating polished 22K gold beads and black onyx evil-eye beads on an expandible silk cord. Tested hypoallergenic.',
    category: 'Kids Jewellery',
    originalPrice: 280,
    discountPercentage: 10,
    finalPrice: 252,
    material: 'Gold',
    purity: '22K',
    weightGrams: 2.1,
    size: '4.5 inches (Extendable)',
    colour: 'Warm Gold & Protective Black',
    stoneType: 'Natural Black Tourmaline Beads',
    brand: 'Luxora Little',
    stock: 14,
    rating: 4.9,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475883-2005934ca7b9?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Best Seller'],
    gender: 'Kids',
    makingCharges: 35,
    stoneCharges: 30,
    status: 'Active',
    createdAt: '2026-02-15'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 1,
    code: 'WELCOME10',
    discountType: 'Percentage',
    discountValue: 10,
    minOrderAmount: 500,
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    id: 2,
    code: 'LUXE20',
    discountType: 'Percentage',
    discountValue: 20,
    minOrderAmount: 2000,
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    id: 3,
    code: 'GOLD500',
    discountType: 'Fixed',
    discountValue: 500,
    minOrderAmount: 3500,
    expiryDate: '2026-12-31',
    isActive: true
  }
];

export const INITIAL_GOLD_RATES: GoldRate[] = [
  { karat: '24K', ratePerGram: 86.5, lastUpdated: '2026-09-04' },
  { karat: '22K', ratePerGram: 79.8, lastUpdated: '2026-09-04' },
  { karat: '18K', ratePerGram: 65.2, lastUpdated: '2026-09-04' },
  { karat: '14K', ratePerGram: 51.0, lastUpdated: '2026-09-04' }
];

export const DEFAULT_USERS: User[] = [
  {
    id: 1,
    fullName: 'Lady Eleanora Vance',
    email: 'customer@luxora.com',
    phone: '+1 (555) 234-5678',
    role: 'Customer',
    isActive: true,
    address: '742 Evergreen Terrace, Penthouse B',
    city: 'Beverly Hills',
    state: 'California',
    pincode: '90210',
    registeredAt: '2026-01-10'
  },
  {
    id: 2,
    fullName: 'Store Administrator',
    email: 'admin@luxora.com',
    phone: '+1 (555) 987-6543',
    role: 'Admin',
    isActive: true,
    address: 'Luxora Headquarters, 5th Avenue',
    city: 'New York',
    state: 'NY',
    pincode: '10001',
    registeredAt: '2025-11-01'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: 'Lady Eleanora Vance',
    rating: 5,
    comment: 'The brilliance of this diamond solitaire in person is beyond compare. The craftsmanship on the micro-pavé band is immaculate. Received endless compliments at our gala!',
    reviewDate: '2026-02-05',
    isApproved: true
  },
  {
    id: 2,
    productId: 2,
    userId: 1,
    userName: 'Lady Eleanora Vance',
    rating: 5,
    comment: 'Truly an heirloom piece. The 22K gold color is rich, warm, and authentic. Packaged in a velvet presentation box with certificate of purity.',
    reviewDate: '2026-02-18',
    isApproved: true
  },
  {
    id: 3,
    productId: 3,
    userId: 1,
    userName: 'Sophia Montgomery',
    rating: 5,
    comment: 'Comfortable to wear all evening, lightweight yet looks lavish. The rose gold compliments warm skin tones beautifully.',
    reviewDate: '2026-02-28',
    isApproved: true
  }
];
