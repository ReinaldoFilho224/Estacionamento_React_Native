import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import configSty from '../../assets/css/configSty'; 
import { auth } from '../config/index'


const Config = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuário desconectado');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Erro ao desconectar:', error);
      });
  };

  return (
    <View style={configSty.container}>
      <Text style={configSty.text}>Tela de Configurações</Text>
      <TouchableOpacity style={configSty.button} onPress={handleSignOut}>
        <Text style={configSty.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Config;
