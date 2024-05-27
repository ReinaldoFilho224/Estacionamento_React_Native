import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { stylesCheckout } from "../../../assets/css/checkout";
import { CheckoutModal } from "./checkoutModal";
import { db } from "../../config";
import { useGlobalState } from "../../config/refresh";
import Spinner from 'react-native-loading-spinner-overlay';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const ListCheckout = () => {
    const [park, setPark] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { refresh, setRefresh } = useGlobalState();
    const [expanded, setExpanded] = useState(-1);

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
                <View style={stylesCheckout.checkoutView}>
                    {park.length > 0 ? park.map((car, index) => (
                        <List.Accordion
                            title={`${car.placa} - ${car.difTime}`}
                            expanded={expanded === index}
                            onPress={() => setExpanded(expanded === index ? -1 : index)}
                        >   
                            <CheckoutModal document={car} setRefresh={invertRefresh} />
                        </List.Accordion>
                    )) :
                        <View style={stylesCheckout.textView}>
                            <Text style={stylesCheckout.text}>Nenhum veículo estacionado</Text>
                        </View>
                    }
                </View>
            )}
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
