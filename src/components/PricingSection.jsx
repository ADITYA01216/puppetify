import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PricingSection({ onOpenAudit }) {
  const [industry, setIndustry] = useState('restaurant');
  const [volume, setVolume] = useState(150);
  const [submitted, setSubmitted] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });

  // ROI Math
  const hoursSavedPerMonth = Math.round((volume / 10) * 1.2);
  const estimatedRevenueLift = Math.round(volume * 18);

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="quote" className="section-padding bg-string-grid relative">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-light)] border border-[var(--border-accent)] text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Simple Low-Friction Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Calculate Your <span className="text-[var(--primary)]">Puppet ROI</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-secondary)]">
            No complicated tiers or hidden fees. Transparent, fixed-price string setup that pays for itself in week 1.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Interactive Calculator (Left 7 Cols) */}
          <div className="lg:col-span-7 puppet-card bg-white p-8 space-y-8 border-2 border-[var(--border-accent)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                    Interactive Savings Calculator
                  </h3>
                  <span className="text-xs text-[var(--text-muted)]">Estimate hours saved & revenue lift</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--primary)] bg-[var(--primary-light)] px-3 py-1 rounded-full">
                Live Estimates
              </span>
            </div>

            {/* Industry Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                1. Select Your Business Vertical:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'restaurant', label: 'Restaurant' },
                  { id: 'cafe', label: 'Cafe' },
                  { id: 'bookstore', label: 'Bookstore' },
                  { id: 'gym', label: 'Gym' },
                ].map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setIndustry(ind.id)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all border ${
                      industry === ind.id 
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                        : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border-[var(--border-color)]'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                <span>2. Weekly Bookings / Customer Inquiries:</span>
                <span className="font-mono text-sm text-[var(--primary)] font-extrabold">{volume} inquiries/wk</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="600" 
                step="10"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-[var(--bg-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
              <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-mono">
                <span>30 / week</span>
                <span>300 / week</span>
                <span>600+ / week</span>
              </div>
            </div>

            {/* Output Calculation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]">
              <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Est. Monthly Time Saved
                </div>
                <div className="font-mono text-3xl font-black text-[var(--primary)]">
                  {hoursSavedPerMonth} Hours
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  Reclaimed for strategic growth
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--primary-light)] border border-[var(--border-accent)] space-y-1">
                <div className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider">
                  Est. Extra Monthly Revenue
                </div>
                <div className="font-mono text-3xl font-black text-[var(--primary)]">
                  +${estimatedRevenueLift.toLocaleString()}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  Via zero missed leads & 5-star reviews
                </div>
              </div>
            </div>

          </div>

          {/* Low-Friction Quote Form (Right 5 Cols) */}
          <div className="lg:col-span-5 puppet-card bg-white p-8 flex flex-col justify-between shadow-lg">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4 my-auto">
                <div className="w-14 h-14 rounded-full bg-[var(--primary-light)] text-[var(--primary)] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                  Quote Request Received!
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  We'll prepare a custom string automation proposal for <strong className="text-[var(--text-primary)]">{quoteForm.businessName || 'your business'}</strong> and email it over within 2 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-xs py-2"
                >
                  Recalculate or Edit Details
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-1">
                    Get a Custom Quote
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    No sales pitch. Just a clear, fixed-price quote based on your calculation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Business Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Bella Bistro / Pulse Gym"
                      value={quoteForm.businessName}
                      onChange={(e) => setQuoteForm({...quoteForm, businessName: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Your Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="owner@yourbusiness.com"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 019-2834"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="btn-primary w-full justify-center py-3.5 text-xs mt-2"
                >
                  <span>Send Me My Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)] font-medium pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>100% Free • No Credit Card Required</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
