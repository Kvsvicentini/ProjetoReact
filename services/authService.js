// services/authService.js
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Salvando no Realtime Database
  const user = userCredential.user;
  await set(ref(db, `usuarios/${user.uid}`), {
    email: user.email,
    criadoEm: new Date().toISOString()
  });

  return userCredential;
};

export const logout = async () => {
  return await signOut(auth);
};
