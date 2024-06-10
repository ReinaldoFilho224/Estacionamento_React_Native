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
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFAF6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
  },
  eyeIcon: {
    padding: 10,
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
  forgotPasswordText: {
    color: '#fff', // Cor azul ou outra cor de sua escolha
    marginTop: 10,
    textAlign: 'center',
  }
  
});

export default loginStyle;
