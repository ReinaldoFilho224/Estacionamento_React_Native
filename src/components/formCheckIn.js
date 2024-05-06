import React, { useState, useEffect } from "react";
import { View, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

const CheckInForm = ({ onCheckIn }) => {
    const [clientes, setClientes] = useState([]);
    const [selectedClienteId, setSelectedClienteId] = useState("");
    const [placa, setPlaca] = useState("");
    const [precoHora, setPrecoHora] = useState("");

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "clientes"));
                const clientesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setClientes(clientesData);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClientes();
    }, []);

    const handleCheckIn = () => {
        const horaEntrada = new Date();

        // Verificar se precoHora está definido corretamente
        if (precoHora === undefined || precoHora === null) {
            console.error("precoHora não está definido corretamente");
            return;
        }

        // Substitua com a lógica para enviar os dados do formulário
        const formData = {
            clienteId: selectedClienteId,
            horaEntrada,
            placa,
            precoHora,
            status: true,
        };
        onCheckIn(formData);
    };
    return (
        <View>
            <Picker
                selectedValue={selectedClienteId}
                onValueChange={(itemValue) => setSelectedClienteId(itemValue)}
            >
                <Picker.Item label="Selecione um cliente" value="" />
                {clientes.map((cliente) => (
                    <Picker.Item
                        key={cliente.id}
                        label={cliente.nome}
                        value={cliente.id}
                    />
                ))}
            </Picker>
            <TextInput
                value={placa}
                onChangeText={setPlaca}
                placeholder="Placa do Veículo"
            />
            <TextInput
                value={precoHora}
                onChangeText={setPrecoHora}
                placeholder="Preço por Hora"
                keyboardType="numeric"
            />
            <Button title="Check-In" onPress={handleCheckIn} />
        </View>
    );
};

export default CheckInForm;