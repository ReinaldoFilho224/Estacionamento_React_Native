import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { stylesConfigs } from '../../assets/css/configSty';
import { auth } from '../config/index'


const Config = () => {

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuário desconectado');
      })
      .catch((error) => {
        console.error('Erro ao desconectar:', error);
      });
  };

  return (
    <View style={stylesConfigs.container}>
      <Text style={stylesConfigs.text}>Tela de Configurações</Text>
      <TouchableOpacity style={stylesConfigs.button} onPress={handleSignOut}>
        <Text style={stylesConfigs.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Config;
