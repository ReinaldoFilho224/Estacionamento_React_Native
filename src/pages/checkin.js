import React from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../config/index'
import CheckInForm from "../components/formCheckIn";

const CheckInPage = () => {
  const handleCheckIn = async (formData) => {
    try {
      // Adiciona um novo documento à coleção "Estacionamento" com os dados do formulário
      await addDoc(collection(db, "estacionamento"), {
        cliente_id: formData.clienteId,
        hora_entrada: Timestamp.fromDate(formData.horaEntrada),
        placa: formData.placa,
        preco_hora: parseFloat(formData.precoHora),
        status: true
      });

      // Alerta de sucesso ou outra ação após o check-in
      alert("Check-In realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar o check-in:", error);
      // Alerta de erro ou outra ação em caso de falha
      alert("Erro ao realizar o check-in. Por favor, tente novamente.");
    }
  };

  return <CheckInForm onCheckIn={handleCheckIn} />;
};

export default CheckInPage;
