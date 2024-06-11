import React from "react";
import { collection, addDoc, Timestamp, where, query, getDocs } from "firebase/firestore";
import { db } from '../../config/index'
import CheckInForm from "./formCheckIn";
import { useGlobalState } from "../../config/refresh";
import Toast from "react-native-toast-message";

const CheckInPage = () => {
  const { refresh, setRefresh, user, parkConfigs, setModalVisible } = useGlobalState();

  
  const handleCheckIn = async (formData) => {
    const showToastCheckinOk = () => {
      Toast.show({
        type: 'success',
        text1: 'Check-In realizado com sucesso!',
      })
    };
    const showToastVeiculoEstacionado = () => {
      Toast.show({
        type: 'info',
        text1: 'Veículo já está no estacionamento',
      })
    };
    try {
      const parkQuery = query(
        collection(db, "estacionamento"),
        where("placa", "==", formData.placa),
        where("park_id", "==", user.uid)
      );

      const queryParkSnapshot = await getDocs(parkQuery);
      if (queryParkSnapshot.empty) {
        await addDoc(collection(db, "estacionamento"), {
          park_id: user.uid,
          cliente_id: formData.clienteId,
          hora_entrada: Timestamp.fromDate(formData.horaEntrada),
          placa: formData.placa,
          preco_hora: parkConfigs.preco_hora,
          status: true
        });
        showToastCheckinOk()
      } else {
        setModalVisible(false)
        showToastVeiculoEstacionado()
      }

      const placasQuery = query(
        collection(db, "placas"),
        where("placa", "==", formData.placa),
        where("park_id", "==", user.uid)
      );
      const querySnapshot = await getDocs(placasQuery);

      if (querySnapshot.empty) {
        await addDoc(collection(db, "placas"), {
          park_id: user.uid,
          placa: formData.placa,
          cliente_id: formData.clienteId,
        });
      } else {
        console.log("Placa já registrada");
      }
      setRefresh(!refresh)
    } catch (error) {
      console.error("Erro ao realizar o check-in:", error);
      alert("Erro ao realizar o check-in. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <CheckInForm onCheckIn={handleCheckIn} />
      <Toast />
    </>
  );
};

export default CheckInPage;
