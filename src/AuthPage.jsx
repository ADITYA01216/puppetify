import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, Loader2, RefreshCw, Lock } from 'lucide-react';
import './AuthPage.css';

export default function AuthPage({ onAuthenticated }) {
  const { signUp, signIn, resendVerification, user, unverifiedEmail } = useAuth();

  const [mode, setMode] = useState('signup'); // 'signup' | 'signin' | 'verify'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  // Map Firebase Auth error codes to user-friendly inline messages
  const getFriendlyErrorMessage = (code, rawMessage) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account with this email address already exists. Try signing in.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/wrong-password':
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      default:
        return rawMessage || 'An unexpected error occurred. Please try again.';
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password);
      setMode('verify');
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      if (onAuthenticated) onAuthenticated();
    } catch (err) {
      if (err.message === 'NOT_VERIFIED') {
        setMode('verify');
      } else {
        setError(getFriendlyErrorMessage(err.code, err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus('');
    try {
      await resendVerification();
      setResendStatus('Verification email sent! Check your inbox.');
    } catch (err) {
      setResendStatus('Verification email dispatched.');
    }
  };

  const handleVerifiedContinue = async () => {
    setLoading(true);
    setError('');
    try {
      await signIn(email || unverifiedEmail, password);
      if (onAuthenticated) onAuthenticated();
    } catch (err) {
      if (err.message === 'NOT_VERIFIED') {
        setError('Email not verified yet. Please check your inbox and click the verification link.');
      } else {
        setError(getFriendlyErrorMessage(err.code, err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const displayEmail = email || unverifiedEmail || 'your email';

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        {/* Left Column: Dark Brand Panel */}
        <div className="auth-brand-panel">
          <div className="auth-brand-header">
            <img 
              src="/assets/puppet_logo.png" 
              alt="Puppetify Logo" 
              className="auth-brand-logo"
            />
          </div>

          <div className="auth-brand-content">
            <h1 className="auth-brand-title">
              Puppetify <span>Studio</span>
            </h1>
            <p className="auth-brand-tagline">
              "No random signups. Every account is a verified inbox."
            </p>
          </div>

          <div className="auth-brand-footer">
            <ShieldCheck className="w-4 h-4 text-[#C9A876]" />
            <span>Protected by Firebase Email Verification</span>
          </div>
        </div>

        {/* Right Column: Form Panel */}
        <div className="auth-form-panel">
          {mode === 'verify' ? (
            /* Verification Screen */
            <div className="verify-screen animate-in fade-in duration-200">
              <div className="verify-icon-wrap">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="verify-title">Verify Your Email Address</h2>
              <p className="verify-desc">
                We sent a verification link to <span className="verify-email-badge">{displayEmail}</span>. 
                Please check your inbox and click the link to activate your account.
              </p>

              {error && <div className="auth-error mb-4">{error}</div>}
              {resendStatus && <div className="resend-msg mb-4">{resendStatus}</div>}

              <div className="verify-actions">
                <button 
                  onClick={handleVerifiedContinue} 
                  disabled={loading}
                  className="auth-button btn-accent"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>I've verified, continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button 
                  onClick={handleResend} 
                  type="button" 
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-[#C9A876]" />
                  <span>Resend verification email</span>
                </button>

                <button
                  onClick={() => { setMode('signin'); setError(''); }}
                  type="button"
                  className="text-xs font-bold text-[#665c52] hover:text-[#1F1912] mt-2 underline"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up Form */
            <div>
              <div className="auth-header">
                <h2 className="auth-heading">
                  {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="auth-subheading">
                  {mode === 'signup' 
                    ? 'Verify your email identity to connect automation pipelines' 
                    : 'Sign in to access your verified Puppetify workspace'}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="auth-tabs">
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(''); }}
                  className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setError(''); }}
                  className={`auth-tab ${mode === 'signin' ? 'active' : ''}`}
                >
                  Sign In
                </button>
              </div>

              <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn} className="auth-form">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                  />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button type="submit" disabled={loading} className="auth-button">
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
