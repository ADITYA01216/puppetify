import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDemoKey_PuppetifyViteReact2026",
  authDomain: "puppetify-app.firebaseapp.com",
  projectId: "puppetify-app",
  storageBucket: "puppetify-app.appspot.com",
  messagingSenderId: "109823471092",
  appId: "1:109823471092:web:ab98c76123ef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  firebaseSignOut,
  onAuthStateChanged 
};
