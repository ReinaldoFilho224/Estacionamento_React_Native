import { View, Text, TouchableOpacity, Modal } from "react-native"
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { stylesCheckout } from "../../../assets/css/checkout";
import { CheckoutModal } from "./checkoutModal";
import { db } from "../../config";

const ListCheckout = () => {

    const [park, setPark] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);


    const openModal = (document) => {
        setSelectedDocument(document);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    useEffect(() => {
        const fetchDataAndSetTimer = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "estacionamento"));
                const estacionamentoData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                if (estacionamentoData.length > 0) {
                    const updatedTimes = estacionamentoData.map((documento) => {
                        const horaEntradaEmMilissegundos = documento.hora_entrada.seconds * 1000 + documento.hora_entrada.nanoseconds / 1000000;
                        const horaAtualEmMilissegundos = Date.now();

                        const diferencaEmMilissegundos = horaAtualEmMilissegundos - horaEntradaEmMilissegundos;

                        const horas = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60)); // Calcula as horas
                        const minutos = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60)); // Calcula os minutos

                        return {
                            ...documento,
                            difTime: `${horas}:${minutos < 10 ? '0' : ''}${minutos} minutos`,
                            difMin: (diferencaEmMilissegundos / 1000) / 60
                        };
                    });

                    setPark(updatedTimes);
                } else {
                    console.log("Nenhum carro estacionado encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar carros estacionados:", error);
            }
        };

        fetchDataAndSetTimer();

        const timer = setInterval(fetchDataAndSetTimer, 60000);

        return () => clearInterval(timer);
    }, []);

    return (
        <View style={stylesCheckout.checkoutDiv}>
            {park.map((car, index) => (
                <View key={index} style={stylesCheckout.checkoutItem}>
                    <Text style={stylesCheckout.text}>
                        {car.placa} - {car.difTime} - {((car.preco_hora / 60) * car.difMin).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Text>
                    <TouchableOpacity
                        style={stylesCheckout.button}
                        onPress={() => openModal(car)}
                    >
                        <Text style={stylesCheckout.textButton}>
                            Pagar
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
            <CheckoutModal closeModal={closeModal} modalVisible={modalVisible} document={selectedDocument} />
        </View>
    )
}

export default ListCheckout;