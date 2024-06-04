import { StyleSheet } from "react-native";

export const stylesConfigs = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff5733', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign:'center'
  },
  itens: {
    // flexDirection: 'row',
    // width:'100%',
    // display:'flex',
    // flexDirection:'row',
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
  itensHistorico: {
    // flexDirection: 'row',
    // width:'100%',
    display: "flex",
    flexDirection: "row",
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
    display:'flex',
    width: "100%",
    gap:0,
    marginVertical: 15,
  },
  formInput: {
    display:'flex',
    width: "100%",
    gap: 8,
    marginVertical: 15,
  },
  formClientLabel: {
    color:'#fff',
    fontSize: 18,
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
  buttonCreated: {
    backgroundColor: 'green', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  containerConfig: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "#102C57",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFF",
  },
  cardInfoHistorico: {
    padding: 18,
    gap: 15,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  cardInfoHistoricoText: {
    color: "#363636",
    fontSize: 18,
  },
  cardInfoHistoricoHighlight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C1C", // Você pode alterar esta cor para qualquer outra cor que destaque o texto
  },
  searchInput: {
    marginTop: 20,
    height: 40,
    borderColor: "##CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#FFF",
  },
});
