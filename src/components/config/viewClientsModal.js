import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { db } from "../../config";
import { stylesConfigs } from "../../../assets/css/configSty";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useGlobalState } from "../../config/refresh";
import EditClientsModal from "./editClientsModal";

const ViewClientsComponent = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [clientSelect, setClientSelected] = useState(null);
  const { user, refresh, setRefresh } = useGlobalState();

  const fetchClients = async () => {
    try {
      const clientsQuery = query(
        collection(db, "clientes"),
        where("park_id", "==", user.uid)
      );

      const querySnapshot = await getDocs(clientsQuery);
      const clientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(clientsData);
      setFilteredClients(clientsData);
    } catch (error) {
      console.error("Erro ao buscar carros estacionados:", error);
    }
  };

  useEffect(() => {
    fetchClients();

    const timer = setInterval(fetchClients, 10000);

    return () => clearInterval(timer);
  }, [refresh, user.uid]);

  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        client.cpf.includes(searchText)
    );
    setFilteredClients(filtered);
  }, [searchText, clients]);

  const handleEditClient = (client) => {
    setClientSelected(client);
    setShowModalEdit(true);
  };

  const handleCloseModal = () => {
    setShowModalEdit(false);
    setClientSelected(null);
  };

  return (
    <ScrollView style={{ width: "100%" }}>
      <TextInput
        style={stylesConfigs.searchInput}
        placeholder="Filtrar por CPF ou Cliente"
        value={searchText}
        onChangeText={setSearchText}
      />
      {filteredClients.map((client) => (
        <TouchableOpacity
          onPress={() => handleEditClient(client)}
          key={client.id}
          style={stylesConfigs.itens}
        >
          <Text>
            <Text style={{ fontWeight: "bold" }}>Cliente: </Text>
            {client.nome}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>CPF: </Text>
            {client.cpf}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Tel.: </Text>
            {client.telefone}
          </Text>
        </TouchableOpacity>
      ))}

      {showModalEdit && (
        <EditClientsModal
          show={showModalEdit}
          close={handleCloseModal}
          client={clientSelect}
          onRefresh={() => setRefresh((prev) => !prev)}
        />
      )}
    </ScrollView>
  );
};

export default ViewClientsComponent;
