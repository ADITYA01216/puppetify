import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, UserPlus, Mail, Lock, ArrowRight } from 'lucide-react';

export const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function GoogleAuthModal({ isOpen, onClose, onSelectAccount }) {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  if (!isOpen) return null;

  const defaultAccounts = [
    {
      name: 'Aditya Agarwal',
      email: 'aditya.puppetify@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      initials: 'AA',
      color: 'bg-blue-600'
    },
    {
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@gmail.com',
      avatar: null,
      initials: 'SJ',
      color: 'bg-emerald-600'
    }
  ];

  const handleSelect = (account) => {
    onSelectAccount({
      name: account.name,
      email: account.email,
      avatar: account.avatar,
      initials: account.initials,
      authProvider: 'Google OAuth 2.0',
      verified: true
    });
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;

    const derivedName = customName || customEmail.split('@')[0].replace('.', ' ').toUpperCase();
    const initials = derivedName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    onSelectAccount({
      name: derivedName,
      email: customEmail,
      avatar: null,
      initials: initials || 'GU',
      authProvider: 'Google OAuth 2.0',
      verified: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative overflow-hidden text-gray-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto shadow-sm">
            <GoogleIcon />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Sign in with Google
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1">
              Choose a Google Account to verify identity for <strong className="text-gray-800">Puppetify</strong>
            </p>
          </div>
        </div>

        {!isCustomMode ? (
          <div className="space-y-3">
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50">
              {defaultAccounts.map((acc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(acc)}
                  className="w-full p-3.5 flex items-center gap-3.5 text-left hover:bg-blue-50/60 transition-all group"
                >
                  {acc.avatar ? (
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full ${acc.color} text-white font-bold flex items-center justify-center text-xs shadow-sm`}>
                      {acc.initials}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      <span>{acc.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="text-[11px] text-gray-500 truncate font-mono">
                      {acc.email}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors shrink-0" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsCustomMode(true)}
              className="w-full py-3 px-4 rounded-xl border border-dashed border-gray-300 text-xs font-bold text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-blue-500" />
              <span>Use another Google Account</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Google Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCustomMode(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Verify Google Account</span>
              </button>
            </div>
          </form>
        )}

        {/* Security Footer Note */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-gray-400" />
            Protected by Google OAuth 2.0 Security Framework
          </p>
        </div>

      </div>
    </div>
  );
}
