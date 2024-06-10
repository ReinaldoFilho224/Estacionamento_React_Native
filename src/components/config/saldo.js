import { View, Text, Button, ScrollView } from "react-native";
import { useGlobalState } from "../../config/refresh";
import { db } from "../../config";
import { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import DatePicker from "@react-native-community/datetimepicker";
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
          setData(true);
          const totalPago = saldoData.reduce(
            (acc, item) => acc + item.valor_pago,
            0
          );
          setTotalValorPago(totalPago);

          setSaldo(saldoData);
        } else {
          setData(false);
          console.log("Nenhum Saldo encontrada para o park_id fornecido.");
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    };

    fetchDataSaldo();
  }, [selectedDate]);

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatDate = (dateTime) => {
    if (dateTime && dateTime !== "0001-01-01T00:00:00") {
      const date = new Date(dateTime);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      return `${day}`.concat("/", month, "/", date.getFullYear());
    }
    return "--";
  };

  return (
    <View style={SaldoStyle.subContainer}>
      <Button title="Selecionar Dia" onPress={() => setShowDatePicker(true)} />
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
          <Text style={SaldoStyle.textInfo}>
            Registros do Dia: {formatDate(selectedDate)}
          </Text>

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

          <View>
            <Text style={SaldoStyle.saldo}>
              Saldo Diário: {formatarMoeda(totalValorPago.toFixed(2))}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <Text style={SaldoStyle.textInfo}>
          Sem registros e saldo do dia {formatDate(selectedDate)}
        </Text>
      )}
    </View>
  );
};

export default Saldo;
