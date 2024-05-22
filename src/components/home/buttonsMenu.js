import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../assets/css/home";

const ButtonMenu = ({ functionModal, icon, iconColor, textButton }) => {
    return (
        <TouchableOpacity style={styles.buttonMenu} onPress={functionModal}>
            <View style={styles.buttonMenuIcons}>
                <Icon name={icon} size={45} color={iconColor} />
                <Text style={styles.textIcons}>{textButton}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ButtonMenu;
