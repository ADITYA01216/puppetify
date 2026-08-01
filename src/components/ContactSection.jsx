import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Mail, User, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getIdempotencyKey, clearIdempotencyKey, apiFetch } from '../utils/auth';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormTouch = () => {
    getIdempotencyKey('contact_form_idempotency_key');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const idempotencyKey = getIdempotencyKey('contact_form_idempotency_key');

    try {
      const response = await apiFetch('https://puppet.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          idempotencyKey,
        }),
      });

      if (response.ok || response.status === 200 || response.status === 201 || response.status === 409) {
        clearIdempotencyKey('contact_form_idempotency_key');
        setStatus('success');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Server error. Please try submitting again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
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
    <section id="contact" className="py-20 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/assets/wood_bg.png')" }}>
      
      {/* Cinematic Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 245, 225, 0.45) 0%, rgba(230, 200, 160, 0.2) 60%, rgba(43, 26, 14, 0.35) 100%)'
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(250,244,234,0.92)] border border-[rgba(180,140,90,0.4)] text-xs font-bold text-[#2b1a0e] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8c5e35]" />
            Direct Marionette Dispatch
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#1a0f07] tracking-tight">
            Connect Your <span style={{ color: '#7c4a1e' }}>Puppet Strings</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#4a3520] font-medium">
            Have a custom workflow in mind? Send us a message and our automation engineers will build your custom string pipeline.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="bg-[rgba(255,253,249,0.96)] backdrop-blur-md border-2 border-[#8c5e35] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Top Decorative Brass Knot Pegs */}
          <div className="flex items-center justify-between border-b border-[#e6ddd0] pb-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#f5e096] via-[#c89b3c] to-[#5c3a1e] border border-[#2b190c] shadow-sm relative">
                <div className="w-1 h-1 rounded-full bg-[#2b190c] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-[#7c4a1e] uppercase">
                AUTOMATION INTAKE FORM
              </span>
            </div>
            
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#f5e096] via-[#c89b3c] to-[#5c3a1e] border border-[#2b190c] shadow-sm relative">
              <div className="w-1 h-1 rounded-full bg-[#2b190c] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {status === 'success' ? (
            <div className="text-center py-12 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#f0e3ce] text-[#8c5e35] border-2 border-[#8c5e35] mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#7c4a1e]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1c1209]">
                Message Dispatched!
              </h3>
              <p className="text-sm sm:text-base text-[#4a3520] max-w-md mx-auto font-medium">
                Thank you, <strong className="text-[#1c1209]">{formData.name}</strong>. Your inquiry has been sent to our n8n automation pipeline. We will reply to <span className="text-[#7c4a1e] font-mono font-bold">{formData.email}</span> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1c1209] text-white text-xs font-bold hover:bg-[#8c5e35] transition-all shadow-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {/* Full Name & Email grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8c5e35]" />
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
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] bg-[#faf6ee] text-sm text-[#1c1209] font-medium placeholder-[#a08a74] focus:outline-none focus:border-[#8c5e35] focus:bg-white transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8c5e35]" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@yourbusiness.com"
                    value={formData.email}
                    onFocus={handleFormTouch}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      handleFormTouch();
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] bg-[#faf6ee] text-sm text-[#1c1209] font-medium placeholder-[#a08a74] focus:outline-none focus:border-[#8c5e35] focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8c5e35]" />
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] bg-[#faf6ee] text-sm text-[#1c1209] font-medium placeholder-[#a08a74] focus:outline-none focus:border-[#8c5e35] focus:bg-white transition-all shadow-inner resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-75"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting Puppet Strings...</span>
                  </>
                ) : (
                  <>
                    <span>Submit To Automation Engine</span>
                    <Send className="w-4 h-4" />
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
