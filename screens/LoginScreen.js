import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { login, register } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Informe email e senha.');
      return;
    }
    try {
      await login(email.trim(), password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro no login', error.message);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Informe email e senha.');
      return;
    }
    try {
      await register(email.trim(), password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro no registro', error.message);
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
        keyboardType="email-address"
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
      <View style={{ marginTop: 10 }}>
        <Button title="Registrar" onPress={handleRegister} color="#555" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});
