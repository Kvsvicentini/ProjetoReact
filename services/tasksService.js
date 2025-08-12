// services/tasksService.js
import { auth, db } from '../firebase';
import { ref, push, update, remove, onValue } from 'firebase/database';

const getUserTasksRef = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuário não autenticado");
  return ref(db, `tarefas/${uid}`);
};

// Criar uma nova tarefa
export const createTask = async (taskText) => {
  await push(getUserTasksRef(), {
    text: taskText,
  });
};

// Ler tarefas em tempo real
export const listenToTasks = (callback) => {
  const tasksRef = getUserTasksRef();
  return onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    const taskList = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
    callback(taskList);
  });
};

// Atualizar uma tarefa existente
export const updateTask = async (taskId, newText) => {
  await update(ref(db, `${getUserTasksRef().key}/${taskId}`), {
    text: newText,
  });
};

// Excluir uma tarefa
export const deleteTask = async (taskId) => {
  await remove(ref(db, `${getUserTasksRef().key}/${taskId}`));
};
