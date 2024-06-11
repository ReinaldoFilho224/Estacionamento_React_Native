import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, deleteUser, sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import registerStyle from '../../../assets/css/registerStyle';
import { MaskedTextInput } from "react-native-mask-text";
import Toast from 'react-native-toast-message';


const auth = getAuth();
const firestore = getFirestore();

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [precoHora, setPrecoHora] = useState(0);
  const [vagasDis, setVagasDis] = useState(0);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const showToast = () => {
      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado com sucesso.',
        text2: 'Por favor, verifique seu email para confirmar a conta.'
      })
    };
    let newUser = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      newUser = userCredential.user;

      await updateProfile(newUser, {
        displayName: name,
        phoneNumber: phoneNumber,
      });

      await sendEmailVerification(newUser);

      try {
        await addDoc(collection(firestore, "configs"), {
          park_id: newUser.uid,
          preco_hora: precoHora,
          vagas_dis: vagasDis,
        });
        console.log("Nova configuração criada");

        showToast()
        // setError();
      } catch (configError) {
        console.error("Erro ao criar configuração:", configError);
        await deleteUser(newUser);
        throw configError;
      }

      console.log('Usuário registrado e perfil atualizado:', newUser);
    } catch (error) {
      setError(error.message);
      console.error('Erro ao registrar usuário:', error);
      if (newUser) {
        await deleteUser(newUser);
      }
    }

  };

  return (
    <View style={registerStyle.container}>
      <Text style={registerStyle.text}>Cadastrar Administrador</Text>

      <TextInput
        style={registerStyle.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <MaskedTextInput
        mask="(99) 99999-9999"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Telefone"
        keyboardType="numeric"
        style={registerStyle.input}
      />

      <TextInput
        style={registerStyle.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={registerStyle.text}>Configurações do Estacionamento</Text>

      <TextInput
        style={registerStyle.input}
        placeholder="Nome do Estabelecimento"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={registerStyle.input}
        placeholder="Valor da Hora"
        value={precoHora}
        onChangeText={(value) => setPrecoHora(Number(value))}
        keyboardType="numeric"
      />

      <TextInput
        style={registerStyle.input}
        placeholder="Quantidade de Vagas"
        value={vagasDis}
        onChangeText={(value) => setVagasDis(Number(value))}
        keyboardType="numeric"
      />

      <TouchableOpacity style={registerStyle.button} onPress={handleRegister}>
        <Text style={registerStyle.buttonText}>Registrar</Text>
      </TouchableOpacity>
      {error ? <Text style={registerStyle.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={() => navigation.goBack()} style={registerStyle.backButton}>
        <Text style={registerStyle.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default RegisterScreen;
