import { StyleSheet } from "react-native";

const registerStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    backgroundColor: "#102C57"
  },
  input: {
    backgroundColor: "#FEFAF6",
    width: "100%",
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },

text: {
  color: "#FEFAF6",
  margin: 10,
  fontSize:16,
},

  button: {
    width: "90%",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin:10
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default registerStyle;
