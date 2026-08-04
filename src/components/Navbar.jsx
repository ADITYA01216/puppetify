import React, { useState, useEffect } from 'react';
import { LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAuth }) {
  const { authed, userEmail } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md border-b border-[rgba(160,120,70,0.35)]' : 'border-b border-[rgba(160,120,70,0.2)]'
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(250,244,234,0.98)' : 'rgba(250,244,234,0.95)',
        backdropFilter: isScrolled ? 'blur(18px)' : 'blur(12px)'
      }}
    >
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'h-[74px]' : 'h-20'
      }`}>

        {/* Official Brand Logo */}
        <a href="#" className="flex items-center gap-2 group py-1">
          <img 
            src="/assets/puppet_logo.png" 
            alt="Puppetify Logo" 
            className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#workflows" className="text-[#2b1a0e] font-bold text-sm hover:opacity-70 transition-opacity">
            Workflows
          </a>
          <a href="#problem" className="text-[#2b1a0e] font-bold text-sm hover:opacity-70 transition-opacity">
            Why Puppetify
          </a>
          <a href="#faq" className="text-[#2b1a0e] font-bold text-sm hover:opacity-70 transition-opacity">
            FAQ
          </a>
          <a href="#contact" className="text-[#2b1a0e] font-bold text-sm hover:opacity-70 transition-opacity">
            Contact
          </a>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="px-4 py-2.5 text-sm font-bold text-[#2b1a0e] border border-[#2b1a0e] rounded-xl hover:bg-[rgba(43,26,14,0.07)] transition-all flex items-center gap-2 cursor-pointer"
          >
            {authed ? (
              <>
                <ShieldCheck className="w-4 h-4 text-[#8c5e35]" />
                <span className="max-w-[120px] truncate">{userEmail || 'Account'}</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-[#8c5e35]" />
                <span>Sign In</span>
              </>
            )}
          </button>

          <a 
            href="#contact"
            className="px-5 py-2.5 text-sm font-bold text-white bg-[#1c1209] hover:bg-[#8c5e35] rounded-xl transition-all shadow-md active:scale-95"
          >
            Contact Us
          </a>
        </div>

      </div>
    </nav>
  );
}
