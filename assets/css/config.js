import { StyleSheet } from "react-native";

export const stylesConfigs = StyleSheet.create({
  modal: {
    height: "100%",
    flex: 1,
    backgroundColor: "#5b85c9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
  itensHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "flex-start",
    padding: 10,

    // gap: 20,
  },
  title: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
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
  btnFechar: {
    marginTop: 10,
    backgroundColor: "#F0FFF0",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
