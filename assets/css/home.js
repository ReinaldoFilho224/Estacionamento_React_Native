import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeaea',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b85c9',
    padding: 10,
    height: '30%',
  },
  lineMenu: {
    width: '100%',
    height: 200,
    padding: 10
  },
  menuArea: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12
  },
  buttonMenu: {
    padding: 10,
    backgroundColor: '#fff',
    width: '48%',
    height: '100%',
    
  },
  buttonMenuIcons:{
    width: '100%',
    height: '100%',
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    gap:10
  },
  buttonClose: {
    color:'#fff'
  },
  modalContent: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
  },
  text:{
    fontSize: 20,
    textAlign: 'center',
  },
  headerModal:{
    display:'grid',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  textIcons:{
    fontSize:18,
  }
});