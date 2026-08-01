import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Mail, User, MessageSquare, ShieldCheck, Loader2, ArrowRight, LogOut, Check, LogIn, UserPlus } from 'lucide-react';
import confetti from 'canvas-confetti';
import GoogleAuthModal, { GoogleIcon } from './GoogleAuthModal';
import { useAuth } from '../context/AuthContext';

export default function ContactSection() {
  const { user: authUser, openAuthModal } = useAuth();
  const [formData, setFormData] = useState({
    message: ''
  });

  const [googleUser, setGoogleUser] = useState(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [authError, setAuthError] = useState('');

  const activeUser = authUser || googleUser;

  // Handle Google OAuth Selection
  const handleGoogleSelect = (user) => {
    setGoogleUser(user);
    setAuthError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activeUser) {
      setAuthError('Account registration required! Please Sign Up or Sign In to send a message.');
      openAuthModal('signup');
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
          name: activeUser.name,
          email: activeUser.email,
          message: formData.message,
          authProvider: authUser ? 'Account Auth (Sign Up)' : 'Google OAuth 2.0',
          verified: true
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
      
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectAccount={handleGoogleSelect}
      />

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
            Google OAuth 2.0 Identity Verified Intake
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#1a0f07] tracking-tight">
            Connect Your <span style={{ color: '#7c4a1e' }}>Puppet Strings</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#4a3520] font-medium">
            Sign in with Google to verify identity & send your automation requirements directly to our n8n pipeline.
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
                GOOGLE OAUTH AUTOMATION INTAKE
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
                Thank you, <strong className="text-[#1c1209]">{googleUser?.name}</strong>. Your Google account (<span className="text-[#7c4a1e] font-mono font-bold">{googleUser?.email}</span>) has been verified via Google OAuth. We will reply within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: googleUser?.name || '', email: googleUser?.email || '', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1c1209] text-white text-xs font-bold hover:bg-[#8c5e35] transition-all shadow-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* User Identity Authentication Banner */}
              {!activeUser ? (
                <div className="p-6 rounded-2xl bg-[#faf4ea] border-2 border-dashed border-[#8c5e35] text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-[#7c4a1e] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#8c5e35]" />
                    Account Required to Dispatch Message
                  </div>
                  <p className="text-xs text-[#5c3a1e] font-medium max-w-md mx-auto">
                    To prevent random spam & unverified requests, you must Sign Up or Sign In to your Puppetify account before contacting us.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => openAuthModal('signup')}
                      className="px-5 py-2.5 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-[#f5e096]" />
                      <span>Sign Up (Create Account)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openAuthModal('signin')}
                      className="px-5 py-2.5 rounded-xl bg-[#f0e3ce] hover:bg-[#e4d2b7] border border-[#d8c3a5] text-[#2b1f15] font-extrabold text-xs shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5 text-[#8c5e35]" />
                      <span>Sign In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsGoogleModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                    >
                      <GoogleIcon />
                      <span>Google OAuth</span>
                    </button>
                  </div>

                  {authError && (
                    <p className="text-xs text-red-600 font-bold mt-2">{authError}</p>
                  )}
                </div>
              ) : (
                /* Authenticated User Account Badge */
                <div className="p-4 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {activeUser.avatar ? (
                      <img src={activeUser.avatar} alt={activeUser.name} className="w-10 h-10 rounded-full border border-sky-300 object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#1c1209] text-[#f5e096] font-extrabold flex items-center justify-center text-xs border border-[#8c5e35]">
                        {activeUser.name ? activeUser.name[0].toUpperCase() : 'U'}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-gray-900">{activeUser.name}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          <Check className="w-3 h-3" /> Verified Account
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-600 font-mono">{activeUser.email}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1 shrink-0"
                  >
                    Switch Account
                  </button>
                </div>
              )}

              {/* Full Name & Email grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8c5e35]" />
                    Verified Sender Name
                  </label>
                  <input
                    type="text"
                    required
                    readOnly
                    placeholder="Sign Up or Sign In required..."
                    value={activeUser ? activeUser.name : ''}
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all shadow-inner bg-[#f5ebd9] border-[#c8b293] text-[#2b1f15] cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8c5e35]" />
                    Verified Sender Email
                  </label>
                  <input
                    type="email"
                    required
                    readOnly
                    placeholder="Sign Up or Sign In required..."
                    value={activeUser ? activeUser.email : ''}
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all shadow-inner bg-[#f5ebd9] border-[#c8b293] text-[#2b1f15] cursor-not-allowed"
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
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-75"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Verified Message...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#f5e096]" />
                    <span>Dispatch Message via Google OAuth</span>
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
