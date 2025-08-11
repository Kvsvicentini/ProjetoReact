// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { login, register } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.replace('Home'); // navega para a home ao logar
    } catch (err) {
      Alert.alert('Erro no login', err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Erro ao registrar', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Registro</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Registrar" onPress={handleRegister} color="#555" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  }
});
