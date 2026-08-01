import React, { useState, useEffect } from 'react';
import { Mail, Lock, KeyRound, CheckCircle2, AlertCircle, Loader2, X, LogOut, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { requestOTP, verifyOTP, isAuthenticated, getUserEmail, clearSessionToken, getIdempotencyKey } from '../utils/auth';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Signed In Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [authed, setAuthed] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setInfoMessage('');
      if (isAuthenticated()) {
        setAuthed(true);
        setCurrentUserEmail(getUserEmail());
        setStep(3);
      } else {
        setAuthed(false);
        setStep(1);
      }
    }
  }, [isOpen]);

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
      setAuthed(true);
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
    clearSessionToken();
    setAuthed(false);
    setCurrentUserEmail('');
    setStep(1);
    setEmail('');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setInfoMessage('Signed out successfully.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-3xl p-6 sm:p-8 relative shadow-2xl transition-all duration-300"
        style={{ 
          backgroundColor: '#FAF6EE', 
          border: '2px solid #D8C3A5',
          boxShadow: '0 25px 50px -12px rgba(43, 31, 21, 0.4)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B4725] hover:bg-[#EBDCC9] transition-all cursor-pointer"
          aria-label="Close Auth Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Top Accent */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0E3CE] border border-[#D8C3A5] text-[11px] font-extrabold text-[#6B4725] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C5E35]" />
            Secure Passkey Authentication
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2B1F15] tracking-tight">
            {step === 3 ? 'Authenticated' : step === 2 ? 'Verify 6-Digit Code' : 'Sign In to Puppetify'}
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4630] font-medium mt-1">
            {step === 3 
              ? 'Your passkey session is active and verified across visits.'
              : step === 2 
              ? `We sent a 6-digit verification code to ${email}`
              : 'Passwordless OTP authentication. Enter your email to receive a code.'}
          </p>
        </div>

        {/* Inline Alerts */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{error}</div>
          </div>
        )}

        {infoMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#8C5E35] shrink-0 mt-0.5" />
            <div className="leading-relaxed">{infoMessage}</div>
          </div>
        )}

        {/* STEP 1: Email Form */}
        {step === 1 && (
          <form onSubmit={handleRequestOTP} className="space-y-5">
            <div>
              <label className="block text-xs font-extrabold text-[#2B1F15] uppercase tracking-wider mb-2">
                Business Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#8C5E35] absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-[#D8C3A5] text-[#2B1F15] font-medium placeholder-[#A89885] focus:outline-none focus:border-[#8C5E35] focus:ring-2 focus:ring-[#8C5E35]/20 text-sm transition-all disabled:opacity-60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loading 
                  ? 'bg-[#8C5E35] opacity-75 cursor-not-allowed' 
                  : 'bg-[#1C1209] hover:bg-[#8C5E35] active:scale-98'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Requesting Code...
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
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
                <label className="block text-xs font-extrabold text-[#2B1F15] uppercase tracking-wider">
                  6-Digit OTP Code
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError('');
                  }}
                  className="text-xs font-bold text-[#8C5E35] hover:underline"
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
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-mono font-black rounded-xl bg-white border border-[#D8C3A5] text-[#2B1F15] focus:outline-none focus:border-[#8C5E35] focus:ring-2 focus:ring-[#8C5E35]/30 transition-all disabled:opacity-60"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  loading || otp.join('').length !== 6
                    ? 'bg-[#8C5E35] opacity-60 cursor-not-allowed' 
                    : 'bg-[#1C1209] hover:bg-[#8C5E35] active:scale-98'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying OTP...
                  </>
                ) : (
                  <>
                    <span>Verify & Authenticate</span>
                    <KeyRound className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleRequestOTP}
                className="w-full py-2.5 text-xs font-bold text-[#6B4725] hover:text-[#2B1F15] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
            <div className="p-4 rounded-2xl bg-white border border-[#D8C3A5] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBDCC9] border border-[#8C5E35] flex items-center justify-center text-[#8C5E35] font-extrabold text-sm">
                  {currentUserEmail ? currentUserEmail[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="text-xs text-[#6B4725] font-extrabold uppercase tracking-wider">Signed In Account</div>
                  <div className="text-sm font-bold text-[#2B1F15] break-all">{currentUserEmail || 'Active Session'}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EBDCC9] flex items-center justify-between text-xs text-[#6B4725]">
                <span className="font-semibold">Session Token</span>
                <span className="font-mono text-[10px] bg-[#F0E3CE] px-2 py-0.5 rounded font-bold">Active (localStorage)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-5 rounded-xl bg-[#1C1209] hover:bg-[#8C5E35] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                Continue to Portal
              </button>
              <button
                onClick={handleSignOut}
                className="py-3 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-xs border border-red-200 transition-all flex items-center gap-1.5 cursor-pointer"
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
