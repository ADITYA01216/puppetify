import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Mail, User, MessageSquare, AlertCircle, Loader2, Layers, ArrowRight } from 'lucide-react';
import { getIdempotencyKey, clearIdempotencyKey } from '../utils/auth';
import { useAuth } from '../context/AuthContext';

export default function ContactSection() {
  const { userEmail, fullName } = useAuth();

  const [formData, setFormData] = useState({
    name: fullName || '',
    email: userEmail || '',
    category: 'Custom Workflow / Other',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormTouch = () => {
    getIdempotencyKey('contact_form_idempotency_key');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your automation requirements or message.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const idempotencyKey = getIdempotencyKey('contact_form_idempotency_key');

    try {
      const response = await fetch('https://puppet.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          category: formData.category,
          message: formData.message.trim(),
          idempotencyKey,
        }),
      });

      if (response.ok || response.status === 200 || response.status === 201 || response.status === 409) {
        clearIdempotencyKey('contact_form_idempotency_key');
        setStatus('success');
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Unable to deliver message right now. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (err.message && err.message.includes('already')) {
        clearIdempotencyKey('contact_form_idempotency_key');
        setStatus('success');
        return;
      }
      setErrorMessage(err.message || 'Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-24" style={{ backgroundColor: 'var(--bg-deep)' }}>
      <div className="gold-divider" />

      <div className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C842]" />
            <span>Direct Automation Inquiry</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Connect Your <span className="gold-text">Puppet Strings</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300">
            Have a custom workflow or business automation in mind? Send us your message directly and our automation engineers will build your custom string pipeline.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden" style={{ border: '1px solid rgba(245,200,66,0.25)', backgroundColor: 'var(--bg-dark)' }}>

          {status === 'success' ? (
            /* Success View */
            <div className="text-center py-12 space-y-6 animate-in fade-in duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-[#10B981] border border-emerald-500/30 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-[#10B981]" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  Message Received!
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been logged into our automation queue.
                </p>
              </div>

              {/* Structured Submission Summary Box */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-950/70 border border-amber-500/20 text-left text-xs space-y-2 font-mono">
                <div className="text-[#F5C842] font-bold text-[11px] uppercase tracking-wider mb-2 border-b border-amber-500/20 pb-1">
                  Submission Summary
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Contact Email:</span>
                  <span className="font-bold text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-amber-300 font-semibold">{formData.category}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Response SLA:</span>
                  <span className="text-emerald-400 font-semibold">Within 24 Hours</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData(prev => ({ ...prev, message: '' }));
                  }}
                  className="btn-gold text-xs px-8 py-3 cursor-pointer"
                >
                  <span>Send Another Message</span>
                  <ArrowRight className="w-4 h-4 text-[#0D0703]" />
                </button>
              </div>
            </div>
          ) : (
            /* Structured Direct Contact Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {/* Full Name & Email Address Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/80 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#F5C842]" />
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onFocus={handleFormTouch}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      handleFormTouch();
                    }}
                    className="w-full px-4 py-3.5 rounded-xl border border-amber-500/20 bg-slate-950/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C842] transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/80 mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#F5C842]" />
                    Work / Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onFocus={handleFormTouch}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      handleFormTouch();
                    }}
                    className="w-full px-4 py-3.5 rounded-xl border border-amber-500/20 bg-slate-950/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C842] transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Service / Industry Category Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/80 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F5C842]" />
                  Automation Category / Industry
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-amber-500/20 bg-slate-950/80 text-sm text-white focus:outline-none focus:border-[#F5C842] transition-all cursor-pointer"
                >
                  <option value="Restaurants & Cafes">Restaurants & Cafes (Table Bookings / WhatsApp)</option>
                  <option value="Gyms & Fitness Studios">Gyms & Fitness Studios (Passes / Reminders)</option>
                  <option value="Bookstores & Retail">Bookstores & Retail (Stock Alerts / Orders)</option>
                  <option value="Software & IT">Software & IT (Build Alerts / Slack Integration)</option>
                  <option value="Finance & Accounting">Finance & Accounting (Invoices / OCR Ledger)</option>
                  <option value="E-Commerce">E-Commerce (Abandoned Cart Recovery)</option>
                  <option value="Custom Workflow / Other">Custom Workflow / Other Business Need</option>
                </select>
              </div>

              {/* Requirements / Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/80 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#F5C842]" />
                  Your Automation Requirements / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your business and what repetitive tasks, software tools, or app integrations you want automated..."
                  value={formData.message}
                  onFocus={handleFormTouch}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    handleFormTouch();
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-amber-500/20 bg-slate-950/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C842] transition-all shadow-inner resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-gold py-4 text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-75"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting Puppet Strings...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Message To Automation Engine</span>
                    <Send className="w-4 h-4 text-[#0D0703]" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400 font-medium">
                ⚡ Direct dispatch to our n8n automation pipeline. No sign-in required.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
