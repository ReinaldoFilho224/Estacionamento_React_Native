import { collection, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { stylesCheckout } from "../../../assets/css/checkout"
import { db } from "../../config";
import { useGlobalState } from "../../config/refresh";
import Toast from "react-native-toast-message";

const ClienteTab = ({ cliente }) => (
  <View style={stylesCheckout.modalTab}>
    <Text style={stylesCheckout.modalTabTitle}>Dados do Cliente</Text>
    <View style={stylesCheckout.modalContent}>
      <Text style={stylesCheckout.modalLabel}>Nome:</Text>
      <Text>{cliente.nome}</Text>
      <Text style={stylesCheckout.modalLabel}>Telefone:</Text>
      <Text>{cliente.telefone}</Text>
      <Text style={stylesCheckout.modalLabel}>CPF:</Text>
      <Text>{cliente.cpf}</Text>
    </View>
  </View>
);

const VeiculoTab = ({ veiculo }) => (
  <View style={stylesCheckout.modalTab}>
    <Text style={stylesCheckout.modalTabTitle}>Dados do Veículo</Text>
    <View style={stylesCheckout.modalContent}>
      <Text style={stylesCheckout.modalLabel}>Placa:</Text>
      <Text>{veiculo.placa}</Text>
      <Text style={stylesCheckout.modalLabel}>Estacionado:</Text>
      <Text>{veiculo.date}</Text>
      <Text style={stylesCheckout.modalLabel}>Tempo Estacionado:</Text>
      <Text>{veiculo.difTime}</Text>
      <Text style={stylesCheckout.modalLabel}>Preço por Hora:</Text>
      <Text>{veiculo.preco_hora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
    </View>
  </View>
);

export const CheckoutModal = ({ document }) => {
  const showToastCheckoutOk = () => {
    Toast.show({
      type: 'success',
      text1: 'Check-out realizado com sucesso!',
    })
  };
  const showToastCheckoutNotOK = () => {
    Toast.show({
      type: 'error',
      text1: 'Erro ao realizar o check-out. Por favor, tente novamente.',
    })
  };
  const { refresh, setRefresh } = useGlobalState();
  const {isModalVisible, setModalVisible, user} = useGlobalState();


  if (!document) {
    return null;
  }

  const executeCheckout = async () => {
    const horaSaida = new Date();
    try {
      await addDoc(collection(db, "transacoes"), {
        park_id: user.uid,
        hora_entrada: document.hora_entrada.toDate(),
        hora_saida: Timestamp.fromDate(horaSaida),
        placa: document.placa,
        valor_pago: ((document.preco_hora / 60) * document.difMin),
        preco_hora: document.preco_hora,
      });

      await addDoc(collection(db, "historico"), {
        park_id: user.uid,
        cliente_id: document.cliente_id,
        hora_entrada: document.hora_entrada.toDate(),
        hora_saida: Timestamp.fromDate(horaSaida),
        placa: document.placa,
        valor_pago: ((document.preco_hora / 60) * document.difMin),
      });

      await deleteDoc(doc(db, 'estacionamento', document.id));

      // closeModal()
      setModalVisible(false)
      setRefresh(!refresh)

      showToastCheckoutOk()
    } catch (error) {
      console.error("Erro ao realizar o check-out:", error);
      showToastCheckoutNotOK()
    }
  }

  return (
    <View style={stylesCheckout.modalContainer}>
      <View style={stylesCheckout.modal}>
        <ScrollView>
          <View style={stylesCheckout.cards}>
            <ClienteTab cliente={document.cliente} />
            <VeiculoTab veiculo={document} />
          </View>
          <View>
            <Text style={stylesCheckout.modalTabTitle}>Total a Pagar: {((document.preco_hora / 60) * document.difMin).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
          </View>
          <TouchableOpacity onPress={() => executeCheckout()} style={stylesCheckout.modalCheckoutButton}>
            <Text style={stylesCheckout.modalCloseButtonText}> Fazer Checkout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Toast/>
    </View>
  );
};

