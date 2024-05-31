import { StyleSheet } from 'react-native';

export const stylesConfigs  = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff5733', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  itens: {
    // flexDirection: 'row',
    // width:'100%',
    justifyContent: "space-between",
    marginBottom: 5,
    gap: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    padding: 15,
    alignItems: "flex-start",
  },
  formClientContainer: {
    width: "100%",
    gap: 10,
    marginVertical: 15,
  },
  formClientLabel: {
    color: "#fff",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
  },
  formClientTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  formClient: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 15,
    padding: 10,
  },
});
