import { View, Text, Modal, TouchableOpacity } from "react-native"
import { stylesCheckout } from "../../../assets/css/checkout"

export const CheckoutModal = ({ closeModal, modalVisible, document }) => {
    if (!document) {
      return null;
    }
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={stylesCheckout.modalContainer}>
          <View>
            {/* Conteúdo do modal */}
            <View style={stylesCheckout.modal}>
              <Text>Placa: {document.placa}</Text>
              <Text>Diferença de Tempo: {document.difTime}</Text>
              {/* Adicione mais informações aqui, conforme necessário */}
              <TouchableOpacity onPress={closeModal}>
                <Text style={stylesCheckout.modalCloseButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
            {/* Botão para fechar o modal */}
          </View>
        </View>
      </Modal>
    );
  };
  
  