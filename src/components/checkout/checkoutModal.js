import { collection, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { View, Text, Modal, TouchableOpacity } from "react-native"
import { stylesCheckout } from "../../../assets/css/checkout"
import { db } from "../../config";

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

export const CheckoutModal = ({ closeModal, modalVisible, setRefresh , document }) => {
  if (!document) {
    return null;
  }

  const executeCheckout = async () => {
    const horaSaida = new Date();
    try {
      await addDoc(collection(db, "transacoes"), {
        hora_entrada: document.hora_entrada.toDate(),
        hora_saida: Timestamp.fromDate(horaSaida),
        placa: document.placa,
        valor_pago: ((document.preco_hora / 60) * document.difMin),
        preco_hora: document.preco_hora,
      });

      await addDoc(collection(db, "historico"), {
        cliente_id: document.cliente_id,
        hora_entrada: document.hora_entrada.toDate(),
        hora_saida: Timestamp.fromDate(horaSaida),
        placa: document.placa,
        valor_pago: ((document.preco_hora / 60) * document.difMin),
      });

      await deleteDoc(doc(db, 'estacionamento', document.id));

      closeModal()
      setRefresh()

      alert("Check-out realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar o check-out:", error);
      alert("Erro ao realizar o check-out. Por favor, tente novamente.");
    }
  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={stylesCheckout.modalContainer}>
        <View style={stylesCheckout.modal}>
          <Text style={stylesCheckout.modalTitle}>Realizar Pagamento</Text>
          <ClienteTab cliente={document.cliente} />
          <VeiculoTab veiculo={document} />
          <View>
            <Text style={stylesCheckout.modalTabTitle}>Total a Pagar: {((document.preco_hora / 60) * document.difMin).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
          </View>
          <TouchableOpacity onPress={() => executeCheckout()} style={stylesCheckout.modalCheckoutButton}>
            <Text style={stylesCheckout.modalCloseButtonText}> Fazer Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={stylesCheckout.modalCloseButton}>
            <Text style={stylesCheckout.modalCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

  );
};

