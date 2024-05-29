import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Modal from 'react-native-modal';
import { styles } from "../../assets/css/home";
import ButtonMenu from "../components/home/buttonsMenu";
import CheckInPage from "../components/checkin/checkin";
import ListCheckout from "../components/checkout/listCheckout";
import AddClientsComponent from "../components/config/addClientsModal";
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from "../config";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useGlobalState } from "../config/refresh";
import ViewClientsComponent from "../components/config/viewClientsModal";


const Home = () => {
    const { isModalVisible, setModalVisible } = useGlobalState();
    const [modalContent, setModalContent] = useState(null);
    const { refresh, setRefresh, user, setParkConfigs, parkConfigs } = useGlobalState();

    const handleCheckin = () => {
        setModalContent("checkin");
        setModalVisible(true);
    };

    const handleCheckout = () => {
        setModalContent("checkout");
        setModalVisible(true);
    };

    const handleListClient = () => {
        setModalContent("listClient");
        setModalVisible(true);
    };
    const handleHistory = () => {
        setModalContent("history");
        setModalVisible(true);
    };
    const handleConfig = () => {
        setModalContent("config");
        setModalVisible(true);
    };
    const handleAddClient = () => {
        setModalContent("addClient");
        setModalVisible(true);
    };

    const renderModalContent = () => {
        if (modalContent === "checkin") {
            return <CheckInPage />;
        } else if (modalContent === "checkout") {
            return <ListCheckout setModalVisible={setModalVisible} />;
        } else if (modalContent === "addClient") {
            return <AddClientsComponent />;
        } else if (modalContent === "listClient") {
            return <ViewClientsComponent />;
        } else if (modalContent === "history") {
            return <AddClientsComponent />;
        } else if (modalContent === "Config") {
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
                );

                const querySnapshot = await getDocs(configQuery);
                const configsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log(user.uid);

                if (configsData.length > 0) {
                    setParkConfigs(configsData[0]);
                } else {
                    console.log("Nenhuma configuração encontrada para o park_id fornecido.");
                }
            } catch (error) {
                console.error("Erro ao buscar configurações:", error);
            }
        };
        fetchDataAndSetTimer();
    }, [refresh]);


    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View>
                    <Text style={styles.text}>{user.displayName}</Text>
                    <Text style={styles.textSmall}>{`Valor da Hora: ${parkConfigs.preco_hora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                </View>
                <View>
                    <Image
                        source={require('../../assets/user-icon.png')}
                        style={styles.image}
                    />
                </View>
            </View>
            <View style={styles.lines}>
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
                <View style={styles.lineMenu}>
                    <View style={styles.menuArea}>
                        <ButtonMenu
                            functionModal={handleListClient}
                            icon="people-outline"
                            iconColor="#1E829D"
                            textButton="Lista de Clientes"
                        // small
                        />

                        <ButtonMenu
                            functionModal={handleAddClient}
                            icon="person-add-outline"
                            iconColor="#1E829D"
                            textButton="Adicionar Cliente"
                        // small
                        />
                    </View>
                </View>
                <View style={styles.lineMenu}>
                    <View style={styles.menuArea}>
                        <ButtonMenu
                            functionModal={handleHistory}
                            icon="time-outline"
                            iconColor="#1E829D"
                            textButton="Historico"
                        />
                        <ButtonMenu
                            functionModal={handleConfig}
                            icon="settings-outline"
                            iconColor="#1E829D"
                            textButton="Configuração"
                        />
                    </View>
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
                                    modalContent === "listClient" ?
                                        'Lista de Clientes'
                                        : modalContent === "history" ?
                                            'Historico'
                                            : modalContent === "config" ?
                                                'Configuração'
                                                :
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
