import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SocialBar } from './components/SocialBar';
import { useAuth } from './hooks/useAuth';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { MembershipPage } from './pages/MembershipPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { TrainersPage } from './pages/TrainersPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactPage } from './pages/ContactPage';
import { BoxingPage } from './pages/public/BoxingPage';
import { SpaPage } from './pages/public/SpaPage';
import { ProductsPage } from './pages/public/ProductsPage';
import { TransformationsPage } from './pages/public/TransformationsPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { FaqPage } from './pages/public/FaqPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminFoundersPage } from './pages/admin/AdminFoundersPage';
import { AdminTrainersPage } from './pages/admin/AdminTrainersPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminBoxingPage } from './pages/admin/AdminBoxingPage';
import { AdminMembershipPlansPage } from './pages/admin/AdminMembershipPlansPage';
import { AdminSpaPage } from './pages/admin/AdminSpaPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminTransformationsPage } from './pages/admin/AdminTransformationsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminFaqPage } from './pages/admin/AdminFaqPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Guard
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

// Public Layout Wrapper
const PublicLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <SocialBar />
      <Footer />
    </div>
  );
};

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 text-center">
    <h1 className="font-heading text-9xl text-[#e8272a]">404</h1>
    <h2 className="font-heading text-4xl text-white mt-2">PAGE NOT FOUND</h2>
    <p className="text-neutral-400 text-sm max-w-md mt-2">The page you are looking for does not exist or has been moved.</p>
    <a href="/" className="mt-6 px-8 py-3 rounded-full bg-[#e8272a] text-white font-heading text-lg">RETURN TO HOMEPAGE</a>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<PublicLayoutWrapper><HomePage /></PublicLayoutWrapper>} />
        <Route path="/about" element={<PublicLayoutWrapper><AboutPage /></PublicLayoutWrapper>} />
        <Route path="/services" element={<PublicLayoutWrapper><ServicesPage /></PublicLayoutWrapper>} />
        <Route path="/boxing" element={<PublicLayoutWrapper><BoxingPage /></PublicLayoutWrapper>} />
        <Route path="/spa" element={<PublicLayoutWrapper><SpaPage /></PublicLayoutWrapper>} />
        <Route path="/membership" element={<PublicLayoutWrapper><MembershipPage /></PublicLayoutWrapper>} />
        <Route path="/products" element={<PublicLayoutWrapper><ProductsPage /></PublicLayoutWrapper>} />
        <Route path="/transformations" element={<PublicLayoutWrapper><TransformationsPage /></PublicLayoutWrapper>} />
        <Route path="/trainers" element={<PublicLayoutWrapper><TrainersPage /></PublicLayoutWrapper>} />
        <Route path="/gallery" element={<PublicLayoutWrapper><GalleryPage /></PublicLayoutWrapper>} />
        <Route path="/faq" element={<PublicLayoutWrapper><FaqPage /></PublicLayoutWrapper>} />
        <Route path="/calculator" element={<PublicLayoutWrapper><CalculatorPage /></PublicLayoutWrapper>} />
        <Route path="/contact" element={<PublicLayoutWrapper><ContactPage /></PublicLayoutWrapper>} />
        <Route path="/apply" element={<PublicLayoutWrapper><ApplicationPage /></PublicLayoutWrapper>} />

        {/* ADMIN AUTH ROUTE */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboardOverview /></ProtectedAdminRoute>} />
        <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/notifications" element={<ProtectedAdminRoute><AdminNotificationsPage /></ProtectedAdminRoute>} />
        
        <Route path="/admin/services" element={<ProtectedAdminRoute><AdminServicesPage /></ProtectedAdminRoute>} />
        <Route path="/admin/trainers" element={<ProtectedAdminRoute><AdminTrainersPage /></ProtectedAdminRoute>} />
        <Route path="/admin/founders" element={<ProtectedAdminRoute><AdminFoundersPage /></ProtectedAdminRoute>} />
        
        <Route path="/admin/memberships" element={<ProtectedAdminRoute><AdminMembershipPlansPage /></ProtectedAdminRoute>} />
        <Route path="/admin/membership-plans" element={<Navigate to="/admin/memberships" replace />} />
        
        <Route path="/admin/boxing" element={<ProtectedAdminRoute><AdminBoxingPage /></ProtectedAdminRoute>} />
        
        <Route path="/admin/spa" element={<ProtectedAdminRoute><AdminSpaPage /></ProtectedAdminRoute>} />
        <Route path="/admin/spa-services" element={<Navigate to="/admin/spa" replace />} />
        
        <Route path="/admin/products" element={<ProtectedAdminRoute><AdminProductsPage /></ProtectedAdminRoute>} />
        <Route path="/admin/transformations" element={<ProtectedAdminRoute><AdminTransformationsPage /></ProtectedAdminRoute>} />
        <Route path="/admin/gallery" element={<ProtectedAdminRoute><AdminGalleryPage /></ProtectedAdminRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedAdminRoute><AdminTestimonialsPage /></ProtectedAdminRoute>} />
        <Route path="/admin/faq" element={<ProtectedAdminRoute><AdminFaqPage /></ProtectedAdminRoute>} />
        
        <Route path="/admin/bookings" element={<ProtectedAdminRoute><AdminBookingsPage /></ProtectedAdminRoute>} />
        
        <Route path="/admin/inquiries" element={<ProtectedAdminRoute><AdminLeadsPage /></ProtectedAdminRoute>} />
        <Route path="/admin/leads" element={<Navigate to="/admin/inquiries" replace />} />
        
        <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettingsPage /></ProtectedAdminRoute>} />

        {/* CATCH-ALL 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
