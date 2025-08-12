// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { logout } from '../services/authService';
import { auth, db } from '../firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';
import TaskItem from '../components/TasksItem';

export default function HomeScreen({ navigation }) {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const user = auth.currentUser;

  // Carregar tarefas em tempo real
  useEffect(() => {
    if (!user) return;
    const tasksRef = ref(db, `tarefas/${user.uid}`);
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedTasks = Object.keys(data).map((key) => ({
          id: key,
          text: data[key].text
        }));
        setTasks(loadedTasks);
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Adicionar ou editar tarefa
  const handleSaveTask = async () => {
    if (!taskText.trim()) {
      Alert.alert('Erro', 'Digite um texto para a tarefa');
      return;
    }

    try {
      if (editingTask) {
        await update(ref(db, `tarefas/${user.uid}/${editingTask.id}`), {
          text: taskText
        });
        setEditingTask(null);
      } else {
        await push(ref(db, `tarefas/${user.uid}`), {
          text: taskText
        });
      }
      setTaskText('');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  // Excluir tarefa
  const handleDeleteTask = async (taskId) => {
    try {
      await remove(ref(db, `tarefas/${user.uid}/${taskId}`));
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  // Editar tarefa
  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskText(task.text);
  };

  // Logout
  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <TextInput
        placeholder="Digite uma tarefa"
        value={taskText}
        onChangeText={setTaskText}
        style={styles.input}
      />

      <Button
        title={editingTask ? 'Salvar Edição' : 'Adicionar Tarefa'}
        onPress={handleSaveTask}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Sair" onPress={handleLogout} color="#f44336" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});
