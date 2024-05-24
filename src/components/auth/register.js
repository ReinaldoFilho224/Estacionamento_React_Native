import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import registerStyle from '../../../assets/css/registerStyle';

const RegisterScreen = () => {
  const [name, setName] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário registrado:', user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={registerStyle.container}>
      <TextInput
        style={registerStyle.input} 
        placeholder="Nome"
        value={name}
        onChangeText={setName} 
      />

      <TextInput
        style={registerStyle.input} 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={registerStyle.input} 
        placeholder="Número de Celular"
        value={phoneNumber}
        onChangeText={setPhoneNumber} 
        keyboardType="numeric"
      />

      <TextInput
        style={registerStyle.input} 
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button style={registerStyle.button} 
      title="Registrar" onPress={handleRegister} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default RegisterScreen;
