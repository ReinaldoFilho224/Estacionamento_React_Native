import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, Modal, TouchableOpacity} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { useGlobalState } from "../../config/refresh";
import { db } from "../../config";
import { MaskedTextInput } from "react-native-mask-text";
import { stylesCheckin } from "../../../assets/css/checkin";

const CheckInForm = ({ onCheckIn }) => {
    const [clientes, setClientes] = useState([]);
    const [selectedClienteId, setSelectedClienteId] = useState("");
    const [placa, setPlaca] = useState("");
    const [precoHora, setPrecoHora] = useState("");
    const { refresh } = useGlobalState();

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
    }, [refresh]);


    const handleCheckIn = () => {
        const horaEntrada = new Date();

        if (precoHora === undefined || precoHora === null) {
            console.error("precoHora não está definido corretamente");
            return;
        }

        const formData = {
            clienteId: selectedClienteId,
            horaEntrada,
            placa,
            precoHora,
            status: true,
        };

        onCheckIn(formData)
            .then(() => {
                setPlaca('');
                setPrecoHora('');
            })
            .catch((error) => {
                console.error('Erro ao fazer check-in:', error);
            });
    };
    return (
        <View style={stylesCheckin.inputArea}>
            <Picker
                selectedValue={selectedClienteId}
                onValueChange={(itemValue) => setSelectedClienteId(itemValue)}
                style={stylesCheckin.input}
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
            <MaskedTextInput
                value={placa}
                onChangeText={setPlaca}
                placeholder="Placa do Veículo"
                mask="AAA-9999"
                style={stylesCheckin.input}
            />
            <TextInput
                value={precoHora}
                onChangeText={setPrecoHora}
                placeholder="Preço por Hora"
                keyboardType="numeric"
                style={stylesCheckin.input}
            />
            <View style={stylesCheckin.buttonsArea}>
                <Button title="Check-In" onPress={handleCheckIn} />
            </View>
        </View>
    );
};

export default CheckInForm;