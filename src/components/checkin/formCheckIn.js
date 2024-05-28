import React, { useState, useEffect } from "react";
import { View, Button, TextInput} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useGlobalState } from "../../config/refresh";
import { db } from "../../config";
import { MaskedTextInput } from "react-native-mask-text";
import { stylesCheckin } from "../../../assets/css/checkin";

const CheckInForm = ({ onCheckIn, preco_hora }) => {
    const [clientes, setClientes] = useState([]);
    const [selectedClienteId, setSelectedClienteId] = useState("");
    const [placa, setPlaca] = useState("");
    const [carModel, setCarModel] = useState("");
    const { refresh , user } = useGlobalState();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const clientsQuery = query(
                    collection(db, "clientes"),
                    where("park_id", "==", user.uid)
                  );
          
                const querySnapshot = await getDocs(clientsQuery);
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

        if (carModel === undefined || carModel === null) {
            console.error("carModel não está definido corretamente");
            return;
        }

        const formData = {
            clienteId: selectedClienteId,
            horaEntrada,
            placa,
            carModel,
            status: true,
        };

        onCheckIn(formData)
            .then(() => {
                setPlaca('');
                setCarModel('');
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
                value={preco_hora}
                onChangeText={setCarModel}
                placeholder="Modelo do Veículo"
                style={stylesCheckin.input}
            />
            <View style={stylesCheckin.buttonsArea}>
                <Button title="Check-In" onPress={handleCheckIn} />
            </View>
        </View>
    );
};

export default CheckInForm;