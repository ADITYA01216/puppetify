import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import ProblemSection from './components/ProblemSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WoodenSectionDivider from './components/WoodenSectionDivider';
import ChatbotWidget from './components/ChatbotWidget';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import PuppetsPage from './pages/PuppetsPage';
import WorkflowBuilderPage from './pages/WorkflowBuilderPage';
import BillingPage from './pages/BillingPage';
import SettingsPage from './pages/SettingsPage';
import ApiKeysPage from './pages/ApiKeysPage';
import AccountPage from './pages/AccountPage';

function LandingPage() {
  const scrollToWorkflows = () => {
    const el = document.getElementById('workflows');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-[#1C1917] antialiased">
      <Navbar />

      <main className="pt-20">
        <Hero onAction={scrollToWorkflows} />
        <WoodenSectionDivider />
        <WorkflowVisualizer onAction={scrollToWorkflows} />
        <WoodenSectionDivider />
        <ProblemSection onAction={scrollToWorkflows} />
        <WoodenSectionDivider />
        <FaqSection onAction={scrollToWorkflows} />
        <WoodenSectionDivider />
        <ContactSection />
      </main>

      <Footer onAction={scrollToWorkflows} />
      <ChatbotWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Dashboard App Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/puppets" element={<PuppetsPage />} />
            <Route path="/workflows" element={<WorkflowBuilderPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/api-keys" element={<ApiKeysPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
