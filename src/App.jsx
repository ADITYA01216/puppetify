import React from 'react';
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
import AuthPage from './AuthPage';

function MainContent() {
  const { currentUser } = useAuth();

  const scrollToWorkflows = () => {
    const el = document.getElementById('workflows');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If no user or email not verified yet, render AuthPage
  if (!currentUser || !currentUser.emailVerified) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen text-[#1C1917] antialiased">
      {/* Navbar */}
      <Navbar onAction={scrollToWorkflows} />

      {/* Main Content */}
      <main className="pt-20">
        <Hero onAction={scrollToWorkflows} />
        <IntegrationsBar />
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
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
