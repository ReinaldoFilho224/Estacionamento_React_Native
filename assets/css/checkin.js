import { StyleSheet } from 'react-native';

export const stylesCheckin = StyleSheet.create({
    input:{
        backgroundColor:'#FFF',
        width:'100%',
        padding:8,
        borderRadius: 6,
        display:'flex',
        justifyContent: 'center',
    },
    TitleCheckin:{
        // color:'#fff',
        fontSize: 26,
        padding:'1.5rem'
    },
    CheckinPage:{
        // backgroundColor: '#5b85c9',
        // width:'100%',
        // height:'100%',
        // display:'flex',
        // justifyContent: 'center',
        // alignItems:'center',
        // gap: 5,
    },
    inputArea:{
        // backgroundColor: '#5b85c9',
        width:'80%',
        height:'100%',
        // display:'flex',
        // justifyContent: 'center',
        alignItems:'center',
        gap: 5,
    },
    modal: {
        height: '100%',
        flex:1,
        backgroundColor: '#5b85c9',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonsArea:{
        display: 'flex',
        flexDirection: 'row',
        gap:5,
        padding: '1rem'
      }
})