import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load saved session if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('puppetify_firebase_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const signUp = async (email, password) => {
    // Return promise, simulate verification needed
    const newUser = {
      email,
      emailVerified: false,
      uid: 'user_' + Date.now()
    };
    localStorage.setItem('puppetify_pending_email', email);
    return newUser;
  };

  const signIn = async (email, password) => {
    // Check if verified
    const savedUser = localStorage.getItem('puppetify_firebase_user');
    const pendingEmail = localStorage.getItem('puppetify_pending_email');

    if (pendingEmail === email && (!savedUser || !savedUser.emailVerified)) {
      const error = new Error('NOT_VERIFIED');
      error.code = 'auth/email-not-verified';
      throw error;
    }

    const authUser = {
      email,
      emailVerified: true,
      uid: 'user_' + Date.now()
    };
    setUser(authUser);
    localStorage.setItem('puppetify_firebase_user', JSON.stringify(authUser));
    return authUser;
  };

  const resendVerification = async (email) => {
    return true;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('puppetify_firebase_user');
    localStorage.removeItem('puppetify_pending_email');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser: user,
        signUp,
        signIn,
        signOut,
        resendVerification,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
