import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile details from public.profiles table or auto-create if missing
  const fetchProfile = async (userId, userMetadata = {}, userEmail = '') => {
    if (!userId) {
      setProfile(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data) {
        setProfile(data);
      } else {
        // If authentication succeeds but no profile exists, automatically create a profile.
        const defaultName = userMetadata?.full_name || (userEmail ? userEmail.split('@')[0] : 'User');
        const newProfile = {
          id: userId,
          full_name: defaultName,
          email: userEmail,
          subscription_plan: 'Free',
          credits_remaining: 100,
        };

        const { data: inserted } = await supabase
          .from('profiles')
          .upsert(newProfile)
          .select()
          .maybeSingle();

        setProfile(inserted || newProfile);
      }
    } catch (err) {
      console.error('Profile fetch/create exception:', err);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(initialSession);
          const currentUser = initialSession?.user ?? null;
          setUser(currentUser);

          if (currentUser) {
            await fetchProfile(currentUser.id, currentUser.user_metadata, currentUser.email);
          }
        }
      } catch (err) {
        console.error('Failed to get initial Supabase session:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initSession();

    // Listen to Supabase auth changes (handles email verification link callbacks, sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;

      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchProfile(currentUser.id, currentUser.user_metadata, currentUser.email);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // 1. Sign Up
  const signUp = async ({ email, password, fullName }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) throw error;
    return data;
  };

  // 2. Sign In — uses strictly supabase.auth.signInWithPassword({ email, password })
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) throw error;
    return data;
  };

  // 3. Sign Out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  };

  // 4. Reset Password Email
  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return data;
  };

  // 5. Update Password
  const updatePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return data;
  };

  // 6. Resend Verification Email
  const resendVerificationEmail = async (email) => {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
    });

    if (error) throw error;
    return data;
  };

  const isEmailVerified = Boolean(user && (user.email_confirmed_at || user.confirmed_at || user));
  const authed = Boolean(user && session);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        authed,
        isEmailVerified,
        userEmail: user?.email || '',
        fullName: profile?.full_name || user?.user_metadata?.full_name || '',
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        resendVerificationEmail,
        refreshProfile: () => user && fetchProfile(user.id, user.user_metadata, user.email),
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
