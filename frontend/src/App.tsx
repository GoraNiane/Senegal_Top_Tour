import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { IntroExperience } from './components/IntroExperience';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PwaInstallPrompt } from './components/ui/PwaInstallPrompt';

// Pages
import { Home } from './pages/Home';
import { Excursions } from './pages/Excursions';
import { ExcursionDetail } from './pages/ExcursionDetail';
import { Themes } from './pages/Themes';
import { CookingClass } from './pages/themes/CookingClass';
import { Recyclage } from './pages/themes/Recyclage';
import { Ecoconstruction } from './pages/themes/Ecoconstruction';
import { Solidarity } from './pages/Solidarity';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { Booking } from './pages/Booking';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/Dashboard';

import { DesignSystemShowcase } from './pages/DesignSystemShowcase';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Admin Route Guard
const ProtectedAdminRoute: React.FC = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('stt_admin_token') : null;
  if (!token) {
    return <AdminLogin />;
  }
  return <AdminDashboard />;
};

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Play intro experience on initial site launch / Home start
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Don't show intro on admin or design system routes
    if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/design-system')) {
      return false;
    }
    return true;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#C99A4A]/30 selection:text-[#173C32]">
      <ScrollToTop />

      {/* Cinematic Intro Experience with AnimatePresence */}
      <AnimatePresence mode="wait">
        {showIntro && <IntroExperience onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Global Navigation Bar (hidden on admin pages) */}
      {!isAdminRoute && <Navbar />}

      {/* Main Routed Content */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/excursions" element={<Excursions />} />
            <Route path="/excursions/:slug" element={<ExcursionDetail />} />
            <Route path="/voyages-a-themes" element={<Themes />} />
            <Route path="/voyages-a-themes/cooking-class" element={<CookingClass />} />
            <Route path="/voyages-a-themes/recyclage" element={<Recyclage />} />
            <Route path="/voyages-a-themes/ecoconstruction" element={<Ecoconstruction />} />
            <Route path="/tourisme-solidaire" element={<Solidarity />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/reservation" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/design-system" element={<DesignSystemShowcase />} />

            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedAdminRoute />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedAdminRoute />} />
            <Route path="/admin/excursions" element={<ProtectedAdminRoute />} />
            <Route path="/admin/destinations" element={<ProtectedAdminRoute />} />
            <Route path="/admin/reservations" element={<ProtectedAdminRoute />} />
            <Route path="/admin/gallery" element={<ProtectedAdminRoute />} />
            <Route path="/admin/testimonials" element={<ProtectedAdminRoute />} />
            <Route path="/admin/messages" element={<ProtectedAdminRoute />} />
            <Route path="/admin/newsletter" element={<ProtectedAdminRoute />} />
            <Route path="/admin/themes" element={<ProtectedAdminRoute />} />
            <Route path="/admin/solidaire" element={<ProtectedAdminRoute />} />

            {/* Fallback 404 to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp concierge badge (hidden on admin) */}
      {!isAdminRoute && <WhatsAppButton />}

      {/* PWA Smart Install Prompt */}
      <PwaInstallPrompt />

      {/* Global Footer (hidden on admin) */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
