import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 20, 
  },
  input: {
    backgroundColor: '#F2F2F2', 
    width: '80%',
    height: 40,
    marginBottom: 10, 
    paddingHorizontal: 15, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#CCCCCC', 
  },
  button: {
    width: '50%', 
    height: 40,
    backgroundColor: '#007bff', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16,
  },
  errorText: {
    color: 'red', 
    marginTop: 10,
  },
});

export default loginStyle;
