import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../assets/css/home";

const ButtonMenu = ({ functionModal, icon, iconColor, textButton, small }) => {
    return (
        <TouchableOpacity style={styles.buttonMenu} onPress={functionModal}>
            <View style={!small ? styles.buttonMenuIcons : styles.buttonMenuIconsSmall}>
                <Icon name={icon} size={!small ? 45 : 30} color={iconColor} />
                <Text style={!small ? styles.textIcons : styles.textIconsSmall}>{textButton}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ButtonMenu;
