import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E829D',
    padding: 15,
    paddingVertical:50
  },
  textContainerWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  textContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  lines:{
    marginTop:10,
    paddingHorizontal: 10,
    gap:10
  },
  lineMenu: {
    width: '100%',
    height: 150,
    // paddingHorizontal: 10,
  },
  lineMenuSmall: {
    width: '100%',
    height: 75,
    // padding: 10,
  },
  menuArea: {
    width: '100%',
    height:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  buttonMenu: {
    padding: 10,
    backgroundColor: '#fff',
    width: '48%',
    height: '100%',
  },
  buttonMenuIcons: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonMenuIconsSmall: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonClose: {
    color: '#fff',
  },
  text:{
    color:'#fff',
    fontSize:20
  },
  textSmall:{
    color:'#fff',
    fontSize:15
  },
  modalContent: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
    backgroundColor: '#1E829D'
  },
  modalHeaderText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color:'#fff',
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textIcons: {
    fontSize: 18,
  },
  textIconsSmall: {
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 60,
    resizeMode: 'cover',
  },
});
