export type ProductCategory = 
  | 'all'
  | 'rackets'
  | 'shoes'
  | 'apparel'
  | 'bags'
  | 'accessories'
  | 'balls';

export type PerformanceFocus = 'power' | 'control' | 'speed' | 'all-around';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Grip 2 (4 1/4\")", "Size 10.5", "Medium"
  sku: string;
  inStock: boolean;
  colorHex?: string;
  colorName?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  playerLevel: string; // e.g. "NTRP 4.5 Player", "Club Tournament Semifinalist"
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  story: string;
  primaryImage: string;
  galleryImages: string[];
  badge?: 'New' | 'Best Seller' | 'Tour Edition' | 'Limited Run';
  rating: number;
  reviewCount: number;
  performanceFocus: PerformanceFocus;
  variants: ProductVariant[];
  variantType: 'grip' | 'size' | 'color' | 'standard';
  specifications: { [key: string]: string };
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id (product id + variant id)
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  trackingNumber: string;
}
