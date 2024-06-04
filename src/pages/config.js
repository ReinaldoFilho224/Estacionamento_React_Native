import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { collection, getDocs, doc, updateDoc, where, query } from "firebase/firestore";
import { db } from "../config";
import { useGlobalState } from "../config/refresh";
import { stylesConfigs } from '../../assets/css/configSty';
import { stylesCheckin } from "../../assets/css/checkin";
import Spinner from 'react-native-loading-spinner-overlay';

const Config = () => {
  const [configs, setConfigs] = useState({ preco_hora: '', vagas_dis: '' });
  const [isLoading, setIsLoading] = useState(true);
  const { user, setRefresh, refresh } = useGlobalState();

  useEffect(() => {
    const fetchConfigs = async () => {
      setIsLoading(true);
      try {
        const configsQuery = query(
          collection(db, "configs"),
          where("park_id", "==", user.uid)
        );
        const querySnapshot = await getDocs(configsQuery);
        const configsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))[0];
        setConfigs(configsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
        setIsLoading(false);
      }
    };

    fetchConfigs().then(() => {
      setRefresh(!refresh)
    })
  }, [user]);

  const handleUpdate = async () => {
    if (configs.id) {
      setIsLoading(true);
      try {
        const configDocRef = doc(db, "configs", configs.id);
        await updateDoc(configDocRef, {
          preco_hora: Number(configs.preco_hora),
          vagas_dis: Number(configs.vagas_dis)
        });
        setIsLoading(false);
        Alert.alert("Sucesso", "Configurações atualizadas com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar configurações:", error);
        setIsLoading(false);
        Alert.alert("Erro", "Erro ao atualizar configurações.");
      }
    } else {
      Alert.alert("Erro", "Documento de configurações não encontrado.");
    }
  };

  return (
    <ScrollView contentContainerStyle={stylesConfigs.containerConfig}>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={'Carregando...'}
          textStyle={{ color: '#FFF' }}
          overlayColor={'rgba(0, 0, 0, 0.7)'}
        />
      )}

      <View style={{ display: 'flex', gap: 10 }}>
        <Text style={stylesConfigs.formClientLabel}>Preço por Hora:</Text>
        <TextInput
          style={stylesCheckin.input}
          value={configs.preco_hora.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setConfigs({ ...configs, preco_hora: text })}
        />
      </View>

      <View style={{ display: 'flex', gap: 10 }}>
        <Text style={stylesConfigs.formClientLabel}>Vagas Disponíveis:</Text>
        <TextInput
          style={stylesCheckin.input}
          value={configs.vagas_dis.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setConfigs({ ...configs, vagas_dis: text })}
        />
      </View>
      <TouchableOpacity style={stylesConfigs.buttonCreated} onPress={handleUpdate}>
        <Text style={stylesConfigs.buttonText}>Editar Configurações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Config;

