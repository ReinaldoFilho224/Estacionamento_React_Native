import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../../config";
import { stylesConfigs } from "../../../assets/css/config";
import { collection, getDocs } from "firebase/firestore";

const ViewClientsComponent = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchDataAndSetTimer = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const clientsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(clientsData);
      } catch (error) {
        console.error("Erro ao buscar carros estacionados:", error);
      }
    };

    fetchDataAndSetTimer();

    const timer = setInterval(fetchDataAndSetTimer, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={{ width: "100%" }}>
      <Text style={stylesConfigs.title}>Lista de Usuários</Text>

      {clients.map((client, index) => (
        <TouchableOpacity
          onPress={() =>
            alert("Abrir tela de edição aqui para a cliente " + client.nome)
          }
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
    </ScrollView>
  );
};

export default ViewClientsComponent;
