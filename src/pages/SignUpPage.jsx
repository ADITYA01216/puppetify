import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, CheckCircle2, ShieldCheck, MailCheck } from 'lucide-react';

export default function SignUpPage() {
  const { signUp, resendVerificationEmail, authed } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  useEffect(() => {
    if (authed) {
      navigate('/', { replace: true });
    }
  }, [authed, navigate]);

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passwordScore = getPasswordStrength(password);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
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
      await signUp({ email, password, fullName });
      setIsSuccess(true);
    } catch (err) {
      console.error('Sign Up Error:', err);
      if (err.message?.includes('already registered')) {
        setError('This email is already registered. Please sign in instead.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setResendStatus('');
    try {
      await resendVerificationEmail(email);
      setResendStatus(`Verification email re-sent to ${email}`);
    } catch (err) {
      setResendStatus(err.message || 'Failed to resend email.');
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

      <div className="w-full max-w-md relative z-10 animate-fadeIn my-8">
        
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
            Start Free Autopilot
          </h1>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Build and deploy your first AI puppets in 2 minutes
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
            /* Success Verification Instructions Screen */
            <div className="text-center py-4 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-[#F5C842] border border-amber-500/30 mx-auto flex items-center justify-center">
                <MailCheck className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Verify Your Email
              </h2>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed font-medium">
                Please verify your email before signing in.
                <br />
                We dispatched a secure verification link to <strong className="text-white font-mono">{email}</strong>.
              </div>

              {resendStatus && (
                <div className="text-xs font-semibold text-[#F5C842]">
                  {resendStatus}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <Link
                  to="/login"
                  className="w-full btn-gold py-3 text-xs justify-center font-bold"
                >
                  Proceed to Sign In
                </Link>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleResendVerification}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  Didn't receive email? Resend verification
                </button>
              </div>
            </div>
          ) : (
            /* Signup Form */
            <form onSubmit={handleSignUp} className="space-y-4">
              
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{error}</div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-[#F5C842] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Alexander Wright"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-sm transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-[#F5C842] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-sm transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-1.5">
                  Password
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
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-sm transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-1 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${
                        passwordScore <= 1 ? 'w-1/4 bg-red-500' :
                        passwordScore === 2 ? 'w-2/4 bg-amber-500' :
                        passwordScore === 3 ? 'w-3/4 bg-yellow-400' : 'w-full bg-emerald-500'
                      }`} />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">
                      Strength: {
                        passwordScore <= 1 ? 'Weak' :
                        passwordScore === 2 ? 'Fair' :
                        passwordScore === 3 ? 'Good' : 'Strong'
                      }
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-[#F5C842] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-sm transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 text-sm justify-center cursor-pointer disabled:opacity-70 mt-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span>Create Puppetify Account</span>
                    <ArrowRight className="w-4 h-4 text-[#0D0703]" />
                  </>
                )}
              </button>

            </form>
          )}

          {/* Footer Login Link */}
          {!isSuccess && (
            <div className="mt-5 pt-4 border-t border-amber-500/20 text-center text-xs text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#F5C842] hover:underline">
                Sign In
              </Link>
            </div>
          )}

        </div>

        {/* Security Trust Footnote */}
        <div className="mt-6 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F5C842]" />
          <span>Includes 100 Free Automation Credits upon signup</span>
        </div>

      </div>
    </div>
  );
}
