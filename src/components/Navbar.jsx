import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, ShieldCheck, LogIn } from 'lucide-react';

export default function Navbar({ onAction }) {
  const { user, logout, openAuthModal } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all" style={{ backgroundColor: 'rgba(250,244,234,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(160,120,70,0.2)' }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

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

        {/* Right Authentication & CTA buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#d8c3a5] shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#1c1209] text-[#f5e096] font-bold text-[10px] flex items-center justify-center">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#2b1f15]">{user.name}</span>
                  <span className="text-[9px] text-[#8c6b43] font-mono flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Verified Account
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                title="Log Out"
                className="p-2 rounded-xl border border-[#d8c3a5] bg-white hover:bg-[#faf4ea] text-[#7c4a1e] transition-all shadow-sm"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('signin')}
                className="px-3.5 py-2 text-xs font-bold text-[#2b1a0e] hover:text-[#8c5e35] transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-[#8c5e35]" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 text-xs font-extrabold text-[#1c1209] bg-[#f0e3ce] hover:bg-[#e4d2b7] border border-[#d8c3a5] rounded-xl transition-all shadow-sm"
              >
                Sign Up
              </button>
            </div>
          )}

          <a 
            href="#contact"
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1c1209] hover:bg-[#8c5e35] rounded-xl transition-all shadow-md active:scale-95"
          >
            Contact Us
          </a>
        </div>

      </div>
    </nav>
  );
}
