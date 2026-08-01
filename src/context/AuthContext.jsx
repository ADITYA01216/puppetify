import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signin' | 'signup'

  // Load persisted user session on startup
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('puppetify_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load user session:', e);
    }
  }, []);

  const login = (userData) => {
    const userSession = {
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      token: 'token_' + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
      verified: true
    };
    setUser(userSession);
    localStorage.setItem('puppetify_user', JSON.stringify(userSession));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('puppetify_user');
  };

  const openAuthModal = (mode = 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
