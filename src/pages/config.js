import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from "react-native";
import { collection, getDocs, doc, updateDoc, where, query } from "firebase/firestore";
import { getAuth, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { db } from "../config";
import { useGlobalState } from "../config/refresh";
import { stylesConfigs } from "../../assets/css/configSty";
import { stylesCheckin } from "../../assets/css/checkin";
import Spinner from "react-native-loading-spinner-overlay";

const Config = () => {
  const [configs, setConfigs] = useState({ preco_hora: "", vagas_dis: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
      setRefresh(!refresh);
    });

    if (user) {
      setDisplayName(user.displayName || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      if (configs.id) {
        const configDocRef = doc(db, "configs", configs.id);
        await updateDoc(configDocRef, {
          preco_hora: Number(configs.preco_hora),
          vagas_dis: Number(configs.vagas_dis),
        });

        const auth = getAuth();

        if (displayName && displayName !== user.displayName) {
          await updateProfile(auth.currentUser, { displayName: displayName });
        }

        if (newPassword) {
          if (!currentPassword) {
            Alert.alert("Erro", "Por favor, insira sua senha atual para alterar a senha.");
            setIsLoading(false);
            return;
          }

          const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
          await reauthenticateWithCredential(auth.currentUser, credential);
          await updatePassword(auth.currentUser, newPassword);
        }

        setRefresh(!refresh)
        setIsLoading(false);
        Alert.alert("Sucesso", "Configurações atualizadas com sucesso!");
      } else {
        Alert.alert("Erro", "Documento de configurações não encontrado.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error);
      setIsLoading(false);
      Alert.alert("Erro", "Erro ao atualizar configurações.");
    }
  };

  return (
    <ScrollView contentContainerStyle={stylesConfigs.containerConfig}>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={"Carregando..."}
          textStyle={{ color: "#FFF" }}
          overlayColor={"rgba(0, 0, 0, 0.7)"}
        />
      )}
      <View style={stylesConfigs.section}></View>

      <View>
        <Text style={stylesConfigs.sectionTitle}>Configurações do Usuário</Text>

        <View style={{ display: "flex", gap: 10 }}>
          <Text style={stylesConfigs.formClientLabel}>Nome de Usuário:</Text>
          <TextInput
            style={stylesCheckin.input}
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
          />
        </View>

        <View style={{ display: "flex", gap: 10 }}>
          <Text style={stylesConfigs.formClientLabel}>Senha Atual:</Text>
          <TextInput
            style={stylesCheckin.input}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <View style={{ display: "flex", gap: 10 }}>
          <Text style={stylesConfigs.formClientLabel}>Nova Senha:</Text>
          <TextInput
            style={stylesCheckin.input}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View style={stylesConfigs.section}></View>

      <View>
        <Text style={stylesConfigs.sectionTitle}>Configurações do Estacionamento</Text>

        <View style={{ display: "flex", gap: 10 }}>
          <Text style={stylesConfigs.formClientLabel}>Preço por Hora:</Text>
          <TextInput
            style={stylesCheckin.input}
            value={configs.preco_hora.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setConfigs({ ...configs, preco_hora: text })}
          />
        </View>

        <View style={{ display: "flex", gap: 10 }}>
          <Text style={stylesConfigs.formClientLabel}>Vagas Disponíveis:</Text>
          <TextInput
            style={stylesCheckin.input}
            value={configs.vagas_dis.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setConfigs({ ...configs, vagas_dis: text })}
          />
        </View>
      </View>

      <TouchableOpacity
        style={stylesConfigs.buttonCreated}
        onPress={handleUpdate}
      >
        <Text style={stylesConfigs.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Config;
