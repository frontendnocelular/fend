import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBuZRpFk7zikoLmKLM4ArBZeJpPQOsrRBo",
  authDomain: "blogcristao-5ad5e.firebaseapp.com",
  databaseURL: "https://blogcristao-5ad5e-default-rtdb.firebaseio.com",
  projectId: "blogcristao-5ad5e",
  storageBucket: "blogcristao-5ad5e.firebasestorage.app",
  messagingSenderId: "509326412804",
  appId: "1:509326412804:web:66a7c914e24c127599f951"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);