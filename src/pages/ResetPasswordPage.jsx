import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-check.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await updatePassword(password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2500);
    } catch (err) {
      console.error('Update Password Error:', err);
      setError(err.message || 'Failed to update password. Session may have expired.');
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
            Set New Password
          </h1>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Choose a new secure password for your account
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
          {isSuccess ? (
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Password Updated!
              </h3>
              <p className="text-xs text-slate-300">
                Your password has been successfully updated. Redirecting to login...
              </p>
              <div className="pt-2">
                <Link to="/login" className="btn-gold py-3 text-xs w-full justify-center">
                  Sign In Now
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{error}</div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-[#F5C842] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min 8 characters"
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

              <div>
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-[#F5C842] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-sm transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 text-sm justify-center cursor-pointer disabled:opacity-70 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    <span>Save New Password</span>
                    <ArrowRight className="w-4 h-4 text-[#0D0703]" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
