import { View, Text, ScrollView } from "react-native"
import { useState, useEffect } from "react";
import { db } from "../../config";
import { stylesConfigs } from "../../../assets/css/config";
import { collection, getDocs } from "firebase/firestore";


const ViewClientsComponent = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchDataAndSetTimer = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "clientes"));
                const clientsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setClients(clientsData)
            } catch (error) {
                console.error("Erro ao buscar carros estacionados:", error);
            }
        };

        fetchDataAndSetTimer();

        const timer = setInterval(fetchDataAndSetTimer, 10000);

        return () => clearInterval(timer);
    }, []);

    return (
        <ScrollView>
            <Text style={stylesConfigs.title}>Lista de Usuários</Text>
            <View style={stylesConfigs.itensHeader}>
                <Text style={{ fontWeight: 'bold' }}>CPF</Text>
                <Text style={{ fontWeight: 'bold' }}>Nome</Text>
                <Text style={{ fontWeight: 'bold' }}>Telefone</Text>
            </View>

            {clients.map((client, index) => (
                <View key={index} style={stylesConfigs.itens}>
                    <Text>{client.cpf}</Text>
                    <Text>{client.nome}</Text>
                    <Text style={{justifyContent:'center'}}>{client.telefone}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

export default ViewClientsComponent;
