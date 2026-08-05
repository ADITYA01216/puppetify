import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldCheck, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AccountPage() {
  const { fullName, userEmail, profile, user, updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    setError('');
    setMsg('');
    setLoading(true);

    try {
      await updatePassword(newPassword);
      setMsg('Password updated successfully!');
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A';

  return (
    <div className="space-y-6 text-white animate-fadeIn max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
          Account & Profile
        </h1>
        <p className="text-xs text-slate-300">
          Manage your passkey account details and credentials
        </p>
      </div>

      <div className="p-6 rounded-3xl glass-card border border-amber-500/20 space-y-6">
        
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-amber-500/10">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#F5C842] font-bold text-2xl">
            {fullName ? fullName[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{fullName || 'Puppetify User'}</h2>
            <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-[#F5C842]" />
              <span>{userEmail}</span>
            </div>
            <div className="text-[10px] text-amber-400 font-mono mt-1">
              Member since {createdAt}
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordUpdate} className="pt-4 border-t border-amber-500/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#F5C842]" /> Security Credentials
          </h3>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {msg && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F5C842]" />
              <span>{msg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-amber-300/80 uppercase tracking-wider mb-1">
              Update Password
            </label>
            <input
              type="password"
              placeholder="Enter new password (min 8 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-white font-medium placeholder-slate-500 focus:outline-none focus:border-[#F5C842] text-xs transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !newPassword}
            className="btn-gold py-2.5 px-5 text-xs font-bold justify-center cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Credentials'}
          </button>
        </form>

      </div>
    </div>
  );
}
