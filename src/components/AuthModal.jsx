import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleIcon } from './GoogleAuthModal';
import confetti from 'canvas-confetti';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    signupWithEmail, 
    signinWithEmail, 
    signinWithGoogle 
  } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    if (authMode === 'signup') {
      if (!formData.name) {
        setError('Please enter your full name.');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      if (authMode === 'signup') {
        await signupWithEmail(formData.email, formData.password, formData.name);
      } else {
        await signinWithEmail(formData.email, formData.password);
      }
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signinWithGoogle();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setError('Google Sign-In failed.');
    } finally {
      setLoading(false);
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
        <div className="text-center space-y-2 mb-6">
          <div className="flex items-center justify-center gap-2">
            <img src="/assets/puppet_logo.png" alt="Puppetify" className="h-10 w-auto object-contain" />
          </div>
          <h3 className="text-2xl font-black text-[#1c1209] tracking-tight">
            {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-[#5c3a1e] font-medium">
            {authMode === 'signup' 
              ? 'Sign up to verify your identity & access automation services'
              : 'Sign in to manage your automated strings & inquiries'}
          </p>
        </div>

        {/* Sign In / Sign Up Tabs */}
        <div className="flex bg-[#faf4ea] p-1 rounded-xl border border-[#d8c3a5] mb-6">
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setError(''); }}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-[#1c1209] text-white shadow-sm'
                : 'text-[#5c3a1e] hover:text-[#1c1209]'
            }`}
          >
            Create Account (Sign Up)
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setError(''); }}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all ${
              authMode === 'signin'
                ? 'bg-[#1c1209] text-white shadow-sm'
                : 'text-[#5c3a1e] hover:text-[#1c1209]'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Google OAuth Quick Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-50 border-2 border-[#d8c3a5] text-gray-800 font-bold text-xs flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all mb-4"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-[#e5d8c5]"></div>
          <span className="px-3 text-[10px] uppercase font-bold text-[#8c6b43]">Or with email</span>
          <div className="flex-1 border-t border-[#e5d8c5]"></div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#8c5e35]" /> Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#d8c3a5] bg-[#faf6ee] text-xs font-medium text-[#1c1209] focus:outline-none focus:border-[#8c5e35] focus:bg-white"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#8c5e35]" /> Work / Business Email *
            </label>
            <input
              type="email"
              required
              placeholder="sarah@yourbusiness.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#d8c3a5] bg-[#faf6ee] text-xs font-medium text-[#1c1209] focus:outline-none focus:border-[#8c5e35] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#8c5e35]" /> Password *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#d8c3a5] bg-[#faf6ee] text-xs font-medium text-[#1c1209] focus:outline-none focus:border-[#8c5e35] focus:bg-white"
            />
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5c3a1e] mb-1 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#8c5e35]" /> Confirm Password *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#d8c3a5] bg-[#faf6ee] text-xs font-medium text-[#1c1209] focus:outline-none focus:border-[#8c5e35] focus:bg-white"
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-red-600 font-bold text-center mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-75"
          >
            <ShieldCheck className="w-4 h-4 text-[#f5e096]" />
            <span>{authMode === 'signup' ? 'Create Account & Verify' : 'Sign In To Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-center text-[#8c6b43] font-medium mt-4">
          🔒 Secure authentication protecting Puppetify automation intake.
        </p>

      </div>
    </div>
  );
}
