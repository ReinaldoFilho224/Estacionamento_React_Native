import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { db } from "../../config";
import { stylesConfigs } from "../../../assets/css/configSty";
import {
  collection,
  getDocs,
  getDoc,
  where,
  query,
  doc,
} from "firebase/firestore";
import { useGlobalState } from "../../config/refresh";
import Spinner from "react-native-loading-spinner-overlay";
import { timeConverter } from "../../utils/timeConverter";

const HistoricComponent = () => {
  const [historic, setHistoric] = useState([]);
  const [clients, setClients] = useState([]);
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const { user } = useGlobalState();

  const openModal = (client, item) => {
    setSelectedClient(client);
    setItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedClient(null);
  };

  useEffect(() => {
    const fetchDataAndSetTimer = async () => {
      clients.length === 0 ? setIsLoading(true) : setIsLoading(false);
      try {
        const historicQuery = query(
          collection(db, "historico"),
          where("park_id", "==", user.uid)
        );

        const querySnapshot = await getDocs(historicQuery);
        const historicData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (historicData.length > 0) {
          const updatedTimes = await Promise.all(
            historicData.map(async (documento) => {
              const Entrada = timeConverter(documento.hora_entrada.seconds);
              const saida = timeConverter(documento.hora_saida.seconds);
              return {
                ...documento,
                entrada: Entrada,
                saida: saida,
              };
            })
          );
          setHistoric(updatedTimes);
          setIsLoading(false);
        }

        let listClients = [];
        historicData.forEach((itemHistoric) => {
          listClients.push(itemHistoric.cliente_id);
        });

        let clientsInfos = [];
        for (const client of listClients) {
          const clientDocRef = doc(db, "clientes", client);
          const clientDoc = await getDoc(clientDocRef);
          if (clientDoc.exists()) {
            clientsInfos.push({
              id: clientDoc.id,
              ...clientDoc.data(),
            });
          }
        }

        setClients(clientsInfos);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      }
    };

    fetchDataAndSetTimer();

    const timer = setInterval(fetchDataAndSetTimer, 10000000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={{ width: "100%" }}>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={"Carregando..."}
          textStyle={{ color: "#FFF" }}
          overlayColor={"#000"}
        />
      )}
      {historic.map((itemHistoric, index) => (
        <TouchableOpacity
          onPress={() => openModal(clients[index], itemHistoric)}
          key={index}
          style={stylesConfigs.itensHistorico}
        >
          <View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Cliente:</Text>
              <Text>
                {clients.length != 0 ? ` ${clients[index].nome}` : ""}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Placa:</Text>
              <Text>{` ${itemHistoric.placa}`}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Data:</Text>
              <Text>{` ${itemHistoric.entrada}`}</Text>
            </View>
          </View>
          <View>
            <Text></Text>
            <Text>Detalhes</Text>
            <Text></Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={stylesConfigs.modalOverlay}>
          <View style={stylesConfigs.modalContent}>
            <Text style={stylesConfigs.modalTitle}>Detalhes</Text>
            <View style={stylesConfigs.cardInfoHistorico}>
              {selectedClient && (
                <>
                  <Text style={stylesConfigs.cardInfoHistoricoText}>
                    Nome do Cliente: {selectedClient.nome}
                  </Text>
                  <Text style={stylesConfigs.cardInfoHistoricoText}>
                    CPF do Cliente: {selectedClient.cpf}
                  </Text>
                  <Text style={stylesConfigs.cardInfoHistoricoText}>
                    Telefone do Cliente: {selectedClient.telefone}
                  </Text>
                  <Text style={stylesConfigs.cardInfoHistoricoText}>
                    Placa do Veículo: {item.placa}
                  </Text>
                  <Text style={stylesConfigs.cardInfoHistoricoHighlight}>
                    Hora de Entrada: {item.entrada}
                  </Text>
                  <Text style={stylesConfigs.cardInfoHistoricoHighlight}>
                    Hora de Saída: {item.saida}
                  </Text>
                </>
              )}
            </View>
            <Button title="Fechar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HistoricComponent;
