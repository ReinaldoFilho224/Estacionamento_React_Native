import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, deleteUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import registerStyle from '../../../assets/css/registerStyle';
import { db } from '../../config';

const auth = getAuth();
const firestore = getFirestore();

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [precoHora, setPrecoHora] = useState(0);
  const [vagasDis, setvagasDis] = useState(0);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    let newuser = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      newuser = userCredential.user;

      await updateProfile(newuser, {
        displayName: name,
        phoneNumber: phoneNumber,
      });

      try {
        await addDoc(collection(firestore, "configs"), {
          park_id: newuser.uid,
          preco_hora: precoHora,
          vagas_dis: vagasDis,
        });
        console.log("Nova configuração criada");
      } catch (configError) {
        console.error("Erro ao criar configuração:", configError);
        await deleteUser(newuser);
        throw configError;
      }

      console.log('Usuário registrado e perfil atualizado:', newuser);
    } catch (error) {
      setError(error.message);
      console.error('Erro ao registrar usuário:', error);
      if (newuser) {
        await deleteUser(newuser);
      }
    }
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

      <Text>Configurações do Estacionamento</Text>
      <TextInput
        style={registerStyle.input}
        placeholder="Valor da Hora"
        value={precoHora}
        onChangeText={setPrecoHora}
        keyboardType="numeric"
      />

      <TextInput
        style={registerStyle.input}
        placeholder="Quantidade de Vagas"
        value={vagasDis}
        onChangeText={setvagasDis}
        keyboardType="numeric"
      />


      <TouchableOpacity style={registerStyle.button} onPress={handleRegister}>
        <Text style={registerStyle.buttonText}>Registrar</Text>
      </TouchableOpacity>
      {error ? <Text style={registerStyle.errorText}>{error}</Text> : null}
    </View>
  );
};

export default RegisterScreen;
