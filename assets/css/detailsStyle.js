import { StyleSheet } from "react-native";

export const stylesDetails = StyleSheet.create({
    container: {
        width: "100%",
    },
    itemHistorico: {
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
    itemText: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default stylesDetails;
