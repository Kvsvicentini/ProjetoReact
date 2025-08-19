import { auth, database } from '../firebase';
import { ref, push, update, remove, onValue } from 'firebase/database';

const getUserTasksRef = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuário não autenticado");
  return ref(database, `tarefas/${uid}`);
};

export const createTask = (text) => push(getUserTasksRef(), { text });

export const updateTask = (id, newText) => update(ref(database, `tarefas/${auth.currentUser.uid}/${id}`), { text: newText });

export const deleteTask = (id) => remove(ref(database, `tarefas/${auth.currentUser.uid}/${id}`));

export const listenToTasks = (callback) => {
  const tasksRef = getUserTasksRef();
  return onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    const taskList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    callback(taskList);
  });
};
