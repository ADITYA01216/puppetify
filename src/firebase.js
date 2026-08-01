import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Firebase Configuration from environment or defaults
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForGoogleOAuthAuthentication",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "puppetify-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "puppetify-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "puppetify-ai.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Custom Google Auth Popup helper
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      success: true,
      user: {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        verified: true,
        authProvider: 'Firebase Google OAuth'
      }
    };
  } catch (error) {
    console.error("Firebase Google Auth error:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const logoutUser = () => signOut(auth);
