import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleIcon } from './GoogleAuthModal';
import confetti from 'canvas-confetti';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleGoogleClick = async () => {
    setLoading(true);
    setError('');

    const res = await loginWithGoogle();
    setLoading(false);

    if (res.success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setError(res.error || 'Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#fffdf9] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-[#8c5e35] relative overflow-hidden text-[#1c1209]">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f0e3ce] text-[#7c4a1e] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-full bg-white border border-[#d8c3a5] flex items-center justify-center mx-auto shadow-md">
            <GoogleIcon />
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-[#1c1209] tracking-tight">
              Sign In with Google
            </h3>
            <p className="text-xs text-[#5c3a1e] font-medium mt-1">
              Verify your identity via Google OAuth 2.0 to access <strong className="text-[#1c1209]">Puppetify</strong> services
            </p>
          </div>
        </div>

        {/* Google OAuth Banner */}
        <div className="p-4 rounded-2xl bg-[#faf4ea] border border-[#d8c3a5] space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7c4a1e]">
            <ShieldCheck className="w-4 h-4 text-[#8c5e35]" />
            <span>Why Google OAuth Authentication?</span>
          </div>
          <ul className="text-[11px] text-[#5c3a1e] space-y-1.5 list-disc list-inside font-medium">
            <li>Ensures 100% real email identity protection (no spam/fake emails).</li>
            <li>No passwords to remember — 1-click instant access.</li>
            <li>Protects Puppetify n8n automation pipelines from bot abuse.</li>
          </ul>
        </div>

        {/* Google Sign In CTA Button */}
        <button
          type="button"
          onClick={handleGoogleClick}
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-800 font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-75"
        >
          <GoogleIcon />
          <span>{loading ? 'Connecting to Google...' : 'Continue with Google Account'}</span>
          <ArrowRight className="w-4 h-4 text-gray-500" />
        </button>

        {error && (
          <p className="text-xs text-red-600 font-bold text-center mt-3">{error}</p>
        )}

        <div className="mt-6 pt-4 border-t border-[#e5d8c5] text-center">
          <p className="text-[10px] text-[#8c6b43] font-medium flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-[#8c5e35]" />
            Secured by Firebase Google OAuth 2.0 Infrastructure
          </p>
        </div>

      </div>
    </div>
  );
}
