import React from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../../config/index'
import CheckInForm from "./formCheckIn";
import { useGlobalState } from "../../config/refresh";

const CheckInPage = () => {
  const { refresh, setRefresh, user, parkConfigs} = useGlobalState();

  // console.log(parkConfigs)
  const handleCheckIn = async (formData) => {
    try {
      await addDoc(collection(db, "estacionamento"), {
        park_id:user.uid,
        cliente_id: formData.clienteId,
        hora_entrada: Timestamp.fromDate(formData.horaEntrada),
        placa: formData.placa,
        preco_hora: parkConfigs.preco_hora,
        status: true
      });
      setRefresh(!refresh)
      alert("Check-In realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar o check-in:", error);
      alert("Erro ao realizar o check-in. Por favor, tente novamente.");
    }
  };

  return (
      <CheckInForm onCheckIn={handleCheckIn}/>
  );
};

export default CheckInPage;
