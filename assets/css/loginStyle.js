// loginStyle.js
import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:"#102C57"
  },
  logo: {
    width: 150,
    height: 120,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius:10,
    backgroundColor: "#FEFAF6"
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius:10
  },
  button2: {
    width: '100%',
    height: 40,
    backgroundColor: '#ff5733',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  registerText: {
    color: "#FEFAF6",
    fontSize: 15,
  },
  
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default loginStyle;
