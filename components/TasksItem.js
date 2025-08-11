// components/TaskItem.js
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function TaskItem({ task, onDelete, onEdit }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{task.text}</Text>
      <View style={styles.buttons}>
        <Pressable style={styles.buttonEdit} onPress={() => onEdit(task)}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>
        <Pressable style={styles.buttonDelete} onPress={() => onDelete(task.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e2e2e2',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    gap: 10
  },
  buttonEdit: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 5,
  },
  buttonDelete: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
