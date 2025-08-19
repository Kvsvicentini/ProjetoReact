import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { logout } from '../services/authService';
import { auth } from '../firebase';
import TaskItem from '../components/TasksItem';
import { createTask, updateTask, deleteTask, listenToTasks } from '../services/tasksService';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToTasks((taskList) => { setTasks(taskList); setLoading(false); });
    return () => unsubscribe();
  }, [user]);

  const handleSaveTask = async () => {
    if (!taskText.trim()) return Alert.alert('Erro', 'Digite uma tarefa');
    try {
      if (editingTask) { await updateTask(editingTask.id, taskText); setEditingTask(null); }
      else { await createTask(taskText); }
      setTaskText('');
    } catch (err) { Alert.alert('Erro', err.message); }
  };

  const handleEditTask = (task) => { setEditingTask(task); setTaskText(task.text); };
  const handleDeleteTask = async (taskId) => { try { await deleteTask(taskId); if(editingTask?.id === taskId){ setEditingTask(null); setTaskText(''); } } catch(err){ Alert.alert('Erro', err.message); } };
  const handleCancelEdit = () => { setEditingTask(null); setTaskText(''); };
  const handleLogout = async () => { await logout(); navigation.replace('Login'); };

  if(!user) return <View style={styles.container}><Text style={styles.title}>Carregando usuário...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      <TextInput placeholder="Digite uma tarefa" value={taskText} onChangeText={setTaskText} style={styles.input} />
      <Button title={editingTask ? 'Atualizar' : 'Adicionar'} onPress={handleSaveTask} />
      {editingTask && <Button title="Cancelar" onPress={handleCancelEdit} color="gray" />}
      {loading ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop:20 }}/> :
      <FlatList data={tasks} keyExtractor={item => item.id} renderItem={({item}) => <TaskItem task={item} onEdit={handleEditTask} onDelete={handleDeleteTask} />} ListEmptyComponent={<Text style={{textAlign:'center', marginTop:20, color:'#999'}}>Nenhuma tarefa ainda!</Text>} />}
      <View style={{marginTop:20}}><Button title="Sair" onPress={handleLogout} color="#f44336" /></View>
    </View>
  );
}

const styles = StyleSheet.create({ container:{ flex:1, padding:20 }, title:{ fontSize:24, marginBottom:10, textAlign:'center' }, input:{ borderWidth:1, borderColor:'#aaa', padding:10, marginBottom:10, borderRadius:5 } });
