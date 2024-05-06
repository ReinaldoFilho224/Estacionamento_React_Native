import ListCheckout from "../components/listCheckout";
import { stylesCheckout } from "../../assets/css/checkout";
import { View } from "react-native";

const Checkout = () => {
  return(
  <View style={stylesCheckout.container}>
      <ListCheckout />
  </View>
)}

export default Checkout;