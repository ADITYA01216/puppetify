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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(216, 195, 165, 0.5)',
        boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.12)' : '0 2px 10px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-[72px]' : 'h-20'
        }`}
      >
        {/* Official Brand Logo on White Bar */}
        <a href="#" className="flex items-center gap-3 group py-1">
          <img 
            src="/assets/puppet_logo.png" 
            alt="Puppetify Logo" 
            className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* High Contrast Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { name: 'Workflows', href: '#workflows' },
            { name: 'Why Puppetify', href: '#problem' },
            { name: 'FAQ', href: '#faq' },
            { name: 'Contact', href: '#contact' },
          ].map((item) => {
            return (
              <a
                key={item.name}
                href={item.href}
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#2B1F15',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#C49A6C')}
                onMouseLeave={(e) => (e.target.style.color = '#2B1F15')}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-[#2B1F15] text-[#2B1F15] hover:bg-[#2B1F15] hover:text-white transition-all flex items-center gap-2 cursor-pointer"
          >
            {authed ? (
              <>
                <ShieldCheck className="w-4 h-4 text-[#C49A6C]" />
                <span className="max-w-[120px] truncate">{userEmail || 'Account'}</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-[#C49A6C]" />
                <span>Sign In</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-[#0D0703] transition-all shadow-md active:scale-95 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #C49A6C 0%, #E8D7C5 50%, #C49A6C 100%)',
              boxShadow: '0 4px 14px rgba(196, 154, 108, 0.35)',
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
