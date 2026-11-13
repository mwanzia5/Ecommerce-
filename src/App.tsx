import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchOverlay } from './components/search/SearchOverlay';
import { VideoModal } from './components/video/VideoModal';

// Home Sections
import { HeroSection } from './components/hero/HeroSection';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { ProductShowcase } from './components/home/ProductShowcase';
import { PerformanceSection } from './components/home/PerformanceSection';
import { BrandStorySection } from './components/home/BrandStorySection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { SocialFeedSection } from './components/home/SocialFeedSection';
import { NewsletterSection } from './components/home/NewsletterSection';

// Shopping & Pages
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/shop/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { AccountPage } from './components/pages/AccountPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { FAQPage } from './components/pages/FAQPage';
import { StaticInfoPage } from './components/pages/StaticInfoPage';

const AppContent: React.FC = () => {
  const { activeRoute, selectedProduct, products } = useShop();

  const renderCurrentView = () => {
    // 1. Product Detail Page
    if (activeRoute.startsWith('/product/')) {
      const slug = activeRoute.replace('/product/', '');
      const product = selectedProduct || products.find((p) => p.slug === slug) || products[0];
      return <ProductDetailPage product={product} />;
    }

    // 2. Shop Catalog
    if (activeRoute === '/shop' || activeRoute.startsWith('/shop/')) {
      return <ShopPage />;
    }

    // 3. Checkout
    if (activeRoute === '/checkout') {
      return <CheckoutPage />;
    }

    // 4. Wishlist
    if (activeRoute === '/wishlist') {
      return <WishlistPage />;
    }

    // 5. Account & Orders
    if (activeRoute === '/account') {
      return <AccountPage />;
    }

    // 6. About
    if (activeRoute === '/about') {
      return <AboutPage />;
    }

    // 7. Contact
    if (activeRoute === '/contact') {
      return <ContactPage />;
    }

    // 8. FAQ
    if (activeRoute === '/faq') {
      return <FAQPage />;
    }

    // 9. Static Info Pages
    if (activeRoute === '/shipping') {
      return <StaticInfoPage type="shipping" />;
    }
    if (activeRoute === '/returns') {
      return <StaticInfoPage type="returns" />;
    }
    if (activeRoute === '/privacy') {
      return <StaticInfoPage type="privacy" />;
    }
    if (activeRoute === '/terms') {
      return <StaticInfoPage type="terms" />;
    }

    // Default: Home Page
    return (
      <main>
        <HeroSection />
        <CategoryShowcase />
        <ProductShowcase />
        <PerformanceSection />
        <BrandStorySection />
        <TestimonialsSection />
        <SocialFeedSection />
        <NewsletterSection />
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#121316]">
      <Header />
      <div className="flex-1">
        {renderCurrentView()}
      </div>
      <Footer />

      {/* Global Drawers, Modals & Notifications */}
      <CartDrawer />
      <SearchOverlay />
      <VideoModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
