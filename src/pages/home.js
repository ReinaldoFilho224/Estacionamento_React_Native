import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native"; 
import Modal from 'react-native-modal';
import { styles } from "../../assets/css/home";
import ButtonMenu from "../components/home/buttonsMenu";
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
                <View style={styles.textContainerWrapper}>
                    <View style={styles.textContainer}>
                        <Text>Vagas Livres: 100</Text>
                    </View>
                </View>
                <View style={styles.textContainerWrapper}>
                    <View style={styles.textContainer}>
                        <Text>Valor da Hora: R$ 8,00</Text>
                    </View>
                </View>
            </View>
            <View style={styles.lineMenu}>
                <View style={styles.menuArea}>
                    <TouchableOpacity style={styles.buttonMenu} onPress={handleCheckin}>
                        <View style={styles.buttonMenuIcons}>
                            <Icon name="checkmark-circle-outline" size={30} color="green" />
                            <Text style={styles.buttonText}>Realizar Checkin</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonMenu} onPress={handleCheckout}>
                        <View style={styles.buttonMenuIcons}>
                            <Icon name="log-out-outline" size={30} color="red" />
                            <Text style={styles.buttonText}>Realizar Checkout</Text>
                        </View>
                    </TouchableOpacity>
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
