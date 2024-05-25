import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { stylesCheckout } from "../../../assets/css/checkout";
import { CheckoutModal } from "./checkoutModal";
import { db } from "../../config";
import { useGlobalState } from "../../config/refresh";
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';

const ListCheckout = () => {
    const [park, setPark] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { refresh, setRefresh } = useGlobalState();

    const openModal = (document) => {
        setSelectedDocument(document);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const invertRefresh = () => {
        setRefresh(!refresh);
    };

    function adicionarZero(numero) {
        return numero < 10 ? `0${numero}` : numero;
    }

    useEffect(() => {
        const fetchDataAndSetTimer = async () => {
            try {
                setIsLoading(true);
                const querySnapshot = await getDocs(collection(db, "estacionamento"));
                const estacionamentoData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                if (estacionamentoData.length > 0) {
                    const updatedTimes = await Promise.all(estacionamentoData.map(async (documento) => {
                        const horaEntradaEmMilissegundos = documento.hora_entrada.seconds * 1000 + documento.hora_entrada.nanoseconds / 1000000;
                        const horaAtualEmMilissegundos = Date.now();
                        const diferencaEmMilissegundos = horaAtualEmMilissegundos - horaEntradaEmMilissegundos;
                        const horas = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60));
                        const minutos = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60));
                        const clienteSnapshot = await getDoc(doc(db, "clientes", documento.cliente_id));
                        const clienteData = clienteSnapshot.exists() ? clienteSnapshot.data() : null;
                        const horaEntrada = new Date(horaEntradaEmMilissegundos);
                        const dia = adicionarZero(horaEntrada.getDate());
                        const mes = adicionarZero(horaEntrada.getMonth() + 1);
                        const ano = horaEntrada.getFullYear();
                        const hora = adicionarZero(horaEntrada.getHours());
                        const minuto = adicionarZero(horaEntrada.getMinutes());
                        const segundo = adicionarZero(horaEntrada.getSeconds());
                        const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
                        return {
                            ...documento,
                            difTime: `${horas}h:${minutos < 10 ? '0' : ''}${minutos}m`,
                            difMin: (diferencaEmMilissegundos / 1000) / 60,
                            cliente: clienteData,
                            date: dataFormatada
                        };
                    }));
                    setPark(updatedTimes);
                } else {
                    console.log("Nenhum carro estacionado encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar carros estacionados:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataAndSetTimer();

        const timer = setInterval(fetchDataAndSetTimer, 60000);

        return () => clearInterval(timer);
    }, [refresh]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading ? (
                <Spinner
                    visible={isLoading}
                    textContent={'Carregando...'}
                    textStyle={{ color: '#FFF' }}
                    overlayColor={'rgba(0, 0, 0, 0.7)'}
                />
            ) : (
                <>
                    {park.length > 0 ? (
                        park.map((car, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.item}
                                onPress={() => openModal(car)}
                            >
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemText}>
                                        {car.placa} - {car.difTime} - {((car.preco_hora / 60) * car.difMin).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </Text>
                                </View>
                                <Icon name="arrow-forward" size={24} color="#777" />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyView}>
                            <Text style={styles.emptyText}>Nenhum veículo estacionado</Text>
                        </View>
                    )}
                </>
            )}
            <CheckoutModal closeModal={closeModal} modalVisible={modalVisible} document={selectedDocument} setRefresh={invertRefresh} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    itemInfo: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
    },
    emptyView: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#777',
    },
});

export default ListCheckout;
