import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Mail, User, MessageSquare, ShieldCheck, KeyRound, Loader2, ArrowRight, RefreshCw, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Step 1: Send OTP to User's Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setOtpError('');

    // Generate random 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    try {
      // Trigger n8n webhook to deliver real OTP email
      await fetch('https://puppet.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request_otp',
          name: formData.name,
          email: formData.email,
          otp: code,
          message: formData.message
        }),
      });
    } catch (err) {
      console.log('OTP trigger dispatched:', err);
    } finally {
      setLoading(false);
      setStep('otp');
      setTimer(60);
      setCanResend(false);
    }
  };

  // Step 2: Verify OTP entered by User
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (userOtp.trim() !== generatedOtp) {
      setOtpError('Invalid OTP code. Please check your email inbox and enter the 6-digit code.');
      return;
    }

    setLoading(true);
    setOtpError('');

    try {
      // Send final verified submission to n8n
      await fetch('https://puppet.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verified_message',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          emailVerified: true,
          otpCode: generatedOtp
        }),
      });
    } catch (err) {
      console.log('Submission:', err);
    } finally {
      setLoading(false);
      setStep('success');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newCode);
    setUserOtp('');
    setOtpError('');
    setTimer(60);
    setCanResend(false);

    try {
      await fetch('https://puppet.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request_otp',
          name: formData.name,
          email: formData.email,
          otp: newCode,
          message: formData.message
        }),
      });
    } catch (err) {
      console.log('Resend OTP:', err);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/assets/wood_bg.png')" }}>
      
      {/* Vignette Overlay */}
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
            2-Factor OTP Email Verification
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#1a0f07] tracking-tight">
            Connect Your <span style={{ color: '#7c4a1e' }}>Puppet Strings</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#4a3520] font-medium">
            Enter your details below. We'll send a 6-digit OTP code to your email inbox to verify your email before sending your message.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[rgba(255,253,249,0.96)] backdrop-blur-md border-2 border-[#8c5e35] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Top Brass Knot Pegs */}
          <div className="flex items-center justify-between border-b border-[#e6ddd0] pb-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#f5e096] via-[#c89b3c] to-[#5c3a1e] border border-[#2b190c] shadow-sm relative">
                <div className="w-1 h-1 rounded-full bg-[#2b190c] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-[#7c4a1e] uppercase">
                {step === 'otp' ? 'STEP 2: ENTER 6-DIGIT EMAIL OTP' : 'STEP 1: INTAKE & OTP VERIFICATION'}
              </span>
            </div>
            
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#f5e096] via-[#c89b3c] to-[#5c3a1e] border border-[#2b190c] shadow-sm relative">
              <div className="w-1 h-1 rounded-full bg-[#2b190c] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {step === 'success' ? (
            <div className="text-center py-12 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#f0e3ce] text-[#8c5e35] border-2 border-[#8c5e35] mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#7c4a1e]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1c1209]">
                Email Verified & Message Sent!
              </h3>
              <p className="text-sm sm:text-base text-[#4a3520] max-w-md mx-auto font-medium">
                Thank you, <strong className="text-[#1c1209]">{formData.name}</strong>. Your email (<span className="text-[#7c4a1e] font-mono font-bold">{formData.email}</span>) was verified via OTP. We will reply within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStep('input');
                  setFormData({ name: '', email: '', message: '' });
                  setUserOtp('');
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1c1209] text-white text-xs font-bold hover:bg-[#8c5e35] transition-all shadow-md"
              >
                Send Another Message
              </button>
            </div>
          ) : step === 'otp' ? (
            /* ── STEP 2: 6-DIGIT OTP INPUT VIEW ── */
            <form onSubmit={handleVerifyOtp} className="py-6 px-4 sm:px-8 space-y-6 text-center animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#f0e3ce] border-2 border-[#8c5e35] mx-auto flex items-center justify-center text-[#7c4a1e] shadow-md">
                <KeyRound className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#1c1209]">
                  Check Your Email Inbox
                </h3>
                <p className="text-xs sm:text-sm text-[#5a4630] font-medium mt-1">
                  We sent a 6-digit OTP verification code to <strong className="text-[#1c1209] font-mono">{formData.email}</strong>
                </p>
              </div>

              {/* OTP Entry Field */}
              <div className="max-w-xs mx-auto space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e]">
                  Enter 6-Digit OTP Code:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="000000"
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center font-mono text-3xl font-black py-3 px-4 rounded-2xl border-2 border-[#8c5e35] bg-white text-[#1c1209] tracking-[0.3em] focus:outline-none focus:ring-4 focus:ring-[#8c5e35]/20 shadow-inner"
                />

                {otpError && (
                  <p className="text-xs text-red-600 font-bold">{otpError}</p>
                )}

                {/* Resend OTP Timer */}
                <div className="text-[11px] text-[#6b553e] font-medium flex items-center justify-center gap-1.5 pt-1">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#8c5e35] font-bold hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Resend OTP Code
                    </button>
                  ) : (
                    <span>Resend OTP code in <strong className="font-mono">{timer}s</strong></span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 max-w-sm mx-auto pt-2">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="px-5 py-3 rounded-xl border border-[#d8c3a5] text-xs font-bold text-[#5c3a1e] hover:bg-[#faf4ea] transition-all"
                >
                  Change Email
                </button>
                <button
                  type="submit"
                  disabled={loading || userOtp.length !== 6}
                  className="flex-1 py-3 px-6 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying OTP...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#f5e096]" />
                      <span>Verify OTP & Send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* ── STEP 1: EMAIL & MESSAGE INPUT FORM ── */
            <form onSubmit={handleSendOtp} className="space-y-6">
              
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
                    Your Real Email Address *
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
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending 6-Digit OTP to Email...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-[#f5e096]" />
                    <span>Send 6-Digit OTP Code to Email</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#7c4a1e] font-medium">
                🔒 Security Check: We send a 6-digit OTP code to your inbox to verify ownership before sending your message.
              </p>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
