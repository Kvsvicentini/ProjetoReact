// services/tasksService.js
import { db } from '../firebase';
import { ref, push, update, remove, onValue } from 'firebase/database';

const TASKS_REF = 'tasks/';

// Criar uma nova tarefa
export const createTask = async (taskText) => {
  await push(ref(db, TASKS_REF), {
    text: taskText,
  });
};

// Ler tarefas em tempo real
export const listenToTasks = (callback) => {
  const tasksRef = ref(db, TASKS_REF);
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
  await update(ref(db, `${TASKS_REF}${taskId}`), {
    text: newText,
  });
};

// Excluir uma tarefa
export const deleteTask = async (taskId) => {
  await remove(ref(db, `${TASKS_REF}${taskId}`));
};
