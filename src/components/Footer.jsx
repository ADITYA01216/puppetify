import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react';

export default function Footer({ onOpenDemo }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[var(--border-color)] pt-16 pb-12 relative overflow-hidden">
      
      {/* Background String Vector motif */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[var(--string-color)] to-transparent"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3 text-decoration-none">
              <img 
                src="/assets/puppet_logo.png" 
                alt="Puppet Logo" 
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </a>
            
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Puppetify is an automation studio building custom websites and AI-powered workflow automations ("puppets") for small businesses, creators, and teams. We pull the strings behind the scenes so your business runs on autopilot.
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-[var(--text-secondary)] pt-2">
              <a 
                href="https://instagram.com/puppetifyai" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors"
              >
                <svg className="w-4 h-4 text-[var(--primary)] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@puppetifyai</span>
              </a>
              <span className="text-[var(--text-muted)]">•</span>
              <a href="mailto:puppetifyai@gmail.com" className="hover:text-[var(--primary)] transition-colors font-mono text-[11px]">
                puppetifyai@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[var(--text-secondary)]">
              <li><a href="#workflows" className="hover:text-[var(--primary)] transition-colors">Workflows</a></li>
              <li><a href="#problem" className="hover:text-[var(--primary)] transition-colors">Why Puppetify</a></li>
              <li><a href="#faq" className="hover:text-[var(--primary)] transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-[var(--primary)] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Industries We Automate */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Industries We Automate
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[var(--text-secondary)]">
              <li><a href="#workflows" className="hover:text-[var(--primary)] transition-colors">Restaurants & Cafes</a></li>
              <li><a href="#workflows" className="hover:text-[var(--primary)] transition-colors">Gyms & Fitness Studios</a></li>
              <li><a href="#workflows" className="hover:text-[var(--primary)] transition-colors">Bookstores & Retail</a></li>
              <li><a href="#workflows" className="hover:text-[var(--primary)] transition-colors">Software Companies</a></li>
              <li><a href="#workflows" className="hover:text-[var(--primary)] transition-colors">Teachers & Educators</a></li>
              <li><a href="#workflows" className="hover:text-[var(--primary)] transition-colors">Finance & CA Firms</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-medium">
          <div>
            © {new Date().getFullYear()} Puppetify Inc. All rights reserved. Automation as Puppetry.
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)]">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" /> for smart automations
            </span>
            <button 
              onClick={scrollToTop} 
              className="p-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--primary)] text-[var(--text-primary)] transition-colors ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
