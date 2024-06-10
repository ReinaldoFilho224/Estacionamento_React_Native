import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { useGlobalState } from "../../config/refresh";
import { db } from "../../config";
import { stylesConfigs } from "../../../assets/css/configSty";
import { stylesCheckin } from "../../../assets/css/checkin";
import styled from "styled-components";

const EditClientsModal = ({ show, close, client }) => {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (client) {
      setCpf(client.cpf || "");
      setNome(client.nome || "");
      setTelefone(client.telefone || "");
    }
  }, [client]);

  const handleCreateClient = async () => {
    alert("Realizar lógica para salvar a edição no id do cliente informado");
    // try {
    //   if (!cpf || !nome || !telefone) {
    //     Alert.alert("Erro", "Por favor, preencha todos os campos");
    //     return;
    //   }
    //   await addDoc(collection(db, "clientes"), {
    //     cpf,
    //     nome,
    //     telefone,
    //     park_id: user.uid,
    //   });
    //   setCpf("");
    //   setNome("");
    //   setTelefone("");
    //   setRefresh(!refresh);

    //   Alert.alert("Sucesso", "Cliente editado com sucesso!");
    //   close(); //
    // } catch (error) {
    //   console.error("Erro ao criar cliente:", error);
    //   Alert.alert("Erro", "Erro ao criar cliente. Por favor, tente novamente.");
    // }
  };

  return (
    <Modal visible={show} onRequestClose={close}>
      <View style={stylesConfigs.modalContent}>
        <View style={stylesConfigs.formClientContainer}>
          <View style={stylesConfigs.formInput}>
            <Text style={stylesConfigs.formClientLabel}>CPF:</Text>
            <TextInput
              value={cpf}
              onChangeText={setCpf}
              placeholder="000.000.000-00"
              keyboardType="numeric"
              style={stylesCheckin.input}
            />
          </View>
          <View style={stylesConfigs.formInput}>
            <Text style={stylesConfigs.formClientLabel}>Nome:</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Nome do cliente"
              style={stylesCheckin.input}
            />
          </View>
          <View style={stylesConfigs.formInput}>
            <Text style={stylesConfigs.formClientLabel}>Telefone:</Text>
            <TextInput
              value={telefone}
              onChangeText={setTelefone}
              placeholder="(00) 00000-0000"
              keyboardType="numeric"
              style={stylesCheckin.input}
            />
          </View>
          <TouchableOpacity
            style={stylesConfigs.buttonCreated}
            onPress={handleCreateClient}
          >
            <Text style={stylesConfigs.buttonText}>Salvar Edição</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesConfigs.buttonCancel} onPress={close}>
            <Text style={stylesConfigs.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditClientsModal;
