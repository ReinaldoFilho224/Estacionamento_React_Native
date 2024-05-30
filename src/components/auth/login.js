import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { auth } from '../../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import loginStyle from '../../../assets/css/loginStyle'; 

const LoginScreen = ({ navigation }) => {
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
      <Image 
        source={require('../../../assets/user-icon.png')} 
        style={loginStyle.logo} 
      />
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
      <TouchableOpacity style={loginStyle.button} onPress={handleLogin}>
        <Text style={loginStyle.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
      {error ? <Text style={loginStyle.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={loginStyle.registerText}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
