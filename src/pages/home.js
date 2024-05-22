import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Modal from 'react-native-modal';
import { styles } from "../../assets/css/home";
import ButtonMenu  from "../components/home/buttonsMenu";
import CheckInPage from "../components/checkin/checkin";
import ListCheckout from "../components/checkout/listCheckout";
import AddClientsComponent from "../components/config/addClientsModal";
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

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
            return <ListCheckout />;
        } else if (modalContent === "addClient") {
            return <AddClientsComponent />;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text>Vagas Livres: 100</Text>
                <Text>Valor da Hora: R$ 8,00</Text>
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
                        <TouchableOpacity onPress={modalContent === "addClient" ?
                            () => handleCheckin()
                            :
                            () => setModalVisible(false)}>
                            <Text style={styles.buttonClose}>
                                <Icon name="chevron-back-outline" size={30} color="#000" />
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>
                            {modalContent === "checkin" ?
                                'Realizar Checkin' :
                                modalContent === "checkout" ?
                                    'Realizar Checkout' :
                                    'Adicionar Cliente'}
                        </Text>
                        <View>
                            {modalContent === "checkin" ?
                                <TouchableOpacity onPress={() => handleAddClient()}>
                                    <Icon name="person-add-outline" size={30} color="#000" />
                                </TouchableOpacity>
                                :
                                <></>}
                        </View>
                    </View>
                    {renderModalContent()}
                </View>
            </Modal>
        </View>
    );
};

export default Home;
