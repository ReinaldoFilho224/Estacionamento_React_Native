import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native"; 
import Modal from 'react-native-modal';
import { styles } from "../../assets/css/home";
import ButtonMenu from "../components/home/buttonsMenu";
import CheckInPage from "../components/checkin/checkin";
import ListCheckout from "../components/checkout/listCheckout";
import AddClientsComponent from "../components/config/addClientsModal";
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from "../config";
import { getDocs, collection, query, where  } from "firebase/firestore";
import { useGlobalState } from "../config/refresh";

const initialvalues = [{'preco_hora':0,'vagas_dis':0}]

const Home = () => {
    const {isModalVisible, setModalVisible} = useGlobalState();
    const [modalContent, setModalContent] = useState(null);
    const [configs, setConfigs] = useState(initialvalues[0])
    const { refresh, setRefresh, user, setParkConfigs, vagasOcup } = useGlobalState();

    const handleCheckin = () => {
        setModalContent("checkin");
        setModalVisible(true);
    };

    const handleCheckout = () => {
        setModalContent("checkout");
        setModalVisible(true);
    };

    const handleAddClient = () => {
        setModalContent("addClient");
    };

    const renderModalContent = () => {
        if (modalContent === "checkin") {
            return <CheckInPage />;
        } else if (modalContent === "checkout") {
            return <ListCheckout setModalVisible={setModalVisible}/>;
        } else if (modalContent === "addClient") {
            return <AddClientsComponent />;
        }
        return null;
    };

    useEffect(() => {
        const fetchDataAndSetTimer = async () => {
          try {
            const configQuery = query(
                collection(db, "configs"),
                where("park_id", "==", user.uid)
            )

            const querySnapshot = await getDocs(configQuery);
            const configsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));

            setConfigs(configsData[0]);
            setParkConfigs(configsData[0])

          } catch (error) {
            console.error("Erro ao buscar configurações:", error);
          }
        };
        fetchDataAndSetTimer();
      }, [refresh]);
    

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.textContainerWrapper}>
                    <View style={styles.textContainer}>
                        <Text>{`Vagas Livres: ${configs.vagas_dis-vagasOcup}/${configs.vagas_dis}`}</Text>
                    </View>
                </View>
                <View style={styles.textContainerWrapper}>
                    <View style={styles.textContainer}>
                        <Text>{`Valor da Hora: ${(configs.preco_hora).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.lineMenu}>
                <View style={styles.menuArea}>
                <ButtonMenu
                        functionModal={handleCheckin}
                        icon="checkmark-circle-outline"
                        iconColor="green"
                        textButton="Realizar Checkin"
                    />

                    <ButtonMenu
                        functionModal={handleCheckout}
                        icon="log-out-outline"
                        iconColor="red"
                        textButton="Realizar Checkout"
                    />
                </View>
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={styles.modalContent}>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonClose}>
                                <Icon name="chevron-back-outline" size={30} color="#000" />
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.modalHeaderText}>
                            {modalContent === "checkin" ?
                                'Realizar Checkin' :
                                modalContent === "checkout" ?
                                    'Realizar Checkout' :
                                    'Adicionar Cliente'}
                        </Text>
                        {modalContent === "checkin" &&
                            <TouchableOpacity onPress={handleAddClient}>
                                <Icon name="person-add-outline" size={30} color="#000" />
                            </TouchableOpacity>
                        }
                    </View>
                    {renderModalContent()}
                </View>
            </Modal>
        </View>
    );
};

export default Home;
