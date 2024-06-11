import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { db } from "../../config";
import { stylesConfigs } from "../../../assets/css/configSty";
import { stylesDetails } from "../../../assets/css/detailsStyle";
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
import {
  getStartOfDay,
  getStartOfLast7Days,
  getStartOfSpecificDay,
} from "../../utils/dateUtils";
import DatePicker from "@react-native-community/datetimepicker";

const HistoricComponent = () => {
  const [historic, setHistoric] = useState([]);
  const [clients, setClients] = useState({});
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchDate, setSearchDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredHistoric, setFilteredHistoric] = useState([]);
  const [hasFilteredResults, setHasFilteredResults] = useState(true);
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

  const applyFilter = (data) => {
    const now = new Date();
    let filteredData = data;

    if (filter === "today") {
      const startOfDay = getStartOfDay(now);
      filteredData = data.filter((item) => item.hora_entrada.seconds >= startOfDay.getTime() / 1000);
    } else if (filter === "last7Days") {
      const startOfLast7Days = getStartOfLast7Days(now);
      filteredData = data.filter((item) => item.hora_entrada.seconds >= startOfLast7Days.getTime() / 1000);
    } else if (filter === "specificDay" && searchDate) {
      const startOfSpecificDay = getStartOfSpecificDay(new Date(searchDate));
      const endOfSpecificDay = new Date(startOfSpecificDay);
      endOfSpecificDay.setDate(endOfSpecificDay.getDate() + 1);
      filteredData = data.filter(
        (item) =>
          item.hora_entrada.seconds >= startOfSpecificDay.getTime() / 1000 &&
          item.hora_entrada.seconds < endOfSpecificDay.getTime() / 1000
      );
    }

    if (searchText) {
      filteredData = filteredData.filter((item) =>
        item.placa.includes(searchText) ||
        clients[item.cliente_id]?.nome.includes(searchText)
      );
    }

    return filteredData;
  };

  useEffect(() => {
    const fetchDataAndSetTimer = async () => {
      setIsLoading(true);
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

        const clientIds = [...new Set(historicData.map(item => item.cliente_id))];
        let clientsInfos = {};
        for (const clientId of clientIds) {
          const clientDocRef = doc(db, "clientes", clientId);
          const clientDoc = await getDoc(clientDocRef);
          if (clientDoc.exists()) {
            clientsInfos[clientId] = { id: clientDoc.id, ...clientDoc.data() };
          }
        }

        const filteredData = applyFilter(historicData);
        if (filteredData.length > 0) {
          const updatedTimes = await Promise.all(
            filteredData.map(async (documento) => {
              const Entrada = timeConverter(documento.hora_entrada.seconds);
              const saida = timeConverter(documento.hora_saida.seconds);
              return {
                ...documento,
                entrada: Entrada,
                saida: saida,
              };
            })
          );
          setFilteredHistoric(updatedTimes);
          setHasFilteredResults(true);
        } else {
          setFilteredHistoric([]);
          setHasFilteredResults(false);
        }

        setHistoric(historicData);
        setClients(clientsInfos);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        setIsLoading(false);
      }
    };

    fetchDataAndSetTimer();

    const timer = setInterval(fetchDataAndSetTimer, 10000000);

    return () => clearInterval(timer);
  }, [filter, searchDate, searchText]);

  return (
    <ScrollView style={stylesDetails.container}>
      <View>

        <TextInput
          style={stylesDetails.searchBar}
          placeholder="Pesquisar por nome ou placa"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={stylesDetails.filterContainer}>
        <Button title="Selecionar Dia" onPress={() => setShowDatePicker(true)} />
        <Button title="Limpar Filtro" onPress={() => setFilter("all")} />
        {showDatePicker && (
          <DatePicker
            value={searchDate}
            mode="date"
            onChange={(event, selected) => {
              setShowDatePicker(false);
              if (event.type === "set") {
                setSearchDate(selected || searchDate);
                setFilter("specificDay");
              }
            }}
          />
        )}
      </View>

      {filteredHistoric.length === 0 && hasFilteredResults === false ? (
        <Text style={{color:'#fff'}}>Não há registros para a data selecionada.</Text>
      ) : (
        filteredHistoric.map((itemHistoric, index) => {
          const client = clients[itemHistoric.cliente_id];
          return (
            <TouchableOpacity
              onPress={() => openModal(client, itemHistoric)}
              key={index}
              style={stylesDetails.itemHistorico}
            >
              <View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={stylesDetails.itemText}>Cliente:</Text>
                  <Text>{client ? ` ${client.nome}` : ""}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={stylesDetails.itemText}>Placa:</Text>
                  <Text>{` ${itemHistoric.placa}`}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={stylesDetails.itemText}>Data:</Text>
                  <Text>{` ${itemHistoric.entrada}`}</Text>
                </View>
              </View>
              <View>
                <Text></Text>
                <Text>Detalhes</Text>
                <Text></Text>
              </View>
            </TouchableOpacity>
          );
        })
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={stylesDetails.modalOverlay}>
          <View style={stylesDetails.modalContent}>
            <Text style={stylesDetails.modalTitle}>Detalhes</Text>
            {selectedClient && (
              <>
                <Text style={stylesDetails.modalText}>
                  Nome do Cliente: {selectedClient.nome}
                </Text>
                <Text style={stylesDetails.modalText}>
                  CPF do Cliente: {selectedClient.cpf}
                </Text>
                <Text style={stylesDetails.modalText}>
                  Telefone do Cliente: {selectedClient.telefone}
                </Text>
                <Text style={stylesDetails.modalText}>
                  Placa do Veículo: {item.placa}
                </Text>
                <Text style={stylesDetails.modalText}>
                  Hora de Entrada: {item.entrada}
                </Text>
                <Text style={stylesDetails.modalText}>
                  Hora de Saída: {item.saida}
                </Text>
              </>
            )}
            <TouchableHighlight
              style={stylesDetails.closeButton}
              onPress={closeModal}
              underlayColor="#1E88E5"
            >
              <Text style={stylesDetails.closeButtonText}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HistoricComponent;
