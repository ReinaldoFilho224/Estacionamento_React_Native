import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "../../config";
import { useGlobalState } from "../../config/refresh";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

const ProfitReport = () => {
    const [dailyProfit, setDailyProfit] = useState(0);
    const [weeklyProfit, setWeeklyProfit] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useGlobalState();

    useEffect(() => {
        const fetchAndCalculateProfits = async () => {
            setIsLoading(true);
            try {
                const todayStart = moment().startOf('day').toDate();
                const todayEnd = moment().endOf('day').toDate();
                const weekStart = moment().startOf('week').toDate();
                const weekEnd = moment().endOf('week').toDate();

                // Consultas para as coleções estacionamento e historico
                const estacionamentoQuery = query(
                    collection(db, "estacionamento"),
                    where("park_id", "==", user.uid),
                    where("hora_entrada", ">=", Timestamp.fromDate(weekStart)),
                    where("hora_entrada", "<=", Timestamp.fromDate(weekEnd))
                );

                const historicoQuery = query(
                    collection(db, "historico"),
                    where("park_id", "==", user.uid),
                    where("hora_entrada", ">=", Timestamp.fromDate(weekStart)),
                    where("hora_entrada", "<=", Timestamp.fromDate(weekEnd))
                );

                const estacionamentoSnapshot = await getDocs(estacionamentoQuery);
                const historicoSnapshot = await getDocs(historicoQuery);

                let dailyProfitSum = 0;
                let weeklyProfitSum = 0;

                // Calculando lucro da coleção estacionamento
                estacionamentoSnapshot.forEach(doc => {
                    const data = doc.data();
                    const entrada = data.hora_entrada.toDate();
                    const horasEstacionadas = (Date.now() - entrada.getTime()) / (1000 * 60 * 60);
                    const valorCobrado = horasEstacionadas * data.preco_hora;

                    if (entrada >= todayStart && entrada <= todayEnd) {
                        dailyProfitSum += valorCobrado;
                    }

                    weeklyProfitSum += valorCobrado;
                });

                // Calculando lucro da coleção historico
                historicoSnapshot.forEach(doc => {
                    const data = doc.data();
                    const entrada = data.hora_entrada.toDate();
                    const saida = data.hora_saida.toDate();
                    const valorPago = data.valor_pago;

                    if (saida >= todayStart && saida <= todayEnd) {
                        dailyProfitSum += valorPago;
                    }

                    weeklyProfitSum += valorPago;
                });

                setDailyProfit(dailyProfitSum);
                setWeeklyProfit(weeklyProfitSum);
                setIsLoading(false);
            } catch (error) {
                console.error("Erro ao buscar lucros:", error);
                setIsLoading(false);
            }
        };

        fetchAndCalculateProfits();
    }, [user]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading && (
                <Spinner
                    visible={isLoading}
                    textContent={'Carregando...'}
                    textStyle={{ color: '#FFF' }}
                    overlayColor={'rgba(0, 0, 0, 0.7)'}
                />
            )}

            <View style={styles.reportContainer}>
                <Text style={styles.title}>Relatório de Lucro</Text>
                <View style={styles.profitContainer}>
                    <Text style={styles.label}>Lucro Diário:</Text>
                    <Text style={styles.value}>{`R$ ${dailyProfit.toFixed(2)}`}</Text>
                </View>
                <View style={styles.profitContainer}>
                    <Text style={styles.label}>Lucro Semanal:</Text>
                    <Text style={styles.value}>{`R$ ${weeklyProfit.toFixed(2)}`}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    reportContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    profitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfitReport;
