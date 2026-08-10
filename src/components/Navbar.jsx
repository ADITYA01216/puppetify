import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Menu, X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { authed, fullName, userEmail, signOut } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    navigate('/', { replace: true });
  };

  const navLinks = [
    { name: 'Workflows', href: '/#workflows' },
    { name: 'Why Puppetify', href: '/#problem' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isScrolled ? 'rgba(13, 7, 3, 0.96)' : 'rgba(13, 7, 3, 0.90)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245, 200, 66, 0.18)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-[72px]' : 'h-20'
        }`}
      >
        {/* Official Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group py-1">
          <img 
            src="/assets/puppet_logo.png" 
            alt="Puppetify Logo" 
            className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#F7EFE7',
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#F5C842')}
              onMouseLeave={(e) => (e.target.style.color = '#F7EFE7')}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Action Button (Direct Contact CTA / Sign Out) */}
        <div className="hidden sm:flex items-center gap-3">
          {authed ? (
            <>
              <div className="px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm border border-amber-500/30 bg-amber-500/10 text-amber-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F5C842]" />
                <span className="max-w-[140px] truncate">{fullName || userEmail || 'Account'}</span>
              </div>

              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-xl font-bold text-xs sm:text-sm border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <a
              href="/#contact"
              className="px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-[#0D0703] transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #F5C842 0%, #E8A830 50%, #C9860A 100%)',
                boxShadow: '0 4px 14px rgba(245, 200, 66, 0.35)',
              }}
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5 text-[#0D0703]" />
            </a>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-[#F5C842]" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* ── MOBILE FULLSCREEN OPAQUE OVERLAY DRAWER ── */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[200] flex flex-col justify-between p-6 animate-fadeIn text-white overflow-y-auto"
          style={{
            backgroundColor: '#0D0703',
            opacity: 1,
            minHeight: '100vh',
          }}
        >
          {/* Mobile Overlay Header */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img 
                src="/assets/puppet_logo.png" 
                alt="Puppetify Logo" 
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl text-[#F5C842] border border-amber-500/30 bg-amber-500/10 cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6 flex-1 py-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Navigation
            </div>
            
            <div className="space-y-4">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xl font-bold text-slate-100 hover:text-[#F5C842] transition-colors py-2 border-b border-white/5"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-amber-500/20 mt-auto">
            {authed ? (
              <>
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-semibold flex items-center justify-between mb-3">
                  <span>Signed in account</span>
                  <span className="font-bold text-white truncate max-w-[140px]">{fullName || userEmail}</span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full py-3.5 rounded-xl bg-red-500/10 text-red-300 font-bold text-sm border border-red-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <a
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full btn-gold py-4 text-base justify-center font-bold flex items-center gap-2 text-center"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 text-[#0D0703]" />
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
