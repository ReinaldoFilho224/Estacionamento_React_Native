import { StyleSheet} from 'react-native';

export const stylesCheckout = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#5b85c9'
    },
    checkoutDiv:{
        display: 'flex',
        gap: 8,
        marginTop: 8,
        marginHorizontal: 8,
    },
    checkoutItem:{
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding:15,
        backgroundColor:'#fff',
        borderRadius: 10,
        fontSize: 16,
    },
    button:{
        backgroundColor: '#7ed957',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold"
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold"
    },
  });