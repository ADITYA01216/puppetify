import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Mail, ShieldCheck, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import './AuthPage.css';

export default function AuthPage({ onAuthenticated }) {
  const { signUp, signIn, resendVerification, currentUser, signOut } = useAuth();
  
  const [mode, setMode] = useState('signup'); // 'signup' | 'signin' | 'verify'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  // Friendly error code mapping
  const mapFirebaseError = (error) => {
    if (!error) return 'An unexpected error occurred. Please try again.';
    const code = error.code || error.message;

    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email address is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment and try again.';
      case 'NOT_VERIFIED':
        return 'Your email address is not verified yet. Please check your inbox.';
      default:
        return error.message || 'Authentication failed. Please try again.';
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await signUp(email, password);
      setMode('verify');
    } catch (err) {
      setErrorMsg(mapFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const user = await signIn(email, password);
      if (user && user.emailVerified) {
        if (onAuthenticated) onAuthenticated(user);
      } else {
        setMode('verify');
      }
    } catch (err) {
      if (err.code === 'NOT_VERIFIED') {
        setMode('verify');
      } else {
        setErrorMsg(mapFirebaseError(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus('');
    try {
      await resendVerification();
      setResendStatus('Verification link re-sent! Please check your inbox.');
    } catch (err) {
      setResendStatus(mapFirebaseError(err));
    }
  };

  const handleCheckVerified = async () => {
    if (currentUser) {
      await currentUser.reload();
      if (currentUser.emailVerified) {
        if (onAuthenticated) onAuthenticated(currentUser);
      } else {
        setErrorMsg('Email not verified yet. Please click the link sent to your email.');
      }
    } else {
      setMode('signin');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        {/* Left Brand Panel */}
        <div className="auth-brand-panel">
          <div>
            <img 
              src="/assets/puppet_logo.png" 
              alt="Puppetify Logo" 
              className="auth-brand-logo"
            />
          </div>

          <div className="auth-brand-content">
            <h2 className="auth-brand-title">
              Crafted <span>Automation</span> Engine.
            </h2>
            <p className="auth-brand-tagline">
              No random signups. Every account is a verified inbox.
            </p>
          </div>

          <div className="auth-brand-footer">
            <span>🛡️ Firebase Auth Protected</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          
          {mode === 'verify' ? (
            /* ── VERIFY EMAIL VIEW ── */
            <div className="auth-verify-card">
              <div className="auth-verify-icon">
                <Mail className="w-8 h-8" />
              </div>

              <div>
                <h3 className="auth-form-title">Check Your Inbox</h3>
                <p className="auth-form-subtitle mt-1">
                  We've sent a verification link to:
                </p>
                <div className="auth-verify-email mt-2">
                  {email || currentUser?.email || 'your email'}
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                Click the verification link in your email, then click the button below to continue to Puppetify.
              </p>

              {resendStatus && (
                <div className="text-xs font-semibold text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  {resendStatus}
                </div>
              )}

              {errorMsg && (
                <div className="auth-error-msg">{errorMsg}</div>
              )}

              <div className="w-full space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleCheckVerified}
                  className="auth-btn-primary"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I've Verified, Continue</span>
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  className="auth-btn-secondary flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend Verification Email</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => { signOut(); setMode('signin'); }}
                className="text-xs text-gray-500 hover:text-gray-800 underline mt-2"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            /* ── SIGN IN / SIGN UP FORM ── */
            <div>
              <div className="auth-form-header">
                <h3 className="auth-form-title">
                  {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                </h3>
                <p className="auth-form-subtitle">
                  {mode === 'signup' 
                    ? 'Register your email to access Puppetify automation' 
                    : 'Sign in to your verified Puppetify account'}
                </p>
              </div>

              <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn} className="auth-form">
                
                <div className="auth-field-group">
                  <label className="auth-label">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                  />
                </div>

                <div className="auth-field-group">
                  <label className="auth-label">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                  />
                </div>

                {errorMsg && (
                  <div className="auth-error-msg">{errorMsg}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-btn-primary mt-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {loading 
                      ? 'Processing...' 
                      : mode === 'signup' ? 'Create Account' : 'Sign In'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="auth-switch-text">
                {mode === 'signup' ? (
                  <>
                    Already have an account?
                    <button
                      type="button"
                      onClick={() => { setMode('signin'); setErrorMsg(''); }}
                      className="auth-switch-link"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Need an account?
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); setErrorMsg(''); }}
                      className="auth-switch-link"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
