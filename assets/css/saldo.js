import { StyleSheet } from "react-native";

export const SaldoStyle = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  subitem: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    width: "100%",
    height: "87%",
  },
  subContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  saldo: {
    width: "100%",
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#363636",
  },
  textInfo: {
    textAlign: "center",
    color: "#363636",
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
});
