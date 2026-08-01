import React from 'react';

export default function Navbar({ onAction }) {
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

        {/* Right buttons */}
        <div className="flex items-center gap-3">
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
