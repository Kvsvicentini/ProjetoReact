import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, Alert } from 'react-native';

import TaskItem from '../components/TasksItem';
import { createTask, listenToTasks, updateTask, deleteTask } from '../services/tasksService';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editingTask, setEditingTask] = useState(null); // tarefa que está editando

  useEffect(() => {
    const unsubscribe = listenToTasks(setTasks);
    return () => unsubscribe();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!inputText.trim()) {
      Alert.alert('Erro', 'Digite uma tarefa');
      return;
    }

    try {
      if (editingTask) {
        await updateTask(editingTask.id, inputText);
        setEditingTask(null);
      } else {
        await createTask(inputText);
      }
      setInputText('');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleEdit = (task) => {
    setInputText(task.text);
    setEditingTask(task);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      if (editingTask && editingTask.id === taskId) {
        setEditingTask(null);
        setInputText('');
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Digite sua tarefa"
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
        />
        <Button
          title={editingTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
          onPress={handleAddOrUpdate}
        />
        {editingTask && <Button title="Cancelar" onPress={handleCancelEdit} color="gray" />}
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        ListEmptyComponent={() => <View style={styles.empty}><Button disabled title="Nenhuma tarefa ainda!" /></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  empty: {
    marginTop: 50,
    alignItems: 'center',
  },
});
