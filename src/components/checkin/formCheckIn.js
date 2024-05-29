import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, Text, Image } from "react-native";
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
    const { refresh, user } = useGlobalState();
    const [isFormValid, setIsFormValid] = useState(false);

    const handlePlacaChange = (text) => {
        setPlaca(text.toUpperCase());
    };

    useEffect(() => {
        const checkFormValidity = () => {
            if (placa && carModel && selectedClienteId) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
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
                setIsFormValid(true)
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
                <Text style={stylesCheckin.text} >Cliente: </Text>
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
                    value={preco_hora}
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