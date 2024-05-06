import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../assets/css/home";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

const Home = () => {
    const [placaData, setPlacaData] = useState([]);

    useEffect(() => {
        const fetchPlacaData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "placas"));
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPlacaData(data);
            } catch (error) {
                console.error("Erro ao buscar os documentos:", error);
            }
        };

        fetchPlacaData();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                {/* Seu conteúdo aqui */}
            </View>
            <View>
                {/* Saldo */}
                {placaData.map((placa, index) => (
                    <Text key={index}>
                        Placa: {placa.placa}
                    </Text>
                ))}
                {/* Vagas Livres */}
                <Text>Vagas Livres: 100</Text>
                {/* Total de vagas */}
                <Text>Valor da Hora: R$ 8,00</Text>
            </View>
            <View>
                {/* Patio */}
            </View>
        </View>
    );
};

export default Home;
