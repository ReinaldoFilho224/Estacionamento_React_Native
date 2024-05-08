import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../assets/css/home";

const Home = () => {
    return (
        <View style={styles.container}>
            <View>
            </View>
            <View>
                {/* Saldo */}
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
