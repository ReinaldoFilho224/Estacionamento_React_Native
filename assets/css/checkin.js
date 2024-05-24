import { StyleSheet } from 'react-native';

export const stylesCheckin = StyleSheet.create({
    input: {
        backgroundColor: '#FFF',
        width: '80%', 
        padding: 12, 
        borderRadius: 10, 
        marginBottom: 10, 
    },
    TitleCheckin: {
        color: '#fff',
        fontSize: 26,
        marginBottom: 20, 
    },
    CheckinPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#D0AA56', 
        backgroundImage: 'linear-gradient(45deg, #D0AA56, #000)', 
    },

    inputArea: {
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundImage: 'linear-gradient(45deg, rgba(208, 170, 86, 0.5), rgba(0, 0, 0, 0.5))',  
        borderRadius: 40,
        position: 'relative',  
    },
    modal: {
        backgroundColor: '#FFF', 
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    buttonsArea: {
        flexDirection: 'row',
        marginTop: 20, 
    },
    button: {
        backgroundColor: '#5b85c9',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});
