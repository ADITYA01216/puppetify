import React, { useState, useEffect } from 'react';
import { Mail, KeyRound, CheckCircle2, AlertCircle, Loader2, X, LogOut, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { requestOTP, verifyOTP, getIdempotencyKey } from '../utils/auth';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const { authed, userEmail: authUserEmail, login, logout } = useAuth();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Signed In Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setInfoMessage('');
      if (authed) {
        setCurrentUserEmail(authUserEmail);
        setStep(3);
      } else {
        setStep(1);
      }
    }
  }, [isOpen, authed, authUserEmail]);

  // Touch form handler: ensure idempotencyKey is initialized on first touch
  const handleEmailTouch = () => {
    getIdempotencyKey('otp_request_idempotency_key');
  };

  const handleOtpTouch = () => {
    getIdempotencyKey('otp_verify_idempotency_key');
  };

  // Step 1: Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      const res = await requestOTP(email);
      if (res.alreadySubmitted) {
        setInfoMessage('An OTP was already requested for this email. Please check your inbox.');
      } else {
        setInfoMessage('Verification code sent to your email!');
      }
      setStep(2);
      // Pre-initialize verification idempotency key
      getIdempotencyKey('otp_verify_idempotency_key');
    } catch (err) {
      console.error('Request OTP Error:', err);
      setError(err.message || 'Failed to send OTP code. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  // OTP Input change handler for 6 digits
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    handleOtpTouch();

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance focus to next digit box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Backspace navigation
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Paste handler for 6 digit code
  const handleOtpPaste = (e) => {
    e.preventDefault();
    handleOtpTouch();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      const lastInput = document.getElementById('otp-input-5');
      if (lastInput) lastInput.focus();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      const res = await verifyOTP(email, otpCode);
      if (res.alreadySubmitted) {
        setInfoMessage('Session active (previously submitted request).');
      }
      login(email, res.token);
      setCurrentUserEmail(email);
      setStep(3);
      if (onAuthSuccess) onAuthSuccess(res.token);
    } catch (err) {
      console.error('Verify OTP Error:', err);
      setError(err.message || 'Invalid or expired OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    logout();
    setCurrentUserEmail('');
    setStep(1);
    setEmail('');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setInfoMessage('Signed out successfully.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-3xl p-6 sm:p-8 relative shadow-2xl transition-all duration-300 glass-card"
        style={{ 
          backgroundColor: 'var(--bg-dark)', 
          border: '1px solid rgba(245,200,66,0.25)',
          boxShadow: '0 0 50px rgba(245,200,66,0.15)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-amber-300 hover:bg-amber-500/10 transition-all cursor-pointer"
          aria-label="Close Auth Modal"
        >
          <X className="w-5 h-5" />
        </button>



        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {step === 3 ? 'Authenticated' : step === 2 ? 'Verify 6-Digit Code' : 'Sign In to Puppetify'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            {step === 3 
              ? 'Your passkey session is active and verified across visits.'
              : step === 2 
              ? `We sent a 6-digit verification code to ${email}`
              : 'Passwordless OTP authentication. Enter your email to receive a code.'}
          </p>
        </div>

        {/* Inline Alerts */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{error}</div>
          </div>
        )}

        {infoMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#F5C842] shrink-0 mt-0.5" />
            <div className="leading-relaxed">{infoMessage}</div>
          </div>
        )}

        {/* STEP 1: Email Form */}
        {step === 1 && (
          <form onSubmit={handleRequestOTP} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-2">
                Business Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#F5C842] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleEmailTouch();
                  }}
                  onFocus={handleEmailTouch}
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-sm transition-all disabled:opacity-60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3.5 text-sm cursor-pointer disabled:opacity-75"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Requesting Code...
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4 text-[#0D0703]" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: 6-Digit OTP Form */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider">
                  6-Digit OTP Code
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError('');
                  }}
                  className="text-xs font-bold text-[#F5C842] hover:underline cursor-pointer"
                >
                  Edit email
                </button>
              </div>

              {/* 6 Individual Digit Inputs */}
              <div className="flex items-center justify-between gap-2" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onFocus={handleOtpTouch}
                    disabled={loading}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-mono font-bold rounded-xl bg-slate-950/60 border border-amber-500/30 text-[#F5C842] focus:outline-none focus:border-[#F5C842] transition-all disabled:opacity-60"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full btn-gold py-3.5 text-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying OTP...
                  </>
                ) : (
                  <>
                    <span>Verify & Authenticate</span>
                    <KeyRound className="w-4 h-4 text-[#0D0703]" />
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleRequestOTP}
                className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-[#F5C842] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Resend Code to {email}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Authenticated State */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#F5C842] font-bold text-sm">
                  {currentUserEmail ? currentUserEmail[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="text-xs text-amber-400/80 font-bold uppercase tracking-wider">Signed In Account</div>
                  <div className="text-sm font-bold text-white break-all">{currentUserEmail || 'Active Session'}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">Session Token</span>
                <span className="font-mono text-[10px] bg-amber-500/20 text-[#F5C842] px-2 py-0.5 rounded font-bold">Active (localStorage)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 btn-gold py-3 text-xs cursor-pointer"
              >
                Continue to Portal
              </button>
              <button
                onClick={handleSignOut}
                className="py-3 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold text-xs border border-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
