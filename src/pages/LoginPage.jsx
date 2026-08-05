import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { signIn, resendVerificationEmail, authed } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);

  // If user is already authenticated (or after clicking verification link), automatically redirect to home page (/)
  useEffect(() => {
    if (authed) {
      navigate('/', { replace: true });
    }
  }, [authed, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError('');
    setInfoMessage('');
    setUnverifiedEmail(null);
    setLoading(true);

    try {
      await signIn({ email, password });
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login Error:', err);
      const msg = err.message || 'Invalid email or password.';

      if (msg.toLowerCase().includes('email not confirmed') || msg.toLowerCase().includes('verify your email')) {
        setUnverifiedEmail(email);
        setError('Please verify your email before logging in.');
      } else if (msg.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please double-check your credentials.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;
    setLoading(true);
    setError('');
    try {
      await resendVerificationEmail(unverifiedEmail);
      setInfoMessage(`Verification link re-sent to ${unverifiedEmail}. Please check your inbox.`);
    } catch (err) {
      setError(err.message || 'Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-[#F5C842] selection:text-[#0D0703]"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F5C842]/5 rounded-full blur-[140px]" />
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4 hover:scale-105 transition-transform">
            <img 
              src="/assets/puppet_logo.png" 
              alt="Puppetify Logo" 
              className="h-12 w-auto object-contain mx-auto"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome Back
          </h1>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Sign in to access your autonomous digital puppets
          </p>
        </div>

        <div 
          className="rounded-3xl p-6 sm:p-8 glass-card border relative shadow-2xl"
          style={{ 
            backgroundColor: 'var(--bg-dark)', 
            borderColor: 'rgba(245,200,66,0.25)',
            boxShadow: '0 0 50px rgba(245,200,66,0.1)'
          }}
        >
          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed flex-1">
                {error}
                {unverifiedEmail && (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    className="block mt-2 text-xs text-[#F5C842] font-bold underline hover:text-white transition-colors cursor-pointer"
                  >
                    Resend verification email to {unverifiedEmail}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Info Banner */}
          {infoMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5C842] shrink-0 mt-0.5" />
              <div className="leading-relaxed">{infoMessage}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-2">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#F5C842] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-sm transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs font-bold text-[#F5C842] hover:underline cursor-pointer"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#F5C842] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-sm transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3.5 text-sm justify-center cursor-pointer disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#0D0703]" />
                </>
              )}
            </button>
          </form>

          {/* Footer Signup Link */}
          <div className="mt-6 pt-5 border-t border-amber-500/20 text-center text-xs text-slate-300">
            Don't have a Puppetify account yet?{' '}
            <Link to="/signup" className="font-bold text-[#F5C842] hover:underline">
              Create Account
            </Link>
          </div>

        </div>

        {/* Security Trust Footnote */}
        <div className="mt-6 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F5C842]" />
          <span>Encrypted Supabase Passkey Authentication</span>
        </div>

      </div>
    </div>
  );
}
