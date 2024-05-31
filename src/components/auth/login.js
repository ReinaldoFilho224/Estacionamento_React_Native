import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Modal } from 'react-native';
import { auth } from '../../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import loginStyle from '../../../assets/css/loginStyle';
import { MaskedTextInput } from 'react-native-mask-text';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cpf, setCpf] = useState('');
  const [numero, setNumero] = useState('');

  const handleEnviar = () => {
    // Aqui você pode adicionar lógica para lidar com os dados enviados
    console.log('CPF:', cpf);
    console.log('Número:', numero);
  };

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

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
      <TouchableOpacity style={loginStyle.button2} onPress={handleOpenModal}>
        <Text style={loginStyle.buttonText}>VERIFICAR RESERVA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={loginStyle.registerText}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={loginStyle.modalContainer}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginBottom: 20 }}>
              <Text>CPF:</Text>
              <MaskedTextInput
                mask={'[000].[000].[000]-[00]'}
                onChangeText={(formatted, extracted) => {
                  const extractedOnlyNumbers = extracted.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
                  setCpf(extractedOnlyNumbers);
                }}
                value={cpf}
                style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5 }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text>Número (4 dígitos):</Text>
              <MaskedTextInput
                mask='0000'
                onChangeText={(formatted, extracted) => {
                  const extractedOnlyNumbers = extracted.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
                  setNumero(extractedOnlyNumbers);
                }}
                value={numero}
                style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5 }}
              />
            </View>
            <TouchableOpacity onPress={handleEnviar} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Enviar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;