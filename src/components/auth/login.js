// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import loginStyle from '../../../assets/css/loginStyle';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário logado');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={loginStyle.container}> 
      <TextInput 
        style={loginStyle.input} 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={loginStyle.input} 
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="ENTRAR"
        onPress={handleLogin}
        style={loginStyle.button} 
      />
      {error ? <Text style={loginStyle.errorText}>{error}</Text> : null} 
    </View>
  );
};

export default LoginScreen;
