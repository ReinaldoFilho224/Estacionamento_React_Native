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
            <View style={stylesCheckout.modal}>
              <Text>Placa: {document.placa}</Text>
              <Text>Diferença de Tempo: {document.difTime}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={stylesCheckout.modalCloseButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  