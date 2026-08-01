import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDummyApiKeyForPuppetifyWebAuth123",
  authDomain: "puppetify-app.firebaseapp.com",
  projectId: "puppetify-app",
  storageBucket: "puppetify-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
