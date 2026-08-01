import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';

// Firebase configuration for Puppetify
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForPuppetifyDemoModeAuth123",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "puppetify.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "puppetify",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "puppetify.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abc123def456"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
};
