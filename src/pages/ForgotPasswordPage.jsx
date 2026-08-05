import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setIsSent(true);
    } catch (err) {
      console.error('Password Reset Error:', err);
      setError(err.message || 'Failed to dispatch reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-[#F5C842] selection:text-[#0D0703]"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4 hover:scale-105 transition-transform">
            <img 
              src="/assets/puppet_logo.png" 
              alt="Puppetify Logo" 
              className="h-12 w-auto object-contain mx-auto"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Reset Password
          </h1>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Enter your account email to receive reset instructions
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
          {isSent ? (
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 text-[#F5C842] border border-amber-500/30 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Reset Email Dispatched!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We sent a password reset link to <strong className="text-white">{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <div className="pt-2">
                <Link to="/login" className="btn-gold py-3 text-xs w-full justify-center">
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{error}</div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-2">
                  Account Email
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

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 text-sm justify-center cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Link...
                  </>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <KeyRound className="w-4 h-4 text-[#0D0703]" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-amber-500/20 text-center text-xs">
            <Link to="/login" className="font-bold text-[#F5C842] hover:underline">
              ← Back to Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
