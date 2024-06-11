import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { styles } from "../../assets/css/home";
import ButtonMenu from "../components/home/buttonsMenu";
import CheckInPage from "../components/checkin/checkin";
import ListCheckout from "../components/checkout/listCheckout";
import AddClientsComponent from "../components/config/addClientsModal";
import Icon from "react-native-vector-icons/Ionicons";
import { db } from "../config";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useGlobalState } from "../config/refresh";
import ViewClientsComponent from "../components/config/viewClientsModal";
import HistoricComponent from "../components/config/historicModal";
import Config from "./config";
import Saldo from "../components/config/saldo";
import { auth } from "../config";
import { signOut} from "firebase/auth";
import Toast from "react-native-toast-message";

const Home = () => {

  const showToastCheckinoff = () => {
    Toast.show({
      type: 'info',
      text1: 'Todas as Vagas estão ocupadas',
    })
  };
  const showToastVerifyEmail = () => {
    Toast.show({
      type: 'error',
      text1: 'Verifique seu email, para liberar o aplicativo',
      text2: 'Você voltará a tela de login em 30 segundos'
    })
  };

  const [vagasOcupadas, setVagasOcupadas] = useState(0);
  const { isModalVisible, setModalVisible } = useGlobalState();
  const [modalContent, setModalContent] = useState(null);
  const { refresh, setUser, user, setParkConfigs, parkConfigs } =
    useGlobalState();

  const handleModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case "checkin":
        return <CheckInPage setModalVisible={setModalVisible}/>;
      case "checkout":
        return <ListCheckout setModalVisible={setModalVisible} />;
      case "addClient":
        return <AddClientsComponent />;
      case "listClient":
        return <ViewClientsComponent />;
      case "history":
        return <HistoricComponent />;
      case "config":
        return <Config />;
      case "saldo":
        return <Saldo />;
      default:
        return null;
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuário desconectado");
      })
      .catch((error) => {
        console.error("Erro ao desconectar:", error);
      });
  };

  useEffect(() => {
    setModalVisible(false)
  },[vagasOcupadas])  


  useEffect(() => {
    if (!user.emailVerified) {
      showToastVerifyEmail()
      const timeoutId = setTimeout(() => {
        signOut(auth)
          .then(() => {
            console.log("Usuário desconectado após 30 segundos");
          })
          .catch((error) => {
            console.error("Erro ao desconectar:", error);
          });
      }, 30000);

      return () => clearTimeout(timeoutId);
    }
  }, [user]);

  useEffect(() => {
    const fetchDataAndSetTimer = async () => {
      try {
        const configQuery = query(
          collection(db, "configs"),
          where("park_id", "==", user.uid)
        );

        const querySnapshot = await getDocs(configQuery);
        const configsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const ParkQuery = query(
          collection(db, "estacionamento"),
          where("park_id", "==", user.uid)
        );

        const ParkSnapshot = await getDocs(ParkQuery);
        const parkData = ParkSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVagasOcupadas(parkData.length);

        if (configsData.length > 0) {
          setParkConfigs(configsData[0]);
        } else {
          console.log(
            "Nenhuma configuração encontrada para o park_id fornecido."
          );
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    };
    fetchDataAndSetTimer();

    }, [refresh, user]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.text}>{user.displayName}</Text>
          <Text
            style={styles.textSmall}
          >{`Valor da Hora: ${parkConfigs.preco_hora.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text style={styles.textSmall}>{`Vagas Disponiveis:  ${parkConfigs.vagas_dis - vagasOcupadas
            }/${parkConfigs.vagas_dis}`}</Text>
        </View>
        <View>
          <Image
            source={require("../../assets/user-icon.png")}
            style={styles.image}
          />
        </View>
      </View>
      {!user.emailVerified
        ?
        <View>
          <Toast />
          <View style={styles.lineMenu}>
            <View style={styles.menuArea}>
              <ButtonMenu
                functionModal={handleSignOut}
                icon="log-out-outline"
                iconColor="red"
                textButton="Sair"
              />
            </View>
          </View>
        </View>
        :
        <View>
          <View style={styles.lines}>
            <View style={styles.lineMenu}>
              <View style={styles.menuArea}>
                <ButtonMenu
                  functionModal={parkConfigs.vagas_dis - vagasOcupadas === 0?() => showToastCheckinoff() :() => handleModal("checkin")}
                  icon="checkmark-circle-outline"
                  iconColor="green"
                  textButton="Realizar Checkin"
                />

                <ButtonMenu
                  functionModal={() => handleModal("checkout")}
                  icon="remove-circle-outline"
                  iconColor="red"
                  textButton="Realizar Checkout"
                />
              </View>
            </View>
            <View style={styles.lineMenu}>
              <View style={styles.menuArea}>
                <ButtonMenu
                  functionModal={() => handleModal("listClient")}
                  icon="people-outline"
                  iconColor="#102C57"
                  textButton="Lista de Clientes"
                />
                <ButtonMenu
                  functionModal={() => handleModal("addClient")}
                  icon="person-add-outline"
                  iconColor="#102C57"
                  textButton="Adicionar Cliente"
                />
              </View>
            </View>
            <View style={styles.lineMenu}>
              <View style={styles.menuArea}>
                <ButtonMenu
                  functionModal={() => handleModal("history")}
                  icon="time-outline"
                  iconColor="#102C57"
                  textButton="Historico"
                />
                <ButtonMenu
                  functionModal={() => handleModal("config")}
                  icon="settings-outline"
                  iconColor="#102C57"
                  textButton="Configuração"
                />
              </View>
            </View>
            <View style={styles.lineMenu}>
              <View style={styles.menuArea}>
                <ButtonMenu
                  functionModal={() => handleModal("saldo")}
                  icon="stats-chart-outline"
                  iconColor="orange"
                  textButton="Saldo"
                />
                <ButtonMenu
                  functionModal={handleSignOut}
                  icon="log-out-outline"
                  iconColor="red"
                  textButton="Sair"
                />
              </View>
            </View>
          </View>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={{ justifyContent: "flex-end", margin: 0, height: "100%" }}
          >
            <View style={styles.modalContent}>
              <View style={styles.headerModal}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="chevron-back-outline" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.modalHeaderText}>
                  {modalContent === "checkin"
                    ? "Realizar Checkin"
                    : modalContent === "checkout"
                      ? "Realizar Checkout"
                      : modalContent === "listClient"
                        ? "Lista de Clientes"
                        : modalContent === "history"
                          ? "Historico"
                          : modalContent === "config"
                            ? "Configuração"
                            : modalContent === "saldo"
                              ? "Saldo"
                              : "Adicionar Cliente"}
                </Text>
                {modalContent === "checkin" ? (
                  <TouchableOpacity onPress={() => handleModal("addClient")}>
                    <Icon name="person-add-outline" size={30} color="#fff" />
                  </TouchableOpacity>
                ) : modalContent === "config" ? (
                  <View onPress={() => handleModal("addClient")}>
                    <Icon name="settings" size={30} color="#fff" />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
              {renderModalContent()}
            </View>
          </Modal>
        </View>
      }
      <Toast/>
    </View >
  );
};

export default Home;
