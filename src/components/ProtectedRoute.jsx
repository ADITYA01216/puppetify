import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { authed, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6 text-white"
        style={{ backgroundColor: 'var(--bg-deep)' }}
      >
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl glass-card border border-amber-500/20 max-w-sm text-center">
          <img 
            src="/assets/puppet_logo.png" 
            alt="Puppetify Logo" 
            className="h-10 w-auto object-contain animate-pulse"
          />
          <Loader2 className="w-8 h-8 text-[#F5C842] animate-spin mt-2" />
          <p className="text-xs font-semibold text-slate-300">
            Verifying Supabase Passkey Session...
          </p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
