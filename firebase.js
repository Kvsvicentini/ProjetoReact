// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4ZXcI6O7Z1alXyBcfTpRMzZnsAbOnz3U",
  authDomain: "teste-7bd0d.firebaseapp.com",
  databaseURL: "https://teste-7bd0d-default-rtdb.firebaseio.com",
  projectId: "teste-7bd0d",
  storageBucket: "teste-7bd0d.appspot.com", // Corrigido aqui
  messagingSenderId: "787787619118",
  appId: "1:787787619118:web:4bb76d48e75db7c00838bf",
  measurementId: "G-Z0E4QLWV1X" // Pode deixar, mas não será usado no React Native
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obter Realtime Database
const db = getDatabase(app);

export { db };
