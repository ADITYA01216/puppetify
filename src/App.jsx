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
import AuthPage from './AuthPage';
import { useAuth, AuthProvider } from './AuthContext';

function AppContent() {
  const authState = useAuth();
  const activeUser = authState?.user || authState?.currentUser;
  const [showAuthScreen, setShowAuthScreen] = useState(false);

  const scrollToWorkflows = () => {
    const el = document.getElementById('workflows');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Render AuthPage view
  if (showAuthScreen || (!activeUser && window.location.search.includes('auth'))) {
    return <AuthPage onAuthenticated={() => setShowAuthScreen(false)} />;
  }

  return (
    <div className="min-h-screen text-[#1C1917] antialiased">
      
      {/* Top Identity Banner */}
      {!activeUser && (
        <div className="bg-[#1F1912] text-[#F5F1E7] px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 border-b border-[#C9A876]/30">
          <span>🔒 Identity Verification Active: Every account is a verified inbox.</span>
          <button 
            onClick={() => setShowAuthScreen(true)} 
            className="underline font-extrabold text-[#C9A876] hover:text-white transition-colors"
          >
            Sign In / Create Account
          </button>
        </div>
      )}

      {/* Navbar */}
      <Navbar 
        onAction={scrollToWorkflows}
        onOpenAuth={() => setShowAuthScreen(true)}
      />

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
        <ContactSection onOpenAuth={() => setShowAuthScreen(true)} />
      </main>

      <Footer onAction={scrollToWorkflows} />
      <ChatbotWidget />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
