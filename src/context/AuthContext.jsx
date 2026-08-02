import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getSessionToken, 
  setSessionToken, 
  clearSessionToken, 
  getUserEmail, 
  setUserEmail, 
  isAuthenticated 
} from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => isAuthenticated());
  const [userEmail, setUserEmailState] = useState(() => getUserEmail());

  const syncAuth = () => {
    const isAuthed = isAuthenticated();
    setAuthed(isAuthed);
    setUserEmailState(isAuthed ? getUserEmail() : '');
  };

  useEffect(() => {
    syncAuth();

    const handleAuthChange = () => syncAuth();
    
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('auth:change', handleAuthChange);
    window.addEventListener('auth:unauthorized', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth:change', handleAuthChange);
      window.removeEventListener('auth:unauthorized', handleAuthChange);
    };
  }, []);

  const login = (email, token) => {
    if (token) setSessionToken(token);
    if (email) setUserEmail(email);
    syncAuth();
    window.dispatchEvent(new CustomEvent('auth:change'));
  };

  const logout = () => {
    clearSessionToken();
    syncAuth();
    window.dispatchEvent(new CustomEvent('auth:change'));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        authed, 
        isAuthenticated: authed, 
        userEmail, 
        login, 
        logout,
        syncAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
