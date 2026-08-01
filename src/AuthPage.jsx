import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Check } from 'lucide-react';
import './AuthPage.css';

export default function AuthPage({ onAuthenticated }) {
  const { signUp, signIn, resendVerification, user, currentUser } = useAuth();

  const [mode, setMode] = useState('signup'); // 'signin' | 'signup' | 'verify'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Map Firebase error codes to friendly messages
  const formatFirebaseError = (err) => {
    if (!err) return 'An unexpected error occurred. Please try again.';
    const code = err.code || '';
    const message = err.message || '';

    if (code === 'auth/email-already-in-use') {
      return 'An account with this email address already exists. Please sign in instead.';
    }
    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.';
    }
    if (code === 'auth/weak-password') {
      return 'Password should be at least 6 characters long.';
    }
    if (code === 'auth/wrong-password' || code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
      return 'Invalid email or password. Please try again.';
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many unsuccessful attempts. Please wait a moment and try again.';
    }
    if (message === 'NOT_VERIFIED' || code === 'auth/email-not-verified') {
      return 'NOT_VERIFIED';
    }

    return message || 'Authentication failed. Please check your credentials.';
  };

  // Sign Up Flow
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (signUp) {
        await signUp(email, password);
      }
      setPendingEmail(email);
      setMode('verify');
    } catch (err) {
      const friendly = formatFirebaseError(err);
      if (friendly === 'NOT_VERIFIED') {
        setPendingEmail(email);
        setMode('verify');
      } else {
        setErrorMessage(friendly);
      }
    } finally {
      setLoading(false);
    }
  };

  // Sign In Flow
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (signIn) {
        const loggedUser = await signIn(email, password);
        if (onAuthenticated) onAuthenticated(loggedUser);
      }
    } catch (err) {
      const friendly = formatFirebaseError(err);
      if (friendly === 'NOT_VERIFIED' || err.message === 'NOT_VERIFIED' || err.code === 'auth/email-not-verified') {
        setPendingEmail(email);
        setMode('verify');
      } else {
        setErrorMessage(friendly);
      }
    } finally {
      setLoading(false);
    }
  };

  // Resend Verification Email
  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    try {
      if (resendVerification) {
        await resendVerification(pendingEmail || email);
      }
      setResendSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setResendLoading(false);
    }
  };

  // Check verification & continue
  const handleVerifyContinue = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      if (signIn) {
        const loggedUser = await signIn(pendingEmail || email, password);
        if (onAuthenticated) onAuthenticated(loggedUser);
      } else {
        setMode('signin');
      }
    } catch (err) {
      const friendly = formatFirebaseError(err);
      if (friendly === 'NOT_VERIFIED' || err.message === 'NOT_VERIFIED') {
        setErrorMessage("Email is not verified yet. Please click the link sent to your inbox.");
      } else {
        setMode('signin');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        {/* Left Dark Brand Panel */}
        <div className="auth-brand-panel">
          <div className="brand-header">
            <img 
              src="/assets/puppet_logo.png" 
              alt="Puppetify Logo" 
              className="brand-logo-img"
            />
            
            <h1 className="brand-title">
              Master Your <span>Workflows</span>
            </h1>

            <p className="brand-tagline">
              "No random signups. Every account is a verified inbox."
            </p>
          </div>

          <ul className="brand-features">
            <li className="brand-feature-item">
              <ShieldCheck className="brand-feature-icon" />
              <span>Identity-verified automated email intake</span>
            </li>
            <li className="brand-feature-item">
              <Sparkles className="brand-feature-icon" />
              <span>Zero spam, 100% human-verified lead pipeline</span>
            </li>
            <li className="brand-feature-item">
              <Check className="brand-feature-icon" />
              <span>Direct n8n workflow integration & automation</span>
            </li>
          </ul>

          <div className="brand-footer">
            © {new Date().getFullYear()} Puppetify Studio. Secured via Firebase Identity.
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          
          {mode === 'verify' ? (
            /* ── EMAIL VERIFICATION SCREEN ── */
            <div className="verify-screen animate-in fade-in duration-300">
              <div className="verify-icon-wrapper">
                <Mail className="w-9 h-9" />
              </div>

              <h2 className="verify-title">Check Your Inbox</h2>
              
              <p className="verify-description">
                We've sent a verification link to <span className="verify-email-badge">{pendingEmail || email}</span>. Click the link in your email to activate your account.
              </p>

              {resendSuccess && (
                <div className="auth-success-banner mb-4">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Verification link re-sent to your inbox!</span>
                </div>
              )}

              {errorMessage && (
                <div className="auth-error-banner mb-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="verify-actions">
                <button
                  type="button"
                  onClick={handleVerifyContinue}
                  disabled={loading}
                  className="auth-submit-btn"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>I've Verified, Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="resend-btn flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${resendLoading ? 'animate-spin' : ''}`} />
                  <span>Resend Verification Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('signin'); setErrorMessage(''); }}
                  className="back-link-btn"
                >
                  ← Back to Sign In
                </button>
              </div>
            </div>
          ) : (
            /* ── SIGN IN / SIGN UP FORM VIEW ── */
            <div>
              <div className="auth-form-header">
                <h2 className="auth-form-title">
                  {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="auth-form-subtitle">
                  {mode === 'signup' 
                    ? 'Register with your work email to start automating.' 
                    : 'Sign in to access your verified Puppetify workspace.'}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="auth-tabs">
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMessage(''); }}
                  className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setErrorMessage(''); }}
                  className={`auth-tab-btn ${mode === 'signin' ? 'active' : ''}`}
                >
                  Sign In
                </button>
              </div>

              {errorMessage && (
                <div className="auth-error-banner mb-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

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

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-submit-btn"
                >
                  <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
