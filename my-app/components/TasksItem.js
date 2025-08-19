import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{task.text}</Text>
      <View style={styles.buttons}>
        <Button title="Editar" onPress={() => onEdit(task)} />
        <Button title="Excluir" color="red" onPress={() => onDelete(task.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { padding:10, marginVertical:5, borderWidth:1, borderColor:'#ccc', borderRadius:5 },
  text: { fontSize:16, marginBottom:5 },
  buttons: { flexDirection:'row', justifyContent:'space-between' },
});
