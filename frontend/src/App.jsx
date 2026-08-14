import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FFotter from './components/FFotter';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import News from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import ShippingLines from './pages/ShippingLines';
import ScheduledFlights from './pages/ScheduledFlights';
import Intermodal from './pages/Intermodal';
import LogisticsService from './pages/LogisticsService';
import Dedicated from './pages/Dedicated';
import Charters from './pages/Charters';
import AdminLogin from './pages/AdminLogin';
import AdminNews from './pages/AdminNews';
import AdminPricing from './pages/AdminPricing';
import AdminQuotes from './pages/AdminQuotes';
import AdminSettings from './pages/AdminSettings';
import AdminMedia from './pages/AdminMedia';
import AdminStats from './pages/AdminStats';
import { ArticlesProvider } from './context/ArticlesContext';
import { AuthProvider } from './context/AuthContext';

import ChatWidget from './components/ChatWidget';

/* ── Public layout (Navbar + Footer) ── */
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: '24px' }}>{children}</main>
      <FFotter />
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ArticlesProvider>
        <Routes>
          {/* ── Public routes ── */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/services/shipping-lines" element={<PublicLayout><ShippingLines /></PublicLayout>} />
          <Route path="/services/scheduled-flights" element={<PublicLayout><ScheduledFlights /></PublicLayout>} />
          <Route path="/services/intermodal" element={<PublicLayout><Intermodal /></PublicLayout>} />
          <Route path="/services/logistics" element={<PublicLayout><LogisticsService /></PublicLayout>} />
          <Route path="/services/dedicated" element={<PublicLayout><Dedicated /></PublicLayout>} />
          <Route path="/services/charters" element={<PublicLayout><Charters /></PublicLayout>} />
          <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
          <Route path="/news/:id" element={<PublicLayout><ArticleDetail /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* ── Admin login (standalone, no layout) ── */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ── Admin routes (protected, admin layout) ── */}
          <Route path="/admin/quotes" element={<AdminLayout><AdminQuotes /></AdminLayout>} />
          <Route path="/admin/news" element={<AdminLayout><AdminNews /></AdminLayout>} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/admin/categories" element={<AdminLayout><div style={{ padding: 40, textAlign: 'center', color: '#7b8a9a' }}><h2>📂 Quản lý Danh mục</h2><p>Tính năng đang phát triển...</p></div></AdminLayout>} />
          <Route path="/admin/media" element={<AdminLayout><AdminMedia /></AdminLayout>} />
          <Route path="/admin/stats" element={<AdminLayout><AdminStats /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><div style={{ padding: 40, textAlign: 'center', color: '#7b8a9a' }}><h2>👥 Quản lý Người dùng</h2><p>Tính năng đang phát triển...</p></div></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
        </Routes>
      </ArticlesProvider>
    </AuthProvider>
  );
}

