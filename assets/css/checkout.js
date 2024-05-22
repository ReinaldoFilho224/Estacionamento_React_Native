import { StyleSheet } from 'react-native';

export const stylesCheckout = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5b85c9'
    },
    checkoutDiv: {
        backgroundColor:'#eaeaea',
        display: 'flex',
        gap: 8,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    checkoutItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#7ed957',
        padding: 10,
        borderRadius: 5,
    },
    textItem: {
        fontSize: 16,
        fontWeight: "bold"
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold"
    },
    textView: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center'
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
      },
      modal: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTab: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#5b85c9',
        borderWidth: 1,
        alignItems: 'center',
        marginVertical:10,
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      modalTabTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
      modalTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    modalContent: {
        flexDirection: 'column',
        marginTop: 10,
        alignItems: 'center',
      },
      modalColumn: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10,
      },
      modalLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      modalCloseButton: {
        width: '100%',
        backgroundColor: '#5b85c9',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
      },
      modalCheckoutButton: {
        width: '100%',
        backgroundColor: '#ff5d48',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
      },
      modalCloseButtonText: {
        color: '#fff',
      },
});