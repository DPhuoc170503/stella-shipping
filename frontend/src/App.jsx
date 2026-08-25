import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FFotter from './components/FFotter';
import AdminLayout from './components/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { ArticlesProvider } from './context/ArticlesContext';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

import ChatWidget from './components/ChatWidget';

/* ── Lazy-loaded pages (code splitting) ── */
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const News = lazy(() => import('./pages/News'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const ShippingLines = lazy(() => import('./pages/ShippingLines'));
const ScheduledFlights = lazy(() => import('./pages/ScheduledFlights'));
const Intermodal = lazy(() => import('./pages/Intermodal'));
const LogisticsService = lazy(() => import('./pages/LogisticsService'));
const Dedicated = lazy(() => import('./pages/Dedicated'));
const Charters = lazy(() => import('./pages/Charters'));
const TrackTrace = lazy(() => import('./pages/TrackTrace'));
const FindYourLocalOffices = lazy(() => import('./pages/Findyourlocaloffices'));
const Policies = lazy(() => import('./pages/Policies'));
const NotFound = lazy(() => import('./pages/NotFound'));

/* Admin pages */
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminNews = lazy(() => import('./pages/AdminNews'));
const AdminPricing = lazy(() => import('./pages/AdminPricing'));
const AdminQuotes = lazy(() => import('./pages/AdminQuotes'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));
const AdminMedia = lazy(() => import('./pages/AdminMedia'));
const AdminStats = lazy(() => import('./pages/AdminStats'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminCategories = lazy(() => import('./pages/AdminCategories'));

/* ── Loading spinner ── */
const spinnerCSS = `
  .page-loader{display:flex;align-items:center;justify-content:center;min-height:60vh;flex-direction:column;gap:16px}
  .page-spinner{width:40px;height:40px;border:4px solid #e8edf3;border-top-color:#f36c1f;border-radius:50%;animation:page-spin .8s linear infinite}
  @keyframes page-spin{to{transform:rotate(360deg)}}
  .page-loader-text{font-size:14px;color:#8a9ab5;font-family:'Inter',sans-serif}
`;
function PageLoader() {
  return (
    <>
      <style>{spinnerCSS}</style>
      <div className="page-loader">
        <div className="page-spinner" />
        <span className="page-loader-text">Đang tải...</span>
      </div>
    </>
  );
}

/* ── Public layout (Navbar + Footer) ── */
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: '24px' }}>
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <FFotter />
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <ArticlesProvider>
            <ScrollToTop />
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
            <Route path="/track" element={<PublicLayout><TrackTrace /></PublicLayout>} />
            <Route path="/offices" element={<PublicLayout><FindYourLocalOffices /></PublicLayout>} />
            <Route path="/policies" element={<PublicLayout><Policies /></PublicLayout>} />

            {/* ── Admin login (standalone, no layout) ── */}
            <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />

            {/* ── Admin routes (protected, admin layout) ── */}
            <Route path="/admin/quotes" element={<AdminLayout><Suspense fallback={<PageLoader />}><AdminQuotes /></Suspense></AdminLayout>} />
            <Route path="/admin/news" element={<AdminLayout><Suspense fallback={<PageLoader />}><AdminNews /></Suspense></AdminLayout>} />
            <Route path="/admin/pricing" element={<AdminLayout><Suspense fallback={<PageLoader />}><AdminPricing /></Suspense></AdminLayout>} />
            <Route path="/admin/categories" element={<AdminLayout><Suspense fallback={<PageLoader />}><AdminCategories /></Suspense></AdminLayout>} />
            <Route path="/admin/media" element={<AdminLayout><Suspense fallback={<PageLoader />}><AdminMedia /></Suspense></AdminLayout>} />
            <Route path="/admin/stats" element={<AdminLayout><Suspense fallback={<PageLoader />}><AdminStats /></Suspense></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><Suspense fallback={<PageLoader />}><AdminUsers /></Suspense></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><Suspense fallback={<PageLoader />}><AdminSettings /></Suspense></AdminLayout>} />

            {/* ── 404 catch-all ── */}
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
            </Routes>
          </ArticlesProvider>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
