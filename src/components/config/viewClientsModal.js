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
  const [clientSelect, setClientSelected] = useState([]);
  const { user } = useGlobalState();

  useEffect(() => {
    const fetchDataAndSetTimer = async () => {
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

    fetchDataAndSetTimer();

    const timer = setInterval(fetchDataAndSetTimer, 10000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        client.cpf.includes(searchText)
    );
    setFilteredClients(filtered);
  }, [searchText, clients]);

  return (
    <ScrollView style={{ width: "100%" }}>
      <TextInput
        style={stylesConfigs.searchInput}
        placeholder="Filtrar por CPF ou Cliente"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {filteredClients.map((client, index) => (
        <TouchableOpacity
          onPress={() => {
            setShowModalEdit(true);
            setClientSelected(client);
          }}
          key={index}
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
          <Text>
            <Text style={{ fontWeight: "bold" }}>Última Visita: </Text>
            XX/XX/XXXX
          </Text>
        </TouchableOpacity>
      ))}

      <EditClientsModal
        show={showModalEdit}
        close={() => setShowModalEdit(false)}
        client={clientSelect}
      />
    </ScrollView>
  );
};

export default ViewClientsComponent;
