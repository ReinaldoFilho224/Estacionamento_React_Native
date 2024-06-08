import { View, Text, Button, ScrollView } from "react-native";
import { useGlobalState } from "../../config/refresh";
import { db } from "../../config";
import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    where,
    query,
} from "firebase/firestore";
import DatePicker from '@react-native-community/datetimepicker';
import { SaldoStyle } from "../../../assets/css/saldo";

const Saldo = () => {
    const { user } = useGlobalState();
    const [saldo, setSaldo] = useState([]);
    const [totalValorPago, setTotalValorPago] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [data, setData] = useState(true);

    useEffect(() => {
        const fetchDataSaldo = async () => {
            try {
                const startOfDay = new Date(selectedDate);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(selectedDate);
                endOfDay.setHours(23, 59, 59, 999);

                const configQuery = query(
                    collection(db, "transacoes"),
                    where("park_id", "==", user.uid),
                    where("hora_saida", ">=", startOfDay),
                    where("hora_saida", "<=", endOfDay)
                );

                const querySnapshot = await getDocs(configQuery);
                const saldoData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                if (saldoData.length > 0) {
                    setData(true)
                    const totalPago = saldoData.reduce((acc, item) => acc + item.valor_pago, 0);
                    setTotalValorPago(totalPago);

                    setSaldo(saldoData);
                } else {
                    setData(false)
                    console.log(
                        "Nenhum Saldo encontrada para o park_id fornecido."
                    );
                }
            } catch (error) {
                console.error("Erro ao buscar configurações:", error);
            }
        };

        fetchDataSaldo();
    }, [selectedDate])

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }

    return (
        <View style={SaldoStyle.subContainer}>
            <Button title="Escolher Data" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DatePicker
                    value={selectedDate}
                    mode="date"
                    onChange={(event, selected) => {
                        setShowDatePicker(false);
                        if (event.type === "set") {
                            setSelectedDate(selected || selectedDate);
                        }
                    }}
                />
            )}

            {data ? (
                <ScrollView style={SaldoStyle.container}>
                    {saldo.map((item) => (
                        <View key={item.id} style={SaldoStyle.item}>
                            <View style={SaldoStyle.subitem}>
                                <Text>Placa: </Text>
                                <Text>{item.placa}</Text>
                            </View>
                            <View style={SaldoStyle.subitem}>
                                <Text>Preço hora: </Text>
                                <Text>{item.preco_hora}</Text>
                            </View>
                            <View style={SaldoStyle.subitem}>
                                <Text>Valor Pago: </Text>
                                <Text>{formatarMoeda(item.valor_pago)}</Text>
                            </View>

                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={{ color: '#fff', textAlign: 'center' }}>Nenhum registro de saldo nesse dia</Text>
            )}
            <View style={{}}>
                <Text style={SaldoStyle.saldo}>Saldo Diário: {formatarMoeda(totalValorPago.toFixed(2))}</Text>
            </View>
        </View>

    )
}

export default Saldo;
