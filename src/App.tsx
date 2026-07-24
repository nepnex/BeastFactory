import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SocialBar } from './components/SocialBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { MembershipPage } from './pages/MembershipPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { TrainersPage } from './pages/TrainersPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactPage } from './pages/ContactPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/apply" element={<ApplicationPage />} />
            <Route path="/trainers" element={<TrainersPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <SocialBar />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
