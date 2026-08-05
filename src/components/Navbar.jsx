import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck, LayoutDashboard, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { authed, fullName, signOut } = useAuth();
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
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isScrolled ? 'rgba(13, 7, 3, 0.94)' : 'rgba(13, 7, 3, 0.85)',
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

        {/* Right Action Buttons */}
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
            <>
              <Link
                to="/login"
                className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-amber-500/30 text-white hover:border-[#F5C842] hover:text-[#F5C842] transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#F5C842]" />
                <span>Login</span>
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-[#0D0703] transition-all shadow-md active:scale-95 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #F5C842 0%, #E8A830 50%, #C9860A 100%)',
                  boxShadow: '0 4px 14px rgba(245, 200, 66, 0.35)',
                }}
              >
                Get Started
              </Link>
            </>
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

      {/* Mobile Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] z-50 bg-[#1A0F07]/98 backdrop-blur-2xl p-6 flex flex-col justify-between animate-fadeIn text-white">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-amber-500/20 pb-2">
              Navigation
            </div>
            
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-bold text-slate-200 hover:text-[#F5C842] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-amber-500/20">
            {authed ? (
              <>
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-semibold flex items-center justify-between">
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
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl border border-amber-500/30 text-white font-bold text-sm text-center block"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full btn-gold py-3 text-sm justify-center font-bold"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
