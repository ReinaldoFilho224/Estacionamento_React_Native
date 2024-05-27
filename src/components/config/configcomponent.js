import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { List } from 'react-native-paper';
import ViewClientsComponent from './viewClientsModal';
import AddClientsComponent from './addClientsModal';
import ParkModalComponent from './parkModal';
import HistoricComponent from './historicModal';
import { stylesConfigs } from '../../../assets/css/config';
import { auth } from '../../config';

const Menu = [
  "Historico",
  "Estacionamento",
  "Saldo",
  { Cliente: ["Ver Clientes", "Adicionar Clientes"] },
];

const ConfigComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [expanded, setExpanded] = useState(-1);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('Usuário desconectado');
      })
      .catch((error) => {
        console.error('Erro ao desconectar usuário:', error);
      });
  };

  const handleMenuItemPress = (item) => {
    switch (item) {
      case "Ver Clientes":
        setModalContent(<ViewClientsComponent />);
        break;
      case "Adicionar Clientes":
        setModalContent(<AddClientsComponent />);
        break;
      case "Historico":
        setModalContent(<HistoricComponent />);
        break;
      case "Estacionamento":
        setModalContent(<ParkModalComponent />);
        break;
      default:
        setModalContent(null);
        break;
    }

    setModalVisible(true);
  };

  const handleSubMenuItemPress = (subItem) => {
    switch (subItem) {
      case "Ver Clientes":
        setModalContent(<ViewClientsComponent />);
        break;
      case "Adicionar Clientes":
        setModalContent(<AddClientsComponent />);
        break;
      default:
        setModalContent(null);
        break;
    }

    setModalVisible(true);
  };

  return (
    <View>
      {Menu.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleMenuItemPress(item)}>
          {typeof item === "string" ? (
            <List.Item title={item} />
          ) : (
            <List.Accordion
              title={Object.keys(item)[0]}
              expanded={expanded === index}
              onPress={() => setExpanded(expanded === index ? -1 : index)}
            >
              {item[Object.keys(item)[0]].map((subItem, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  onPress={() => handleSubMenuItemPress(subItem)}
                >
                  <List.Item title={subItem} />
                </TouchableOpacity>
              ))}
            </List.Accordion>
          )}
        </TouchableOpacity>
      ))}

      <View>
        <Button title="Sair" onPress={handleLogout} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={stylesConfigs.modal}>
          {modalContent}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={stylesConfigs.btnFechar}
          >
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ConfigComponent;
