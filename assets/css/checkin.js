import { StyleSheet } from 'react-native';

export const stylesCheckin = StyleSheet.create({
    input: {
        backgroundColor: '#FFF',
        width: '100%', 
        padding: 12, 
        borderRadius: 10, 
        marginBottom: 20, 
        fontSize: 16, 
        color: '#333', 
        elevation: 3, 
    },
    inputSelector:{
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        gap:5,
    },
    text:{
        color:'#fff',
        fontSize: 18,
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
        backgroundColor: '#FF5733',
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderRadius: 8,
        marginHorizontal: 10, 
        width:'75%',
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
    },
    buttonDisabled: {
        backgroundColor: 'gray',
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderRadius: 8,
        marginHorizontal: 10, 
        width:'75%',
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold', 
    },
    image:{
        width:'50%',
        height:'30%'
    },
});
