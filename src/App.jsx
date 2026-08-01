import React, { useState, useEffect } from 'react';
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
import AuthModal from './components/AuthModal';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const scrollToWorkflows = () => {
    const el = document.getElementById('workflows');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      setIsAuthModalOpen(true);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  return (
    <div className="min-h-screen text-[#1C1917] antialiased">
      
      {/* Navbar */}
      <Navbar 
        onAction={scrollToWorkflows}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Single-Page Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <Hero 
          onAction={scrollToWorkflows}
        />
        
        {/* Animated Integration Logos Bar */}
        <IntegrationsBar />

        <WoodenSectionDivider />

        {/* Live Interactive Workflow Visualizer */}
        <WorkflowVisualizer 
          onAction={scrollToWorkflows}
        />

        <WoodenSectionDivider />

        {/* The Small Business Reality: Manual vs Autopilot */}
        <ProblemSection 
          onAction={scrollToWorkflows}
        />

        <WoodenSectionDivider />

        {/* Frequently Asked Questions */}
        <FaqSection 
          onAction={scrollToWorkflows}
        />

        <WoodenSectionDivider />

        {/* n8n Webhook Contact Form Section */}
        <ContactSection onOpenAuth={() => setIsAuthModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer 
        onAction={scrollToWorkflows}
      />

      {/* Floating Chatbot Widget (n8n integration) */}
      <ChatbotWidget />

      {/* Passkey OTP Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}
