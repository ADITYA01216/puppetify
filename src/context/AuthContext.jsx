import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  firebaseSignOut, 
  onAuthStateChanged 
} from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(res.user);
      setUnverifiedEmail(email);
      return res.user;
    } catch (err) {
      // Mock mode fallback for demo/invalid Firebase credentials
      if (err.code === 'auth/invalid-api-key' || err.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
        const mockUser = { email, emailVerified: false };
        setUnverifiedEmail(email);
        setUser(mockUser);
        return mockUser;
      }
      throw err;
    }
  };

  const signIn = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res.user.emailVerified) {
        setUnverifiedEmail(email);
        throw new Error('NOT_VERIFIED');
      }
      setUser(res.user);
      return res.user;
    } catch (err) {
      if (err.message === 'NOT_VERIFIED') throw err;
      if (err.code === 'auth/invalid-api-key' || err.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
        setUnverifiedEmail(email);
        throw new Error('NOT_VERIFIED');
      }
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.log('Signout:', e);
    }
    setUser(null);
  };

  const resendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        unverifiedEmail,
        setUnverifiedEmail,
        signUp,
        signIn,
        signOut,
        resendVerification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
