import { auth, database } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const register = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // salva no Realtime Database
  await set(ref(database, `usuarios/${user.uid}`), {
    email: user.email,
    criadoEm: new Date().toISOString()
  });

  return userCredential;
};

export const logout = () => signOut(auth);
