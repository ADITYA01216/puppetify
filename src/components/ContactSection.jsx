import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Sparkles, Mail, User, MessageSquare, AlertCircle, Loader2, Lock, LogIn, ShieldCheck } from 'lucide-react';
import { getIdempotencyKey, clearIdempotencyKey, apiFetch } from '../utils/auth';
import { useAuth } from '../context/AuthContext';

export default function ContactSection({ onOpenAuth }) {
  const { authed: isAuthed, userEmail, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Keep formData.email synchronized with authenticated userEmail
  useEffect(() => {
    if (isAuthed && userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
  }, [isAuthed, userEmail]);

  const handleFormTouch = () => {
    getIdempotencyKey('contact_form_idempotency_key');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthed) {
      setErrorMessage('Your session expired, please sign in again');
      if (onOpenAuth) onOpenAuth();
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const idempotencyKey = getIdempotencyKey('contact_form_idempotency_key');

    try {
      const response = await apiFetch('https://puppet.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: userEmail || formData.email,
          message: formData.message,
          idempotencyKey,
        }),
      });

      if (response.ok || response.status === 200 || response.status === 201 || response.status === 409) {
        clearIdempotencyKey('contact_form_idempotency_key');
        setStatus('success');
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Server error. Please try submitting again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (err.message && (err.message.includes('expired') || err.message.includes('Unauthorized') || err.message.includes('sign in'))) {
        logout();
        setErrorMessage('Your session expired, please sign in again');
        setStatus('idle');
        return;
      }
      if (err.message && err.message.includes('already')) {
        clearIdempotencyKey('contact_form_idempotency_key');
        setStatus('success');
        return;
      }
      setErrorMessage(err.message || 'Unable to process submission. Please check your network and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-deep)' }}>
      <div className="gold-divider" />

      <div className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Connect Your <span className="gold-text">Puppet Strings</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300">
            Have a custom workflow in mind? Send us a message and our automation engineers will build your custom string pipeline.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>

          {!isAuthed ? (
            /* Unauthenticated Sign-In Prompt */
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-[#F5C842]">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  Sign In Required
                </h3>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  Sign in to submit your automation request.
                </p>
              </div>

              {errorMessage && (
                <div className="max-w-md mx-auto p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="btn-gold text-sm px-8 py-3.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          ) : status === 'success' ? (
            /* Success View */
            <div className="text-center py-12 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-[#10B981] border border-emerald-500/30 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Message Dispatched!
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto font-medium">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been sent to our n8n automation pipeline. We will reply to <span className="text-[#F5C842] font-mono font-bold">{formData.email}</span> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData(prev => ({ ...prev, name: '', message: '' }));
                }}
                className="btn-gold text-xs px-6 py-2.5 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* Authenticated Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {/* Full Name & Read-Only Email grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/80 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#F5C842]" />
                    Your Name *
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
                    className="w-full px-4 py-3 rounded-xl border border-amber-500/20 bg-slate-950/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C842] transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/80 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#F5C842]" />
                      Email Address *
                    </span>
                    <span className="text-[10px] text-[#F5C842] font-bold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      <ShieldCheck className="w-3 h-3" /> Verified Account
                    </span>
                  </label>
                  <input
                    type="email"
                    required
                    readOnly
                    value={formData.email}
                    className="w-full px-4 py-3 rounded-xl border border-amber-500/20 bg-slate-900/40 text-sm text-amber-200 font-bold cursor-not-allowed shadow-inner focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/80 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#F5C842]" />
                  Your Automation Requirements / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your business and what repetitive tasks or app integrations you want automated..."
                  value={formData.message}
                  onFocus={handleFormTouch}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    handleFormTouch();
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-amber-500/20 bg-slate-950/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F5C842] transition-all shadow-inner resize-none"
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
                    <span>Submit To Automation Engine</span>
                    <Send className="w-4 h-4 text-[#0D0703]" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
