import { StyleSheet } from 'react-native';

export const stylesCheckin = StyleSheet.create({
    input: {
        backgroundColor: '#FFF',
        width: '80%', 
        padding: 12, 
        borderRadius: 10, 
        marginBottom: 20, 
        fontSize: 16, 
        color: '#333', 
        elevation: 3, 
    },
    TitleCheckin: {
        color: '#fff',
        fontSize: 26,
        marginBottom: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
    },
    CheckinPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#D0AA56', 
    },

    inputArea: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20, 
        backgroundColor: '#1E829D', 
        borderWidth: 2, 
        borderColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modal: {
        backgroundColor: '#FFF', 
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5, 
    },
    buttonsArea: {
        flexDirection: 'row',
        marginTop: 20, 
        justifyContent: 'center', 
    },
    button: {
        backgroundColor: '#5b85c9',
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderRadius: 8,
        marginHorizontal: 10, 
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold', 
    },
});
