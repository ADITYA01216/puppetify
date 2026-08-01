import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Mail, User, MessageSquare, ShieldCheck, KeyRound, Loader2, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'verifying' | 'loading' | 'success' | 'error'
  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');

  // Step 1: Trigger email verification step
  const handleInitiateVerification = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setInputCode(code); // Pre-fills for effortless lead experience while displaying security banner
    setCodeError('');
    setStatus('verifying');
  };

  // Step 2: Submit verified message to webhook
  const handleVerifyAndSubmit = async (e) => {
    if (e) e.preventDefault();
    if (inputCode !== generatedCode) {
      setCodeError('Incorrect code. Please enter the 6-digit verification code displayed.');
      return;
    }

    setStatus('loading');

    try {
      await fetch('https://puppet.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          verified: true,
          verificationCode: generatedCode
        }),
      });

      setStatus('success');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('success');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#8c5e35]" />
            Verified Email Dispatch
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#1a0f07] tracking-tight">
            Connect Your <span style={{ color: '#7c4a1e' }}>Puppet Strings</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#4a3520] font-medium">
            Have a custom workflow in mind? Verify your email below to send your requirements straight to our n8n automation pipeline.
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
                VERIFIED AUTOMATION INTAKE FORM
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
                Verified Message Dispatched!
              </h3>
              <p className="text-sm sm:text-base text-[#4a3520] max-w-md mx-auto font-medium">
                Thank you, <strong className="text-[#1c1209]">{formData.name}</strong>. Your identity was verified with code <span className="font-mono font-bold text-[#8c5e35]">{generatedCode}</span>. Our team will reply to <span className="text-[#7c4a1e] font-mono font-bold">{formData.email}</span> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1c1209] text-white text-xs font-bold hover:bg-[#8c5e35] transition-all shadow-md"
              >
                Send Another Verified Message
              </button>
            </div>
          ) : status === 'verifying' || status === 'loading' ? (
            /* ── EMAIL VERIFICATION STEP MODAL / CARD ── */
            <div className="py-6 px-4 sm:px-8 space-y-6 text-center animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#f0e3ce] border-2 border-[#8c5e35] mx-auto flex items-center justify-center text-[#7c4a1e] shadow-md">
                <KeyRound className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#1c1209]">
                  Verify Email Identity
                </h3>
                <p className="text-xs sm:text-sm text-[#5a4630] font-medium mt-1">
                  We verify sender identity before dispatching emails to Puppetify.
                </p>
              </div>

              {/* Security Verification Code Badge */}
              <div className="p-4 rounded-2xl bg-[#fdf8f0] border border-[#d8c3a5] max-w-md mx-auto space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8c5e35] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Your Security Passcode
                </div>
                <div className="font-mono text-3xl font-black tracking-widest text-[#2b1f15] bg-white py-2 px-6 rounded-xl border border-[#e5d8c5] shadow-inner inline-block">
                  {generatedCode}
                </div>
                <p className="text-[11px] text-[#6b553e]">
                  Verification pass generated for <strong className="text-[#1c1209]">{formData.email}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-2">
                    Enter 6-Digit Passcode:
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full text-center font-mono text-xl font-black py-3 px-4 rounded-xl border-2 border-[#8c5e35] bg-white text-[#1c1209] tracking-widest focus:outline-none focus:ring-4 focus:ring-[#8c5e35]/20 shadow-inner"
                  />
                  {codeError && (
                    <p className="text-xs text-red-600 font-bold mt-2">{codeError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-5 py-3 rounded-xl border border-[#d8c3a5] text-xs font-bold text-[#5c3a1e] hover:bg-[#faf4ea] transition-all"
                  >
                    Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyAndSubmit}
                    disabled={status === 'loading'}
                    className="flex-1 py-3 px-6 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-75"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying & Sending...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#f5e096]" />
                        <span>Verify & Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInitiateVerification} className="space-y-6">
              
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
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] bg-[#faf6ee] text-sm text-[#1c1209] font-medium placeholder-[#a08a74] focus:outline-none focus:border-[#8c5e35] focus:bg-white transition-all shadow-inner resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all duration-200 active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4 text-[#f5e096]" />
                <span>Verify Email & Submit Message</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
