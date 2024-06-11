import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";  // Importar updateDoc e doc
import { useGlobalState } from "../../config/refresh";
import { MaskedTextInput } from "react-native-mask-text";
import { db } from "../../config";
import { stylesConfigs } from "../../../assets/css/configSty";
import { stylesCheckin } from "../../../assets/css/checkin";

const EditClientsModal = ({ show, close, client }) => {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const { setRefresh, refresh } = useGlobalState()

  useEffect(() => {
    if (client) {
      setCpf(client.cpf || "");
      setNome(client.nome || "");
      setTelefone(client.telefone || "");
    }
  }, [client]);

  const handleCreateClient = async () => {
    try {
      const clientRef = doc(db, "clientes", client.id);
      await updateDoc(clientRef, {
        cpf,
        nome,
        telefone,
      });
      setRefresh(!refresh);

      Alert.alert("Sucesso", "Cliente editado com sucesso!");
      close();
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      Alert.alert("Erro", "Erro ao editar cliente. Por favor, tente novamente.");
    }
  };

  return (
    <Modal visible={show} onRequestClose={close}>
      <View style={stylesConfigs.modalContent}>
        <View style={stylesConfigs.formClientContainer}>
          <View style={stylesConfigs.formInput}>
            <Text style={stylesConfigs.formClientLabel}>CPF:</Text>
            <MaskedTextInput
              mask="999.999.999-99"
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
            <MaskedTextInput
              mask="(99) 99999-9999"
              value={telefone}
              onChangeText={setTelefone}
              placeholder="(00) 00000-0000"
              keyboardType="numeric"
              style={stylesCheckin.input}
            />
          </View>
          <TouchableOpacity
            style={stylesConfigs.buttonCreated}
            onPress={() => handleCreateClient()}
          >
            <Text style={stylesConfigs.buttonText}>Salvar Edição</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesConfigs.buttonCancel} onPress={() => close()}>
            <Text style={stylesConfigs.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditClientsModal;
