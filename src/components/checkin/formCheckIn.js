import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useGlobalState } from "../../config/refresh";
import { db } from "../../config";
import { MaskedTextInput } from "react-native-mask-text";
import { stylesCheckin } from "../../../assets/css/checkin";

const CheckInForm = ({ onCheckIn }) => {
    const [clientes, setClientes] = useState([]);
    const [selectedClienteId, setSelectedClienteId] = useState("");
    const [placa, setPlaca] = useState("");
    const [carModel, setCarModel] = useState("");
    const { refresh, user } = useGlobalState();
    const [isFormValid, setIsFormValid] = useState(false);
    const [clientCode, setClientCode] = useState('');

    const handlePlacaChange = (text) => {
        setPlaca(text.toUpperCase());
    };

    const generateRandomCode = () => {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        return code;
    };

    const checkCodeExists = async (code) => {
        const codQuery = query(
            collection(db, "estacionamento"),
            where("cod", "==", code),
            where("park_id", "==", user.uid)
        );
        const querySnapshot = await getDocs(codQuery);
        return !querySnapshot.empty;
    };

    const handleGenerateUniqueCode = async () => {
        let newCode = generateRandomCode();
        while (await checkCodeExists(newCode)) {
            newCode = generateRandomCode();
        }
        // console.log(newCode);
        setClientCode(newCode);
    };

    useEffect(() => {
        const checkFormValidity = () => {
            setIsFormValid(placa && carModel && selectedClienteId);
        };
        checkFormValidity();
    }, [placa, carModel, selectedClienteId]);

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

    const handleCheckIn = async () => {
        const horaEntrada = new Date();

        if (!carModel) {
            console.error("Modelo do veículo não está definido corretamente");
            return;
        }

        await handleGenerateUniqueCode();

        const formData = {
            clienteId: selectedClienteId,
            horaEntrada,
            placa,
            carModel,
            cod: clientCode,
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
            <Image
                source={require('../../../assets/checkin.png')}
                style={stylesCheckin.image}
            />
            <View style={stylesCheckin.inputSelector}>
                <Text style={stylesCheckin.text}>Cliente: </Text>
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
            </View>
            <View style={stylesCheckin.inputSelector}>
                <Text style={stylesCheckin.text}>Placa do Veículo:</Text>
                <MaskedTextInput
                    value={placa}
                    onChangeText={handlePlacaChange}
                    placeholder="Placa do Veículo"
                    mask="AAA-9999"
                    style={stylesCheckin.input}
                />
            </View>
            <View style={stylesCheckin.inputSelector}>
                <Text style={stylesCheckin.text}>Modelo do Veículo:</Text>
                <TextInput
                    value={carModel}
                    onChangeText={setCarModel}
                    placeholder="Modelo do Veículo"
                    style={stylesCheckin.input}
                />
            </View>
            <View style={stylesCheckin.buttonsArea}>
                <TouchableOpacity
                    title="Check-In"
                    onPress={handleCheckIn}
                    disabled={!isFormValid}
                    style={isFormValid ? stylesCheckin.button : stylesCheckin.buttonDisabled}
                >
                    <View>
                        <Text>Checkin</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckInForm;