import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntegrationsBar from './components/IntegrationsBar';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import ProblemSection from './components/ProblemSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WoodenSectionDivider from './components/WoodenSectionDivider';
import ChatbotWidget from './components/ChatbotWidget';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import AuthPage from './AuthPage';

function MainAppContent() {
  const { user } = useAuth();
  const [showAuthPage, setShowAuthPage] = useState(false);

  const scrollToWorkflows = () => {
    const el = document.getElementById('workflows');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (showAuthPage && !user) {
    return <AuthPage onAuthenticated={() => setShowAuthPage(false)} />;
  }

  return (
    <div className="min-h-screen text-[#1C1917] antialiased">
      {/* Global Account Authentication Modal */}
      <AuthModal />

      {/* Navbar */}
      <Navbar onAction={scrollToWorkflows} onOpenAuthPage={() => setShowAuthPage(true)} />

      {/* Main Single-Page Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <Hero onAction={scrollToWorkflows} />
        
        {/* Animated Integration Logos Bar */}
        <IntegrationsBar />

        <WoodenSectionDivider />

        {/* Live Interactive Workflow Visualizer */}
        <WorkflowVisualizer onAction={scrollToWorkflows} />

        <WoodenSectionDivider />

        {/* The Small Business Reality: Manual vs Autopilot */}
        <ProblemSection onAction={scrollToWorkflows} />

        <WoodenSectionDivider />

        {/* Frequently Asked Questions */}
        <FaqSection onAction={scrollToWorkflows} />

        <WoodenSectionDivider />

        {/* n8n Webhook Contact Form Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onAction={scrollToWorkflows} />

      {/* Floating Chatbot Widget (n8n integration) */}
      <ChatbotWidget />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
