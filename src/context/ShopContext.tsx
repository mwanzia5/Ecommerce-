import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, Review, ProductCategory } from '../types/ecommerce';
import { PRODUCTS, DEMO_REVIEWS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  activeRoute: string;
  navigateTo: (route: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (category: ProductCategory) => void;
  reviews: { [productId: string]: Review[] };
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  orders: Order[];
  placeOrder: (shippingDetails: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
  }) => Order;
  toast: { message: string; visible: boolean } | null;
  showToast: (message: string) => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  openProductDetail: (product: Product) => void;
  selectedProduct: Product | null;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial friendly demo cart item
    const firstProduct = PRODUCTS[0];
    const firstVariant = firstProduct.variants[1] || firstProduct.variants[0];
    return [
      {
        id: `${firstProduct.id}-${firstVariant.id}`,
        product: firstProduct,
        variant: firstVariant,
        quantity: 1,
      },
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(['tp-shoes-01']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>('/');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  // Initialize demo orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-98421',
      date: 'November 4, 2026',
      status: 'Delivered',
      items: [
        {
          productId: 'tp-shoes-01',
          name: 'TennisPro Court Pro Shoes',
          variantName: 'US 10.5',
          price: 189,
          quantity: 1,
          image: PRODUCTS[3].primaryImage,
        },
        {
          productId: 'tp-acc-01',
          name: 'TennisPro Pro-Tack Overgrip (12-Pack)',
          variantName: 'Court Orange',
          price: 24,
          quantity: 1,
          image: PRODUCTS[0].primaryImage,
        },
      ],
      subtotal: 213,
      shipping: 0,
      tax: 17.04,
      total: 230.04,
      shippingAddress: {
        fullName: 'Alexander Wright',
        street: '742 Clay Court Lane',
        city: 'Indian Wells',
        state: 'CA',
        postalCode: '92210',
        country: 'United States',
      },
      trackingNumber: 'TP-FEDX-8849102941',
    },
  ]);

  // Reviews map
  const [reviews, setReviews] = useState<{ [productId: string]: Review[] }>({
    'tp-racket-01': DEMO_REVIEWS,
  });

  // Handle URL hash or path state on mount and popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.hash ? window.location.hash.replace('#', '') : window.location.pathname;
      if (path && path !== '') {
        if (path.startsWith('/product/')) {
          const slug = path.replace('/product/', '');
          const found = products.find((p) => p.slug === slug);
          if (found) {
            setSelectedProduct(found);
            setActiveRoute(`/product/${slug}`);
            return;
          }
        }
        if (path.startsWith('/shop/')) {
          const cat = path.replace('/shop/', '') as ProductCategory;
          setSelectedCategory(cat);
          setActiveRoute('/shop');
          return;
        }
        setActiveRoute(path);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [products]);

  const navigateTo = (route: string) => {
    setActiveRoute(route);
    window.history.pushState(null, '', `#${route}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    navigateTo(`/product/${product.slug}`);
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const chosenVariant = variant || product.variants[0] || {
      id: 'default',
      name: 'Standard',
      sku: product.id,
      inStock: true,
    };

    const cartItemId = `${product.id}-${chosenVariant.id}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          variant: chosenVariant,
          quantity,
        },
      ];
    });

    showToast(`Added ${product.name} to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Item removed from wishlist' : 'Item saved to wishlist');
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'PRO15' || normalized === 'TENNIS15') {
      setAppliedPromo(normalized);
      setDiscountPercent(15);
      showToast('15% Tour Discount applied!');
      return { success: true, message: '15% Tour Discount applied!' };
    }
    if (normalized === 'FIRSTSERVE' || normalized === 'ACE10') {
      setAppliedPromo(normalized);
      setDiscountPercent(10);
      showToast('10% Welcome Discount applied!');
      return { success: true, message: '10% Welcome Discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try PRO15 or ACE10' };
  };

  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => ({
      ...prev,
      [productId]: [newReview, ...(prev[productId] || [])],
    }));
    showToast('Thank you! Your verified player review has been published.');
  };

  const placeOrder = (shippingDetails: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
  }): Order => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Processing',
      items: cart.map((c) => ({
        productId: c.product.id,
        name: c.product.name,
        variantName: c.variant.name,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.primaryImage,
      })),
      subtotal,
      shipping: shippingFee,
      tax: Number((subtotal * 0.08).toFixed(2)),
      total,
      shippingAddress: {
        fullName: shippingDetails.fullName,
        street: shippingDetails.street,
        city: shippingDetails.city,
        state: shippingDetails.state,
        postalCode: shippingDetails.postalCode,
        country: shippingDetails.country,
      },
      trackingNumber: `TP-FEDX-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Math.max(0, subtotal - discount + shippingFee + tax);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        discount,
        total,
        appliedPromo,
        applyPromoCode,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        activeRoute,
        navigateTo,
        selectedCategory,
        setSelectedCategory,
        reviews,
        addReview,
        orders,
        placeOrder,
        toast,
        showToast,
        isVideoModalOpen,
        setIsVideoModalOpen,
        openProductDetail,
        selectedProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
